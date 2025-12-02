import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 定义文章存放目录: 项目根目录/src/content/articles
const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// 定义文章数据的接口
export interface ArticleData {
  id: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  url?: string; // 兼容旧有的外部链接
  content: string; // Markdown 正文内容
}

// 获取所有文章列表（按日期排序）
export function getSortedArticlesData(): ArticleData[] {
  // 如果目录不存在，返回空数组防止报错
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  // 读取目录下的文件名
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // 1. 从文件名中移除 ".md" 后缀作为 ID
    const id = fileName.replace(/\.md$/, '');

    // 2. 读取 markdown 文件内容
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 3. 使用 gray-matter 解析元数据部分
    const matterResult = matter(fileContents);

    // 4. 组合数据
    return {
      id,
      ...matterResult.data,
      content: matterResult.content,
    } as ArticleData;
  });

  // 按日期排序 (最新的显示在前面)
  return allArticlesData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

// 根据 ID 获取单篇文章数据
export function getArticleData(id: string): ArticleData | null {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  
  // 检查文件是否存在
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  } as ArticleData;
}