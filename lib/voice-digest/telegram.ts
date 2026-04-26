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

export function audioMimeType(audioPath: string): string {
  return path.extname(audioPath).toLowerCase() === ".mp3" ? "audio/mpeg" : "audio/mp4";
}

export async function sendTelegramAudio(config: TelegramConfig, audioPath: string, caption: string): Promise<void> {
  const audio = await readFile(audioPath);
  const form = new FormData();
  form.set("chat_id", config.chatId);
  form.set("caption", caption);
  form.set("audio", new Blob([audio], { type: audioMimeType(audioPath) }), path.basename(audioPath));

  const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendAudio`, {
    method: "POST",
    body: form
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendAudio failed: ${response.status} ${response.statusText} ${body}`);
  }
}
