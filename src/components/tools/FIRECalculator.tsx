'use client';

import { useState, useMemo } from 'react';

export default function FIRECalculator({ onBack }: { onBack: () => void }) {
  // 修改 1：状态类型允许为空字符串，解决删不掉 0 的问题
  const [annualSpend, setAnnualSpend] = useState<number | ''>(40000);
  const [currentNetWorth, setCurrentNetWorth] = useState<number | ''>(100000);
  const [annualSaving, setAnnualSaving] = useState<number | ''>(20000);
  const [returnRate, setReturnRate] = useState<number | ''>(7);
  const [withdrawalRate, setWithdrawalRate] = useState<number | ''>(4);

  // 修改 2：通用处理函数，空字符串设为 ''，数字则转为 Number 去除前导零
  const handleInput = (setter: (val: number | '') => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setter('');
    } else {
      setter(Number(val));
    }
  };

  const result = useMemo(() => {
    // 计算时，如果为空字符串，则视为 0 进行计算
    const valAnnualSpend = annualSpend === '' ? 0 : annualSpend;
    const valCurrentNetWorth = currentNetWorth === '' ? 0 : currentNetWorth;
    const valAnnualSaving = annualSaving === '' ? 0 : annualSaving;
    const valReturnRate = returnRate === '' ? 0 : returnRate;
    const valWithdrawalRate = withdrawalRate === '' ? 0 : withdrawalRate;

    // 避免除以0
    if (valWithdrawalRate === 0) return { fireNumber: 0, yearsToFreedom: "∞", progress: "0" };

    const fireNumber = valAnnualSpend / (valWithdrawalRate / 100);
    
    let years = 0;
    let current = valCurrentNetWorth;
    
    // 如果还没达到目标，开始计算年份
    if (current < fireNumber) {
       // 简单的防死循环 (例如储蓄太少永远达不到，或者回报率为负，限制最大100年)
       while (current < fireNumber && years < 100) {
           current = current * (1 + valReturnRate / 100) + valAnnualSaving;
           years++;
       }
    }

    return {
        fireNumber: Math.round(fireNumber),
        yearsToFreedom: years >= 100 ? "100+" : years,
        progress: fireNumber > 0 ? Math.min(100, (valCurrentNetWorth / fireNumber) * 100).toFixed(1) : "0"
    };
  }, [annualSpend, currentNetWorth, annualSaving, returnRate, withdrawalRate]);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-violet-600 hover:text-violet-700 font-semibold"
      >
        ← 返回工具列表
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">🔥 FIRE 财富自由规划器</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">预期退休后年支出</label>
                    <input 
                      type="number" 
                      value={annualSpend} 
                      onChange={handleInput(setAnnualSpend)} 
                      className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 outline-none text-black dark:text-white" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">当前净资产</label>
                    <input 
                      type="number" 
                      value={currentNetWorth} 
                      onChange={handleInput(setCurrentNetWorth)} 
                      className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 outline-none text-black dark:text-white" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">每年储蓄投入</label>
                    <input 
                      type="number" 
                      value={annualSaving} 
                      onChange={handleInput(setAnnualSaving)} 
                      className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 outline-none text-black dark:text-white" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">年化回报 (%)</label>
                        <input 
                          type="number" 
                          value={returnRate} 
                          onChange={handleInput(setReturnRate)} 
                          className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md outline-none text-black dark:text-white" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">安全提款率 (%)</label>
                        <input 
                          type="number" 
                          value={withdrawalRate} 
                          onChange={handleInput(setWithdrawalRate)} 
                          className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md outline-none text-black dark:text-white" 
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-orange-100 dark:border-gray-700">
                <div className="mb-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">您的 FIRE 目标金额 (财富自由门槛)</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-orange-400">
                        {result.fireNumber.toLocaleString()}
                    </p>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">当前进度</p>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">{result.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${result.progress}%` }}></div>
                    </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-900/50 rounded-lg border border-orange-100 dark:border-gray-700">
                    <p className="text-center text-gray-700 dark:text-gray-300">
                        按照当前速度，您将在 <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 mx-1">{result.yearsToFreedom}</span> 年后实现财富自由 🎉
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}