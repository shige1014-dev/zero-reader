# Telegram Voice Digest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local free "零零每日短播客" command that selects the best daily articles, rewrites them into a listenable Chinese script, generates audio with macOS `say`, and sends it to Telegram.

**Architecture:** Keep ingestion unchanged. Add focused voice-digest modules under `lib/voice-digest/` for selection, script generation, audio generation, and Telegram delivery, then wire them through `scripts/voice_digest.ts`. The first version is local-only and fails softly at model, TTS, and Telegram boundaries.

**Tech Stack:** Next.js 14 repo, TypeScript strict mode, Node test runner, `tsx`, existing `@libsql/client` database access, Anthropic Messages API, macOS `say`, Telegram Bot API.

---

## File Structure

- Create `lib/voice-digest/types.ts`: shared types for selected articles, generated scripts, and run results.
- Create `lib/voice-digest/select.ts`: pure article selection logic using existing `sortArticlesByQuality`.
- Create `lib/voice-digest/script.ts`: prompt construction, strict JSON parsing, model call, and deterministic fallback script.
- Create `lib/voice-digest/audio.ts`: local file output and macOS `say` execution.
- Create `lib/voice-digest/telegram.ts`: Telegram `sendAudio` upload using built-in `fetch` and `FormData`.
- Create `lib/voice-digest/index.ts`: orchestration for one voice digest run.
- Create `scripts/voice_digest.ts`: CLI entry point.
- Modify `package.json`: add `voice-digest` script and focused test scripts.
- Create `tests/voice-digest-select.test.ts`: selection coverage.
- Create `tests/voice-digest-script.test.ts`: parser and fallback coverage.
- Optional later, not in this plan: schedule with launchd after manual command is reliable.

Because this workspace currently lacks `.git`, commit steps are conditional. If the implementation happens inside a git repo, commit after each task. If not, skip commit and keep file-level change notes.

---

### Task 1: Article Selection

**Files:**
- Create: `lib/voice-digest/types.ts`
- Create: `lib/voice-digest/select.ts`
- Test: `tests/voice-digest-select.test.ts`

- [ ] **Step 1: Write the failing selection tests**

Create `tests/voice-digest-select.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";

import { selectVoiceDigestArticles } from "@/lib/voice-digest/select";
import type { Article } from "@/lib/types";

function makeArticle(overrides: Partial<Article>): Article {
  return {
    id: 1,
    title: "Nvidia supply chain update",
    titleZh: "英伟达供应链更新",
    url: "https://example.com/article",
    source: "Reuters",
    date: "2026-04-21",
    publishedAt: "2026-04-21T08:00:00.000Z",
    tags: ["AI芯片"],
    zeroEval: "这条信息的关键在于订单兑现速度和毛利率是否同步改善，而不是标题里的短期涨跌。",
    summary: "英伟达供应链出现新订单信号，市场关注资本开支和交付节奏。",
    recommendLevel: 4,
    obiRef: "bf-001",
    analysis: {
      eventNature: "订单兑现信号",
      keyVariable: "交付节奏和毛利率",
      transmission: "供应链订单变化影响市场对算力资本开支的预期",
      trap: "把供应链传闻当成确定收入",
      falsifyPoint: "后续财报没有订单或毛利改善",
      profitOutlet: "数据中心收入和毛利率",
      bull: "订单继续释放",
      bear: "资本开支放缓"
    },
    pushedAt: null,
    pushedMorningAt: null,
    pushedEveningAt: null,
    createdAt: "2026-04-21T08:00:00.000Z",
    readAt: null,
    ...overrides
  };
}

test("selectVoiceDigestArticles excludes GitHub Trending and caps at three", () => {
  const selected = selectVoiceDigestArticles([
    makeArticle({ id: 1, source: "GitHub Trending", recommendLevel: 5 }),
    makeArticle({ id: 2, title: "A", recommendLevel: 5 }),
    makeArticle({ id: 3, title: "B", recommendLevel: 4 }),
    makeArticle({ id: 4, title: "C", recommendLevel: 4 }),
    makeArticle({ id: 5, title: "D", recommendLevel: 4 })
  ]);

  assert.deepEqual(selected.map((article) => article.id), [2, 3, 4]);
});

test("selectVoiceDigestArticles prefers rich analysis over template commentary", () => {
  const templated = makeArticle({
    id: 10,
    title: "Macro heat rises",
    titleZh: "宏观热度升温",
    tags: ["宏观"],
    recommendLevel: 5,
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。",
    summary: "宏观热度升温",
    analysis: null
  });
  const rich = makeArticle({
    id: 11,
    recommendLevel: 4,
    createdAt: "2026-04-21T09:00:00.000Z"
  });

  const selected = selectVoiceDigestArticles([templated, rich], 1);

  assert.equal(selected[0]?.id, 11);
});

test("selectVoiceDigestArticles reduces duplicate topic keys", () => {
  const first = makeArticle({
    id: 20,
    title: "Nvidia AI chip orders expand",
    tags: ["AI芯片"],
    recommendLevel: 5
  });
  const duplicate = makeArticle({
    id: 21,
    title: "Nvidia AI chip orders expand again",
    tags: ["AI芯片"],
    recommendLevel: 4
  });
  const other = makeArticle({
    id: 22,
    title: "Uranium contract prices move higher",
    titleZh: "铀合约价格走高",
    tags: ["核能"],
    recommendLevel: 4
  });

  const selected = selectVoiceDigestArticles([duplicate, other, first], 3);

  assert.deepEqual(selected.map((article) => article.id), [20, 22]);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
node --import tsx --test tests/voice-digest-select.test.ts
```

