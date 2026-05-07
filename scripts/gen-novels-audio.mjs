#!/usr/bin/env node
/**
 * 未来世界 10 章 TTS 批量生成
 * 用 OpenAI tts-1, voice=nova
 * 每章拼成一个 mp3, 写到 public/audio/future-world/<id>.mp3
 *
 * 用法: node scripts/gen-novels-audio.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Load OPENAI_API_KEY from .env.local
const envPath = path.join(ROOT, ".env.local");
const env = fs.readFileSync(envPath, "utf-8");
const KEY = env.split("\n").find((l) => l.startsWith("OPENAI_API_KEY="))?.split("=", 2)[1]?.trim();
if (!KEY) {
  console.error("❌ OPENAI_API_KEY 未在 .env.local");
  process.exit(1);
}

// Compile TS data file via tsx (or load via dynamic require approach)
// 简单做法: 直接读 ts 源文件 + parse template literals
const dataFile = path.join(ROOT, "lib/novels/future-world.ts");
const dataText = fs.readFileSync(dataFile, "utf-8");

// Extract chapters by regex (id + body)
const chapters = [];
// match { id: "ch01-...", ... wordCount: N, body: `...` }, with body ending at "  }" before "," or "]"
const re = /\{\s*id:\s*"(ch\d+-[a-z-]+)"[\s\S]*?body:\s*`([\s\S]+?)`\s*\}/g;
let m;
while ((m = re.exec(dataText)) !== null) {
  chapters.push({ id: m[1], body: m[2] });
}
console.log(`📖 解析到 ${chapters.length} 章`);
if (chapters.length !== 10) {
  console.error(`⚠️ 期望 10 章, 实际 ${chapters.length}`);
}

// Clean body for TTS — strip blockquote ">", strip extra whitespace
function cleanForTTS(body) {
  return body
    .split("\n")
    .map((line) => line.replace(/^\s*>\s?/, "").trim())  // strip > markers
    .filter((line) => line.length > 0)
    .join("\n");
}

// Split into chunks <= 4000 chars on paragraph boundary
function chunkText(text, maxLen = 4000) {
  const paras = text.split(/\n\n+/).filter(Boolean);
  const chunks = [];
  let cur = "";
  for (const p of paras) {
    if (cur.length + p.length + 2 > maxLen && cur.length > 0) {
      chunks.push(cur);
      cur = p;
    } else {
      cur += (cur.length > 0 ? "\n\n" : "") + p;
    }
  }
  if (cur.length > 0) chunks.push(cur);
  return chunks;
}

// Call OpenAI TTS
async function tts(text) {
  const r = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tts-1", voice: "nova", input: text, response_format: "mp3" }),
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`HTTP ${r.status}: ${txt.slice(0, 300)}`);
  }
  return Buffer.from(await r.arrayBuffer());
}

// Main
const outDir = path.join(ROOT, "public/audio/future-world");
fs.mkdirSync(outDir, { recursive: true });

let totalChars = 0;
let totalBytes = 0;
let totalChunks = 0;

for (const ch of chapters) {
  const outFile = path.join(outDir, `${ch.id}.mp3`);
  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
    console.log(`⏭️  ${ch.id}.mp3 已存在 (${(fs.statSync(outFile).size / 1024).toFixed(0)} KB), 跳过`);
    continue;
  }

  const cleaned = cleanForTTS(ch.body);
  const chunks = chunkText(cleaned, 4000);
  totalChars += cleaned.length;

  console.log(`🎙  ${ch.id}: ${cleaned.length} chars → ${chunks.length} 块`);

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`    chunk ${i + 1}/${chunks.length} ...`);
    const buf = await tts(chunks[i]);
    buffers.push(buf);
    totalChunks++;
    process.stdout.write(` ${(buf.length / 1024).toFixed(0)} KB\n`);
  }

  // Concatenate mp3 buffers (works for tts-1 same encoder)
  const merged = Buffer.concat(buffers);
  fs.writeFileSync(outFile, merged);
  totalBytes += merged.length;
  console.log(`    ✅ ${outFile.replace(ROOT, "")} (${(merged.length / 1024 / 1024).toFixed(2)} MB)`);
}

const cost = (totalChars / 1_000_000) * 15;
console.log("");
console.log("════════════════════════════════════");
console.log(`总字符: ${totalChars}`);
console.log(`总块数: ${totalChunks}`);
console.log(`总体积: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`估算成本: $${cost.toFixed(3)} USD (tts-1)`);
console.log("════════════════════════════════════");
