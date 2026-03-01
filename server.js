import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Your OpenRouter key

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

// =============================
// AI TIP ENDPOINT (STABLE)
// =============================
app.get("/tip", async (req, res) => {
  try {
    const { topic, concept } = req.query;

    console.log("TIP REQUEST:", topic, concept);

    // ✅ strong contextual prompt (this was the working one)
    const prompt = `
You are a coding tutor.

Give ONE short practical learning tip (max 12 words).

Topic: ${topic}
Concept: ${concept || "general"}

Return ONLY the tip sentence.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "user", content: prompt }
          ],
          max_tokens: 40
        })
      }
    );

    const data = await response.json();

    console.log("AI RAW:", JSON.stringify(data));

    const tip =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Practice coding consistently.";

    res.json({ tip });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.json({ tip: "Practice coding consistently." });
  }
});

app.listen(5000, () => {
  console.log("AI server running on http://localhost:5000");
});

