import { loadEnvConfig } from "@next/env";

import { runVoiceDigest } from "@/lib/voice-digest";

loadEnvConfig(process.cwd());

async function main(): Promise<void> {
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
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`voice-digest failed: ${message}`);
  process.exitCode = 1;
});
