// 导航数据
export interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
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
    id: "interactive-brokers",
    name: "Interactive Brokers",
    description: "全球领先的投资平台，支持美股、期货、加密货币等",
    url: "https://www.interactivebrokers.com",
    category: "美股券商",
  },
  {
    id: "td-ameritrade",
    name: "TD Ameritrade",
    description: "美国主流券商，适合美股投资初学者",
    url: "https://www.tdameritrade.com",
    category: "美股券商",
  },
  {
    id: "webull",
    name: "Webull",
    description: "零佣金美股交易平台，提供24小时交易",
    url: "https://www.webull.com",
    category: "美股券商",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    description: "美国最大的加密货币交易所",
    url: "https://www.coinbase.com",
    category: "加密货币交易所",
  },
  {
    id: "kraken",
    name: "Kraken",
    description: "欧洲领先的加密货币交易所",
    url: "https://www.kraken.com",
    category: "加密货币交易所",
  },
  {
    id: "binance",
    name: "Binance",
    description: "全球最大的加密货币交易所",
    url: "https://www.binance.com",
    category: "加密货币交易所",
  },
  {
    id: "investopedia",
    name: "Investopedia",
    description: "投资教育和金融知识平台",
    url: "https://www.investopedia.com",
    category: "投资教育",
  },
  {
    id: "seeking-alpha",
    name: "Seeking Alpha",
    description: "股票分析和投资观点平台",
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
    category: "美股投资",
  },
  {
    id: "overseas-banking",
    title: "境外银行开户教程",
    description: "境外银行开户教程分享，包含多个国家",
    category: "银行开户",
  },
  {
    id: "broker-account",
    title: "美股券商开户入金教程",
    description: "美股券商开户与入金合集教程分享",
    category: "券商开户",
  },
  {
    id: "hkd-withdrawal",
    title: "港币出金教程",
    description: "多种港币出金方式分享",
    category: "出入金",
  },
  {
    id: "crypto-tutorial",
    title: "加密货币投资教程",
    description: "比特币、以太坊等加密货币投资入门",
    category: "加密货币",
  },
  {
    id: "web3-airdrop",
    title: "Web3空投教程",
    description: "空投项目参与指南和风险防范",
    category: "Web3",
  },
  {
    id: "fund-investment",
    title: "基金投资教程",
    description: "公募基金、ETF基金投资策略",
    category: "基金投资",
  },
  {
    id: "tax-planning",
    title: "美股税务规划",
    description: "美股投资的税务优化和规划建议",
    category: "税务",
  },
];

// 文章数据
export const articles: Article[] = [
  {
    id: "article-1",
    title: "为什么美股值得投资",
    description: "分析美股市场的长期投资价值和优势",
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
    id: "fraud-test",
    name: "推特/电报反诈测试",
    description: "通过15道题目测试你的反诈意识，保护你的钱包",
    features: ["15道题目测试", "实时反馈", "防诈骗指南"],
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
