import React, { useEffect, useState } from "react";
import { getExtensionData } from "../services/extensionData";

export default function RecentTips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const data = getExtensionData();
    setTips(data.tips || []);
  }, []);

  return (
    <div className="card">
      <h3>Recent Tips</h3>
      <ul>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