Expected: FAIL because `@/lib/voice-digest/select` does not exist.

- [ ] **Step 3: Add shared voice digest types**

Create `lib/voice-digest/types.ts`:

```ts
import type { Article } from "@/lib/types";

export interface VoiceDigestScript {
  title: string;
  script: string;
  caption: string;
}

export interface VoiceDigestFiles {
  directory: string;
  scriptPath: string;
  audioPath: string;
}

export interface VoiceDigestRunResult {
  selectedArticles: Article[];
  script: VoiceDigestScript | null;
  files: VoiceDigestFiles | null;
  telegramSent: boolean;
  message: string;
}
```

- [ ] **Step 4: Implement selection**

Create `lib/voice-digest/select.ts`:

```ts
import { sortArticlesByQuality } from "@/lib/article-quality";
import type { Article } from "@/lib/types";

function normalizeTopicTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .slice(0, 5);
}

function topicKey(article: Article): string {
  const track = article.tags[0] ?? "宏观";
  const title = article.titleZh ?? article.title;
  const tokens = normalizeTopicTokens(title);
  return `${track}:${tokens.slice(0, 3).join("-")}`;
}

export function selectVoiceDigestArticles(articles: Article[], limit = 3): Article[] {
  const selected: Article[] = [];
  const seenTopics = new Set<string>();
  const candidates = sortArticlesByQuality(
    articles.filter((article) => article.source !== "GitHub Trending")
  );

  for (const article of candidates) {
    if (selected.length >= limit) {
      break;
    }

    const key = topicKey(article);
    if (seenTopics.has(key)) {
      continue;
    }

    selected.push(article);
    seenTopics.add(key);
  }

  return selected;
}
```

- [ ] **Step 5: Run the selection test and verify it passes**

Run:

```bash
node --import tsx --test tests/voice-digest-select.test.ts
```

Expected: PASS.

- [ ] **Step 6: Conditional commit**

If inside a git repo:

```bash
git add lib/voice-digest/types.ts lib/voice-digest/select.ts tests/voice-digest-select.test.ts
git commit -m "feat: add voice digest article selection"
```

If not inside a git repo, record these changed files in the implementation summary.

---

### Task 2: Script Generation

**Files:**
- Create: `lib/voice-digest/script.ts`
- Test: `tests/voice-digest-script.test.ts`

- [ ] **Step 1: Write parser and fallback tests**

