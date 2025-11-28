'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { websites } from '@/data/navigation';
import { useMemo, useState } from 'react';

export default function Websites() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = [...new Set(websites.map((w) => w.category))];
    return cats.sort();
  }, []);

  // 筛选网站
  const filteredWebsites = useMemo(() => {
    if (!selectedCategory) return websites;
    return websites.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            🌐 投资网站聚合
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            聚合全球优质投资网站，包含美股投资、加密货币投资、Web3空投，一站式导航
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              按分类筛选
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === ''
                    ? 'bg-blue-600 text-white'
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
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Websites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((website) => (
              <a
                key={website.id}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:border-blue-400 dark:hover:border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-black dark:text-white flex-1">
                    {website.name}
                  </h3>
                  <span className="text-xl ml-2">🔗</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {website.description}
                </p>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                  {website.category}
                </span>
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

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>找到你需要的投资网站了吗？<Link href="/tutorials" className="text-blue-600 hover:text-blue-700 font-semibold">查看投资教程 →</Link></p>
        </div>
      </footer>
    </div>
  );
}
