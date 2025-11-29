'use client';

import { useState } from 'react';

const tools = [
	{
		id: 'dca',
		name: 'DCA 定投计算器',
		icon: '📈',
		description: '计算定期定额投资的收益和成本平均价',
	},
	{
		id: 'fire',
		name: 'FIRE 财富自由规划器',
		icon: '🔥',
		description: '计算达到财务自由所需的时间和目标金额',
	},
	{
		id: 'portfolio',
		name: '投资组合分析',
		icon: '💼',
		description: '分析和优化你的投资组合配置',
	},
	{
		id: 'screener',
		name: '美股筛选器',
		icon: '🔍',
		description: '按照基本面和技术面指标筛选美股',
	},
	{
		id: 'fraud',
		name: '诈骗账号检测',
		icon: '🔐',
		description: '检测推特/电报账号是否存在诈骗风险',
	},
	{
		id: 'crypto',
		name: '加密资产追踪',
		icon: '🪙',
		description: '实时追踪和分析你的加密投资组合',
	},
];

export default function ToolsPage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 pt-20 md:pt-8">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-4xl font-bold mb-2">投资工具</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					使用这些工具更好地规划和分析你的投资
				</p>

				{/* 工具卡片网格 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{tools.map((tool) => (
						<div
							key={tool.id}
							className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition"
						>
							<div className="text-4xl mb-3">{tool.icon}</div>
							<h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
								{tool.description}
							</p>
							<button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">
								即将上线 →
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
