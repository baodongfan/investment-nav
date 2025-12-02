'use client';

import { useState, useEffect } from 'react';

export default function DCACalculator({ onBack }: { onBack: () => void }) {
  // 修改：状态类型允许为空字符串，解决删不掉 0 的问题
  const [initial, setInitial] = useState<number | ''>(10000);
  const [monthly, setMonthly] = useState<number | ''>(2000);
  const [years, setYears] = useState<number | ''>(10);
  const [rate, setRate] = useState<number | ''>(8);
  const [result, setResult] = useState({ totalInvested: 0, totalValue: 0, profit: 0 });

  useEffect(() => {
    // 辅助函数：将输入转换为数字，如果是空字符串则视为 0
    const valInitial = Number(initial);
    const valMonthly = Number(monthly);
    const valYears = Number(years);
    const valRate = Number(rate);

    const months = valYears * 12;
    const monthlyRate = valRate / 100 / 12;
    let futureValue = valInitial * Math.pow(1 + monthlyRate, months);
    
    if (monthlyRate > 0) {
        futureValue += valMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
        futureValue += valMonthly * months;
    }

    const totalInvested = valInitial + (valMonthly * months);
    
    setResult({
      totalInvested: Math.round(totalInvested),
      totalValue: Math.round(futureValue),
      profit: Math.round(futureValue - totalInvested)
    });
  }, [initial, monthly, years, rate]);

  // 通用处理函数
  const handleInput = (setter: (val: number | '') => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setter('');
    } else {
      // 防止前导 0 (例如输入 "05")，虽然 Number() 会自动处理，但这样更稳健
      setter(Number(val));
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-violet-600 hover:text-violet-700 font-semibold"
      >
        ← 返回工具列表
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">📈 DCA 定投复利计算器</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 输入区域 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">初始投入金额 (USD/CNY)</label>
              <input 
                type="number" 
                value={initial} 
                onChange={handleInput(setInitial)} 
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black dark:text-white" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">每月定投金额</label>
              <input 
                type="number" 
                value={monthly} 
                onChange={handleInput(setMonthly)} 
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black dark:text-white" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">预期年化收益率 (%)</label>
              <input 
                type="number" 
                value={rate} 
                onChange={handleInput(setRate)} 
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black dark:text-white" 
              />
              <p className="text-xs text-gray-500 mt-1">参考：标普500历史平均约 8-10%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">定投时长 (年)</label>
              <input 
                type="number" 
                value={years} 
                onChange={handleInput(setYears)} 
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black dark:text-white" 
              />
            </div>
          </div>

          {/* 结果区域 */}
          <div className="bg-violet-50 dark:bg-slate-800/50 rounded-xl p-6 flex flex-col justify-center space-y-6">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">总投入本金</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalInvested.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">投资收益</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">+{result.profit.toLocaleString()}</p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">期末总资产</p>
                <p className="text-4xl font-extrabold text-violet-600 dark:text-violet-400">{result.totalValue.toLocaleString()}</p>
            </div>
            
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                <div className="h-full bg-gray-400 dark:bg-gray-500" style={{ width: result.totalValue > 0 ? `${(result.totalInvested / result.totalValue) * 100}%` : '0%' }}></div>
                <div className="h-full bg-violet-500" style={{ width: result.totalValue > 0 ? `${(result.profit / result.totalValue) * 100}%` : '0%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
                <span>本金 {result.totalValue > 0 ? `(${(result.totalInvested / result.totalValue * 100).toFixed(1)}%)` : ''}</span>
                <span>复利收益 {result.totalValue > 0 ? `(${(result.profit / result.totalValue * 100).toFixed(1)}%)` : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}