'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';

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

  const items = [
    { href: '/', label: '主页', icon: '🏠' },
    { href: '/websites', label: '网站聚合', icon: '🌐' },
    { href: '/tutorials', label: '投资教程', icon: '📘' },
    { href: '/articles', label: '投资精选文章', icon: '📰' },
    { href: '/tools', label: '投资工具', icon: '🔧' },
    { href: '/about', label: '关于本站', icon: '👤' },
  ];

  return (
    <>
      {/* Mobile top bar - 增加了毛玻璃效果和 Slate-950 背景 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 py-2 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <button aria-label="Open menu" onClick={toggleMobile} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            ☰
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🚀</span>
            <span className="text-black dark:text-white">投资导航</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="切换主题">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Sidebar - 增加了毛玻璃效果和 Slate-950 背景 */}
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
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                ➡️
              </button>
            )}

            {isOpen ? (
              <div className="flex items-center gap-2">
                <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="切换主题">
                  {isDarkMode ? '☀️' : '🌙'}
                </button>

                <button onClick={toggleSidebar} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="收起侧边栏">
                  ⬅️
                </button>
              </div>
            ) : null}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-auto">
            <ul className="py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors ${isOpen ? '' : 'justify-center'}`}
                    title={item.label}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Text */}
          <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
            {isOpen ? <p className="text-sm text-gray-500 dark:text-gray-400">专为美股&加密货币投资而生</p> : <div className="text-center text-xs text-gray-500 dark:text-gray-400">投资</div>}
          </div>
        </div>
      </aside>

      {/* Mobile overlay sidebar */}
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
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={toggleMobile} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
            </div>
          </div>

          <nav className="overflow-auto h-full">
            <ul className="py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
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