const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Send a single-turn chat message and return the assistant reply.
 */
async function sendMessage(userMessage, systemPrompt = "You are a helpful assistant.") {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });
  return response.choices[0].message.content;
}

/**
 * Send a multi-turn conversation and return the assistant reply.
 */
async function sendConversation(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  });
  return response.choices[0].message;
}

/**
 * Stream a chat response using the v6 streaming helper.
 * openai.chat.completions.stream() was reworked in v7 — see CHANGELOG.md.
 */
async function streamChat(messages, onChunk) {
  const stream = openai.beta.chat.completions.stream({
    model: "gpt-4",
    messages: messages,
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) onChunk(token);
  }

  return stream.finalChatCompletion();
}

module.exports = { sendMessage, sendConversation, streamChat };
