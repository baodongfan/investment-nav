#!/bin/bash

# 🚀 投资导航网站 - 快速部署脚本

echo "🚀 开始部署到 Vercel..."
echo ""

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ 未检测到 Vercel CLI"
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查项目依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装依赖中..."
    npm install
fi

# 构建项目
echo "🔨 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败！请检查错误信息"
    exit 1
fi

# 检查 git 配置
echo "🔍 检查 Git 配置..."
if [ ! -d ".git" ]; then
    echo "初始化 Git..."
    git init
    git add .
    git commit -m "Initial commit: Investment Navigation Website"
    git branch -M main
fi

echo ""
echo "✅ 项目已准备好！"
echo ""
echo "选择部署方式："
echo "1. GitHub + Vercel（推荐）"
echo "2. Vercel CLI 直接部署"
echo "3. 查看 Vercel 部署文档"
echo ""
read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📝 GitHub 部署步骤："
        echo "1. 访问 https://github.com/new"
        echo "2. 创建新仓库 'investment-nav'"
        echo "3. 运行以下命令："
        echo ""
        echo "   git remote add origin https://github.com/你的用户名/investment-nav.git"
        echo "   git push -u origin main"
        echo ""
        echo "4. 访问 https://vercel.com/new"
        echo "5. 选择 'investment-nav' 仓库"
        echo "6. 点击 Deploy"
        echo ""
        ;;
    2)
        echo ""
        echo "🔐 Vercel CLI 部署"
        vercel
        ;;
    3)
        echo ""
        echo "📖 打开部署文档..."
        cat VERCEL_DEPLOYMENT.md
        ;;
    *)
        echo "❌ 无效的选择"
        exit 1
        ;;
esac

echo ""
echo "✨ 部署脚本完成！"
echo ""
