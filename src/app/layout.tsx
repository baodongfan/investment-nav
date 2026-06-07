import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
// import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "投资导航 - 美股投资网站导航平台",
  description: "专为美股投资而生的导航平台，汇聚全球优质投资网站，100%免费使用",
  keywords: "投资导航, 美股投资, 加密货币, 投资网站",
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
