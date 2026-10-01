const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Check whether text violates OpenAI's usage policies.
 */
async function moderateContent(text) {
  const response = await openai.moderations.create({
    input: text,
  });
  return response.results[0];
}

/**
 * Returns true if the text is flagged by the moderation API.
 */
async function isFlagged(text) {
  const result = await moderateContent(text);
  return result.flagged;
}

module.exports = { moderateContent, isFlagged };
