// ===============================
// OPENAI API CALL
// ===============================

const OPENAI_KEY = "YOUR_OPENAI_KEY_HERE"; // Replace with your OpenAI API key

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_AI_TIP") {
    generateTip(req.text).then(tip => {
      sendResponse({ tip });
    });
    return true; // keep channel open async
  }
});

// ===============================
// DASHBOARD STATS BRIDGE
// ===============================
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_AG_STATS") {
    chrome.storage.local.get(["ag_stats", "ag_recentTips"], (data) => {
      sendResponse(
        data.ag_stats || {
          adsBlockedToday: 0,
          cardsSeen: 0,
          topics: {}
        }
      );
    });
    return true;
  }
});


async function generateTip(pageText) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an educational assistant that generates one short programming study tip based on webpage content."
          },
          {
            role: "user",
            content:
              `Generate ONE short study tip (max 15 words) from this content:\n${pageText.slice(0, 1500)}`
          }
        ],
        max_tokens: 40
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || "Practice coding daily.";
  } catch (e) {
    return "Review core concepts regularly.";
  }
}
