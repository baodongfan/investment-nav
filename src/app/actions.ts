'use server';

const FMP_API_KEY = process.env.FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

// ----------------------------------------------------------------------
// 1. 获取每日市场复盘数据
// ----------------------------------------------------------------------
export async function getRealMarketData() {
  // FMP 免费版技巧：
  // 直接请求 ^GSPC (标普500指数) 往往需要付费。
  // 我们改用 ETF 作为替代锚点，它们的涨跌幅与指数几乎完全一致。
  const targetSymbols = [
    { symbol: 'SPY',   name: '标普 500 (ETF)', isYield: false }, // 替代 ^GSPC
    { symbol: 'QQQ',   name: '纳斯达克 (ETF)', isYield: false }, // 替代 ^IXIC
    { symbol: '^TNX',  name: '10年美债',       isYield: true },  // 收益率
    { symbol: 'GLD',   name: '黄金 (ETF)',     isYield: false }, // 替代 GCUSD
    { symbol: 'UUP',   name: '美元 (ETF)',     isYield: false }, // 替代 ^DXY
    { symbol: '^HSI',  name: '恒生指数',       isYield: false }
  ];

  const symbolString = targetSymbols.map(i => i.symbol).join(',');

  try {
    // 打印 Key 的前几位，确保 Key 读取到了 (在 Vercel Logs 中查看)
    console.log(`Fetching FMP Data with Key: ${FMP_API_KEY ? FMP_API_KEY.substring(0, 4) + '...' : 'UNDEFINED'}`);

    const response = await fetch(
      `${BASE_URL}/quote/${symbolString}?apikey=${FMP_API_KEY}`, 
      { next: { revalidate: 30 } } // 30秒缓存
    );

    if (!response.ok) {
      throw new Error(`FMP API Status: ${response.status}`);
    }

    const rawData = await response.json();

    // 错误检查：FMP 有时会返回错误信息对象
    if (rawData['Error Message']) {
      throw new Error(rawData['Error Message']);
    }
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("FMP returned empty array (Check API quota or symbols)");
    }

    console.log("FMP Fetch Success, items count:", rawData.length);

    const assets = targetSymbols.map(target => {
      const item = rawData.find((d: any) => d.symbol === target.symbol) || {};
      const price = item.price || 0;
      const changePercent = item.changesPercentage || 0;

      return {
        symbol: target.symbol,
        name: target.name,
        // 如果是美债，直接显示数值；否则显示价格
        value: target.isYield 
          ? `${price.toFixed(2)}%` 
          : formatPrice(target.symbol, price),
        change: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        changeValue: changePercent, 
        up: changePercent > 0
      };
    });

    return { success: true, data: assets };

  } catch (error: any) {
    console.error("❌ Fetch Market Data Failed:", error.message);

    // --- 紧急兜底数据 (更新为 2025 年真实点位) ---
    // 如果你看到这个数据，说明 API Key 没配置对，或者额度用完了
    return { 
      success: true, 
      isMock: true,
      data: [
        { symbol: 'SPY', name: '标普 500 (ETF)', value: '$592.00', change: '+0.45%', changeValue: 0.45, up: true },
        { symbol: 'QQQ', name: '纳斯达克 (ETF)', value: '$510.50', change: '+0.80%', changeValue: 0.80, up: true },
        { symbol: '^TNX', name: '10年美债', value: '4.45%', change: '-1.20%', changeValue: -1.2, up: false },
        { symbol: 'GLD', name: '黄金 (ETF)', value: '$250.60', change: '+0.55%', changeValue: 0.55, up: true },
        { symbol: 'UUP', name: '美元 (ETF)', value: '$28.30', change: '+0.12%', changeValue: 0.12, up: true },
        { symbol: '^HSI', name: '恒生指数', value: '19,543.20', change: '-0.30%', changeValue: -0.30, up: false },
      ] 
    };
  }
}

// ----------------------------------------------------------------------
// 2. 获取个股基本面 (保持不变，FMP 个股查询通常是免费的)
// ----------------------------------------------------------------------
export async function getStockFundamentals(ticker: string) {
  try {
    const symbol = ticker.toUpperCase();
    const [quoteRes, metricsRes, growthRes] = await Promise.all([
      fetch(`${BASE_URL}/quote/${symbol}?apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } }),
      fetch(`${BASE_URL}/key-metrics-ttm/${symbol}?apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } }),
      fetch(`${BASE_URL}/financial-growth/${symbol}?limit=1&apikey=${FMP_API_KEY}`, { next: { revalidate: 3600 } })
    ]);

    const quoteData = await quoteRes.json();
    const metricsData = await metricsRes.json();
    const growthData = await growthRes.json();

    if (!quoteData?.[0]) return { success: false, error: "未找到股票" };

    const quote = quoteData[0];
    const metrics = metricsData?.[0] || {};
    const growth = growthData?.[0] || {};

    return {
      success: true,
      data: {
        price: quote.price || 0,
        eps: quote.eps || 0,
        roe: (metrics.roeTTM ? metrics.roeTTM * 100 : 0).toFixed(2),
        growth: (growth.revenueGrowth ? growth.revenueGrowth * 100 : 0).toFixed(2),
        bookValue: metrics.bookValuePerShareTTM ? metrics.bookValuePerShareTTM.toFixed(2) : 0,
        cashFlow: metrics.freeCashFlowPerShareTTM ? metrics.freeCashFlowPerShareTTM.toFixed(2) : 0
      }
    };
  } catch (error: any) {
    console.error(`Fetch Stock Error:`, error);
    return { success: false, error: "获取失败" };
  }
}

function formatPrice(symbol: string, price: number) {
  // ETF 价格通常较小，不需要千分位
  return `$${price.toFixed(2)}`;
}