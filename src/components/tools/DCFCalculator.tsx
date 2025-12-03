'use client';

import { useState, useMemo } from 'react';
import { Info, X, HelpCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function DCFCalculator({ onBack }: { onBack: () => void }) {
  // 1. 输入状态
  const [currentPrice, setCurrentPrice] = useState<number | ''>(164.00); 
  const [fcfPerShare, setFcfPerShare] = useState<number | ''>(5.0);
  const [growthRate5y, setGrowthRate5y] = useState<number | ''>(15);
  const [growthRate10y, setGrowthRate10y] = useState<number | ''>(8);
  const [discountRate, setDiscountRate] = useState<number | ''>(10);
  const [terminalRate, setTerminalRate] = useState<number | ''>(2.5);
  
  // 2. UI 状态
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'result' | 'forecast' | 'visual'>('result');

  // 通用输入处理
  const handleInput = (setter: (val: number | '') => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setter(val === '' ? '' : Number(val));
  };

  // 3. 核心计算逻辑
  const result = useMemo(() => {
    const valCurrentPrice = Number(currentPrice);
    const currentFcf = Number(fcfPerShare);
    const g1 = Number(growthRate5y) / 100;
    const g2 = Number(growthRate10y) / 100;
    const r = Number(discountRate) / 100;
    const tg = Number(terminalRate) / 100;

    let futureFcf = currentFcf;
    let sumPv = 0;
    const yearlyData = []; 

    // 计算前10年
    for (let i = 1; i <= 10; i++) {
      const growth = i <= 5 ? g1 : g2;
      futureFcf = futureFcf * (1 + growth);
      
      const discountFactor = 1 / Math.pow(1 + r, i);
      const pv = futureFcf * discountFactor;
      
      sumPv += pv;
      
      yearlyData.push({ 
        year: i, 
        fcf: futureFcf, 
        discountFactor: discountFactor, 
        pv: pv 
      });
    }

    // 计算终值
    const lastFcf = futureFcf;
    let terminalValue = 0;
    if (r > tg) {
        terminalValue = (lastFcf * (1 + tg)) / (r - tg);
    }

    // 终值折现
    const terminalDiscountFactor = 1 / Math.pow(1 + r, 10);
    const pvTerminal = terminalValue * terminalDiscountFactor;

    // 总价值
    const intrinsicValue = sumPv + pvTerminal;

    // 估值判断
    let valuationStatus = '合理';
    let upside = 0;
    if (valCurrentPrice > 0) {
      upside = (intrinsicValue - valCurrentPrice) / valCurrentPrice;
      if (upside > 0.1) valuationStatus = '低估';
      else if (upside < -0.1) valuationStatus = '高估';
    }

    return {
      intrinsicValue: intrinsicValue.toFixed(2),
      buyZone: (intrinsicValue * 0.7).toFixed(2),
      pv10Years: sumPv.toFixed(2),
      pvTerminal: pvTerminal.toFixed(2),
      terminalValue: terminalValue.toFixed(2),
      terminalDiscountFactor: terminalDiscountFactor.toFixed(4),
      upsidePercent: (upside * 100).toFixed(1),
      valuationStatus,
      isInvalid: r <= tg,
      yearlyData
    };
  }, [fcfPerShare, growthRate5y, growthRate10y, discountRate, terminalRate, currentPrice]);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-sm pb-20">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-violet-600 hover:text-violet-700 font-semibold transition-colors"
      >
        ← 返回工具列表
      </button>

      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 md:p-8">
        
        {/* 头部区域 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                  💰
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">DCF 现金流估值模型</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">两阶段增长模型 (10年 + 永续)</p>
                </div>
            </div>
            
            <button 
                onClick={() => setShowInfo(!showInfo)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    showInfo 
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 ring-2 ring-violet-500/20' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
                {showInfo ? <X size={16} /> : <Info size={16} />}
                {showInfo ? '关闭说明' : '模型原理'}
            </button>
        </div>

        {/* 模型原理说明面板 (恢复详细内容) */}
        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showInfo ? 'max-h-[800px] opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 text-sm text-gray-700 dark:text-gray-300">
                <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-4">
                    <HelpCircle size={18}/> 核心计算逻辑
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900/80 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
                        <h4 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">1</span>
                            高速增长期 (前10年)
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400 text-xs leading-relaxed pl-1">
                            <li><span className="font-semibold text-gray-700 dark:text-gray-300">1-5年：</span>使用输入的 "前5年增长率"</li>
                            <li><span className="font-semibold text-gray-700 dark:text-gray-300">6-10年：</span>使用输入的 "后5年增长率" (通常较低)</li>
                            <li>计算每一年的现金流，并按折现率折算回今天的价值。</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-900/80 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
                        <h4 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">2</span>
                            永续增长期 (10年后)
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-2 text-xs">假设公司第10年后进入成熟期，以 "永续增长率" 无限期增长。</p>
                        <div className="bg-gray-100 dark:bg-black/50 p-2 rounded text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                            终值 = [第10年现金流 × (1 + 永续增长率)] / (折现率 - 永续增长率)
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* 上下布局：上方输入区 */}
        <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 输入组 1 */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">核心数据</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">当前每股 FCF ($)</label>
                            <input type="number" value={fcfPerShare} onChange={handleInput(setFcfPerShare)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">当前股价 ($)</label>
                            <input type="number" value={currentPrice} onChange={handleInput(setCurrentPrice)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                    </div>
                </div>

                {/* 输入组 2 */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">增长假设</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">前5年增长 (%)</label>
                            <input type="number" value={growthRate5y} onChange={handleInput(setGrowthRate5y)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">后5年增长 (%)</label>
                            <input type="number" value={growthRate10y} onChange={handleInput(setGrowthRate10y)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                    </div>
                </div>

                {/* 输入组 3 */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">折现设置</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">折现率 (%)</label>
                            <input type="number" value={discountRate} onChange={handleInput(setDiscountRate)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">永续增长 (%)</label>
                            <input type="number" value={terminalRate} onChange={handleInput(setTerminalRate)} className="w-full p-2.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500/50 outline-none text-black dark:text-white font-mono text-sm transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 上下布局：下方结果展示区 */}
        <div>
            
            {/* Tab 切换器 */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-lg inline-flex">
                    {(['result', 'forecast', 'visual'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-6 py-2 text-sm font-medium rounded-md transition-all duration-200
                                ${activeTab === tab 
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }
                            `}
                        >
                            {tab === 'result' && '估值结果'}
                            {tab === 'forecast' && '现金流预测'}
                            {tab === 'visual' && '可视化分析'}
                        </button>
                    ))}
                </div>
            </div>

            {/* 内容区域 */}
            <div className="min-h-[400px]">
                {result.isInvalid ? (
                    <div className="h-full flex flex-col items-center justify-center p-12 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/50 text-center">
                        <X size={48} className="text-red-500 mb-4" />
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">模型参数无效</p>
                        <p className="text-sm text-red-500 mt-2">折现率 ({discountRate}%) 必须大于 永续增长率 ({terminalRate}%)</p>
                    </div>
                ) : (
                    <>
                        {/* Tab 1: 估值结果 */}
                        {activeTab === 'result' && (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                                {/* 顶部大卡片 */}
                                <div className="bg-[#0f1115] rounded-2xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-center">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium">内在价值</p>
                                            <p className="text-4xl md:text-5xl font-extrabold text-green-400 font-mono tracking-tight break-words">${result.intrinsicValue}</p>
                                        </div>
                                        <div className="md:border-l border-gray-800 pt-6 md:pt-0 border-t md:border-t-0">
                                            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium">当前股价</p>
                                            <p className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight break-words">${Number(currentPrice).toFixed(2)}</p>
                                        </div>
                                        <div className="md:border-l border-gray-800 pt-6 md:pt-0 border-t md:border-t-0">
                                            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium">估值判断</p>
                                            <div className={`text-3xl font-bold flex flex-col items-center justify-center ${result.valuationStatus === '低估' ? 'text-green-400' : 'text-red-400'}`}>
                                                <span>{result.valuationStatus}</span>
                                                <span className="text-lg mt-1 opacity-80 font-mono bg-white/5 px-3 py-1 rounded-full">
                                                    {Number(result.upsidePercent) > 0 ? '+' : ''}{result.upsidePercent}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 底部4格数据 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-[#16181d] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">企业价值 (Enterprise Value)</p>
                                        <p className="text-2xl font-bold text-white font-mono break-words">${result.intrinsicValue}</p>
                                        <p className="text-[10px] text-gray-500 mt-2">*此处即为计算出的每股内在价值</p>
                                    </div>
                                    <div className="bg-[#16181d] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">安全边际价格 (Buy Price)</p>
                                        <p className="text-2xl font-bold text-white font-mono break-words">${result.buyZone}</p>
                                        <p className="text-[10px] text-gray-500 mt-2">预留 30% 安全空间</p>
                                    </div>
                                    <div className="bg-[#16181d] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <p className="text-xs text-violet-400 mb-2 uppercase tracking-wide">终值现值 (Terminal PV)</p>
                                        <p className="text-2xl font-bold text-white font-mono break-words">${result.pvTerminal}</p>
                                        <p className="text-[10px] text-gray-500 mt-2">占比 {((Number(result.pvTerminal) / Number(result.intrinsicValue)) * 100).toFixed(0)}%</p>
                                    </div>
                                    <div className="bg-[#16181d] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <p className="text-xs text-blue-400 mb-2 uppercase tracking-wide">10年现金流现值 (10Y PV)</p>
                                        <p className="text-2xl font-bold text-white font-mono break-words">${result.pv10Years}</p>
                                        <p className="text-[10px] text-gray-500 mt-2">占比 {((Number(result.pv10Years) / Number(result.intrinsicValue)) * 100).toFixed(0)}%</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: 现金流预测 */}
                        {activeTab === 'forecast' && (
                            <div className="overflow-x-auto animate-in fade-in zoom-in-95 duration-300 rounded-xl border border-gray-200 dark:border-gray-800">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">年份</th>
                                            <th className="px-6 py-4 text-right">自由现金流 (FCF)</th>
                                            <th className="px-6 py-4 text-right">折现系数</th>
                                            <th className="px-6 py-4 text-right">现值 (PV)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#0f1115]">
                                        {result.yearlyData.map((row) => (
                                            <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Year {row.year}</td>
                                                <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400 font-mono">${row.fcf.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-right text-gray-500 font-mono">{row.discountFactor.toFixed(4)}</td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-gray-200 font-mono">${row.pv.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        {/* 终值行 */}
                                        <tr className="bg-violet-50/50 dark:bg-violet-900/10 border-t-2 border-violet-100 dark:border-violet-900/30">
                                            <td className="px-6 py-4 font-bold text-violet-700 dark:text-violet-400">终值 (Terminal)</td>
                                            <td className="px-6 py-4 text-right text-gray-500 font-mono">${result.terminalValue}</td>
                                            <td className="px-6 py-4 text-right text-gray-500 font-mono">{result.terminalDiscountFactor}</td>
                                            <td className="px-6 py-4 text-right font-bold text-violet-700 dark:text-violet-400 font-mono">${result.pvTerminal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Tab 3: 可视化分析 */}
                        {activeTab === 'visual' && (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                                
                                {/* 图表 1: 现金流趋势 (SVG 绘制) */}
                                <div className="bg-[#0f1115] p-8 rounded-2xl border border-gray-800">
                                    <h4 className="text-sm font-bold text-gray-400 mb-8 text-center uppercase tracking-wider">自由现金流增长趋势</h4>
                                    <div className="h-64 flex items-end justify-between gap-1 relative px-4">
                                        {/* SVG 连线 */}
                                        <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" preserveAspectRatio="none">
                                            <path 
                                                d={`M0,${100 - (result.yearlyData[0].fcf / result.yearlyData[9].fcf)*80} L${result.yearlyData.map((d, i) => `${(i/9)*100}%,${100 - (d.fcf / result.yearlyData[9].fcf)*80}%`).join(' ')}`}
                                                fill="none" 
                                                stroke="#60a5fa" 
                                                strokeWidth="2"
                                            />
                                            <path 
                                                d={`M0,${100 - (result.yearlyData[0].pv / result.yearlyData[9].fcf)*80} L${result.yearlyData.map((d, i) => `${(i/9)*100}%,${100 - (d.pv / result.yearlyData[9].fcf)*80}%`).join(' ')}`}
                                                fill="none" 
                                                stroke="#34d399" 
                                                strokeWidth="2" 
                                                strokeDasharray="4 4"
                                            />
                                        </svg>

                                        {result.yearlyData.map((data) => (
                                            <div key={data.year} className="relative flex flex-col items-center group z-10 w-full">
                                                {/* 蓝点：FCF */}
                                                <div 
                                                    className="w-3 h-3 rounded-full bg-blue-400 border-2 border-[#0f1115] mb-1 group-hover:scale-150 transition-transform shadow-lg cursor-pointer"
                                                    style={{ marginBottom: `${(data.fcf / result.yearlyData[9].fcf) * 160}px` }} 
                                                ></div>
                                                {/* 绿点：PV */}
                                                <div 
                                                    className="w-3 h-3 rounded-full bg-green-400 border-2 border-[#0f1115] absolute cursor-pointer"
                                                    style={{ bottom: `${(data.pv / result.yearlyData[9].fcf) * 160 + 20}px` }}
                                                ></div>
                                                <span className="text-[10px] text-gray-500 mt-4">Y{data.year}</span>
                                                
                                                {/* Tooltip */}
                                                <div className="absolute bottom-20 opacity-0 group-hover:opacity-100 bg-gray-800 border border-gray-700 text-white text-xs p-3 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-xl transition-opacity">
                                                    <p className="font-bold mb-1 text-gray-400">Year {data.year}</p>
                                                    <p className="text-blue-300">FCF: ${data.fcf.toFixed(1)}</p>
                                                    <p className="text-green-300">PV: ${data.pv.toFixed(1)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-8 mt-8 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                            <span className="text-gray-400">预测现金流 (FCF)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                            <span className="text-gray-400">折现后价值 (PV)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 图表 2: 价值构成 (柱状) */}
                                <div className="bg-[#0f1115] p-8 rounded-2xl border border-gray-800">
                                    <h4 className="text-sm font-bold text-gray-400 mb-8 text-center uppercase tracking-wider">企业价值构成</h4>
                                    <div className="flex justify-center items-end gap-16 h-48">
                                        <div className="w-32 bg-blue-500/80 hover:bg-blue-500 rounded-t-md relative group transition-all cursor-pointer" style={{ height: `${(Number(result.pv10Years)/Number(result.intrinsicValue))*100}%` }}>
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-sm bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${result.pv10Years}</span>
                                            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/90 font-medium">运营现值<br/><span className="opacity-60">{((Number(result.pv10Years)/Number(result.intrinsicValue))*100).toFixed(0)}%</span></div>
                                        </div>
                                        <div className="w-40 bg-violet-500 hover:bg-violet-400 rounded-t-md relative group transition-all cursor-pointer" style={{ height: `${(Number(result.pvTerminal)/Number(result.intrinsicValue))*100}%` }}>
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-sm bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${result.pvTerminal}</span>
                                            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/90 font-medium">终值现值<br/><span className="opacity-60">{((Number(result.pvTerminal)/Number(result.intrinsicValue))*100).toFixed(0)}%</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}