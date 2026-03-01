import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

// =============================
// AI TIP ENDPOINT
// =============================

app.get("/tip", async (req, res) => {
  try {
    const { topic, concept } = req.query;

    console.log("TIP REQUEST:", topic, concept);

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
          messages: [{ role: "user", content: prompt }],
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


app.get("/quiz", async (req, res) => {
  try {
    const topics = [
      "arrays",
      "linked list",
      "stack",
      "queue",
      "binary tree",
      "graph",
      "sorting",
      "recursion",
      "dynamic programming",
      "hashing"
    ];

    const randomTopic =
      topics[Math.floor(Math.random() * topics.length)];

    const prompt = `
Generate ONE ${randomTopic} MCQ.

Return STRICT JSON:
{
 "question": "...",
 "options": ["A","B","C","D"],
 "answerIndex": 0,
 "explanation": "..."
}

Avoid Binary Search unless searching topic.
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
          messages: [{ role: "user", content: prompt }],
          max_tokens: 180,
          temperature: 0.9
        })
      }
    );

    const data = await response.json();

    let text = data?.choices?.[0]?.message?.content;
    if (!text) return res.json({});

    text = text.replace(/```json|```/g, "").trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const jsonString = text.substring(start, end + 1);

    res.json(JSON.parse(jsonString));
  } catch (e) {
    console.log("Quiz error:", e);
    res.json({});
  }
});