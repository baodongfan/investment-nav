import Navigation from '@/components/Navigation';
import ArticleFilter from '@/components/ArticleFilter';
import { getSortedArticlesData, ArticleData } from '@/lib/articles';
import { articles as externalArticles } from '@/data/navigation'; // 1. 引入站外文章数据
import Link from 'next/link';

export default async function ArticlesPage() {
  // 2. 获取站内文章 (从 Markdown 文件读取)
  const internalArticles = getSortedArticlesData();

  // 3. 处理站外文章数据，使其符合 ArticleFilter 组件要求的 ArticleData 格式
  // 主要差异在于站内文章有 content (Markdown内容)，站外文章没有，我们需要补一个空字符串
  const formattedExternalArticles: ArticleData[] = externalArticles.map(article => ({
    id: article.id,
    title: article.title,
    description: article.description,
    category: article.category,
    date: article.date || '', // 如果没有日期，给空字符串
    url: article.url || '',   // 确保 url 字段存在
    content: ''               // 补全 content 字段，虽然列表页不显示，但类型定义需要
  }));

  // 4. 合并两部分文章
  // 你可以根据需要调整顺序，例如把 external 放在前面，或者混合后按日期排序
  const allArticles = [...internalArticles, ...formattedExternalArticles].sort((a, b) => {
    // 简单的按日期降序排序 (可选)
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });

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
        {/* 5. 将合并后的 allArticles 传给组件 */}
        <ArticleFilter articles={allArticles} />
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