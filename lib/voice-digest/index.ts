import { todayDateString } from "@/lib/time";
import { getVoiceDigestCandidateArticles } from "@/lib/voice-digest/articles";
import { generateVoiceDigestAudio } from "@/lib/voice-digest/audio";
import { generateVoiceDigestScript } from "@/lib/voice-digest/script";
import { selectVoiceDigestArticles } from "@/lib/voice-digest/select";
import { getTelegramConfigFromEnv, sendTelegramAudio } from "@/lib/voice-digest/telegram";
import type { VoiceDigestRunResult } from "@/lib/voice-digest/types";

export async function runVoiceDigest(): Promise<VoiceDigestRunResult> {
  const date = todayDateString();
  const articles = await getVoiceDigestCandidateArticles(date);
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
