'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { websites, tutorials, tools } from '@/data/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4">
            🚀 投资导航
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            📈 专为美股&加密货币投资而生
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
            聚合投资网站、投资教程、投资工具，100%免费使用
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/tools"
              className="px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold"
            >
              开始使用工具
            </Link>
            <Link
              href="/websites"
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
            >
              浏览教程
            </Link>
          </div>
          <div className="flex justify-center gap-12 mt-12 text-center">
            <div>
              <div className="text-3xl font-bold text-violet-600">7+</div>
              <p className="text-gray-600 dark:text-gray-400">投资工具</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-600">10+</div>
              <p className="text-gray-600 dark:text-gray-400">教程分类</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-600">30+</div>
              <p className="text-gray-600 dark:text-gray-400">精选网站</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-600">100%</div>
              <p className="text-gray-600 dark:text-gray-400">免费使用</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-16">
            五大核心功能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link
              href="/websites"
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900"
            >
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                投资网站聚合
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                聚合全球优质投资网站，包含美股投资、加密货币投资、Web3空投，一站式导航
              </p>
            </Link>

            {/* Feature 2 */}
            <Link
              href="/tutorials"
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                投资系统教程
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                美股投资、加密货币投资、美股券商开户、境外银行开户、出入金资金流转、Web3空投，一站式教程汇总
              </p>
            </Link>

            {/* Feature 3 */}
            <Link
              href="/articles"
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900"
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                投资精选文章
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                精选优质投资分析文章，涵盖美股投资与加密货币投资，深度解析市场趋势与投资策略
              </p>
            </Link>

            {/* Feature 4 */}
            <Link
              href="/tools"
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900"
            >
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                投资工具支持
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                DCF美股估值器、DCA计算器、FIRE财富自由规划等实用投资工具
              </p>
            </Link>

            {/* Feature 5 */}
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900">
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                一图看懂投资
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                复杂投资概念简化展示，投资小白也能快速理解
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            投资系统教程
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            境外银行开户、出入金资金流转、美股投资、加密货币投资、Web3空投，一站式教程汇总
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tutorials.slice(0, 6).map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 rounded-full text-sm font-semibold mb-3">
                  {tutorial.category}
                </span>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {tutorial.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/tutorials"
            className="inline-block px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold"
          >
            浏览全部教程
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            专业投资工具
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            DCF美股估值器、DCA计算器、FIRE财富自由规划等实用投资工具
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.slice(0, 3).map((tool) => (
              <div
                key={tool.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.features.slice(0, 2).map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold"
          >
            查看全部工具
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-16">
            为什么选择投资导航？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                资源优质
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                由投资专家精心设计与挑选
              </p>
            </div>

            {/* Reason 2 */}
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                实时更新
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                每周实时更新最新投资资源
              </p>
            </div>

            {/* Reason 3 */}
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                新手友好
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                切实地帮助每一位投资者入门
              </p>
            </div>

            {/* Reason 4 */}
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                完全免费
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                建站初衷，完全免费使用
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            准备开始投资之旅了吗？
          </h2>
          <p className="text-xl text-violet-100 mb-12">
            加入数万美股/加密货币投资者大家庭，实现财富自由！
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools"
              className="px-8 py-3 bg-white text-violet-600 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              立即开始使用
            </Link>
            <Link
              href="/websites"
              className="px-8 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition font-semibold"
            >
              浏览投资网站
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
              轻松开启投资之旅，实现财富自由梦想
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/websites" className="hover:text-white">网站聚合</Link></li>
              <li><Link href="/tutorials" className="hover:text-white">投资教程</Link></li>
              <li><Link href="/tools" className="hover:text-white">投资工具</Link></li>
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 投资导航. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}
