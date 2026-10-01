# openai-chat-app

A simple Express API that wraps the OpenAI chat, embeddings, and moderation APIs.

> **⚠️ Intentionally outdated for depfix testing.**
> This repo uses `openai@3.3.0` and the legacy `Configuration` + `OpenAIApi` classes.
> It is a test fixture for [depfix](https://github.com/bedilk/depfix), which should
> detect the version drift to `openai@4.x` and generate PRs to migrate the call sites.

## What depfix should detect

| Scenario | Expected outcome |
|---|---|
| Version drift | `openai 3.3.0` → current `4.x` |
| `openai.createChatCompletion()` in `src/chat.js` | ACTIONABLE — migrate to `client.chat.completions.create()` |
| `openai.createEmbedding()` in `src/embeddings.js` | ACTIONABLE — migrate to `client.embeddings.create()` |
| `openai.createModeration()` in `src/moderations.js` | ACTIONABLE — migrate to `client.moderations.create()` |

## Endpoints

- `POST /chat` — `{ "message": "..." }` → `{ "reply": "..." }`
- `POST /embed` — `{ "text": "..." }` → `{ "embedding": [...], "dimensions": 1536 }`

## Setup

```bash
cp .env.example .env  # add your OPENAI_API_KEY
npm install
npm start
```
