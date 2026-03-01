import { useEffect, useState } from "react";
import { getExtensionData } from "../services/extensionData";

export default function Stats({ theme = defaultTheme }) {
  const [stats, setStats] = useState({
    adsBlockedToday: 0,
    cardsSeen: 0,
    topics: {},
    tips: [],
    quiz: {
      correct: 0,
      wrong: 0
    }
  });

  useEffect(() => {
    getExtensionData().then(data => {
      setStats({
        adsBlockedToday: data?.adsBlockedToday || 0,
        cardsSeen: data?.cardsSeen || 0,
        topics: data?.topics || {},
        tips: data?.tips || [],
        quiz: data?.quiz || { correct: 0, wrong: 0 }
      });
    });
  }, []);

  const topicsEntries = Object.entries(stats.topics || {});

  // ⭐ top topic
  let topTopic = null;
  let topCount = 0;

  topicsEntries.forEach(([t, c]) => {
    if (c > topCount) {
      topTopic = t;
      topCount = c;
    }
  });

  // ⭐ quiz stats
  const correct = stats.quiz?.correct || 0;
  const wrong = stats.quiz?.wrong || 0;
  const totalQuiz = correct + wrong;
  const accuracy =
    totalQuiz > 0 ? Math.round((correct / totalQuiz) * 100) : 0;

  return (
    <div>
      {/* TOP ROW */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* ADS CARD */}
        <div style={{ ...cardStyle, background: theme.card }}>
          <div style={{ ...label, color: theme.subtext }}>
            Ads Replaced Today
          </div>
          <div style={{ ...big, color: theme.text }}>
            {stats.adsBlockedToday}
          </div>

          <div style={{ ...label, marginTop: "15px", color: theme.subtext }}>
            Total Study Cards Seen
          </div>
          <div style={{ ...mid, color: theme.text }}>
            {stats.cardsSeen}
          </div>

          {topTopic && (
            <div style={{ marginTop: "15px" }}>
              <div style={{ ...label, color: theme.subtext }}>
                Top Topic
              </div>
              <div style={{ ...mid, color: theme.text }}>
                {topTopic} ({topCount})
              </div>
            </div>
          )}
        </div>

        {/* TOPICS */}
        <div style={{ ...cardStyle, flex: 1, background: theme.card }}>
          <div style={{ marginBottom: "10px", color: theme.text }}>
            Topics Learned
          </div>

          {topicsEntries.length === 0 && (
            <div style={{ color: theme.subtext }}>
              No topics yet
            </div>
          )}

          {topicsEntries.map(([topic, count]) => (
            <div key={topic}>
              <div style={{ color: theme.text }}>{topic}</div>
              <div style={bar(count * 5, theme)} />
            </div>
          ))}
        </div>      
      </div>

      {/* RECENT TIPS */}
      <div style={{ ...cardStyle, marginTop: "20px", background: theme.card }}>
        <div style={{ marginBottom: "10px", color: theme.text }}>
          Recent Tips
        </div>

        {stats.tips.length === 0 && (
          <div style={{ color: theme.subtext }}>
            No tips yet
          </div>
        )}

        {stats.tips.map((tip, i) => (
          <div
            key={i}
            style={{
              ...tipCard,
              background: theme.tipBg,
              border: theme.border
            }}
          >
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}

/* STYLES */

const cardStyle = {
  padding: "20px",
  borderRadius: "10px"
};

const label = {};
const big = { fontSize: "28px", fontWeight: "bold" };
const mid = { fontSize: "20px", fontWeight: "bold" };

const tipCard = {
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "10px"
};

function bar(percent, theme) {
  return {
    height: "8px",
    background: theme.barBg,
    borderRadius: "5px",
    marginBottom: "10px",
    overflow: "hidden",
    backgroundImage: `linear-gradient(90deg,${theme.accent} ${percent}%, transparent ${percent}%)`
  };
}

/* DEFAULT THEME */

const defaultTheme = {
  card: "#0f1a2e",
  text: "white",
  subtext: "#9ca3af",
  border: "1px solid #1f2937",
  accent: "#60a5fa",
  barBg: "#1f2937",
  tipBg: "#0b1220"
};