"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Doc = {
  key: string;
  label: string;
  file: string;
  content: string;
};

type Props = {
  docs: Doc[];
  root: string;
};

export function LearningOSViewer({ docs, root }: Props) {
  const [activeKey, setActiveKey] = useState<string>(docs[0]?.key ?? "");
  const active = docs.find((d) => d.key === activeKey) ?? docs[0];

  return (
    <main className="mx-auto w-full max-w-[1200px] py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          认知舱 · ZERO_LEARNING_OS
        </h1>
        <p className="mt-1 text-sm text-text/60">
          {root}
        </p>
      </header>

      <nav
        className="mb-4 flex flex-wrap gap-2 border-b border-text/10 pb-2"
        aria-label="文件切换"
      >
        {docs.map((d) => {
          const isActive = d.key === active?.key;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setActiveKey(d.key)}
              className={
                "rounded-md px-3 py-1 text-sm transition " +
                (isActive
                  ? "bg-text text-canvas"
                  : "bg-text/5 text-text/70 hover:bg-text/10")
              }
            >
              {d.label}
            </button>
          );
        })}
      </nav>

      {active ? (
        <article className="rounded-lg border border-text/10 bg-canvas/40 px-6 py-5">
          <div className="mb-3 text-xs text-text/50">{active.file}</div>
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {active.content}
            </ReactMarkdown>
          </div>
        </article>
      ) : (
        <p className="text-text/60">无文档可显示。</p>
      )}
    </main>
  );
}
