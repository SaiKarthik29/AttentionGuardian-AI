import React, { useEffect, useState } from "react";
import { getExtensionData } from "../services/extensionData";

export default function Topics() {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const data = getExtensionData();

    // fallback if extension not available
    if (data && data.topics) {
      setTopics(data.topics);
    } else {
      setTopics({
        JavaScript: 80,
        Python: 60,
        DSA: 40,
        React: 70,
      });
    }
  }, []);

  return (
    <div className="card">
      <h3>Topics Learned</h3>

      {Object.entries(topics).map(([name, value]) => (
        <div key={name} className="topicRow">
          <span>{name}</span>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
