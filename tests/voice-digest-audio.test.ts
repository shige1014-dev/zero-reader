import test from "node:test";
import assert from "node:assert/strict";

import { buildVoiceDigestAudioPaths, resolveVoiceDigestTtsConfig } from "@/lib/voice-digest/audio";
import { audioMimeType } from "@/lib/voice-digest/telegram";

test("buildVoiceDigestAudioPaths uses mp3 as the final Telegram audio format", () => {
  const paths = buildVoiceDigestAudioPaths("零零 测试", "2026-04-21", "/repo");

  assert.equal(paths.audioPath, "/repo/tmp/voice-digests/2026-04-21/零零-测试.mp3");
  assert.equal(paths.sourceAudioPath, "/repo/tmp/voice-digests/2026-04-21/零零-测试.aiff");
  assert.equal(paths.scriptPath, "/repo/tmp/voice-digests/2026-04-21/零零-测试.txt");
});

test("audioMimeType sends mp3 files as audio/mpeg", () => {
  assert.equal(audioMimeType("/tmp/digest.mp3"), "audio/mpeg");
});

test("resolveVoiceDigestTtsConfig supports Edge Yunxi voice", () => {
  const config = resolveVoiceDigestTtsConfig({
    VOICE_DIGEST_TTS: "edge",
    VOICE_DIGEST_VOICE: "zh-CN-YunxiNeural",
    VOICE_DIGEST_RATE: "+0%"
  });

  assert.deepEqual(config, {
    provider: "edge",
    voice: "zh-CN-YunxiNeural",
    rate: "+0%"
  });
});
