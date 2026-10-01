const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Create a single text embedding vector.
 */
async function createEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Create embeddings for a batch of texts.
 */
async function createBatchEmbeddings(texts) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: texts,
  });
  return response.data.map((item) => item.embedding);
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