Create `tests/voice-digest-script.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";

import { buildFallbackVoiceDigestScript, parseVoiceDigestJson } from "@/lib/voice-digest/script";
import type { Article } from "@/lib/types";

function makeArticle(overrides: Partial<Article>): Article {
  return {
    id: 1,
    title: "TSMC capacity update",
    titleZh: "台积电产能更新",
    url: "https://example.com/tsmc",
    source: "Reuters",
    date: "2026-04-21",
    publishedAt: "2026-04-21T08:00:00.000Z",
    tags: ["AI芯片"],
    zeroEval: "真正要听的是先进封装产能是否继续限制 AI 芯片交付，而不是单条新闻热度。",
    summary: "台积电先进封装产能继续被市场关注，AI 芯片交付节奏仍是核心变量。",
    recommendLevel: 4,
    obiRef: "bf-001",
    analysis: {
      eventNature: "供应约束信号",
      keyVariable: "先进封装扩产速度",
      transmission: "产能限制影响芯片交付，进一步影响云厂商资本开支预期",
      trap: "把扩产计划当成立刻释放的收入",
      falsifyPoint: "交付周期没有改善",
      profitOutlet: "先进封装收入",
      bull: "扩产继续兑现",
      bear: "需求先于产能降温"
    },
    pushedAt: null,
    pushedMorningAt: null,
    pushedEveningAt: null,
    createdAt: "2026-04-21T08:00:00.000Z",
    readAt: null,
    ...overrides
  };
}

test("parseVoiceDigestJson accepts fenced strict JSON", () => {
  const parsed = parseVoiceDigestJson(`\`\`\`json
{
  "title": "零零短播客",
  "script": "今天先看一个核心变量。",
  "caption": "零零短播客 · 1 条"
}
\`\`\``);

  assert.equal(parsed.title, "零零短播客");
  assert.equal(parsed.script, "今天先看一个核心变量。");
  assert.equal(parsed.caption, "零零短播客 · 1 条");
});

test("parseVoiceDigestJson rejects malformed script payload", () => {
  assert.throws(
    () => parseVoiceDigestJson("{\"title\":\"x\",\"script\":\"\",\"caption\":\"x\"}"),
    /Invalid voice digest script/
  );
});

test("buildFallbackVoiceDigestScript includes article facts and listening structure", () => {
  const script = buildFallbackVoiceDigestScript([makeArticle({ id: 7 })], "2026-04-21");

  assert.equal(script.title, "零零每日短播客 2026-04-21");
  assert.match(script.caption, /1 条核心摘要/);
  assert.match(script.script, /今天先抓一个主判断/);
  assert.match(script.script, /台积电产能更新/);
  assert.match(script.script, /误判陷阱/);
  assert.match(script.script, /接下来盯/);
});
```

- [ ] **Step 2: Run the script tests and verify they fail**

Run:

```bash
node --import tsx --test tests/voice-digest-script.test.ts
```

Expected: FAIL because `@/lib/voice-digest/script` does not exist.

- [ ] **Step 3: Implement script generation**

Create `lib/voice-digest/script.ts`:

```ts
import type { Article } from "@/lib/types";
import type { VoiceDigestScript } from "@/lib/voice-digest/types";

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function stripJsonFence(text: string): string {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fencedMatch ? fencedMatch[1].trim() : trimmed;
}

export function parseVoiceDigestJson(text: string): VoiceDigestScript {
  const parsed = JSON.parse(stripJsonFence(text)) as Record<string, unknown>;
  const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
  const script = typeof parsed.script === "string" ? parsed.script.trim() : "";
  const caption = typeof parsed.caption === "string" ? parsed.caption.trim() : "";

  if (!title || script.length < 10 || !caption) {
    throw new Error("Invalid voice digest script payload");
  }

  return {
    title: clip(title, 60),
    script,
    caption: clip(caption, 180)
  };
}

function articleTitle(article: Article): string {
  return article.titleZh?.trim() || article.title.trim();
}

