'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 1. 获取文章中的所有 h2 和 h3
    // 👇 关键修改：添加 "as HTMLElement[]" 断言，告诉 TS 这些是 HTML 元素
    const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3')) as HTMLElement[];
    
    const mappedHeadings = elements.map((elem) => ({
      id: elem.id,
      text: elem.innerText, // 现在这里不会报错了
      level: Number(elem.tagName.charAt(1)),
    }));

    setHeadings(mappedHeadings);

    // 2. 监听滚动，高亮当前标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-container text-sm">
      <h4 className="text-gray-900 dark:text-gray-100 font-bold mb-4">目录</h4>
      <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
        {headings.map((heading) => (
          <li key={heading.id} className={`${heading.level === 3 ? 'pl-4' : ''}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
                setActiveId(heading.id);
              }}
              className={`block pl-4 py-1 border-l-2 -ml-[1px] transition-colors duration-200 ${
                activeId === heading.id
                  ? 'border-violet-600 text-violet-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}