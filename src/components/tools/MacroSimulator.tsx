'use client';

import { useState } from 'react';
import { Play, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MacroSimulator({ onBack }: { onBack: () => void }) {
  const [ratePolicy, setRatePolicy] = useState('cut_25');
  const [inflation, setInflation] = useState('high');
  const [employment, setEmployment] = useState('expected');
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = () => {
    setSimulating(true);
    // 模拟 AI 推演延迟
    setTimeout(() => {
      setSimulating(false);
      setResult({
        summary: "在此情景下（降息25BP + 通胀超预期），市场可能担忧‘滞胀’风险，但降息实质利好风险资产。",
        assets: [
          { name: '美元指数', prediction: '表现最差', trend: 'down', desc: '利差缩窄导致美元吸引力下降' },
          { name: '黄金', prediction: '表现强劲', trend: 'up', desc: '实际利率下降与抗通胀需求双重驱动' },
          { name: '美股', prediction: '震荡上行', trend: 'up', desc: '分母端压力减轻，但需关注通胀粘性' },
          { name: '港股', prediction: '温和反弹', trend: 'up', desc: '流动性压力缓解' },
          { name: '美债', prediction: '中性偏好', trend: 'flat', desc: '降息利好被通胀隐忧部分抵消' },
        ]
      });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-4 text-violet-600 hover:text-violet-700 font-semibold">← 返回</button>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* 左侧：控制面板 */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm h-full">
            <h2 className="text-xl font-bold mb-6 dark:text-white">🎲 情景参数设定</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">货币政策</label>
                <select value={ratePolicy} onChange={(e) => setRatePolicy(e.target.value)} className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
                  <option value="cut_25">降息 25 BP</option>
                  <option value="cut_50">降息 50 BP</option>
                  <option value="hold">维持利率不变</option>
                  <option value="hike">加息 25 BP</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">通胀数据 (CPI)</label>
                <select value={inflation} onChange={(e) => setInflation(e.target.value)} className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
                  <option value="expected">符合预期</option>
                  <option value="high">小幅超预期 (利空)</option>
                  <option value="low">大幅回落 (利好)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">非农就业</label>
                <select value={employment} onChange={(e) => setEmployment(e.target.value)} className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
                  <option value="expected">符合预期</option>
                  <option value="strong">强劲 (经济过热)</option>
                  <option value="weak">疲软 (衰退担忧)</option>
                </select>
              </div>

              <button 
                onClick={handleSimulate}
                disabled={simulating}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {simulating ? 'AI 推演中...' : <><Play size={18} fill="currentColor" /> 开始推演</>}
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：推演结果 */}
        <div className="md:col-span-2">
          {result ? (
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm h-full animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
                🤖 AI 推演结论
                <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-0.5 rounded-full">已生成</span>
              </h3>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {result.summary}
              </div>

              <div className="space-y-3">
                {result.assets.map((asset: any) => (
                  <div key={asset.name} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center 
                        ${asset.trend === 'up' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                          asset.trend === 'down' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 
                          'bg-gray-100 text-gray-500'}`}>
                        {asset.trend === 'up' ? <TrendingUp size={18} /> : asset.trend === 'down' ? <TrendingDown size={18} /> : <Minus size={18} />}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">{asset.name}</div>
                        <div className="text-xs text-gray-500">{asset.desc}</div>
                      </div>
                    </div>
                    <div className={`font-semibold text-sm ${asset.trend === 'up' ? 'text-red-500' : asset.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                      {asset.prediction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <div className="text-6xl mb-4">🔮</div>
              <p>请在左侧设置宏观参数<br/>点击“开始推演”查看资产表现预测</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}