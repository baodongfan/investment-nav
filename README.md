# 🚀 投资导航

一个专为美股&加密货币投资而生的导航平台，汇聚投资网站、教程、工具，100%免费使用。

## 🎯 项目概述

投资导航是一个完整的投资资源导航网站，旨在帮助投资者快速找到优质的投资资源和工具。网站包含：

- **🌐 投资网站聚合** - 30+ 精选投资网站
- **📚 投资系统教程** - 10+ 教程分类
- **📄 投资精选文章** - 投资分析和市场洞察
- **🛠️ 投资工具** - 7+ 实用投资工具
- **🎓 新手友好** - 为初学者量身定制

## 🛠️ 技术栈

- **Framework**: Next.js 16.0.5
- **Runtime**: React 19.2.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Package Manager**: npm

## 📁 项目结构

```
investment-nav/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 全局布局
│   │   ├── page.tsx             # 首页
│   │   ├── globals.css          # 全局样式
│   │   ├── websites/            # 网站聚合页面
│   │   │   └── page.tsx
│   │   ├── tutorials/           # 教程页面
│   │   │   └── page.tsx
│   │   ├── articles/            # 文章页面
│   │   │   └── page.tsx
│   │   ├── tools/               # 工具页面
│   │   │   └── page.tsx
│   │   └── about/               # 关于页面
│   │       └── page.tsx
│   ├── components/
│   │   └── Navigation.tsx        # 导航组件
│   └── data/
│       └── navigation.ts         # 数据定义
├── public/                       # 静态资源
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 生产构建

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 📄 页面功能

### 1. 首页 (/)
- 英雄区域（Hero Section）
- 五大核心功能展示
- 系统教程预览
- 投资工具展示
- 选择理由
- 行动召唤（CTA）

### 2. 网站聚合 (/websites)
- 30+ 精选投资网站
- 按分类筛选（美股券商、加密货币交易所、投资教育等）
- 网站详情和链接

### 3. 投资教程 (/tutorials)
- 8+ 投资教程
- 按分类筛选（美股投资、银行开户、加密货币等）
- 详细的教程描述

### 4. 精选文章 (/articles)
- 6+ 精选投资文章
- 按分类筛选（市场分析、投资策略、财务规划等）
- 深度投资洞察

### 5. 投资工具 (/tools)
- 6+ 实用投资工具
- DCA定投计算器
- DCF估值模型
- 反诈意识测试
- 工具特性和使用说明

### 6. 关于作者 (/about)
- 项目介绍
- 核心价值观
- 优势说明
- 联系方式

## 🎨 设计特性

- **深浅主题支持** - 暗黑模式和亮色模式切换
- **响应式设计** - 完美适配桌面、平板和手机
- **现代化UI** - 使用 Tailwind CSS 构建
- **快速加载** - Next.js 优化，SSR 支持
- **可访问性** - 符合 WCAG 标准

## 📊 数据管理

所有数据集中在 `src/data/navigation.ts` 中管理：

```typescript
// 网站数据
export const websites: Website[] = [...]

// 教程数据
export const tutorials: Tutorial[] = [...]

// 文章数据
export const articles: Article[] = [...]

// 工具数据
export const tools: Tool[] = [...]
```

## 🔧 组件说明

### Navigation 组件
- 响应式导航栏
- 深浅主题切换
- 活动链接高亮

### 各页面特性
- 内容筛选（网站、教程、文章）
- 数据展示网格/列表
- 分类标签
- 链接按钮

## 📱 响应式断点

- **移动端**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

## 🎯 功能特性

✅ 完整的导航系统
✅ 多分类管理
✅ 响应式设计
✅ 深浅主题切换
✅ 快速搜索和筛选
✅ SEO 优化
✅ TypeScript 类型安全
✅ 现代化 UI 组件

## 📝 内容维护

### 添加新网站
编辑 `src/data/navigation.ts` 的 `websites` 数组：

```typescript
{
  id: "unique-id",
  name: "网站名称",
  description: "网站描述",
  url: "https://example.com",
  category: "分类"
}
```

### 添加新教程
类似地编辑 `tutorials` 数组

### 添加新文章
编辑 `articles` 数组

### 添加新工具
编辑 `tools` 数组

## 🌐 部署

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 其他平台

支持任何支持 Node.js 的平台（Netlify、Railway、Heroku 等）

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

- Twitter: [@tychozzz](https://x.com/tychozzz)
- Telegram: [nicoinvestmentfriends](https://t.me/nicoinvestmentfriends)
- YouTube: [@NicoGrowthz](https://www.youtube.com/@NicoGrowthz)

---

**投资导航** - 专为美股&加密货币投资而生 🚀

2024 © All rights reserved.
