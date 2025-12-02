'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DCACalculator from '@/components/tools/DCACalculator';
import FIRECalculator from '@/components/tools/FIRECalculator';

const toolsList = [
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
    id: 'screener',
    name: '美股筛选器',
    icon: '🔍',
    description: '按照基本面和技术面指标筛选美股（建议使用 finviz）。',
    active: false,
  },
  {
    id: 'crypto',
    name: '加密资产追踪',
    icon: '🪙',
    description: '实时追踪和分析你的加密投资组合。',
    active: false,
  },
];

export default function ToolsPage() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // 渲染当前激活的工具组件
  const renderActiveTool = () => {
    switch (activeToolId) {
        case 'dca':
            return <DCACalculator onBack={() => setActiveToolId(null)} />;
        case 'fire':
            return <FIRECalculator onBack={() => setActiveToolId(null)} />;
        default:
            return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navigation />
      
      <div className="py-24 px-4">
        {activeToolId ? (
            // 显示具体的工具
            renderActiveTool()
        ) : (
            // 显示工具列表
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">实用投资工具</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        工欲善其事，必先利其器。这些工具将辅助你做出更理性的投资决策。
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
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
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