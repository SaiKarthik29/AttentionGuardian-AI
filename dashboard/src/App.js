import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import StudyCards from "./pages/StudyCards";
import Settings from "./pages/Settings";

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("ag_theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("ag_theme", dark ? "dark" : "light");
  }, [dark]);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, color: theme.text }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", background: theme.sidebar, padding: "20px" }}>
        <h2>Attention Guardian</h2>

        <div style={{ marginTop: "30px" }}>
          <Link to="/" style={linkStyle(theme)}>Dashboard</Link>
          <Link to="/study" style={linkStyle(theme)}>Study Cards</Link>
          <Link to="/settings" style={linkStyle(theme)}>Settings</Link>
        </div>

        {/* Theme Toggle */}
        <div style={{ marginTop: "40px" }}>
          <div style={{ fontSize: "14px", marginBottom: "8px" }}>
            Theme
          </div>

          <div
            onClick={() => setDark(!dark)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              background: theme.card,
              textAlign: "center",
              border: theme.border
            }}
          >
            {dark ? "🌙 Dark Mode" : "☀ Light Mode"}
          </div>
        </div>
      </div>

      {/* Pages */}
      <div style={{ flex: 1, padding: "30px", background: theme.bg }}>
        <Routes>
          <Route path="/" element={<Dashboard theme={theme} />} />
          <Route path="/study" element={<StudyCards theme={theme} />} />
          <Route path="/settings" element={<Settings theme={theme} />} />
        </Routes>
      </div>
    </div>
  );
}

/* THEMES */

const darkTheme = {
  bg: "#0b1220",
  sidebar: "#0f172a",
  card: "#0f1a2e",
  text: "white",
  subtext: "#9ca3af",
  border: "1px solid #1f2937",
  accent: "#60a5fa",
  barBg: "#1f2937",
  tipBg: "#0b1220",

  linkBg: "#1e293b",
  linkColor: "white"
};

const lightTheme = {
  bg: "#f1f5f9",
  sidebar: "#e2e8f0",
  card: "#ffffff",
  text: "#0f172a",
  subtext: "#475569",
  border: "1px solid #cbd5e1",
  accent: "#3b82f6",
  barBg: "#e2e8f0",
  tipBg: "#f8fafc",

  linkBg: "#ffffff",
  linkColor: "#0f172a"
};

const linkStyle = (theme) => ({
  display: "block",
  padding: "10px",
  marginTop: "8px",
  borderRadius: "8px",
  background: theme.linkBg,
  color: theme.linkColor,
  textDecoration: "none"
});

export default App;