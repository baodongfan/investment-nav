'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { tutorials } from '@/data/navigation';
import { useMemo, useState } from 'react';

export default function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const cats = [...new Set(tutorials.map((t) => t.category))];
    return cats.sort();
  }, []);

  const filteredTutorials = useMemo(() => {
    if (!selectedCategory) return tutorials;
    return tutorials.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            📚 投资系统教程
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            美股投资、加密货币投资、美股券商开户、境外银行开户、出入金资金流转、Web3空投，一站式教程汇总
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              教程分类
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === ''
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                全部 ({tutorials.length})
              </button>
              {categories.map((category) => {
                const count = tutorials.filter((t) => t.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tutorials List */}
          <div className="space-y-4">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:border-green-400 dark:hover:border-green-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tutorial.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                    {tutorial.category}
                  </span>
                  {tutorial.url && (
                    <a
                      href={tutorial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold text-sm"
                    >
                      查看教程 →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                暂无符合条件的教程
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
            想要学到更多实用工具？
          </h2>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            查看投资工具 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>这些教程对你有帮助吗？<Link href="/articles" className="text-green-600 hover:text-green-700 font-semibold">查看精选文章 →</Link></p>
        </div>
      </footer>
    </div>
  );
}
