export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl pb-20 pt-10">
      <section className="rounded-[2rem] border border-border bg-surface/80 p-8 shadow-glow sm:p-12">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
          System Notes
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-text">
          ZERO2076 情报阅读台 v2
        </h1>
        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-[#ded8c8]">
          不是博客，而是私人情报终端。机器人持续推送，阅读器负责消化、归档与复盘。
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["数据源", "SQLite 本地数据库 + /content 静态长文"],
            ["推送入口", "/api/push/feed 与 /api/push/briefing"],
            ["阅读目标", "宏观、市场、文明跃迁信号与深度文刊"]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.4rem] border border-border bg-black/20 p-5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-textMuted">
                {label}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#ddd7c7]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.6rem] border border-border bg-black/20 p-6">
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            当前原则
          </p>
          <div className="mt-4 space-y-3">
            {[
              "首页优先呈现今天最重要的信号，而不是完整历史归档。",
              "阅读页必须保留沉浸式 Markdown、进度条和目录锚点。",
              "机器人推送使用 Bearer token 鉴权，所有入口默认走 Node runtime。",
              "静态文章目录继续保留，作为长期文稿与非实时材料的补充。"
            ].map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-[#ddd7c7]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
