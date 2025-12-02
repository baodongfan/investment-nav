'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ArticleData } from '@/lib/articles';

export default function ArticleFilter({ articles }: { articles: ArticleData[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 提取所有分类并去重
  const categories = useMemo(() => {
    const cats = [...new Set(articles.map((a) => a.category))];
    return cats.sort();
  }, [articles]);

  // 根据选择的分类筛选文章
  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, articles]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* 筛选按钮区域 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">文章分类</h2>
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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category} ({articles.filter(a => a.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* 文章卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:border-purple-400 dark:hover:border-purple-500 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3 flex-1">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{article.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-semibold">
                {article.category}
              </span>
              {article.url ? (
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-1">
                  外部链接 ↗
                </a>
              ) : (
                <Link href={`/articles/${article.id}`} className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1">
                  阅读站内文章 →
                </Link>
              )}
            </div>
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            暂无该分类的文章
          </div>
        )}
      </div>
    </div>
  );
}