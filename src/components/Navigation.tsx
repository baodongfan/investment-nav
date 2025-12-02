'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';
// 1. 引入图标组件
import { 
  Home, 
  Globe, 
  BookOpen, 
  FileText, 
  Wrench, 
  User, 
  Moon, 
  Sun,
  Menu,
  ChevronLeft,
  ChevronRight,
  Calculator // 如果你想用计算器代替扳手，可以使用这个
} from 'lucide-react';

export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // theme init
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') setIsDarkMode(true);
      else if (saved === 'light') setIsDarkMode(false);
      else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkMode(true);
    } catch (e) {}
  }, []);

  // apply theme class and persist
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  }, [isDarkMode]);

  // Sidebar width handling
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--sidebar-width', isOpen ? '16rem' : '4rem');
    if (isOpen) root.classList.add('sidebar-open');
    else root.classList.remove('sidebar-open');
  }, [isOpen]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '16rem' : '4rem');
  }, []);

  const toggleTheme = () => setIsDarkMode(v => !v);
  const toggleSidebar = () => setIsOpen(v => !v);
  const toggleMobile = () => setMobileOpen(v => !v);

  // 2. 修改菜单配置，使用组件而不是字符串
  // 注意：这里的 icon 属性现在直接存储 React 元素
  const items = [
    { href: '/', label: '主页', icon: <Home size={20} /> },
    { href: '/websites', label: '网站聚合', icon: <Globe size={20} /> },
    { href: '/tutorials', label: '投资教程', icon: <BookOpen size={20} /> },
    { href: '/articles', label: '投资精选文章', icon: <FileText size={20} /> },
    { href: '/tools', label: '投资工具', icon: <Wrench size={20} /> }, // 你也可以换成 <Calculator size={20} />
    { href: '/about', label: '关于本站', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 py-2 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <button aria-label="Open menu" onClick={toggleMobile} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {/* 替换移动端菜单图标 */}
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🚀</span>
            <span className="text-black dark:text-white">投资导航</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="切换主题">
            {/* 替换主题图标 */}
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          sidebar
          fixed top-0 left-0 h-full z-50
          bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl 
          border-r border-gray-200 dark:border-gray-800
          hidden md:block
          transition-colors duration-300
        `}
        style={{ width: 'var(--sidebar-width)' }}
        aria-expanded={isOpen}
      >
        <div className="h-full flex flex-col">
          {/* Header area */}
          <div className="flex items-center justify-between px-3 py-3">
            {isOpen ? (
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <span className="text-2xl">🚀</span>
                <span className="text-black dark:text-white">投资导航</span>
              </Link>
            ) : (
              <button
                onClick={toggleSidebar}
                aria-label="打开侧边栏"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              >
                {/* 替换展开箭头 */}
                <ChevronRight size={20} />
              </button>
            )}

            {isOpen ? (
              <div className="flex items-center gap-2">
                <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="切换主题">
                   {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button onClick={toggleSidebar} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="收起侧边栏">
                  {/* 替换收起箭头 */}
                  <ChevronLeft size={18} />
                </button>
              </div>
            ) : null}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-auto mt-4">
            <ul className="py-2 px-2 space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // 3. 样式调整：移除 text-xl，增加 group 使得 hover 时图标颜色变化更自然
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-gray-600 dark:text-gray-400 
                      hover:bg-violet-50 dark:hover:bg-violet-900/20 
                      hover:text-violet-600 dark:hover:text-violet-300
                      transition-all duration-200
                      group
                      ${isOpen ? '' : 'justify-center'}
                    `}
                    title={item.label}
                  >
                    {/* 图标容器：确保图标居中且不被压缩 */}
                    <span className="flex-shrink-0 transition-colors">
                      {item.icon}
                    </span>
                    
                    {isOpen && (
                      <span className="font-medium text-sm tracking-wide">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Text */}
          <div className="px-4 py-6 border-t border-gray-100 dark:border-gray-800">
            {isOpen ? (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-white">投资导航</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">v1.0.0 • 免费开源</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <span className="text-xs text-gray-400">©</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay sidebar - 同步更新 */}
      <div className={`md:hidden fixed inset-0 z-50 flex ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={toggleMobile} />
        <div className={`relative bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl w-72 max-w-full h-full transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-2xl">🚀</span>
              <span className="text-black dark:text-white">投资导航</span>
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleMobile} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
            </div>
          </div>

          <nav className="overflow-auto h-full p-4">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={() => setMobileOpen(false)} 
                    className="flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-300 rounded-lg transition-colors"
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}