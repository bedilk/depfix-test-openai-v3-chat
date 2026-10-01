# Changelog

## [Unreleased] — Migration to openai@4

This application is pinned to `openai@3.3.0`. The following changes are required to
migrate to the current v4 SDK. This information is here as a **medium-difficulty**
structured guide — the same information also exists in verbose prose form in the
openai v4.0.0 GitHub release notes.

### Breaking changes in openai@4.0.0

**1. Client instantiation**

| Before (v3) | After (v4) |
|---|---|
| `const { Configuration, OpenAIApi } = require("openai")` | `const OpenAI = require("openai")` |
| `const configuration = new Configuration({ apiKey })` | — |
| `const openai = new OpenAIApi(configuration)` | `const client = new OpenAI({ apiKey })` |

**2. Chat completions**

| Before (v3) | After (v4) |
|---|---|
| `openai.createChatCompletion({ model, messages })` | `client.chat.completions.create({ model, messages })` |
| `response.data.choices[0].message.content` | `response.choices[0].message.content` |

**3. Embeddings**

| Before (v3) | After (v4) |
|---|---|
| `openai.createEmbedding({ model, input })` | `client.embeddings.create({ model, input })` |
| `response.data.data[0].embedding` | `response.data[0].embedding` |

**4. Moderations**

| Before (v3) | After (v4) |
|---|---|
| `openai.createModeration({ input })` | `client.moderations.create({ input })` |
| `response.data.results[0]` | `response.results[0]` |

**5. Streaming**

The streaming API was completely redesigned in v4. Instead of a raw event-stream
response, v4 returns an async iterable via `stream: true` and
`client.chat.completions.create()`.

## [1.0.0] — 2024-01-15

- Initial release
- Chat endpoint using GPT-3.5-turbo and GPT-4
- Batch and single text embeddings
- Content moderation pre-flight check
