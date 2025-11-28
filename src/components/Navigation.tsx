'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🚀</span>
            <span className="text-black dark:text-white">投资导航</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500"
            >
              主页
            </Link>
            <Link
              href="/websites"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500"
            >
              网站聚合
            </Link>
            <Link
              href="/tutorials"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500"
            >
              投资教程 
            </Link>
            <Link
              href="/articles"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500"
            >
              投资精选文章 
            </Link>
            <Link
              href="/tools"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500"
            >
              投资工具 
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-semibold text-red-500 "
            >
              关于本站
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}
