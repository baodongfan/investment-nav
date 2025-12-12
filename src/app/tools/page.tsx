'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DCACalculator from '@/components/tools/DCACalculator';
import FIRECalculator from '@/components/tools/FIRECalculator';
import DCFCalculator from '@/components/tools/DCFCalculator';
import MarketReview from '@/components/tools/MarketReview'; // 新增
import MacroSimulator from '@/components/tools/MacroSimulator'; // 新增
import EconomicData from '@/components/tools/EconomicData'; // 新增
import MarketValuation from '@/components/tools/MarketValuation'; // 新增
import SafetyMargin from '@/components/tools/SafetyMargin'; // 新增

const toolsList = [
  // --- 原有工具 ---
  {
    id: 'dca',
    name: 'DCA 定投计算器',
    icon: '📈',
    description: '计算定期定额投资的复利效应，可视化的展示长期投资的巨大威力。',
    active: true,
  },
  {
    id: 'fire',
    name: 'FIRE 财富自由规划器',
    icon: '🔥',
    description: '基于4%法则，计算你需要多少资金才能实现财富自由，以及需要积累的时间。',
    active: true,
  },
  {
    id: 'dcf',
    name: 'DCF 现金流估值模型',
    icon: '💰',
    description: '基于未来现金流折现法计算股票的内在价值，华尔街最常用的估值模型。',
    active: true,
  },
  // --- 新增工具 ---
  {
    id: 'market-review',
    name: '每日市场复盘',
    icon: '🌍',
    description: '美股、港股、A股每日行情综述，关键驱动因素解析，支持一键翻译。',
    active: true,
  },
  {
    id: 'macro-sim',
    name: '宏观情景推演',
    icon: '🎲',
    description: '输入降息、通胀等宏观参数，AI 推演各大类资产的潜在表现。',
    active: true,
  },
  {
    id: 'econ-data',
    name: '经济数据查询',
    icon: '📊',
    description: '查询失业率、通胀率、PMI等关键指标趋势，附带萨姆规则衰退预警。',
    active: true,
  },
  {
    id: 'market-valuation',
    name: '市场估值温度计',
    icon: '⚖️',
    description: '查看标普500、恒生指数等主要股指当前估值在历史长河中的分位点。',
    active: true,
  },
  {
    id: 'safety-margin',
    name: '个股安全边际评估',
    icon: '🛡️',
    description: '输入股价、EPS、ROE等参数，快速评估企业的投资安全边际与风险。',
    active: true,
  },
  {
    id: 'qa-bot',
    name: 'AI 投资问答',
    icon: '🤖',
    description: '集成式投资问答系统，随时解答您的金融困惑。(开发中)',
    active: false, // 暂时标记为开发中
  },
];

export default function ToolsPage() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'dca': return <DCACalculator onBack={() => setActiveToolId(null)} />;
      case 'fire': return <FIRECalculator onBack={() => setActiveToolId(null)} />;
      case 'dcf': return <DCFCalculator onBack={() => setActiveToolId(null)} />;
      // 新增渲染逻辑
      case 'market-review': return <MarketReview onBack={() => setActiveToolId(null)} />;
      case 'macro-sim': return <MacroSimulator onBack={() => setActiveToolId(null)} />;
      case 'econ-data': return <EconomicData onBack={() => setActiveToolId(null)} />;
      case 'market-valuation': return <MarketValuation onBack={() => setActiveToolId(null)} />;
      case 'safety-margin': return <SafetyMargin onBack={() => setActiveToolId(null)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navigation />
      
      <div className="py-24 px-4">
        {activeToolId ? (
            renderActiveTool()
        ) : (
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Micro Seal 金融工具箱</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        从宏观推演到个股估值，全方位辅助您的投资决策。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toolsList.map((tool) => (
                        <div
                            key={tool.id}
                            onClick={() => tool.active && setActiveToolId(tool.id)}
                            className={`
                                relative group overflow-hidden rounded-2xl border p-8 transition-all duration-300
                                ${tool.active 
                                    ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 cursor-pointer hover:border-violet-500/50 dark:hover:border-violet-500/50' 
                                    : 'bg-gray-100 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-70 cursor-not-allowed grayscale'}
                            `}
                        >
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                            <h3 className="font-bold text-xl mb-3 text-black dark:text-white">{tool.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 h-12 line-clamp-2">
                                {tool.description}
                            </p>
                            
                            <div className="flex items-center text-sm font-semibold">
                                {tool.active ? (
                                    <span className="text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                                        立即使用 →
                                    </span>
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-600 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-xs">
                                        开发中
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}