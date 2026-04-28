import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

import { LearningOSViewer } from "@/components/learning-os-viewer";

export const metadata: Metadata = {
  title: "认知舱",
  description: "ZERO_LEARNING_OS — 4 段日志 + patterns + 周复盘"
};

export const revalidate = 0;

const OS_ROOT = "/Users/shige1014/ZERO_LEARNING_OS";

const FILES = [
  { key: "readme",  label: "README",        file: "README.md" },
  { key: "map",     label: "system-map",    file: "system-map.md" },
  { key: "log",     label: "learn-log",     file: "learn-log.md" },
  { key: "patterns",label: "patterns",      file: "patterns.md" },
  { key: "weekly",  label: "weekly-review", file: "weekly-review.md" }
] as const;

function safeRead(filename: string): string {
  const full = path.join(OS_ROOT, filename);
  try {
    return fs.readFileSync(full, "utf8");
  } catch (err) {
    return `# ${filename}\n\n_无法读取: ${(err as Error).message}_`;
  }
}

export default function LearningOSPage() {
  const docs = FILES.map((f) => ({
    key: f.key,
    label: f.label,
    file: f.file,
    content: safeRead(f.file)
  }));
  return <LearningOSViewer docs={docs} root={OS_ROOT} />;
}
