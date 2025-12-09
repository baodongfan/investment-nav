// src/app/articles/[id]/page.tsx
import { getArticleData } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm'; // 1. 引入表格支持插件
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents';
import ZoomImage from '@/components/ZoomImage';

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
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:grid lg:grid-cols-[1fr_240px] lg:gap-10 items-start">
        
        <article className="min-w-0">
          
          {/* 面包屑 */}
          <div className="mb-8 text-sm text-gray-500 font-medium tracking-wide">
            <Link 
              href="/articles" 
              className="hover:text-violet-600 transition-colors flex items-center gap-1"
            >
              ← 返回列表
            </Link>
          </div>

          {/* 头部 */}
          <header className="mb-10 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold tracking-wide">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
              {article.title}
            </h1>
            {article.date && (
              <div className="text-gray-500 font-mono text-xs">
                发布于 {article.date}
              </div>
            )}
          </header>

          {/* 正文区域 */}
          <div className="
            prose prose-slate dark:prose-invert 
            max-w-none 
            
            /* 基础排版优化 */
            prose-headings:font-bold 
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg 
            prose-headings:mt-8 prose-headings:mb-4
            prose-headings:scroll-mt-24
            
            prose-p:leading-7 
            prose-p:my-4      
            
            prose-li:leading-7
            prose-li:my-1
            
            prose-img:rounded-xl
            prose-img:shadow-md
            prose-img:my-6

            /* 表格样式优化 */
            prose-table:border-collapse 
            prose-table:border 
            prose-table:border-gray-200 dark:prose-table:border-gray-800
            prose-th:bg-gray-50 dark:prose-th:bg-gray-900
            prose-th:p-3 prose-td:p-3
            prose-th:border prose-td:border
            prose-th:border-gray-200 dark:prose-th:border-gray-700
            prose-td:border-gray-200 dark:prose-td:border-gray-700
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} // 2. 在这里配置插件
              rehypePlugins={[rehypeSlug]}
              components={{
                img: ({node, ...props}) => <ZoomImage {...props} />
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
          
          {/* 底部 */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
             <p className="text-gray-400 text-sm">感谢阅读</p>
             <Link 
               href="/articles" 
               className="text-violet-600 font-bold hover:text-violet-800 transition-colors flex items-center gap-1 text-sm"
             >
               阅读更多文章 →
             </Link>
          </div>
        </article>

        {/* 右侧：悬浮目录 */}
        <aside className="hidden lg:block sticky top-24">
          <TableOfContents />
        </aside>

      </div>
    </div>
  );
}