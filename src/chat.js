const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Send a single-turn chat message and return the assistant reply.
 */
async function sendMessage(userMessage, systemPrompt = "You are a helpful assistant.") {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });
  return response.data.choices[0].message.content;
}

/**
 * Send a multi-turn conversation and return the assistant reply.
 */
async function sendConversation(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  });
  return response.data.choices[0].message;
}

/**
 * Stream a chat response, calling onChunk with each token.
 */
async function streamChat(messages, onChunk) {
  const response = await openai.createChatCompletion(
    {
      model: "gpt-4",
      messages: messages,
      stream: true,
    },
    { responseType: "stream" }
  );

  response.data.on("data", (data) => {
    const lines = data
      .toString()
      .split("\n")
      .filter((line) => line.trim() !== "");
    for (const line of lines) {
      const message = line.replace(/^data: /, "");
      if (message === "[DONE]") return;
      try {
        const parsed = JSON.parse(message);
        const token = parsed.choices[0]?.delta?.content;
        if (token) onChunk(token);
      } catch {}
    }
  });
}

module.exports = { sendMessage, sendConversation, streamChat };
