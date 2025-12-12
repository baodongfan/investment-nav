'use server';

import yahooFinance from 'yahoo-finance2'; // ✅ 1. 改为默认导入

// ✅ 2. 直接配置该默认实例 (如果需要抑制通知)
// 注意：yahoo-finance2 的默认实例通常已经可以直接使用
// 如果你需要配置 suppressNotices，可以直接调用方法：

// 或者直接导出使用
export async function someAction() {
  const result = await yahooFinance.quote('AAPL');
  // ...
}


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
    const results = await yahooFinance.quote(symbols);
    
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
  } catch (error) {
    console.error("Fetch Market Data Error:", error);
    return { success: false, error: "数据获取失败" };
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
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ['price', 'financialData', 'defaultKeyStatistics', 'summaryDetail']
    });

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
    return { success: false, error: "未找到该股票信息，请检查代码 (如 AAPL)" };
  }
}