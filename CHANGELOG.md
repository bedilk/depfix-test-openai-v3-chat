# Changelog

## Intentionally pinned to openai v6.49.0

> **⚠️ For depfix end-to-end testing.**
> This repo uses `openai@6.49.0` — one major version behind `openai@7.x`.
> depfix should detect the single-major drift (6 → 7) and propose a PR.

### Known v6 → v7 migration notes

| Old (v6) | New (v7) | Notes |
|---|---|---|
| `openai.beta.chat.completions.stream()` | `openai.chat.completions.stream()` (moved out of beta) | Stream helper promoted from beta namespace |
| `stream.finalChatCompletion()` | `stream.finalMessage()` | Renamed for clarity |
| `ChatCompletionStreamingRunner` | Removed — use `Stream<ChatCompletionChunk>` directly | Breaking: runner type removed |

### Migration difficulty: medium
OpenAI publishes structured release notes and TypeScript exports diffs.
The v6→v7 diff is small: mostly the beta stream API promotion.
depfix can ground this from the npm TS exports diff and GitHub releases.
