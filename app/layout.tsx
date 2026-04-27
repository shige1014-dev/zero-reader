import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://civilization-leap.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZERO2076 长期学习台",
    template: "%s | ZERO2076 长期学习台"
  },
  description:
    "ZERO2076 的长期学习台，用经济学、投资学和 AI 长期课程沉淀判断框架。",
  keywords: ["ZERO2076", "长期学习台", "经济学", "投资学", "AI 学习"],
  openGraph: {
    title: "ZERO2076 长期学习台",
    description:
      "从情报消费转向长期学习：经济学、投资学、AI 课程和图文学习卡。",
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERO2076 长期学习台",
    description: "经济学、投资学、AI 长期课程。"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="bg-canvas text-text">
      <body className="min-h-screen bg-canvas bg-halo text-text antialiased">
        <div className="mx-auto min-h-screen max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
