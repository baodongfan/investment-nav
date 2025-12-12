'use client';

import { useState, useEffect } from 'react';
import { Globe, ArrowUp, ArrowDown, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { getRealMarketData } from '@/app/actions';

export default function MarketReview({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [assets, setAssets] = useState<any[]>([]);
  const [isMock, setIsMock] = useState(false);
  
  // 动态生成的总结内容
  const [aiSummary, setAiSummary] = useState({
    summary: "",
    drivers: [] as string[]
  });

  // 🤖 核心逻辑：基于规则的“伪 AI”总结生成器
  // 根据行情数据的涨跌，自动生成看起来很专业的分析文案
  const generateSmartSummary = (data: any[]) => {
    if (!data || data.length === 0) return;

    // 1. 提取关键数据 (注意：这里必须与 actions.ts 中的 symbol 对应)
    const spx = data.find((i: any) => i.symbol === '^GSPC');
    const nasdaq = data.find((i: any) => i.symbol === '^IXIC');
    // FMP 黄金代码通常是 GCUSD
    const gold = data.find((i: any) => i.symbol === 'GCUSD'); 
    const bond = data.find((i: any) => i.symbol === '^TNX'); // 10年美债收益率
    
    // 2. 判断市场情绪
    let sentiment = "震荡整理";
    // 简单的判断逻辑，防止空指针
    const spxVal = spx?.changeValue || 0;
    const nasVal = nasdaq?.changeValue || 0;

    if (spxVal > 0.5 && nasVal > 0.5) sentiment = "情绪高涨";
    else if (spxVal < -0.5 && nasVal < -0.5) sentiment = "避险情绪升温";
    else if (spxVal > 0 && nasVal < 0) sentiment = "板块分化";

    // 3. 生成总结文案
    let summaryText = `今日市场整体呈现【${sentiment}】态势。`;
    
    if (spxVal > 0) {
        summaryText += `美股大盘表现稳健，标普500指数上涨 ${spx?.change}，显示多头力量依旧占优。`;
    } else {
        summaryText += `美股大盘承压，标普500指数下跌 ${spx?.change || '0%'}，获利回吐压力显现。`;
    }

    if (bond?.changeValue > 1.0) {
        summaryText += ` 值得注意的是，10年期美债收益率显著上行，可能对高估值科技股构成估值压制。`;
    } else if (bond?.changeValue < -1.0) {
        summaryText += ` 债市收益率回落，为风险资产提供了一定的流动性支撑。`;
    }

    if (gold?.changeValue > 0.5) {
        summaryText += ` 另外，黄金价格持续走强，反映出市场对地缘政治或通胀的潜在担忧。`;
    }

    // 4. 生成驱动因素
    const drivers = [];
    if (Math.abs(bond?.changeValue) > 1) drivers.push("美债收益率剧烈波动");
    if (Math.abs(nasVal) > 1) drivers.push("科技权重股财报/情绪影响");
    if (Math.abs(gold?.changeValue) > 0.5) drivers.push("避险资产配置需求");
    if (drivers.length === 0) drivers.push("宏观经济数据等待期", "市场技术性修复");

    setAiSummary({ summary: summaryText, drivers });
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await getRealMarketData();
      
      // 判断逻辑：只要有 success 且有 data 数组，就视为成功
      if (res.success && res.data) {
        setAssets(res.data);
        setIsMock(!!res.isMock); // 强制转为 boolean
        
        // 获取数据成功后，立即生成总结
        generateSmartSummary(res.data);
      } else {
        // 🔥 修复点：在这里加上 (res as any) 类型断言
        // 因为 TS 推断出 res 类型里没有 error 字段，但运行时可能会有
        setError((res as any).error || '数据获取失败');
      }
    } catch (err) {
      setError('网络请求异常');
    } finally {
      setLoading(false);
    }
  };

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
            {isMock ? (
               <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded" title="API请求失败，当前为演示数据">演示模式</span>
            ) : (
               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">实时数据</span>
            )}
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
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <RefreshCw className="animate-spin mb-2" size={24} />
                <p>正在获取全球行情数据...</p>
            </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 bg-red-50 dark:bg-red-900/10 rounded-xl mb-8">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <p className="text-red-600 font-medium">{error}</p>
                <button onClick={fetchData} className="mt-4 text-sm text-violet-600 hover:underline">重试</button>
            </div>
        ) : (
            <>
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

                {/* 智能生成的市场总结 */}
                <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 dark:text-white flex items-center gap-2">
                    <Sparkles className="text-violet-500" size={18} />
                    市场智能简评
                </h3>
                <div className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-xl text-gray-700 dark:text-gray-300 leading-relaxed border border-violet-100 dark:border-violet-900/30 text-sm shadow-sm">
                    {aiSummary.summary || "正在分析市场数据..."}
                </div>
                </div>

                {/* 动态生成的驱动因素 */}
                <div>
                <h3 className="text-lg font-bold mb-3 dark:text-white">🔑 当前核心驱动</h3>
                <ul className="space-y-3">
                    {aiSummary.drivers.map((driver, idx) => (
                    <li key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-300">{idx + 1}</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{driver}</span>
                    </li>
                    ))}
                </ul>
                </div>
            </>
        )}
      </div>
    </div>
  );
}