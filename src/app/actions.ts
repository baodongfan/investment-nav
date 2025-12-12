'use server';

// ----------------------------------------------------------------------
// 配置区域
// ----------------------------------------------------------------------
const FMP_API_KEY = process.env.FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

// ----------------------------------------------------------------------
// 1. 获取每日市场复盘数据 (Market Review)
// ----------------------------------------------------------------------
export async function getRealMarketData() {
  // FMP 的 Ticker 符号可能与 Yahoo 略有不同，这里定义映射关系
  // 格式: [FMP代码, 显示名称, 是否是百分比数值]
  const targetSymbols = [
    { symbol: '^GSPC', name: '标普 500', isYield: false },
    { symbol: '^IXIC', name: '纳斯达克', isYield: false },
    { symbol: '^TNX',  name: '10年美债', isYield: true }, // 收益率
    { symbol: 'GCUSD', name: '黄金',     isYield: false }, // FMP 黄金代码通常是 GCUSD
    { symbol: '^DXY',  name: '美元指数', isYield: false }, // FMP 美元指数
    { symbol: '^HSI',  name: '恒生指数', isYield: false }
  ];

  // 拼接查询字符串，例如: ^GSPC,^IXIC,^TNX...
  const symbolString = targetSymbols.map(i => i.symbol).join(',');

  try {
    // 使用 Next.js 的 fetch，设置 revalidate 缓存 60秒，避免频繁消耗 API 配额
    const response = await fetch(
      `${BASE_URL}/quote/${symbolString}?apikey=${FMP_API_KEY}`, 
      { next: { revalidate: 60 } } 
    );

    if (!response.ok) {
      throw new Error(`FMP API Error: ${response.statusText}`);
    }

    const rawData = await response.json();

    // 如果 API 返回空数组或错误（比如配额用完），抛出异常以触发兜底
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("FMP returned empty data");
    }

    // 将 FMP 的数据格式转换为前端需要的格式
    const assets = targetSymbols.map(target => {
      // 在返回结果中找到对应的数据
      const item = rawData.find((d: any) => d.symbol === target.symbol) || {};
      
      const price = item.price || 0;
      const changePercent = item.changesPercentage || 0;

      return {
        symbol: target.symbol,
        name: target.name,
        // 格式化数值：如果是收益率(美债)，直接显示数值；否则根据类型加 $ 或纯数字
        value: target.isYield 
          ? `${price.toFixed(2)}%` 
          : formatPrice(target.symbol, price),
        // 格式化涨跌幅
        change: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        // 纯数值，用于前端生成智能总结
        changeValue: changePercent, 
        up: changePercent > 0
      };
    });

    return { success: true, data: assets };

  } catch (error: any) {
    console.error("Fetch Market Data Error:", error.message);

    // --- 兜底数据 (Fallback) ---
    // 如果 API 挂了或配额用完了，返回这个假数据，保证页面不白屏
    return { 
      success: true, 
      isMock: true,
      data: [
        { symbol: '^GSPC', name: '标普 500', value: '5,980.00', change: '+0.45%', changeValue: 0.45, up: true },
        { symbol: '^IXIC', name: '纳斯达克', value: '19,200.50', change: '+0.80%', changeValue: 0.80, up: true },
        { symbol: '^TNX', name: '10年美债', value: '4.35%', change: '-1.20%', changeValue: -1.2, up: false },
        { symbol: 'GCUSD', name: '黄金', value: '$2,650.60', change: '+0.55%', changeValue: 0.55, up: true },
        { symbol: '^DXY', name: '美元指数', value: '104.30', change: '+0.12%', changeValue: 0.12, up: true },
        { symbol: '^HSI', name: '恒生指数', value: '18,543.20', change: '-0.30%', changeValue: -0.30, up: false },
      ] 
    };
  }
}

// ----------------------------------------------------------------------
// 2. 获取个股基本面数据 (安全边际计算)
// ----------------------------------------------------------------------
export async function getStockFundamentals(ticker: string) {
  try {
    // 清洗 ticker，确保大写
    const symbol = ticker.toUpperCase();

    // 并行请求 FMP 的多个接口以获取全面数据
    // 1. 实时报价 (Quote): 股价, EPS
    // 2. 关键指标 (Key Metrics): ROE, 每股净资产(Book Value), 每股现金流
    // 3. 财务增长 (Financial Growth): 营收增长率
    
    const [quoteRes, metricsRes, growthRes] = await Promise.all([
      fetch(`${BASE_URL}/quote/${symbol}?apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } }),
      fetch(`${BASE_URL}/key-metrics-ttm/${symbol}?apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } }),
      fetch(`${BASE_URL}/financial-growth/${symbol}?limit=1&apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } })
    ]);

    const quoteData = await quoteRes.json();
    const metricsData = await metricsRes.json();
    const growthData = await growthRes.json();

    // 检查是否有数据
    if (!quoteData?.[0]) {
      return { success: false, error: "未找到该股票信息，请检查代码" };
    }

    const quote = quoteData[0];
    const metrics = metricsData?.[0] || {};
    const growth = growthData?.[0] || {};

    return {
      success: true,
      data: {
        price: quote.price || 0,
        eps: quote.eps || 0,
        // FMP 的 roeTTM 是小数 (例如 0.15)，我们需要转为百分比 (15)
        roe: (metrics.roeTTM ? metrics.roeTTM * 100 : 0).toFixed(2),
        // 增长率
        growth: (growth.revenueGrowth ? growth.revenueGrowth * 100 : 0).toFixed(2),
        // 每股净资产
        bookValue: metrics.bookValuePerShareTTM ? metrics.bookValuePerShareTTM.toFixed(2) : 0,
        // 每股自由现金流
        cashFlow: metrics.freeCashFlowPerShareTTM ? metrics.freeCashFlowPerShareTTM.toFixed(2) : 0
      }
    };
  } catch (error: any) {
    console.error(`Fetch Stock Error for ${ticker}:`, error);
    return { success: false, error: "数据获取失败，请稍后重试" };
  }
}

// ----------------------------------------------------------------------
// 辅助函数
// ----------------------------------------------------------------------
function formatPrice(symbol: string, price: number) {
  if (symbol === 'GCUSD') return `$${price.toLocaleString()}`;
  if (symbol === '^DXY') return `${price.toFixed(2)}`;
  return `${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}