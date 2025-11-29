import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";

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
        <Navigation />
        {/* add the with-sidebar class so desktop content is pushed by CSS var */}
        {/* the media query in globals.css ensures this only applies on md+ */}
        <main className="with-sidebar transition-all">{children}</main>
      </body>
    </html>
  );
}
