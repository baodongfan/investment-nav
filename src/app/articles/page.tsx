import Navigation from '@/components/Navigation';
import ArticleFilter from '@/components/ArticleFilter';
import { getSortedArticlesData } from '@/lib/articles';
import Link from 'next/link';

export default async function ArticlesPage() {
  // 在服务端直接读取 Markdown 文件列表
  const articles = getSortedArticlesData();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* 头部区域 */}
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

      {/* 内容区域 (包含筛选器) */}
      <section className="py-16 px-4">
        <ArticleFilter articles={articles} />
      </section>
      
      {/* 页脚 */}
      <footer className="bg-white dark:bg-black py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>想深入学习？<Link href="/tutorials" className="text-purple-600 hover:text-purple-700 font-semibold">查看系统教程 →</Link></p>
        </div>
      </footer>
    </div>
  );
}