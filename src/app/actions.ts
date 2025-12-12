'use server';

import yahooFinance from 'yahoo-finance2';

// ----------------------
// 1. 获取每日市场复盘数据
// ----------------------
export async function getRealMarketData() {
  // 定义我们要关注的资产代码
  const symbols = [
    '^GSPC', // S&P 500
    '^IXIC', // Nasdaq
    '^TNX',  // 10年美债收益率
    'GC=F',  // 黄金期货
    'DX-Y.NYB', // 美元指数
    '^HSI'   // 恒生指数
  ];

  try {
    // ✅ 修复点 1：添加 'as any[]' 解决 TypeScript 构建时的 'map does not exist on type never' 报错
    const results = await yahooFinance.quote(symbols) as any[];
    
    // 映射数据格式供前端使用
    const assets = results.map(q => {
      const price = q.regularMarketPrice || 0;
      const changePercent = q.regularMarketChangePercent || 0;
      
      // 美债收益率特殊处理：如果是 ^TNX，价格本身就是百分比
      const isYield = q.symbol === '^TNX';
      
      return {
        symbol: q.symbol,
        name: mapSymbolToName(q.symbol),
        value: isYield ? `${price.toFixed(2)}%` : formatPrice(q.symbol, price),
        change: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        up: changePercent > 0
      };
    });

    return { success: true, data: assets };
  } catch (error: any) {
    console.error("Fetch Market Data Error:", error.message || error);

    // ✅ 修复点 2：添加模拟数据兜底
    // Yahoo Finance 经常屏蔽 Vercel 服务器 IP，导致返回 403 错误。
    // 这个兜底数据保证了你的网站在 Vercel 上部署后，即使 API 挂了也能正常展示界面。
    console.log("Returning fallback mock data...");
    return { 
      success: true, 
      isMock: true, // 标记为模拟数据，前端会显示"演示模式"标签
      data: [
        { symbol: '^GSPC', name: '标普 500', value: '5,234.12', change: '+0.45%', up: true },
        { symbol: '^IXIC', name: '纳斯达克', value: '16,423.50', change: '+0.80%', up: true },
        { symbol: '^TNX', name: '10年美债', value: '4.25%', change: '-1.20%', up: false },
        { symbol: 'GC=F', name: '黄金', value: '$2,345.60', change: '+0.55%', up: true },
        { symbol: 'DX-Y.NYB', name: '美元指数', value: '104.30', change: '+0.12%', up: true },
        { symbol: '^HSI', name: '恒生指数', value: '16,543.20', change: '-0.30%', up: false },
      ] 
    };
  }
}

// 辅助函数：将代码映射为中文名称
function mapSymbolToName(symbol: string) {
  const map: Record<string, string> = {
    '^GSPC': '标普 500',
    '^IXIC': '纳斯达克',
    '^TNX': '10年美债',
    'GC=F': '黄金',
    'DX-Y.NYB': '美元指数',
    '^HSI': '恒生指数'
  };
  return map[symbol] || symbol;
}

// 辅助函数：格式化价格
function formatPrice(symbol: string, price: number) {
  if (symbol === 'GC=F') return `$${price.toFixed(1)}`;
  if (symbol === 'DX-Y.NYB') return `${price.toFixed(2)}`;
  return `${price.toFixed(2)}`;
}


// ----------------------
// 2. 获取个股基本面数据 (安全边际)
// ----------------------
export async function getStockFundamentals(ticker: string) {
  try {
    // 获取综合概要信息
    // ✅ 修复点 3：添加 'as any' 解决 'Property price does not exist on type never' 报错
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ['price', 'financialData', 'defaultKeyStatistics', 'summaryDetail']
    }) as any;

    const price = summary.price?.regularMarketPrice || 0;
    const eps = summary.defaultKeyStatistics?.trailingEps || 0;
    const roe = summary.financialData?.returnOnEquity || 0;
    // 增长率通常较难直接获取准确的预测值，这里用营收增长率代替，或者留空让用户填
    const growth = summary.financialData?.revenueGrowth || 0; 
    const bookValue = summary.defaultKeyStatistics?.bookValue || 0;
    const cashFlow = summary.financialData?.freeCashflow || 0;
    const sharesOutstanding = summary.defaultKeyStatistics?.sharesOutstanding || 1;

    // 计算每股现金流 (简单估算)
    const cashFlowPerShare = cashFlow && sharesOutstanding ? (cashFlow / sharesOutstanding) : 0;

    return {
      success: true,
      data: {
        price,
        eps,
        roe: (roe * 100).toFixed(2), // 转为百分比
        growth: (growth * 100).toFixed(2), // 转为百分比
        bookValue,
        cashFlow: cashFlowPerShare.toFixed(2)
      }
    };
  } catch (error) {
    console.error(`Fetch Stock Error for ${ticker}:`, error);
    // 返回错误信息
    return { success: false, error: "未找到该股票信息，请检查代码 (如 AAPL)" };
  }
}