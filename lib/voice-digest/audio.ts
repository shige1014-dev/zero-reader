import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import type { VoiceDigestFiles, VoiceDigestScript } from "@/lib/voice-digest/types";

const execFileAsync = promisify(execFile);

type TtsProvider = "apple" | "edge";

interface VoiceDigestTtsConfig {
  provider: TtsProvider;
  voice: string;
  rate: string;
}

interface VoiceDigestTtsEnv {
  VOICE_DIGEST_TTS?: string;
  VOICE_DIGEST_VOICE?: string;
  VOICE_DIGEST_RATE?: string;
}

function safeSlug(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "voice-digest"
  );
}

export function buildVoiceDigestAudioPaths(title: string, date: string, root = process.cwd()): VoiceDigestFiles {
  const directory = path.join(root, "tmp", "voice-digests", date);
  const slug = safeSlug(title);
  return {
    directory,
    scriptPath: path.join(directory, `${slug}.txt`),
    sourceAudioPath: path.join(directory, `${slug}.aiff`),
    audioPath: path.join(directory, `${slug}.mp3`)
  };
}

export function resolveVoiceDigestTtsConfig(env?: VoiceDigestTtsEnv): VoiceDigestTtsConfig {
  const source = env ?? {
    VOICE_DIGEST_TTS: process.env.VOICE_DIGEST_TTS,
    VOICE_DIGEST_VOICE: process.env.VOICE_DIGEST_VOICE,
    VOICE_DIGEST_RATE: process.env.VOICE_DIGEST_RATE
  };
  const provider = source.VOICE_DIGEST_TTS?.trim().toLowerCase() === "edge" ? "edge" : "apple";
  return {
    provider,
    voice: source.VOICE_DIGEST_VOICE?.trim() || (provider === "edge" ? "zh-CN-YunxiNeural" : "Tingting"),
    rate: source.VOICE_DIGEST_RATE?.trim() || (provider === "edge" ? "+0%" : "165")
  };
}

export async function generateVoiceDigestAudio(script: VoiceDigestScript, date: string): Promise<VoiceDigestFiles> {
  const files = buildVoiceDigestAudioPaths(script.title, date);
  const tts = resolveVoiceDigestTtsConfig();
  await mkdir(files.directory, { recursive: true });

  await writeFile(files.scriptPath, script.script, "utf8");
  if (tts.provider === "edge") {
    await execFileAsync("edge-tts", [
      "--file",
      files.scriptPath,
      "--voice",
      tts.voice,
      "--rate",
      tts.rate,
      "--write-media",
      files.audioPath
    ]);
  } else {
    await execFileAsync("say", ["-v", tts.voice, "-r", tts.rate, "-f", files.scriptPath, "-o", files.sourceAudioPath]);
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      files.sourceAudioPath,
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "64k",
      files.audioPath
    ]);
  }

  return files;
}
