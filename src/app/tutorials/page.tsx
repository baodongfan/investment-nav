'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { tutorials } from '@/data/navigation';
import { useMemo, useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = useMemo(() => {
    const cats = [...new Set(tutorials.map((t) => t.category))];
    return ['全部', ...cats.sort()];
  }, []);

  const filteredTutorials = useMemo(() => {
    if (selectedCategory === '全部') return tutorials;
    return tutorials.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black font-sans">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            投资系统教程
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            涵盖美股、加密货币、开户入金等全方位知识，助您建立完整的投资体系。
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          
          <div className="border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 px-6 py-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
              <div className="flex p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-xl whitespace-nowrap">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        relative px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ease-out
                        ${isSelected 
                          ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }
                      `}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-white dark:bg-gray-900 min-h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  // 修改点：添加 hover:shadow-xl hover:-translate-y-1 以及对应的边框高亮
                  className="
                    group relative flex flex-col p-6 h-full overflow-hidden
                    rounded-2xl border border-gray-100 dark:border-gray-800
                    bg-white dark:bg-gray-800/20
                    transition-all duration-300 ease-in-out
                    hover:shadow-xl hover:-translate-y-1
                    hover:border-green-500/50 dark:hover:border-green-500/50
                  "
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50 p-2 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                          {tutorial.title}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono mt-0.5 block">
                          Tutorial
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {tutorial.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                      {tutorial.category}
                    </span>
                    
                    {tutorial.url && (
                      <a 
                        href={tutorial.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-green-600 transition-colors"
                      >
                        查看 <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">暂无相关教程</h3>
                <p className="text-gray-500">敬请期待更多内容更新</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto py-12 px-6 text-center">
        <p className="text-gray-500 text-sm">
          想要学到更多实用工具？
          <Link href="/tools" className="text-green-600 hover:underline ml-1 font-medium">
            查看投资工具 →
          </Link>
        </p>
      </footer>
    </div>
  );
}