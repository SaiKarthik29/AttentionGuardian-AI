import { useEffect, useState } from "react";
import { getExtensionData } from "../services/extensionData";

export default function Stats() {
  const [stats, setStats] = useState({
    adsBlockedToday: 0,
    cardsSeen: 0,
    topics: {}
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getExtensionData();
      setStats(data);
    }
    loadStats();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      
      <div style={{
        background: "#0f1a2e",
        padding: "20px",
        borderRadius: "10px",
        width: "250px"
      }}>
        <div style={{ color: "#9ca3af" }}>Ads Replaced Today</div>
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>
          {stats.adsBlockedToday}
        </div>

        <div style={{ marginTop: "15px", color: "#9ca3af" }}>
          Total Study Cards Seen
        </div>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
          {stats.cardsSeen}
        </div>
      </div>

      <div style={{
        background: "#0f1a2e",
        padding: "20px",
        borderRadius: "10px",
        flex: 1
      }}>
        <div style={{ marginBottom: "10px" }}>Topics Learned</div>

        {Object.entries(stats.topics || {}).map(([topic, value]) => (
          <div key={topic}>
            <div style={{ textTransform: "capitalize" }}>{topic}</div>
            <div style={bar(value * 10)}></div>
          </div>
        ))}
      </div>

    </div>
  );
}

function bar(percent) {
  return {
    height: "8px",
    background: "#1f2937",
    borderRadius: "5px",
    marginBottom: "10px",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `linear-gradient(90deg,#60a5fa ${percent}%, transparent ${percent}%)`
  };
}
