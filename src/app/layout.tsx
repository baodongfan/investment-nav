import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "投资导航 - 美股&加密货币投资导航平台",
  description: "专为美股&加密货币投资而生的导航平台，汇聚投资网站、教程、工具，100%免费使用",
  keywords: "投资导航, 美股投资, 加密货币, 投资教程, 投资工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
