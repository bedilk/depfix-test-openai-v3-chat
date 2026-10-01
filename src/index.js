require("dotenv").config();
const express = require("express");
const { sendMessage } = require("./chat");
const { createEmbedding } = require("./embeddings");
const { isFlagged } = require("./moderations");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "message required" });

  if (await isFlagged(message)) {
    return res.status(422).json({ error: "message flagged by moderation" });
  }

  const reply = await sendMessage(message);
  res.json({ reply });
});

app.post("/embed", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text required" });

  const embedding = await createEmbedding(text);
  res.json({ embedding, dimensions: embedding.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on :${PORT}`));
