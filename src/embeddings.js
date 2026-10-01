const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Create a single text embedding vector.
 */
async function createEmbedding(text) {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data.data[0].embedding;
}

/**
 * Create embeddings for a batch of texts.
 */
async function createBatchEmbeddings(texts) {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: texts,
  });
  return response.data.data.map((item) => item.embedding);
}

/**
 * Compute cosine similarity between two embedding vectors.
 */
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

module.exports = { createEmbedding, createBatchEmbeddings, cosineSimilarity };
