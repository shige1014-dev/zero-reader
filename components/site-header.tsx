"use client";

import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/",                                       label: "学习台",   match: (p: string) => p === "/",
    icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/museum.html",                            label: "博物馆",   match: (p: string) => p.startsWith("/museum"),
    icon: "M3 21h18M5 21V10l7-5 7 5v11M9 21V14h6v7M2 10h20" },
  { href: "/matrix",                                 label: "三维股票", match: (p: string) => p.startsWith("/matrix"),
    icon: "M4 4h16v16H4zM4 9h16M9 4v16" },
  { href: "/prophecies",                             label: "预言堂",   match: (p: string) => p.startsWith("/prophecies"),
    icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" },
  { href: "/memorials",                              label: "纪念册",   match: (p: string) => p.startsWith("/memorials"),
    icon: "M4 5h16v14H4zM8 9h8M8 13h5M6 3v4M18 3v4" },
  { href: "/bedrock",                                label: "基岩层",   match: (p: string) => p.startsWith("/bedrock"),
    icon: "M3 8h18M3 13h18M3 18h18M5 8V4h14v4M5 23h14" },
  { href: "/cabinet",                                label: "怪谈奇闻", match: (p: string) => p.startsWith("/cabinet"),
    icon: "M5 4h14v16H5zM9 4v16M5 8h4M5 12h4M5 16h4M14 9h2M14 13h2" },
  { href: "/black-tech",                             label: "黑科技",   match: (p: string) => p.startsWith("/black-tech"),
    icon: "M12 2l7 4v6c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-4zM9 12h6M12 9v6" },
  { href: "/what-if",                                label: "假如系列", match: (p: string) => p.startsWith("/what-if"),
    icon: "M12 3a9 9 0 1 0 9 9M12 3v9l5 3M12 3a9 9 0 0 1 8.49 6" },
  { href: "/civilization-leap/01-ai-rewrites-os",    label: "文明跃迁", match: (p: string) => p.startsWith("/civilization-leap"),
    icon: "M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM8 8h8M8 12h8M8 16h5" },
];

export function SiteHeader() {
  const pathname = usePathname() || "";
  return (
    <header className="zh-topbar" aria-label="主导航">
      {ITEMS.map((it) => {
        const active = it.match(pathname);
        return (
          <a
            key={it.href}
            href={it.href}
            className={"zh-tab" + (active ? " active" : "")}
            title={it.label}
            aria-label={it.label}
            target={(it as any).external ? "_blank" : undefined}
            rel={(it as any).external ? "noopener" : undefined}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.icon} />
            </svg>
          </a>
        );
      })}
    </header>
  );
}
