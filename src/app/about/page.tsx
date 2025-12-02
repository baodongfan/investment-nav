'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            关于投资导航
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            了解更多关于这个项目和创建者
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-20">
            {/* Author Info */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6 flex items-center justify-center">
                <span className="text-5xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                我的投资导航指引
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                从投机交易往投资方向转变的Brandon
              </p>
              {/*这里是左边作者社交媒体链接的占位符
              <div className="flex justify-center gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">X/Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">YouTube</a>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Telegram</a>
              </div>
              */}
            </div>

            {/* Mission */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-black dark:text-white mb-6">
                我的想法
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 leading-relaxed">
                建立一个全面、免费的投资导航平台，自用的同时分享优质的投资资源和工具。
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 leading-relaxed">
                我相信，长期定投可能是普通人财富自由的最简单方式。通过系统的教育和实用的工具，我希望让投资变得更加简单、透明和民主化。
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                这个平台完全免费，没有任何隐藏费用或商业变现目的。初心就是为投资者社区做出贡献。
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-black dark:text-white mb-12 text-center">
              核心价值观
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="text-4xl mb-4">💎</div>
                <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                  质量优先
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  只推荐经过精心筛选的优质资源
                </p>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="text-4xl mb-4">🎓</div>
                <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                  教育赋能
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  帮助投资者学习和成长
                </p>
              </div>

              <div className="p-6 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                  社区驱动
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  听取用户反馈，持续改进
                </p>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-orange-900 rounded-lg">
                <div className="text-4xl mb-4">🎁</div>
                <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                  完全免费
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  永远不收费，其实是我不懂如何变现
                </p>
              </div>
            </div>
          </div>

          {/* Features Highlight */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-black dark:text-white mb-12 text-center">
              投资导航的优势
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">🌐</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                    全球化视角
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    汇集全球优质投资网站，帮助你开启国际投资之旅
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">📚</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                    系统化教程
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    从零到一的投资知识体系，新手友好
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">🛠️</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                    实用工具库
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    多种投资工具让你的决策更加科学
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">📊</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                    精选内容
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    精心挑选的投资文章和市场分析
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-12 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
              联系与反馈
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              如果你有任何建议、反馈或想要贡献内容，欢迎联系我们。我们非常重视用户的意见，并会不断改进这个平台。
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                发送邮件
              </a>
              <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Telegram社区建设中。。
              </a>
              {/*
              <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                关注X/Twitter。。
              </a>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            准备好开始你的投资之旅了吗？
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              回到首页
            </Link>
            <Link
              href="/tools"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              使用投资工具
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 投资导航. 由行者Brandon整理打造.</p>
          <p className="mt-2">完全免费，共享学习</p>
        </div>
      </footer>
    </div>
  );
}
