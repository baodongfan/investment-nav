'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { websites } from '@/data/navigation';
import { useMemo, useState } from 'react';

export default function Websites() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  // 提取分类并去重，添加"全部"选项
  const categories = useMemo(() => {
    const cats = [...new Set(websites.map((w) => w.category))];
    return ['全部', ...cats.sort()];
  }, []);

  // 筛选逻辑
  const filteredWebsites = useMemo(() => {
    if (selectedCategory === '全部') return websites;
    return websites.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black font-sans">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      {/* 1. 简约头部：已更新标题和 Brandon 的个人署名 */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            投资网站聚合
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            由 Brandon 精选的常用投资资源，涵盖美股分析、筛选及投资教育网站。
          </p>
         </div>

        {/* 2. 统一的大容器：模拟参考图的大边框效果 */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          
          {/* 3. 筛选栏区域：类似 Tab 分页器的设计 */}
          <div className="border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 px-6 py-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
              {/* 这里的 bg-gray-100 是整个 Tab 条的背景 */}
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

          {/* 4. 内容展示区域 */}
          <div className="p-6 md:p-8 bg-white dark:bg-gray-900 min-h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredWebsites.map((website) => (
                <a
                  key={website.id}
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group relative flex flex-col p-6 h-full
                    rounded-2xl border border-gray-100 dark:border-gray-800
                    bg-white dark:bg-gray-800/20
                    hover:border-violet-200 dark:hover:border-violet-900
                    hover:shadow-md hover:shadow-violet-100/50 dark:hover:shadow-none
                    transition-all duration-300 ease-in-out
                  "
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* 图标容器 */}
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {/* 替换原有的 img 标签内容 */}
                        {/* 替换开始：更健壮的图标渲染逻辑 */}
                        <img
                          src={
                            website.icon ||
                            (() => {
                              try {
                                // 安全获取 hostname，防止 url 格式错误导致页面崩溃
                                const hostname = new URL(website.url).hostname;
                                // 移除 fallback 参数，因为 unavatar 无法访问你 localhost 的文件
                                // 这里的 onError 会处理失败的情况
                                return `https://unavatar.io/${hostname}?ttl=24h`;
                              } catch (e) {
                                return "/globe.svg"; // URL 解析失败直接用默认图标
                              }
                            })()
                          }
                          alt={website.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            // 图片加载失败时（unavatar 挂了或者找不到图标），回退到本地图标
                            const target = e.target as HTMLImageElement;
                            // 防止死循环：如果 globe.svg 也加载失败，就不再重试
                            if (target.src.indexOf("/globe.svg") === -1) {
                              target.src = "/globe.svg";
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {website.name}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono mt-0.5 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {new URL(website.url).hostname.replace('www.', '')}
                        </span>
                      </div>
                    </div>
                    
                    {/* 右上角箭头 */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 group-hover:text-violet-600 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {website.description}
                  </p>

                  <div className="flex items-center gap-2 mt-auto">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30">
                      {website.category}
                    </span>
                    {/* 这里可以根据数据添加额外标签，比如 '英文' */}
                    {/* <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      英文
                    </span> */}
                  </div>
                </a>
              ))}
            </div>

            {filteredWebsites.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">未找到相关网站</h3>
                <p className="text-gray-500">尝试切换其他分类看看吧</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <footer className="max-w-7xl mx-auto py-12 px-6 text-center">
        <p className="text-gray-500 text-sm">
          找不到想要的？
          <Link href="/tools" className="text-violet-600 hover:underline ml-1 font-medium">
            试试投资工具 →
          </Link>
        </p>
      </footer>
    </div>
  );
}