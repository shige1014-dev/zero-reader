import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://civilization-leap.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZERO2076 情报阅读台 v2",
    template: "%s | ZERO2076 情报阅读台 v2"
  },
  description:
    "ZERO2076 的私人情报终端，用来接收机器人推送、阅读深度文刊，并沉淀文明跃迁信号。",
  keywords: ["ZERO2076", "情报阅读台", "私人情报终端", "Markdown 阅读器"],
  openGraph: {
    title: "ZERO2076 情报阅读台 v2",
    description:
      "私人情报终端，不是博客。接收机器人推送、阅读长文、跟踪宏观与文明跃迁信号。",
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERO2076 情报阅读台 v2",
    description: "私人情报终端，不是博客。"
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
