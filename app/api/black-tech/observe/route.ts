import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { BLACK_TECHS } from "@/lib/black-tech/data";

export const runtime = "nodejs";

const VAULT_PATH =
  process.env.VAULT_PATH ??
  path.join(process.env.HOME ?? "", "zerozero-work/ZERO_V4/01_BODY");

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { techId?: string } | null;
  const tech = BLACK_TECHS.find((item) => item.id === body?.techId);

  if (!tech) {
    return NextResponse.json({ error: "Unknown black tech id" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const dir = path.join(VAULT_PATH, "hall_knowledge", "_black-tech-observations");
  fs.mkdirSync(dir, { recursive: true });

  const filename = `${slugify(tech.id)}.md`;
  const filePath = path.join(dir, filename);
  const content = `---
id: black-tech-${tech.id}
title: ${JSON.stringify(`黑科技观察：${tech.title}`)}
summary: ${JSON.stringify(tech.biggestChange)}
topic: black-tech
hall: hall_knowledge
weight: 0.72
confidence: ${Math.max(0.1, Math.min(0.99, tech.confidence / 100)).toFixed(2)}
tags:
  - black-tech
  - observation
  - ${tech.museumEraId}
updated_at: ${now}
---

# 黑科技观察：${tech.title}

## 简评

${tech.review}

## 我观察到

${tech.biggestChange}

## 转化路径

${tech.transferPath}
`;

  fs.writeFileSync(filePath, content, "utf8");
  return NextResponse.json({ ok: true, path: filePath });
}
