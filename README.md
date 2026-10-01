# openai-chat-app

An Express API using the OpenAI SDK for chat, embeddings, and moderation.

> **⚠️ Intentionally one major version behind for depfix testing.**
> This repo uses `openai@6.49.0` — one major version behind `openai@7.x`.
> It is a test fixture for [depfix](https://github.com/bedilk/depfix).

## What depfix should detect

| Scenario | Expected outcome |
|---|---|
| Version drift | `openai 6.49.0` → `7.x` (one major step) |
| `openai.beta.chat.completions.stream()` | ACTIONABLE — promoted out of beta in v7 |
| `stream.finalChatCompletion()` | ACTIONABLE — renamed to `stream.finalMessage()` in v7 |

## Feed difficulty

**Medium**: OpenAI publishes TypeScript exports diffs and structured release notes.
The v6→v7 step is a single major with a small, groundable surface diff.

## Setup

```bash
cp .env.example .env
npm install
npm start
```
