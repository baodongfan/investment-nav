'use client';

import Link from 'next/link';
import Image from 'next/image';
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
            {/* Author Info */}
            <div className="text-center sticky top-24">
              {/* 注意这里去掉了 bg-gradient...，增加了 relative 和 overflow-hidden */}
                <div className="w-32 h-32 rounded-full relative overflow-hidden mx-auto mb-6 shadow-lg">
                  <Image
                    src="/avatar.jpg" // 确保这里路径与您放置图片的实际路径一致，从 public 目录开始算起
                    alt="行者 Brandon 头像"
                    fill // 让图片充满父容器
                    className="object-cover" // 保持图片比例裁剪填充
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                行者 Brandon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                从投机交易往投资方向转变的终身学习者
              </p>
              
              {/* 优化后的社交链接 */}
              <div className="flex justify-center gap-6">
                <a href="https://x.com/Brandon8299" target="_blank" className="text-gray-400 hover:text-violet-600 transition-colors" title="Twitter/X">
                  <span className="text-2xl">𝕏</span>
                </a>
                <a href="https://t.me/Brandon_Fan" target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors" title="Telegram">
                  <span className="text-2xl">✈️</span>
                </a>
              </div>
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
                这个平台完全免费，初心就是为投资者社区做出贡献。正如项目说明中所述，这是专为美股和加密货币投资而生的平台。
              </p>
            </div>
          </div>

          {/* Contact Section - 优化后的展示方式 */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                联系与反馈
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                如果您有任何建议、发现链接失效，或者想要贡献优质的投资资源，欢迎通过以下方式联系我：
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Card */}
                <a href="mailto:fanbd7@hotmail.com" className="flex items-center p-4 bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-gray-800 hover:border-violet-500 transition-all group">
                  <div className="w-10 h-10 flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-lg mr-4">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">发送邮件</p>
                    <p className="font-semibold text-black dark:text-white group-hover:text-violet-600">fanbd7@hotmail.com</p>
                  </div>
                </a>

                {/* Telegram Card */}
                <a href="https://t.me/Brandon_Fan" target="_blank" className="flex items-center p-4 bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-all group">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mr-4">
                    ✈️
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telegram 交流</p>
                    <p className="font-semibold text-black dark:text-white group-hover:text-blue-500">@Brandon_Fan</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer 保持不变... */}
    </div>
  );
}