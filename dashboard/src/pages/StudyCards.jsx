import { useEffect, useState } from "react";
import { getExtensionData } from "../services/extensionData";

export default function StudyCards({ theme }) {
  const [tips, setTips] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getExtensionData().then(data => {
      setTips(data.tips || []);
    });
  }, []);

  const filteredTips = tips.filter(tip =>
    tip.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: theme.text }}>Study Cards</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tips..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          marginTop: "15px",
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: theme.border,
          background: theme.card,
          color: theme.text
        }}
      />

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}
      >
        {filteredTips.length === 0 && (
          <div style={{ color: theme.subtext }}>No tips found</div>
        )}

        {filteredTips.map((tip, i) => (
          <div
            key={i}
            style={{
              background: theme.card,
              padding: "20px",
              borderRadius: "12px",
              border: theme.border,
              transition: "all 0.25s ease",
              cursor: "pointer",
              color: theme.text
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(96,165,250,0.25)";
              e.currentTarget.style.border =
                `1px solid ${theme.accent}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform =
                "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.border =
                theme.border;
            }}
          >
            <div style={{ lineHeight: "1.5" }}>{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}