function analysisLine(article: Article, field: keyof NonNullable<Article["analysis"]>, fallback: string): string {
  const value = article.analysis?.[field]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export function buildFallbackVoiceDigestScript(articles: Article[], date: string): VoiceDigestScript {
  const title = `零零每日短播客 ${date}`;
  const lines: string[] = [
    "今天先抓一个主判断：真正值得听的，不是新闻本身，而是这些信息会不会改变订单、成本、预期和风险定价。",
    ""
  ];

  articles.forEach((article, index) => {
    lines.push(`第 ${index + 1} 条，${articleTitle(article)}。`);
    lines.push(`发生了什么：${article.summary || article.zeroEval}`);
    lines.push(`为什么重要：${article.zeroEval}`);
    lines.push(`误判陷阱：${analysisLine(article, "trap", "不要把标题热度直接当成趋势确认。")}`);
    lines.push(`接下来盯：${analysisLine(article, "keyVariable", "后续数据、订单和管理层表述有没有同步变化。")}`);
    lines.push("");
  });

  lines.push("最后留一个观察任务：接下来二十四到七十二小时，先看这些变量有没有继续确认，再看价格反应。");

  return {
    title,
    script: lines.join("\n"),
    caption: `零零每日短播客 · ${articles.length} 条核心摘要 · ${date}`
  };
}

function buildPrompt(articles: Article[], date: string): string {
  const articleBlocks = articles
    .map((article, index) => {
      const analysis = article.analysis;
      return [
        `#${index + 1} ${articleTitle(article)}`,
        `来源：${article.source}`,
        `标签：${article.tags.join(" / ")}`,
        `摘要：${clip(article.summary, 500)}`,
        `零零判断：${clip(article.zeroEval, 500)}`,
        `事件性质：${analysis?.eventNature ?? ""}`,
        `关键变量：${analysis?.keyVariable ?? ""}`,
        `误判陷阱：${analysis?.trap ?? ""}`,
        `最早证伪点：${analysis?.falsifyPoint ?? ""}`,
        `利润兑现口：${analysis?.profitOutlet ?? ""}`
      ].join("\n");
    })
    .join("\n\n");

  return `
你是「零零每日短播客」的撰稿人。请把下面文章改写成适合中文 TTS 朗读的短播客稿。

要求：
- 输出严格 JSON，不要输出任何额外文字
- 字段为 title, script, caption
- script 用自然口语，适合听，不要像网页摘要
- 风格冷静、清楚、有轻微零零人格，不夸张
- 不要给投资建议，不要说买入卖出
- 结构：开场主判断 → 每条发生了什么/为什么重要/误判陷阱/接下来盯什么 → 结尾观察任务
- 总时长目标 3 到 6 分钟

日期：${date}

文章：
${articleBlocks}
`;
}

export async function generateVoiceDigestScript(articles: Article[], date: string): Promise<VoiceDigestScript> {
  const fallback = buildFallbackVoiceDigestScript(articles, date);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return fallback;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1800,
      messages: [{ role: "user", content: buildPrompt(articles, date) }]
    })
  });

  if (!response.ok) {
    return fallback;
  }

  const payload = (await response.json()) as AnthropicResponse;
  const text = payload.content?.[0]?.text;
  if (!text) {
    return fallback;
  }

  try {
    return parseVoiceDigestJson(text);
  } catch {
    return fallback;
  }
}
```

- [ ] **Step 4: Run the script tests and verify they pass**

Run:

```bash
node --import tsx --test tests/voice-digest-script.test.ts
```

Expected: PASS.

- [ ] **Step 5: Conditional commit**

If inside a git repo:

```bash
git add lib/voice-digest/script.ts tests/voice-digest-script.test.ts
git commit -m "feat: add voice digest script generation"
```

If not inside a git repo, record these changed files in the implementation summary.

---

### Task 3: Audio and Telegram Delivery

**Files:**
- Create: `lib/voice-digest/audio.ts`
- Create: `lib/voice-digest/telegram.ts`

- [ ] **Step 1: Add audio generation module**

Create `lib/voice-digest/audio.ts`:

```ts
import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import type { VoiceDigestFiles, VoiceDigestScript } from "@/lib/voice-digest/types";

const execFileAsync = promisify(execFile);

function safeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "voice-digest";
}

export async function generateVoiceDigestAudio(script: VoiceDigestScript, date: string): Promise<VoiceDigestFiles> {
  const directory = path.join(process.cwd(), "tmp", "voice-digests", date);
  await mkdir(directory, { recursive: true });

  const slug = safeSlug(script.title);
  const scriptPath = path.join(directory, `${slug}.txt`);
  const audioPath = path.join(directory, `${slug}.m4a`);

  await writeFile(scriptPath, script.script, "utf8");
  await execFileAsync("say", ["-f", scriptPath, "-o", audioPath]);

  return { directory, scriptPath, audioPath };
}
```

- [ ] **Step 2: Add Telegram delivery module**

Create `lib/voice-digest/telegram.ts`:

```ts
import { readFile } from "node:fs/promises";
import path from "node:path";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export function getTelegramConfigFromEnv(): TelegramConfig | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
}

export async function sendTelegramAudio(config: TelegramConfig, audioPath: string, caption: string): Promise<void> {
  const audio = await readFile(audioPath);
  const form = new FormData();
  form.set("chat_id", config.chatId);
  form.set("caption", caption);
  form.set(
    "audio",
    new Blob([audio], { type: "audio/mp4" }),
    path.basename(audioPath)
  );

  const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendAudio`, {
    method: "POST",
    body: form
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendAudio failed: ${response.status} ${response.statusText} ${body}`);
  }
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 4: Manually verify macOS TTS command shape**

Run:

```bash
mkdir -p tmp/voice-digests/manual
printf '零零测试。今天只确认本机语音可以生成。' > tmp/voice-digests/manual/test.txt
say -f tmp/voice-digests/manual/test.txt -o tmp/voice-digests/manual/test.m4a
ls -lh tmp/voice-digests/manual/test.m4a
```

Expected: `test.m4a` exists and is non-empty.

- [ ] **Step 5: Conditional commit**

If inside a git repo:

```bash
git add lib/voice-digest/audio.ts lib/voice-digest/telegram.ts
git commit -m "feat: add local audio and telegram delivery"
```

If not inside a git repo, record these changed files in the implementation summary.

---

### Task 4: Orchestration and CLI

**Files:**
- Create: `lib/voice-digest/index.ts`
- Create: `scripts/voice_digest.ts`
- Modify: `package.json`

- [ ] **Step 1: Add orchestrator**

Create `lib/voice-digest/index.ts`:

```ts
import { getTodayUnreadArticles } from "@/lib/db";
import { todayDateString } from "@/lib/time";
import { generateVoiceDigestAudio } from "@/lib/voice-digest/audio";
import { generateVoiceDigestScript } from "@/lib/voice-digest/script";
import { selectVoiceDigestArticles } from "@/lib/voice-digest/select";
import { getTelegramConfigFromEnv, sendTelegramAudio } from "@/lib/voice-digest/telegram";
import type { VoiceDigestRunResult } from "@/lib/voice-digest/types";

export async function runVoiceDigest(): Promise<VoiceDigestRunResult> {
  const date = todayDateString();
  const articles = await getTodayUnreadArticles(date);
  const selectedArticles = selectVoiceDigestArticles(articles, 3);

  if (selectedArticles.length === 0) {
    return {
      selectedArticles,
      script: null,
      files: null,
      telegramSent: false,
      message: "No voice digest articles available."
    };
  }

  const script = await generateVoiceDigestScript(selectedArticles, date);
  const files = await generateVoiceDigestAudio(script, date);
  const telegramConfig = getTelegramConfigFromEnv();

  if (!telegramConfig) {
    return {
      selectedArticles,
      script,
      files,
      telegramSent: false,
      message: "Generated voice digest locally. TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing, so Telegram send was skipped."
    };
  }

  await sendTelegramAudio(telegramConfig, files.audioPath, script.caption);

  return {
    selectedArticles,
    script,
    files,
    telegramSent: true,
    message: "Voice digest generated and sent to Telegram."
  };
}
```

- [ ] **Step 2: Add CLI entry point**

