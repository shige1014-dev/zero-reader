import Link from "next/link";

export const metadata = { title: "股票研究站 · ZERO" };

const sections = [
  { href: "/stock-learning", icon: "📚", title: "学习网", sub: "44 标的 · 11 板块 · 评级 + 三态推演", level: "L0 入门 → L2 深读" },
  { href: "/matrix",         icon: "🧊", title: "三维矩阵", sub: "板块 / 评级 / 仓位三轴交叉", level: "L2 高阶" },
  { href: "/intel",          icon: "🛰", title: "情报中心", sub: "异动信号 + 司天官三轨", level: "L3 决策" },
  { href: "/learning-os",    icon: "🧭", title: "学习 OS",  sub: "课程 + 每日精读 + 经济卡", level: "L0 入门" },
];

export default function StockHub() {
  return (
    <main className="hub-shell">
      <header className="hub-header">
        <Link href="/" className="hub-back">← 主页</Link>
        <div>
          <p className="hub-kicker">STOCK · DATA · DECISION</p>
          <h1>股票研究站</h1>
          <p className="hub-lead">从板块认知到仓位决策, 4 个子站层层递进。</p>
        </div>
      </header>
      <div className="hub-section-grid">
        {sections.map((s) => (
          <Link key={s.href} href={s.href as any} className="hub-section-card">
            <div className="hub-sec-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p className="hub-sec-sub">{s.sub}</p>
            <span className="hub-sec-level">{s.level}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
