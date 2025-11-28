'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { articles } from '@/data/navigation';
import { useMemo, useState } from 'react';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const cats = [...new Set(articles.map((a) => a.category))];
    return cats.sort();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            📄 投资精选文章
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            精选优质投资分析文章，涵盖美股投资与加密货币投资，深度解析市场趋势与投资策略
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              文章分类
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === ''
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                全部 ({articles.length})
              </button>
              {categories.map((category) => {
                const count = articles.filter((a) => a.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:border-purple-400 dark:hover:border-purple-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {article.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                    >
                      阅读文章 →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                暂无符合条件的文章
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
            阅读完了文章？现在就开始实践吧！
          </h2>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            使用投资工具 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>想深入学习？<Link href="/tutorials" className="text-purple-600 hover:text-purple-700 font-semibold">查看系统教程 →</Link></p>
        </div>
      </footer>
    </div>
  );
}
