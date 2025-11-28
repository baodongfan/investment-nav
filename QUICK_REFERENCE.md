# 🚀 快速参考卡 - Vercel 部署

## 三步部署

### 第一步：GitHub 准备
```bash
cd investment-nav
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/investment-nav.git
git push -u origin main
```

### 第二步：访问 Vercel
https://vercel.com/new

### 第三步：一键部署
- 选择 GitHub 仓库
- 点击 Import
- 点击 Deploy
- ✅ 完成！

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `vercel` | 部署项目 |
| `vercel deploy --prod` | 生产部署 |
| `vercel env add VAR` | 添加环境变量 |
| `vercel logs` | 查看日志 |
| `vercel rollback` | 回滚版本 |
| `vercel list` | 列出部署 |

---

## Vercel 文件作用

| 文件 | 说明 |
|------|------|
| `vercel.json` | Vercel 配置 |
| `.vercelignore` | 忽略文件列表 |

---

## 部署失败排查

```bash
# 1. 本地构建测试
npm run build

# 2. 检查依赖
npm install

# 3. 查看 Git 状态
git status

# 4. 查看 Vercel 日志
vercel logs --follow
```

---

## 获得的免费资源

✅ 域名：`project-name.vercel.app`  
✅ 自动 HTTPS  
✅ CDN 加速  
✅ 自动化部署  
✅ 环境变量管理  
✅ 实时日志  

---

## 部署后立即检查

- [ ] 访问 URL
- [ ] 测试所有页面
- [ ] 测试主题切换
- [ ] 检查外部链接
- [ ] 查看性能指标

---

## 提示

💡 每次 push 到 main 分支都会自动部署新版本

💡 其他分支会生成预览链接

💡 部署失败会收到邮件通知

💡 可以在 Dashboard 手动回滚到之前的版本

---

**祝部署顺利！** 🎉
