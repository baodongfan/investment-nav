'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ArticleData } from '@/lib/articles';
import { FileText, ArrowUpRight } from 'lucide-react';

export default function ArticleFilter({ articles }: { articles: ArticleData[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = useMemo(() => {
    const cats = [...new Set(articles.map((a) => a.category))];
    return ['全部', ...cats.sort()];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === '全部') return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, articles]);

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={article.url ? article.url : `/articles/${article.id}`}
              target={article.url ? "_blank" : "_self"}
              // 修改点：添加 hover:shadow-xl hover:-translate-y-1 以及对应的边框高亮
              className="
                group relative flex flex-col p-6 h-full overflow-hidden
                rounded-2xl border border-gray-100 dark:border-gray-800
                bg-white dark:bg-gray-800/20
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-1
                hover:border-purple-500/50 dark:hover:border-purple-500/50
              "
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/50 p-2 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                    <span className="text-xs text-gray-400 font-mono mt-0.5 block">
                      {article.date || 'Article'}
                    </span>
                  </div>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 group-hover:text-purple-600 transition-all duration-300">
                   <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                {article.description}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                  {article.category}
                </span>
                {article.url && (
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">外部链接</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">暂无文章</h3>
            <p className="text-gray-500">换个分类试试看？</p>
          </div>
        )}
      </div>
    </div>
  );
}