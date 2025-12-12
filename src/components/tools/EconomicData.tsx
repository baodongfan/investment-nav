'use client';

import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export default function EconomicData({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState<'1y'|'3y'|'5y'>('3y');
  const [indicator, setIndicator] = useState('unemployment');

  // 模拟数据 (US Unemployment Rate trend)
  const dataPoints = [3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3]; // 模拟上升趋势

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-4 text-violet-600 hover:text-violet-700 font-semibold">← 返回</button>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
          📈 全球经济数据查询
        </h2>

        {/* 筛选器 */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select 
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm font-medium focus:ring-2 focus:ring-violet-500 outline-none"
          >
            <option value="unemployment">🇺🇸 美国失业率 (U3)</option>
            <option value="cpi">🇺🇸 美国通胀率 (CPI)</option>
            <option value="pmi">🇨🇳 中国制造业 PMI</option>
          </select>

          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['1y', '3y', '5y'].map((t) => (
              <button
                key={t}
                onClick={() => setPeriod(t as any)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  period === t 
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                近{t === '1y' ? '一年' : t === '3y' ? '三年' : '五年'}
              </button>
            ))}
          </div>
        </div>

        {/* 图表区域 */}
        <div className="h-64 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 p-6 flex items-end justify-between gap-2 relative mb-6">
          <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono">TREND VISUALIZATION</div>
          {dataPoints.map((val, idx) => (
            <div key={idx} className="w-full bg-violet-200 dark:bg-violet-900/40 rounded-t-sm relative group hover:bg-violet-400 transition-colors" style={{ height: `${val * 15}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {val}%
              </div>
            </div>
          ))}
        </div>

        {/* 智能解读 */}
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-5">
          <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
            💡 深度解读
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            数据显示，美国失业率在过去{period === '3y' ? '三' : '几'}年呈现<span className="font-bold text-red-500">持续攀升</span>态势。
            当前经济数据表现出“摇摇欲坠，岌岌可危”的特征（萨姆规则预警），这通常暗示美联储的紧缩周期已对劳动力市场造成实质性损害，市场可能即将迎来货币政策的重大转机（Pivot）。建议关注防御性板块及国债配置。
          </p>
        </div>
      </div>
    </div>
  );
}