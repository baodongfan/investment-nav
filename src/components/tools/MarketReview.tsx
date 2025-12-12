'use client';

import { useState, useEffect } from 'react';
import { Globe, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { getRealMarketData } from '@/app/actions'; // 引入 Server Action

export default function MarketReview({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState<'en' | 'zh'>('zh'); // 默认中文
  const [loading, setLoading] = useState(true);
  
  // 初始状态为空，等待数据填充
  const [assets, setAssets] = useState<any[]>([]);
  
  // 这是一个静态的文案占位符，第二阶段我们可以接 OpenAI 来自动生成
  const [summaryData] = useState({
    en: {
      summary: "Markets are fluctuating based on recent economic data. (Real-time AI summary requires OpenAI API key integration in Phase 2).",
      drivers: ["Interest Rate Expectations", "Inflation Data", "Geopolitical Tension"]
    },
    zh: {
      summary: "市场随近期经济数据波动。当前展示的是实时行情数据，但‘市场总结’文字目前仍为静态内容（接入真实新闻总结需在第二阶段对接 OpenAI API）。",
      drivers: ["利率预期变化", "通胀数据发布", "地缘政治局势"]
    }
  });

  // 获取数据的函数
  const fetchData = async () => {
    setLoading(true);
    const res = await getRealMarketData();
    if (res.success && res.data) {
      setAssets(res.data);
    }
    setLoading(false);
  };

  // 组件挂载时调用
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-4 text-violet-600 hover:text-violet-700 font-semibold">← 返回</button>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            🌍 每日市场全貌复盘
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">实时数据</span>
          </h2>
          <div className="flex gap-2">
            <button 
                onClick={fetchData}
                disabled={loading}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                title="刷新数据"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button 
                onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 text-sm font-medium"
            >
                <Globe size={14} /> {lang === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </div>

        {/* 核心资产看板 */}
        {loading ? (
            <div className="text-center py-10 text-gray-400">正在获取全球行情数据...</div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {assets.map((item) => (
                <div key={item.symbol} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-1">{item.name}</p>
                <div className="flex justify-between items-end">
                    <span className="font-mono font-bold text-lg dark:text-white">{item.value}</span>
                    <span className={`text-sm font-medium flex items-center ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                    {item.up ? <ArrowUp size={12}/> : <ArrowDown size={12}/>}
                    {item.change}
                    </span>
                </div>
                </div>
            ))}
            </div>
        )}

        {/* 市场总结 (目前仍是静态，但这部分不影响核心数据的真实性) */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 dark:text-white">📊 市场总结</h3>
          <div className="p-4 bg-violet-50 dark:bg-violet-900/10 rounded-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-violet-500 text-sm">
            {summaryData[lang].summary}
          </div>
        </div>

        {/* 关键驱动因素 */}
        <div>
          <h3 className="text-lg font-bold mb-3 dark:text-white">🔑 关键驱动因素</h3>
          <ul className="space-y-3">
            {summaryData[lang].drivers.map((driver, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">{idx + 1}</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}