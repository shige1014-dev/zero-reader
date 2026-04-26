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
    "今天先抓一个主判断。别急着记新闻标题，先听它到底会不会改变订单、成本、预期和风险定价。",
    ""
  ];

  articles.forEach((article, index) => {
    lines.push(`第 ${index + 1} 条，${articleTitle(article)}。`);
    lines.push(`发生了什么。${article.summary || article.zeroEval}`);
    lines.push(`为什么要听。${article.zeroEval}`);
    lines.push(`这里最容易听错的地方是：${analysisLine(article, "trap", "不要把标题热度直接当成趋势确认。")}`);
    lines.push(`接下来盯这个变量：${analysisLine(article, "keyVariable", "后续数据、订单和管理层表述有没有同步变化。")}`);
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
- script 用自然口语，适合听，不要像网页摘要，不要像研报
- 多用短句。少用冒号。避免连续长定语
- 风格冷静、清楚、有轻微零零人格，不夸张
- 可以像一个研究搭子在路上给我讲重点
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
