import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl pb-20 pt-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-10 text-center shadow-glow">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-text">文章未找到</h1>
        <p className="mt-4 font-body text-lg leading-8 text-textMuted">
          你访问的章节不存在，或者还没有被写入 `/content/civilization-leap`。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-accent/30 bg-accent px-5 py-2 text-sm font-medium text-canvas"
        >
          返回目录
        </Link>
      </div>
    </main>
  );
}
