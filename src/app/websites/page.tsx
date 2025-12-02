'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { websites } from '@/data/navigation';
import { useMemo, useState } from 'react';

export default function Websites() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const cats = [...new Set(websites.map((w) => w.category))];
    return cats.sort();
  }, []);

  const filteredWebsites = useMemo(() => {
    if (!selectedCategory) return websites;
    return websites.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <section className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            🌐 投资网站聚合
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            聚合全球优质投资网站，包含美股投资、加密货币投资、Web3空投，一站式导航
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              按分类筛选
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === ''
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                全部 ({websites.length})
              </button>
              {categories.map((category) => {
                const count = websites.filter((w) => w.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === category
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((website) => (
              <a
                key={website.id}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                // 父容器保持 group 类
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 dark:hover:border-violet-500 group flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {/* 修改图标：悬浮放大 */}
                    <img
                      src={
                        website.icon ||
                        `https://www.google.com/s2/favicons?domain=${website.url}&sz=64`
                      }
                      alt={website.name}
                      className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 p-1 object-contain border border-gray-100 dark:border-gray-700 transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-black dark:text-white truncate pr-2">
                        {website.name}
                      </h3>
                      {/* 修改箭头：悬浮向右上飞 */}
                      <span className="text-gray-400 group-hover:text-violet-500 transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                  {website.description}
                </p>
                
                <div className="mt-auto">
                  {/* 修改标签：悬浮背景变深 */}
                  <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 rounded-full text-xs font-semibold transition-colors duration-300 group-hover:bg-violet-200 dark:group-hover:bg-violet-800">
                    {website.category}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filteredWebsites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                暂无符合条件的网站
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-50 dark:bg-gray-900 py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>找到你需要的投资网站了吗？<Link href="/tutorials" className="text-violet-600 hover:text-violet-700 font-semibold">查看投资教程 →</Link></p>
        </div>
      </footer>
    </div>
  );
}