Create `scripts/voice_digest.ts`:

```ts
import { loadEnvConfig } from "@next/env";

import { runVoiceDigest } from "@/lib/voice-digest";

loadEnvConfig(process.cwd());

try {
  const result = await runVoiceDigest();
  console.log(result.message);
  console.log(`selected=${result.selectedArticles.length}`);

  if (result.script) {
    console.log(`title=${result.script.title}`);
  }

  if (result.files) {
    console.log(`script=${result.files.scriptPath}`);
    console.log(`audio=${result.files.audioPath}`);
  }

  console.log(`telegramSent=${result.telegramSent ? "yes" : "no"}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`voice-digest failed: ${message}`);
  process.exitCode = 1;
}
```

- [ ] **Step 3: Add npm scripts**

Modify `package.json` scripts block so it includes:

```json
"voice-digest": "tsx scripts/voice_digest.ts",
"test:voice-digest": "node --import tsx --test tests/voice-digest-select.test.ts tests/voice-digest-script.test.ts"
```

Keep all existing scripts unchanged.

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm run test:voice-digest
```

Expected: PASS.

- [ ] **Step 5: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Dry run without Telegram env**

Run:

```bash
npm run voice-digest
```

Expected:

- If articles exist: command prints selected count, title, script path, audio path, and `telegramSent=no`.
- If no articles exist: command prints `No voice digest articles available.` and exits cleanly.

- [ ] **Step 7: Conditional commit**

If inside a git repo:

```bash
git add lib/voice-digest/index.ts scripts/voice_digest.ts package.json package-lock.json
git commit -m "feat: add voice digest cli"
```

If not inside a git repo, record these changed files in the implementation summary.

---

### Task 5: Telegram Verification and Documentation Note

**Files:**
- Modify: `docs/superpowers/specs/2026-04-21-telegram-voice-digest-design.md`
- Optional create: `docs/voice-digest.md` if a user-facing short note is preferred during implementation.

- [ ] **Step 1: Add a concise run note to the spec**

Append this section to `docs/superpowers/specs/2026-04-21-telegram-voice-digest-design.md`:

````md
## Local Run Notes

Manual command:

```bash
npm run voice-digest
```

For Telegram delivery, provide these environment variables through `.env.local` or the shell:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `ANTHROPIC_API_KEY` for model-written scripts; without it the command uses the deterministic fallback script

The first version generates files under `tmp/voice-digests/` and runs only on macOS because it uses the built-in `say` command.
````

- [ ] **Step 2: Run a Telegram-enabled manual test**

Run with real env already configured:

```bash
npm run voice-digest
```

Expected:

- `telegramSent=yes`
- one audio message arrives in the configured Telegram chat
- generated `.txt` and `.m4a` paths are printed

- [ ] **Step 3: Run final verification**

Run:

```bash
npm run test:voice-digest
npm run typecheck
```

Expected: both PASS.

- [ ] **Step 4: Conditional commit**

If inside a git repo:

```bash
git add docs/superpowers/specs/2026-04-21-telegram-voice-digest-design.md
git commit -m "docs: add voice digest run notes"
```

If not inside a git repo, record the documentation change in the implementation summary.

---

## Self-Review

Spec coverage:

- Article selection: Task 1.
- Model rewrite into listenable "零零电台" script: Task 2.
- Free local macOS TTS: Task 3.
- Telegram delivery: Task 3 and Task 5.
- Manual `npm run voice-digest`: Task 4.
- Missing Telegram env dry-run behavior: Task 4.
- No paid TTS, no Vercel audio generation, no scheduling: preserved as non-goals.

Placeholder scan:

- The plan contains no `TBD`, `TODO`, or "implement later" placeholders.
- Optional scheduling is explicitly excluded from this plan.

Type consistency:

- `VoiceDigestScript`, `VoiceDigestFiles`, and `VoiceDigestRunResult` are defined before use.
- `selectVoiceDigestArticles`, `generateVoiceDigestScript`, `generateVoiceDigestAudio`, `sendTelegramAudio`, and `runVoiceDigest` signatures match their consumers.
