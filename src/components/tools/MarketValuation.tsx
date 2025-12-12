'use client';

import { useState } from 'react';

export default function MarketValuation({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState('spx');

  // 模拟数据
  const valuations = {
    spx: { name: '标普 500 (S&P 500)', percentile: 84.96, pe: 24.5, status: '偏高' },
    hsce: { name: '恒生指数 (HSI)', percentile: 12.30, pe: 8.2, status: '极低估' },
    csi300: { name: '沪深 300', percentile: 15.60, pe: 10.8, status: '低估' },
  };

  const current = valuations[index as keyof typeof valuations];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-4 text-violet-600 hover:text-violet-700 font-semibold">← 返回</button>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">⚖️ 市场估值温度计</h2>

        <div className="flex justify-center mb-10">
          <select 
            value={index} 
            onChange={(e) => setIndex(e.target.value)}
            className="text-lg font-bold p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-r-8 border-transparent focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
          >
            <option value="spx">🇺🇸 标普 500 指数</option>
            <option value="hsce">🇭🇰 香港恒生指数</option>
            <option value="csi300">🇨🇳 沪深 300 指数</option>
          </select>
        </div>

        {/* 仪表盘可视化 */}
        <div className="relative h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden max-w-2xl mx-auto">
          {/* 渐变背景：绿(低估) -> 黄(合理) -> 红(高估) */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 opacity-80"></div>
          
          {/* 指针 */}
          <div 
            className="absolute top-0 bottom-0 w-2 bg-white border-2 border-black shadow-lg transition-all duration-1000 ease-out"
            style={{ left: `${current.percentile}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 max-w-2xl mx-auto mb-8 font-mono">
          <span>0% (极度便宜)</span>
          <span>50% (合理)</span>
          <span>100% (极度泡沫)</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 text-xs uppercase mb-1">当前分位点</p>
            <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{current.percentile}%</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 text-xs uppercase mb-1">市盈率 (PE-TTM)</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{current.pe}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 text-xs uppercase mb-1">估值评价</p>
            <p className={`text-3xl font-bold ${current.percentile > 80 ? 'text-red-500' : current.percentile < 20 ? 'text-green-500' : 'text-yellow-600'}`}>
              {current.status}
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 max-w-xl mx-auto">
          含义：在过去十年中，约 <span className="font-bold text-gray-800 dark:text-gray-200">{current.percentile.toFixed(0)}%</span> 的时间段内该指数比现在更便宜。
          {current.percentile > 80 && " 当前市场估值明显偏高，存在回调风险，建议谨慎追高。"}
          {current.percentile < 20 && " 当前市场处于历史底部区域，具有较高的长期投资安全边际。"}
        </div>
      </div>
    </div>
  );
}