'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { tools } from '@/data/navigation';

export default function Tools() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            🛠️ 投资工具
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            DCF美股估值器、DCA计算器、FIRE财富自由规划等实用投资工具
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
            所有工具
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:border-orange-400 dark:hover:border-orange-500"
              >
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-semibold">
                    {tool.isFree ? '免费使用' : '付费'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  {tool.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {tool.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    主要特性：
                  </h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 dark:text-gray-400"
                      >
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {tool.url ? (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                  >
                    开始使用 →
                  </a>
                ) : (
                  <button className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
                    即将上线
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
              💡 提示
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              所有工具都是完全免费的，无需注册即可使用。我们致力于为所有投资者提供最好的投资工具和资源，帮助你做出更明智的投资决策。
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            为什么使用我们的工具？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                精准计算
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                基于最新的投资理论和数据模型，提供精准的计算结果
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                高效便捷
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                简洁的界面设计，几秒钟即可获得你需要的结果
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                可视化展示
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                通过图表和数据可视化，轻松理解复杂的投资概念
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            准备好改变你的投资方式了吗？
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            从现在开始使用我们的工具，让数据驱动你的投资决策
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              回到首页
            </Link>
            <Link
              href="/tutorials"
              className="px-8 py-3 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
            >
              学习投资教程
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🚀 投资导航</h3>
            <p className="text-gray-400">
              为全球投资者提供最好的工具和资源
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/websites" className="hover:text-white">网站聚合</Link></li>
              <li><Link href="/tutorials" className="hover:text-white">投资教程</Link></li>
              <li><Link href="/articles" className="hover:text-white">精选文章</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">关注我们</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">YouTube</a>
              <a href="#" className="hover:text-white">Telegram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
