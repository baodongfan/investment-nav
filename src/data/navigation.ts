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
    category: "市场分析",
  },
  {
    id: "Daily Chartbook",
    name: "Daily Chartbook",
    description: "每天更新的市场图表和技术分析，免费也够用，付费可以看更多",
    url: "https://www.dailychartbook.com/",
    category: "市场分析",
  },
  {
    id: "ETF Database",
    name: "ETF Database",
    description: "ETF 数据库，提供全面的ETF信息和筛选工具",
    url: "https://etfdb.com/",
    category: "美股投资",
  },
  {
    id: "ETF Overlap Tool",
    name: "ETF Overlap Tool",
    description: "ETF 分析，重叠度查询工具，对比不同ETF的持仓重叠情况",
    url: "https://www.etfrc.com/funds/overlap.php",
    category: "美股投资",
  },
  {
    id: "finviz-screener",
    name: "Finviz Screener",
    description: "强大的美股筛选工具，根据多种条件筛选股票，网站还有丰富的市场新闻和分析及热力图",
    url: "https://finviz.com/screener.ashx",
    category: "美股投资",
  },
  
  {
    id: "investopedia",
    name: "Investopedia",
    description: "投资教育和金融知识平台",
    url: "https://www.investopedia.com",
    category: "投资教育",
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
];

// 教程数据
export const tutorials: Tutorial[] = [
  {
    id: "us-stocks-guide",
    title: "美股投资教程",
    description: "美股指数基金、ETF、个股投资实战",
    url: "https://www.investmentnav.com/us-stocks-guide",
    category: "美股投资",
  },

  {
    id: "fund-investment",
    title: "基金投资教程",
    description: "公募基金、ETF基金投资策略",
    category: "基金投资",
  },

];

// 文章数据
export const articles: Article[] = [
  {
    id: "article-1",
    title: "为什么美股值得投资",
    description: "分析美股市场的长期投资价值和优势",
    url: "",
    category: "市场分析",
  },
  {
    id: "article-2",
    title: "DCA定投策略深度解析",
    description: "定期定额投资的科学性和实战指南",
    category: "投资策略",
  },
  {
    id: "article-3",
    title: "比特币作为资产配置的价值",
    description: "加密货币在投资组合中的角色",
    category: "加密货币",
  },
  {
    id: "article-4",
    title: "FIRE财务自由运动指南",
    description: "通过投资实现财务自由的方法论",
    category: "财务规划",
  },
  {
    id: "article-5",
    title: "新手必读：股票估值方法",
    description: "DCF估值、PE估值等基础知识",
    category: "投资基础",
  },
  {
    id: "article-6",
    title: "如何识别和避免投资诈骗",
    description: "加密货币领域的常见骗局和防范措施",
    category: "风险管理",
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
