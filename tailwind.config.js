module.exports = {
  darkMode: 'class', // <--- 必须是 'class' 才能通过添加 .dark 生效
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // 引入排版插件
  ],
};