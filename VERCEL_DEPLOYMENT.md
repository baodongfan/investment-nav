# 🚀 Vercel 部署指南

## 快速开始（推荐方式）

### 1️⃣ 方式一：GitHub + Vercel（最简单）

#### 步骤 1：上传到 GitHub

```bash
# 进入项目目录
cd investment-nav

# 初始化 Git（如果还没有的话）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Investment Navigation Website"

# 重命名分支为 main（Vercel 默认）
git branch -M main

# 添加远程仓库（替换为你自己的 GitHub 链接）
git remote add origin https://github.com/你的用户名/investment-nav.git

# 推送到 GitHub
git push -u origin main
```

#### 步骤 2：连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击右上角 "Sign Up"，选择 "Sign up with GitHub"
3. 授权 GitHub 访问
4. 登录后点击 "New Project"
5. 在 "Import Git Repository" 中找到 `investment-nav`
6. 点击 "Import"
7. Vercel 自动识别 Next.js 项目，保持默认设置
8. 点击 "Deploy"
9. 等待部署完成（通常 1-2 分钟）
10. 获得你的免费域名！🎉

---

### 2️⃣ 方式二：Vercel CLI（命令行部署）

#### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

#### 步骤 2：登录 Vercel

```bash
vercel login
```

会打开浏览器要求授权，完成授权后继续。

#### 步骤 3：部署

```bash
cd investment-nav
vercel
```

按提示操作：
- `? Set up and deploy "~/path/to/investment-nav"?` → `y`
- `? Which scope do you want to deploy to?` → 选择你的账号
- `? Link to existing project?` → `n`
- `? What's your project's name?` → `investment-nav`
- `? In which directory is your code located?` → `.`
- `? Want to modify these settings?` → `n`

部署完成后会显示你的 URL！

---

### 3️⃣ 方式三：Vercel Dashboard 直接部署

如果你没有 Git 仓库：

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 选择 "Other" 选项
3. 上传你的项目文件夹
4. Vercel 会自动部署

---

## 🎯 部署后

### 获得的内容
✅ 免费域名：`your-project.vercel.app`
✅ 自动 HTTPS
✅ CDN 加速
✅ 自动优化

### 自动部署

一旦连接了 GitHub：
- 每次 push 到 `main` 分支都会自动部署
- 其他分支会生成预览链接
- 部署失败会收到邮件通知

### 查看部署日志

```bash
vercel logs
```

---

## 🔧 环境变量（如需要）

1. 在 Vercel Dashboard 中：
   - 点击你的项目
   - Settings → Environment Variables
   - 添加变量
   - 重新部署

2. 或通过 CLI：

```bash
vercel env add MY_VAR
# 输入变量值
```

---

## 🌐 自定义域名

### 免费域名不满意？使用自己的域名

1. 在 Vercel Dashboard：
   - 点击项目 → Settings
   - 选择 "Domains"
   - 点击 "Add"
   - 输入你的域名

2. 配置 DNS：
   - 按照 Vercel 的指引修改 DNS 记录
   - 通常 5-48 小时生效

---

## 📊 监控和性能

### 查看部署统计

```bash
vercel analytics
```

### 性能优化

Vercel 会自动优化：
- ✅ 代码分割
- ✅ 图片优化
- ✅ 缓存策略
- ✅ CDN 分发

---

## 🆘 常见问题

### Q1: 部署失败了怎么办？

检查：
1. `npm run build` 是否在本地成功
2. 确保所有依赖都在 package.json 中
3. 查看 Vercel 的部署日志

```bash
vercel logs --follow
```

### Q2: 如何回滚到之前的版本？

在 Vercel Dashboard：
- 点击 "Deployments"
- 找到你要回滚的版本
- 点击"..."按钮，选择"Promote to Production"

### Q3: 如何添加自己的环保地域名？

1. 购买域名（GoDaddy、Namecheap 等）
2. 在 Vercel 添加域名
3. 修改 DNS 指向 Vercel

### Q4: 需要后端 API 吗？

Vercel 支持 API Routes：
```
investment-nav/
└── src/app/api/
    └── example.ts   # 自动成为 API 端点
```

---

## 💡 其他部署选项

如果不想用 Vercel，还可以用：

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Railway
在 Railway.app 上连接 GitHub 仓库

### Docker（自托管）
```bash
npm run build
npm start
```

---

## ✅ 部署检查清单

在部署前确认：

- [ ] `npm run build` 成功
- [ ] `npm run lint` 无错误
- [ ] 所有 import 路径正确
- [ ] 环境变量已配置
- [ ] git 已初始化
- [ ] package.json 正确
- [ ] README 已更新

---

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- Next.js 部署：https://nextjs.org/learn/basics/deploying-nextjs-app
- 遇到问题：https://vercel.com/support

---

祝部署顺利！🎉

如有任何问题，随时告诉我！
