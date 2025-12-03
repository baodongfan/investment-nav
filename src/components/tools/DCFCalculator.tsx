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
      terminalValue: terminalValue.toFixed(2), // 终值未来值
      terminalDiscountFactor: terminalDiscountFactor.toFixed(4),
      upsidePercent: (upside * 100).toFixed(1),
      valuationStatus,
      isInvalid: r <= tg,
      yearlyData
    };
  }, [fcfPerShare, growthRate5y, growthRate10y, discountRate, terminalRate, currentPrice]);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-sm">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-violet-600 hover:text-violet-700 font-semibold transition-colors"
      >
        ← 返回工具列表
      </button>

      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-6">
        
        {/* 头部区域 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-xl">
                  💰
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">DCF 现金流估值模型</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">两阶段增长模型 (10年 + 永续)</p>
                </div>
            </div>
            
            <button 
                onClick={() => setShowInfo(!showInfo)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    showInfo 
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
                {showInfo ? <X size={14} /> : <Info size={14} />}
                {showInfo ? '关闭说明' : '模型原理'}
            </button>
        </div>

        {/* 原理说明面板 (折叠) */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showInfo ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 text-xs text-gray-700 dark:text-gray-300">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                    <HelpCircle size={14}/> 计算公式
                </h3>
                <p>内在价值 = 未来10年现金流现值总和 + 终值现值</p>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    * 终值 (Terminal Value) 使用戈登增长模型计算：TV = [第10年FCF × (1 + 永续增长率)] / (折现率 - 永续增长率)
                </p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 左侧：精简输入区 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 输入组 1 */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">核心数据</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">当前每股 FCF ($)</label>
                        <input type="number" value={fcfPerShare} onChange={handleInput(setFcfPerShare)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">当前股价 ($)</label>
                        <input type="number" value={currentPrice} onChange={handleInput(setCurrentPrice)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                </div>
            </div>

            {/* 输入组 2 */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">增长假设</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">前5年增长 (%)</label>
                        <input type="number" value={growthRate5y} onChange={handleInput(setGrowthRate5y)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">后5年增长 (%)</label>
                        <input type="number" value={growthRate10y} onChange={handleInput(setGrowthRate10y)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                </div>
            </div>

            {/* 输入组 3 */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">折现设置</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">折现率 (%)</label>
                        <input type="number" value={discountRate} onChange={handleInput(setDiscountRate)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">永续增长 (%)</label>
                        <input type="number" value={terminalRate} onChange={handleInput(setTerminalRate)} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-violet-500 outline-none text-black dark:text-white font-mono text-sm" />
                    </div>
                </div>
            </div>
          </div>

          {/* 右侧：Tab 结果展示 */}
          <div className="lg:col-span-8">
            
            {/* Tab 切换器 */}
            <div className="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-800">
                {(['result', 'forecast', 'visual'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-4 py-2 text-xs font-bold transition-all duration-200 border-b-2
                            ${activeTab === tab 
                                ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }
                        `}
                    >
                        {tab === 'result' && '估值结果'}
                        {tab === 'forecast' && '现金流预测'}
                        {tab === 'visual' && '可视化分析'}
                    </button>
                ))}
            </div>

            {/* 内容区域 */}
            <div className="min-h-[400px]">
                {result.isInvalid ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/50 text-center">
                        <X size={32} className="text-red-500 mb-2" />
                        <p className="font-bold text-red-600 dark:text-red-400">模型参数无效</p>
                        <p className="text-xs text-red-500 mt-1">折现率 ({discountRate}%) 必须大于 永续增长率 ({terminalRate}%)</p>
                    </div>
                ) : (
                    <>
                        {/* Tab 1: 估值结果 (参考图 f32dfa.png) */}
                        {activeTab === 'result' && (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                {/* 顶部大卡片 */}
                                <div className="bg-[#0f1115] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full"></div>
                                    <div className="grid grid-cols-3 gap-4 relative z-10 text-center">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">内在价值</p>
                                            <p className="text-3xl font-bold text-green-400 font-mono">${result.intrinsicValue}</p>
                                        </div>
                                        <div className="border-l border-gray-800">
                                            <p className="text-xs text-gray-400 mb-1">当前股价</p>
                                            <p className="text-3xl font-bold text-white font-mono">${Number(currentPrice).toFixed(2)}</p>
                                        </div>
                                        <div className="border-l border-gray-800">
                                            <p className="text-xs text-gray-400 mb-1">估值判断</p>
                                            <div className={`text-xl font-bold ${result.valuationStatus === '低估' ? 'text-green-400' : 'text-red-400'}`}>
                                                {result.valuationStatus}
                                                <span className="text-sm ml-1 opacity-80">
                                                    {Number(result.upsidePercent) > 0 ? '+' : ''}{result.upsidePercent}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 底部4格数据 (参考图布局) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#16181d] p-4 rounded-xl border border-gray-800">
                                        <p className="text-xs text-gray-400 mb-1">企业价值 (Enterprise Value)</p>
                                        <p className="text-xl font-bold text-white font-mono">${result.intrinsicValue}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">*此处即为计算出的每股内在价值</p>
                                    </div>
                                    <div className="bg-[#16181d] p-4 rounded-xl border border-gray-800">
                                        <p className="text-xs text-gray-400 mb-1">安全边际价格 (Buy Price)</p>
                                        <p className="text-xl font-bold text-white font-mono">${result.buyZone}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">预留 30% 安全空间</p>
                                    </div>
                                    <div className="bg-[#16181d] p-4 rounded-xl border border-gray-800">
                                        <p className="text-xs text-violet-400 mb-1">终值现值 (Terminal PV)</p>
                                        <p className="text-xl font-bold text-white font-mono">${result.pvTerminal}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">占比 {((Number(result.pvTerminal) / Number(result.intrinsicValue)) * 100).toFixed(0)}%</p>
                                    </div>
                                    <div className="bg-[#16181d] p-4 rounded-xl border border-gray-800">
                                        <p className="text-xs text-blue-400 mb-1">10年现金流现值 (10Y PV)</p>
                                        <p className="text-xl font-bold text-white font-mono">${result.pv10Years}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">占比 {((Number(result.pv10Years) / Number(result.intrinsicValue)) * 100).toFixed(0)}%</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: 现金流预测 (参考图 f2d7dd.png) */}
                        {activeTab === 'forecast' && (
                            <div className="overflow-x-auto animate-in fade-in zoom-in-95 duration-300 rounded-xl border border-gray-200 dark:border-gray-800">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                        <tr>
                                            <th className="px-4 py-3">年份</th>
                                            <th className="px-4 py-3 text-right">自由现金流 (FCF)</th>
                                            <th className="px-4 py-3 text-right">折现系数</th>
                                            <th className="px-4 py-3 text-right">现值 (PV)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#0f1115]">
                                        {result.yearlyData.map((row) => (
                                            <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">Year {row.year}</td>
                                                <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 font-mono">${row.fcf.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-500 font-mono">{row.discountFactor.toFixed(4)}</td>
                                                <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-gray-200 font-mono">${row.pv.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        {/* 终值行 */}
                                        <tr className="bg-violet-50/50 dark:bg-violet-900/10 border-t-2 border-violet-100 dark:border-violet-900/30">
                                            <td className="px-4 py-3 font-bold text-violet-700 dark:text-violet-400">终值 (Terminal)</td>
                                            <td className="px-4 py-3 text-right text-gray-500 font-mono">${result.terminalValue}</td>
                                            <td className="px-4 py-3 text-right text-gray-500 font-mono">{result.terminalDiscountFactor}</td>
                                            <td className="px-4 py-3 text-right font-bold text-violet-700 dark:text-violet-400 font-mono">${result.pvTerminal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Tab 3: 可视化分析 (参考图 f2d4f6.png) */}
                        {activeTab === 'visual' && (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                                
                                {/* 图表 1: 现金流趋势 (SVG 绘制) */}
                                <div className="bg-[#0f1115] p-6 rounded-xl border border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-400 mb-6 text-center">自由现金流增长趋势</h4>
                                    <div className="h-48 flex items-end justify-between gap-1 relative px-2">
                                        {/* 简单的 SVG 连线 (装饰用) */}
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
                                                    className="w-2 h-2 rounded-full bg-blue-400 border border-black mb-1 group-hover:scale-150 transition-transform"
                                                    style={{ marginBottom: `${(data.fcf / result.yearlyData[9].fcf) * 120}px` }} 
                                                ></div>
                                                {/* 绿点：PV */}
                                                <div 
                                                    className="w-2 h-2 rounded-full bg-green-400 border border-black absolute"
                                                    style={{ bottom: `${(data.pv / result.yearlyData[9].fcf) * 120 + 20}px` }}
                                                ></div>
                                                <span className="text-[10px] text-gray-500 mt-2">Y{data.year}</span>
                                                
                                                {/* Tooltip */}
                                                <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-[10px] p-2 rounded pointer-events-none whitespace-nowrap z-20">
                                                    FCF: ${data.fcf.toFixed(1)}<br/>PV: ${data.pv.toFixed(1)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-6 mt-4 text-[10px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                            <span className="text-gray-400">预测现金流</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            <span className="text-gray-400">折现后价值 (PV)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 图表 2: 价值构成 (柱状) */}
                                <div className="bg-[#0f1115] p-6 rounded-xl border border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-400 mb-6 text-center">企业价值构成</h4>
                                    <div className="flex justify-center items-end gap-12 h-32">
                                        <div className="w-24 bg-blue-500/80 hover:bg-blue-500 rounded-t-sm relative group transition-all" style={{ height: `${(Number(result.pv10Years)/Number(result.intrinsicValue))*100}%` }}>
                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold text-xs">${result.pv10Years}</span>
                                            <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/80">运营现值</div>
                                        </div>
                                        <div className="w-32 bg-blue-500 hover:bg-blue-400 rounded-t-sm relative group transition-all" style={{ height: `${(Number(result.pvTerminal)/Number(result.intrinsicValue))*100}%` }}>
                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold text-xs">${result.pvTerminal}</span>
                                            <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/80">终值现值</div>
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
    </div>
  );
}