const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Check whether text violates OpenAI's usage policies.
 * Returns the moderation result object.
 */
async function moderateContent(text) {
  const response = await openai.createModeration({
    input: text,
  });
  return response.data.results[0];
}

/**
 * Returns true if the text is flagged by the moderation API.
 */
async function isFlagged(text) {
  const result = await moderateContent(text);
  return result.flagged;
}

module.exports = { moderateContent, isFlagged };
