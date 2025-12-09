// 导航数据
export interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon?: string; // 问号代表可选，不填就显示默认：网站图标URL
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  content?: string;  // 新增：站内文章内容
  date?: string;  // 新增：发布日期
  author?: string; // 新增：作者
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  features: string[];
  url?: string;
  isFree: boolean;
}




// 网站聚合数据
export const websites: Website[] = [
  {
    id: "ivolatility 周观",
    name: "Ivolatility 周观",
    description: "Ivolatility 每周市场分析与投资策略, 包含期权组合建议",
    url: "https://www.ivolatility.com/news",
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
    id: "etfreplay",
    name: "ETF Replay",
    description: "ETF 回测和分析工具，帮助投资者评估ETF的历史表现和风险",
    url: "https://www.etfreplay.com/",
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

// 教程数据
export const tutorials: Tutorial[] = [

  {
    id: "tiger-college",
    title: "老虎学堂",
    description: "老虎证券官方投资教程，涵盖美股、港股、基金等多方面内容",
    category: "港美股投资",
    url: "https://www.laohu8.com/college",
  },

];

// 文章数据
export const articles: Article[] = [
  {
    id: "chuizhi_futu",
    title: "4种垂直价差期权策略详解",
    description: "垂直价差可以作为从基础期权策略进阶的桥梁",
    url: "https://www.futunn.com/learn/detail-bullish-options-spread-in-a-bull-market-77651-230382091",
    category: "期权策略",
  },
  
];

// 投资工具数据
export const tools: Tool[] = [
  {
    id: "finviz-screener",
    name: "美股筛选器",
    description: "自定义程度高，功能强大的美股筛选工具，根据多种条件筛选股票",
    features: ["实时反馈", "多条件筛选"],
    url: "https://finviz.com/screener.ashx",
    isFree: true,
  },
  {
    id: "dca-calculator",
    name: "DCA定投计算器",
    description: "计算定期定额投资的复合收益",
    features: ["复合计算", "可视化图表", "多币种支持"],
    isFree: true,
  },
  {
    id: "dcf-valuation",
    name: "DCF现金流估值模型",
    description: "基于折现现金流模型进行企业估值，计算股票内在价值",
    features: ["现金流预测", "敏感性分析", "估值对标"],
    isFree: true,
  },
  {
    id: "stock-screener",
    name: "美股筛选器",
    description: "根据多维度条件筛选美股",
    features: ["PE/PB筛选", "增长率分析", "行业分类"],
    isFree: true,
  },
  {
    id: "fire-calculator",
    name: "FIRE财富自由规划器",
    description: "计算达到财务自由需要的时间和资金",
    features: ["自动计算", "场景模拟", "目标追踪"],
    isFree: true,
  },
  {
    id: "crypto-portfolio",
    name: "加密货币投资组合追踪",
    description: "跟踪和分析你的加密资产配置",
    features: ["实时行情", "收益统计", "配置分析"],
    isFree: true,
  },
];
