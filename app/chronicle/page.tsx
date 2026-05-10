import Link from "next/link";

export const metadata = { title: "叙事推演站 · ZERO" };

const sections = [
  { href: "/novels/future-world",   icon: "🌐", title: "未来世界",  sub: "2030 推演 · 长篇叙事" },
  { href: "/novels/marvels",        icon: "✨", title: "奇迹",      sub: "技术飞跃 + 人物剧" },
  { href: "/novels",                icon: "📖", title: "小说总汇",  sub: "全部连载 + 章节阅读" },
  { href: "/civilization-leap",     icon: "🏛", title: "文明跃迁",  sub: "范式转变档案" },
  { href: "/what-if",               icon: "🔀", title: "如果",      sub: "情景假设推演" },
  { href: "/prophecies",            icon: "🔮", title: "预言",      sub: "未来事件预判" },
  { href: "/black-tech",            icon: "⚙️", title: "黑科技",    sub: "前沿技术档案" },
  { href: "/memorials",             icon: "📜", title: "备忘录",    sub: "关键节点纪念" },
  { href: "/cabinet",               icon: "🗄", title: "档案柜",    sub: "杂项收纳" },
];

export default function ChronicleHub() {
  return (
    <main className="hub-shell">
      <header className="hub-header">
        <Link href="/" className="hub-back">← 主页</Link>
        <div>
          <p className="hub-kicker">FUTURE · PROPHECY · NARRATIVE</p>
          <h1>叙事推演站</h1>
          <p className="hub-lead">把未来当作故事推演。9 个分馆汇聚未来世界的所有想象。</p>
        </div>
      </header>
      <div className="hub-section-grid">
        {sections.map((s) => (
          <Link key={s.href} href={s.href as any} className="hub-section-card">
            <div className="hub-sec-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p className="hub-sec-sub">{s.sub}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
