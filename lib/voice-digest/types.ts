import type { Article } from "@/lib/types";

export interface VoiceDigestScript {
  title: string;
  script: string;
  caption: string;
}

export interface VoiceDigestFiles {
  directory: string;
  scriptPath: string;
  sourceAudioPath: string;
  audioPath: string;
}

export interface VoiceDigestRunResult {
  selectedArticles: Article[];
  script: VoiceDigestScript | null;
  files: VoiceDigestFiles | null;
  telegramSent: boolean;
  message: string;
}
