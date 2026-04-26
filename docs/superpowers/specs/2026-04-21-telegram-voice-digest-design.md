# Telegram Voice Digest Design

## Goal

Turn the existing zerozero-reader daily article pool into a small "零零每日短播客": a 3-6 minute Chinese audio digest sent to Telegram. The first version should be free to run, easy to trigger manually, and scoped to one local workflow.

This is not a full podcast platform. It is a delivery layer for the most valuable daily reading items.

## User Experience

The user runs one local command, for example `npm run voice-digest`.

The command:

1. Reads today's article candidates from the existing database.
2. Selects the best 1-3 articles.
3. Asks the model to rewrite them into an ear-friendly Chinese script.
4. Uses macOS built-in TTS to generate an audio file.
5. Sends the audio file to the configured Telegram chat.

The Telegram message should include the audio plus a short text caption with the episode title and article count.

## Podcast Style

The output should not be a direct reading of article summaries.

The model should write in a "零零电台" style:

- calm, clear, and lightly personable
- closer to a research companion than a formal news anchor
- structured for listening, not scanning
- judgment-first, with minimal setup
- no financial advice phrasing
- no exaggerated radio-host performance

Each episode should follow this shape:

1. Opening judgment: one sentence explaining the day's main signal.
2. Core items: 1-3 article segments.
3. Each segment: what happened, why it matters, common misread, what to watch next.
4. Closing task: one concrete observation target for the next 24-72 hours.

## Article Selection

Selection should reuse existing quality signals instead of introducing a new ranking system.

Inputs:

- `recommendLevel`
- `summary`
- `zeroEval`
- `analysis`
- source quality via `article-quality.ts`
- existing push-slot state where useful

Rules:

- Exclude `GitHub Trending`.
- Prefer articles with non-template `zeroEval`.
- Prefer articles with distinct `summary`.
- Prefer articles with `analysis_json` because those support stronger spoken structure.
- Avoid repeating near-duplicate topics.
- Cap the first version at 3 articles.

The first implementation can select from today's unread or pushable articles. If today's pool is empty, it may fall back to the newest available unread date, matching the current reader behavior.

## Script Generation

Add a dedicated script-writing module, separate from article ingestion.

Input:

- selected articles
- `titleZh`
- `summary`
- `zeroEval`
- `analysis`
- tags and source metadata

Output:

- `title`: short Chinese episode title
- `script`: plain Chinese text optimized for TTS
- `caption`: short Telegram caption

The prompt should ask the model to produce strict JSON so the CLI can parse it. If model generation fails, the script should fall back to a deterministic template using existing summaries and zero evaluations.

## Audio Generation

Use macOS built-in `say` for the free first version.

Pipeline:

1. Write the script to a temporary text file under a local generated output directory.
2. Run `say` to produce an audio file.
3. Prefer an audio format Telegram accepts directly.
4. Keep generated files under a predictable ignored path, such as `tmp/voice-digests/`.

This means the first version is local-only. Vercel cron should not be responsible for audio generation.

## Telegram Delivery

Use Telegram Bot API from the local CLI.

Required environment variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Behavior:

- If Telegram variables are missing, generate the script and audio locally but skip sending with a clear console message.
- If sending fails, do not mark anything as delivered.
- The first version does not need a new database delivery table.

## Command Surface

Add a local command:

```json
"voice-digest": "tsx scripts/voice_digest.ts"
```

Optional flags may be added later, but the first version can rely on environment variables and sane defaults.

## Error Handling

The command should fail softly at each external boundary:

- missing article pool: print a clear "nothing to send" message
- model unavailable: use deterministic fallback script
- TTS failure: stop before Telegram send
- Telegram failure: report response status and leave generated files for inspection

The workflow should avoid partially claiming success. Audio generation and Telegram sending should be logged as separate steps.

## Testing

Add focused tests for pure logic:

- article selection chooses high-quality articles first
- duplicate topics are reduced
- fallback script includes the core article facts
- model output parser rejects malformed JSON safely

Manual verification for the first pass:

- `npm run typecheck`
- local dry run without Telegram env
- local run with Telegram env, confirming one audio arrives

## Non-Goals

- No RSS podcast feed.
- No public audio hosting.
- No paid TTS service.
- No Vercel-hosted audio generation.
- No multi-voice conversation in the first version.
- No automatic schedule until the manual command is reliable.

## Open Implementation Notes

- The current repo is not a git repository in this workspace, so this spec cannot be committed here.
- `zerozero-reader` already has article quality sorting and push-slot state; this feature should reuse them.
- The existing ingestion file has selection logic embedded inside `lib/ingest.ts`; implementation should consider extracting reusable pure selection helpers instead of duplicating the logic.

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
