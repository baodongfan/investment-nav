import { getArticleData } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug'; // 👈 引入插件
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents'; // 👈 引入目录组件

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleData(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-gray-200">
      <Navigation />
      
      {/* 布局容器调整：
        1. max-w-7xl: 增加总宽度以容纳目录
        2. lg:grid lg:grid-cols-[1fr_240px]: 桌面端分两栏 (文章自适应 + 240px目录)
        3. gap-10: 栏间距
      */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:grid lg:grid-cols-[1fr_240px] lg:gap-10 items-start">
        
        {/* 左侧：文章主体 */}
        <article className="min-w-0"> {/* min-w-0 防止 flex/grid 子元素溢出 */}
          
          {/* 面包屑 */}
          <div className="mb-10 text-sm text-gray-500 font-medium tracking-wide">
            <Link 
              href="/articles" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              ← 返回列表
            </Link>
          </div>

          {/* 头部 */}
          <header className="mb-16 border-b border-gray-100 dark:border-gray-800 pb-10">
            <div className="flex gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold tracking-wide">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
              {article.title}
            </h1>
            {article.date && (
              <div className="text-gray-500 font-mono text-sm">
                发布于 {article.date}
              </div>
            )}
          </header>

          {/* 正文：增加 rehypePlugins={[rehypeSlug]} */}
          <div className="
            prose prose-lg prose-slate dark:prose-invert 
            max-w-none 
            prose-headings:font-bold 
            prose-p:leading-loose 
            prose-li:leading-loose
            prose-headings:scroll-mt-24 /* 点击目录跳转时，标题上方留出空间，不被导航栏遮挡 */
          ">
            <ReactMarkdown rehypePlugins={[rehypeSlug]}>
              {article.content}
            </ReactMarkdown>
          </div>
          
          {/* 底部 */}
          <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
             <p className="text-gray-400 text-sm">感谢阅读</p>
             <Link 
               href="/articles" 
               className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1"
             >
               阅读更多文章 →
             </Link>
          </div>
        </article>

        {/* 右侧：悬浮目录 (仅在 LG 尺寸显示) */}
        <aside className="hidden lg:block sticky top-24">
          <TableOfContents />
        </aside>

      </div>
    </div>
  );
}