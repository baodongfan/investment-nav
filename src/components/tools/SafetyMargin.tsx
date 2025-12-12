'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, FileText, Search, Loader2 } from 'lucide-react';
import { getStockFundamentals } from '@/app/actions'; // 引入 Server Action

export default function SafetyMargin({ onBack }: { onBack: () => void }) {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    price: 0,
    eps: 0,
    roe: 0,
    growth: 0,
    bookValue: 0,
    cashFlow: 0
  });
  
  const [report, setReport] = useState<any>(null);

  // 搜索并自动填充数据
  const handleSearch = async () => {
    if (!ticker) return;
    setLoading(true);
    setError('');
    setReport(null); // 重置报告

    const res = await getStockFundamentals(ticker);
    
    if (res.success && res.data) {
        setFormData({
            price: res.data.price,
            eps: res.data.eps,
            roe: Number(res.data.roe),
            growth: Number(res.data.growth),
            bookValue: res.data.bookValue,
            cashFlow: Number(res.data.cashFlow)
        });
    } else {
        setError(res.error || '获取失败');
    }
    setLoading(false);
  };

  const handleCalculate = () => {
    // 防止除以0
    if (formData.eps === 0) {
        alert("EPS 不能为 0");
        return;
    }

    const pe = formData.price / formData.eps;
    // 简单的模拟评估逻辑 (Rule-based AI)
    // 实际逻辑：如果 PE > 30 或者 价格 > 净资产的10倍，认为高估
    const isOvervalued = pe > 30 || (formData.bookValue > 0 && formData.price > formData.bookValue * 10);
    const isUndervalued = pe < 15 && formData.roe > 15; // 简单的低估标准

    let status = '合理';
    let score = 60;
    let desc = "当前估值处于合理区间，建议结合宏观环境定投。";

    if (isOvervalued) {
        status = '高估';
        score = 35;
        desc = `当前市盈率(${pe.toFixed(1)})较高，且股价显著高于每股净资产。虽然市场可能给与其高增长预期，但安全边际较低，存在回调风险。`;
    } else if (isUndervalued) {
        status = '低估';
        score = 85;
        desc = `当前市盈率(${pe.toFixed(1)})处于较低水平，且ROE(${formData.roe}%)表现优异，具备较高的安全边际，是潜在的价值投资标的。`;
    }

    setReport({
      score,
      status,
      risk: isOvervalued ? '较高' : (isUndervalued ? '较低' : '中等'),
      desc,
      pe: pe.toFixed(2)
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-4 text-violet-600 hover:text-violet-700 font-semibold">← 返回</button>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
          🛡️ 个股安全边际评估
        </h2>

        {/* 搜索区域 */}
        <div className="flex gap-2 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="输入美股/港股代码 (如 AAPL, 9988.HK)" 
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-violet-500"
                />
            </div>
            <button 
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all"
            >
                {loading ? <Loader2 size={18} className="animate-spin" /> : '自动获取数据'}
            </button>
        </div>
        
        {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

        <div className="grid md:grid-cols-2 gap-10">
          {/* 输入表单 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-2">基本面参数 (可手动修改)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">当前股价 ($/HKD)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">每股收益 (EPS)</label>
                <input name="eps" type="number" value={formData.eps} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ROE (%)</label>
                <input name="roe" type="number" value={formData.roe} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">营收增长率 (%)</label>
                <input name="growth" type="number" value={formData.growth} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">每股净资产 (BVPS)</label>
                <input name="bookValue" type="number" value={formData.bookValue} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">每股现金流 (CPS)</label>
                <input name="cashFlow" type="number" value={formData.cashFlow} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono" />
              </div>
            </div>
            <button onClick={handleCalculate} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl mt-4 hover:opacity-90 transition-opacity">
              生成评估报告
            </button>
          </div>

          {/* 报告输出 */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-center min-h-[300px]">
            {!report ? (
              <div className="text-center text-gray-400">
                <FileText size={48} className="mx-auto mb-2 opacity-20" />
                <p>输入参数后点击生成报告</p>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-300">
                <div className={`flex items-center gap-3 text-lg font-bold mb-4 ${report.status === '高估' ? 'text-red-500' : report.status === '低估' ? 'text-green-500' : 'text-yellow-600'}`}>
                  {report.status === '高估' ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
                  评估结论：{report.status}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">安全边际评分</span>
                    <span className="font-mono font-bold text-xl">{report.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${report.score < 60 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${report.score}%` }}></div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {report.desc}
                  </div>
                  
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">风险等级: {report.risk}</span>
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">PE: {report.pe}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}