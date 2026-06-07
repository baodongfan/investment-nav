// 导航数据
export interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon?: string; // 问号代表可选，不填就显示默认：网站图标URL
}




// 网站聚合数据
export const websites: Website[] = [
  {
    id: "AQR Research Insights",
    name: "AQR Research Insights",
    description: "AQR（Applied Quantitative Research）是全球领先的量化投资管理公司，由量化大师 Cliff Asness 等人创立。它以将学术严谨性与实际投资相结合而闻名，是因子投资（Factor Investing）和另类资产领域的先驱。",
    url: "https://www.aqr.com/Insights/Research",
    category: "投资分析",
  },  
  {
    id: "Citadel Insights",
    name: "Citadel Insights",
    description: "Citadel Securities 是全球顶尖的市场做市商（Market Maker），虽然它在业务性质上更偏向卖方流动性提供，但其研究深度和对市场微观结构的理解在买方圈层中极具权威性（与其关联公司 Citadel 对冲基金共享强大的研究底蕴）。",
    url: "https://www.citadelsecurities.com/news-and-insights/category/market-insights/",
    category: "投资分析",
  },  
  {
    id: "GMO Insights",
    name: "GMO Insights",
    description: "GMO 是一家著名的价值导向型资产管理公司，其联合创始人 Jeremy Grantham 以多次准确预警资产泡沫（如2000年科技泡沫、2008年金融危机）而享誉全球。",
    url: "https://www.gmo.com/europe/research-library/",
    category: "投资分析",
  },  
  {
    id: "Man Group",
    name: "Man Group",
    description: "Man Group 是全球最大的独立对冲基金管理公司之一，总部位于英国。它旗下拥有著名的量化分支 Man AHL 和主动管理分支 Man GLG，在趋势跟踪（CTA）和另类投资方面处于世界顶尖水平。",
    url: "https://www.man.com/insights",
    category: "投资分析",
  },  


  {
    id: "ivolatility 周观",
    name: "Ivolatility 周观",
    description: "Ivolatility 每周市场分析与投资策略, 包含期权组合建议",
    url: "https://www.ivolatility.com/news",
    category: "投资分析",
  },
  {
    id: "marketbeat",
    name: "MarketBeat",
    description: "MarketBeat 提供股票分析、评级和投资建议，涵盖美股、港股等市场",
    url: "https://www.marketbeat.com/",
    category: "投资分析",
  },  
  {
    id: "Daily Chartbook",
    name: "Daily Chartbook",
    description: "每天更新的市场图表和技术分析，免费也够用，付费可以看更多",
    url: "https://www.dailychartbook.com/",
    category: "投资分析",
  },
  {
    id: "StockInvestUs",
    name: "StockInvestUs",
    description: "股票投资分析平台，提供详尽的股票数据、财务报表分析和估值模型，提供股票预测和AI分析",
    url: "https://stockinvest.us/",
    category: "投资分析",
  },
  {
    id: "TipRanks",
    name: "TipRanks",
    description: "投资研究平台，汇集分析师评级、市场情绪数据和分析师文章，帮助投资者做出明智决策（这个我花了会员，会经常看）",
    url: "https://www.tipranks.com/dashboard",
    category: "投资分析",
  },
  {
    id: "etfreplay",
    name: "ETF Replay",
    description: "ETF 回测和分析工具，帮助投资者评估ETF的历史表现和风险",
    url: "https://www.etfreplay.com/charts",
    category: "ETF投资",
  },
  {
    id: "ETF Database",
    name: "ETF Database",
    description: "ETF 数据库，提供全面的ETF信息和筛选工具",
    url: "https://etfdb.com/",
    category: "ETF投资",
  },
  {
    id: "ETF Overlap Tool",
    name: "ETF Overlap Tool",
    description: "ETF 分析，重叠度查询工具，对比不同ETF的持仓重叠情况",
    url: "https://www.etfrc.com/funds/overlap.php",
    category: "ETF投资",
  },
  {
    id: "finviz-screener",
    name: "Finviz Screener",
    description: "强大的美股筛选工具，根据多种条件筛选股票，网站还有丰富的市场新闻和分析及热力图",
    url: "https://finviz.com/screener.ashx",
    category: "市场&数据",
  },
  {
    id: "companies-market-cap",
    name: "Companies by Market Cap",
    description: "按市值排列的全球资产",
    url: "https://companiesmarketcap.com/assets-by-market-cap/",
    category: "市场&数据",
  },
  
  {
    id: "investopedia",
    name: "Investopedia",
    description: "投资教育和金融知识平台",
    url: "https://www.investopedia.com",
    category: "市场&数据",
  },
  {
    id: "Stock Analysis",
    name: "Stock Analysis",
    description: "股票分析和研究平台，提供详尽的公司财务数据和估值模型、个股新闻、forecasts、recommendation Trends等",
    url: "https://stockanalysis.com/",
    category: "投资分析",
  },
  {
    id: "seeking-alpha",
    name: "Seeking Alpha",
    description: "股票分析和投资观点平台，里面有众多专业投资者的深度分析文章",
    url: "https://seekingalpha.com",
    category: "投资分析",
  },
  {
    id: "us-treasury-yield-curve",
    name: "US Treasury Yield Curve",
    description: "美国国债收益率曲线，反映不同期限国债的收益率变化 & 经济指标之间的关系",
    url: "https://www.ustreasuryyieldcurve.com/charts/treasuries-time-series",
    category: "市场&数据",
  },
  {
    id: "macromicro-us",
    name: "财经M 平方",
    description: "Macromicro 提供的美国宏观经济数据和分析工具，涵盖GDP、就业、通胀等多方面数据",
    url: "https://sc.macromicro.me/collections/51/us-treasury-bond/763/mm-us-bond-index",
    category: "市场&数据",
  },
  {
    id: "fear-and-greed-index",
    name: "恐慌贪婪指数",
    description: "CNN的恐惧与贪婪指数，反映市场情绪的指标",
    url: "https://www.cnn.com/markets/fear-and-greed",
    category: "市场&数据",
  },
  {
    id: "optionstrat",
    name: "OptionStrat",
    description: "提供期权策略盈亏计算和图表工具，帮助投资者可视化不同期权组合的潜在收益和风险",
    url: "https://optionstrat.com/build/long-put",
    category: "期权工具",
  },
  {
    id: "optionistics",
    name: "Optionistics",
    description: "期权数据和分析工具，提供期权链、波动率、策略分析以及期权定价模型",
    url: "https://www.optionistics.com/",
    category: "期权工具",
  },
  {
    id: "optionseducation",
    name: "期权教育学习",
    description: "CBOE 提供的期权教育资源，涵盖基础知识、交易策略和风险管理等内容",
    url: "https://www.optionseducation.org/",
    category: "期权工具",
  },
];
