// ===============================
// STATS STORAGE SYSTEM
// ===============================



console.log("AG content script loaded");



function updateStats(topic, tipText) {
  if (!chrome?.storage?.local) return;

  chrome.storage.local.get(
    ["ag_stats", "ag_recentTips", "ag_lastReset"],
    (res) => {
      const today = new Date().toDateString();

      let stats = res.ag_stats || {
        adsBlockedToday: 0,
        cardsSeen: 0,
        topics: {}
      };

      // ✅ ensure fields exist
      stats.adsBlockedToday = stats.adsBlockedToday || 0;
      stats.cardsSeen = stats.cardsSeen || 0;
      stats.topics = stats.topics || {};

      let tips = res.ag_recentTips || [];
      const lastReset = res.ag_lastReset;

      // ✅ DAILY RESET
      if (lastReset !== today) {
        stats.adsBlockedToday = 0;
      }

      // ✅ increment
      stats.adsBlockedToday += 1;
      stats.cardsSeen += 1;

      if (topic) {
        stats.topics[topic] = (stats.topics[topic] || 0) + 1;
      }

      if (tipText) {
        tips.unshift(tipText);
        tips = tips.slice(0, 10);
      }

      chrome.storage.local.set({
        ag_stats: stats,
        ag_recentTips: tips,
        ag_lastReset: today
      });
    }
  );
}

// ===============================
// TOPIC DETECTION
// ===============================


function getTopic() {
  const title = document.title.toLowerCase();
  const url = location.href.toLowerCase();

  if (title.includes("html") || url.includes("/html")) return "html";
  if (title.includes("css") || url.includes("/css")) return "css";
  if (title.includes("javascript") || title.includes("js")) return "javascript";
  if (title.includes("react")) return "react";
  if (title.includes("sql")) return "sql";
  if (title.includes("python")) return "python";
  if (title.includes("java")) return "java";
  if (title.includes("dsa") || title.includes("data structure")) return "dsa";

  return "programming";
}



// ===============================
// PAGE TEXT (AI INPUT)
// ===============================

function getPageText() {
  const main =
    document.querySelector("main, #main, article, .content, .tutorial") ||
    document.body;

  return main.innerText.toLowerCase();
}

// ===============================
// HEADING CONCEPT DETECTION
// ===============================

function getConcept() {
  const h2s = Array.from(document.querySelectorAll("h1,h2,h3"))
    .map(el => el.innerText.toLowerCase())
    .join(" ");

  const text = (document.title + " " + h2s).toLowerCase();

  if (text.includes("flexbox")) return "flexbox";
  if (text.includes("grid")) return "grid";
  if (text.includes("arraylist")) return "arraylist";
  if (text.includes("linkedlist")) return "linkedlist";
  if (text.includes("recursion")) return "recursion";
  if (text.includes("attribute")) return "html-attr";
  if (text.includes("loop")) return "loop";

  return null;
}

// ===============================
// FULL PAGE AI CONCEPT DETECTION
// ===============================

function detectAIConcept() {
  const text = document.body.innerText.toLowerCase();

  if (text.includes("loop")) return "loops";
  if (text.includes("array")) return "arrays";
  if (text.includes("list")) return "lists";
  if (text.includes("tree")) return "trees";
  if (text.includes("grid")) return "grid";
  if (text.includes("flexbox")) return "flexbox";
  if (text.includes("semantic")) return "semantic html";

  return "basics";
}



// ===============================
// CONCEPT TIP MAP
// ===============================
const conceptTips = {
  "html-attr": [
    "Prefer semantic attributes over inline styles.",
    "Use alt attribute for accessibility."
  ],
  flexbox: [
    "Use gap instead of margin spacing in flexbox.",
    "Avoid fixed widths inside flex containers."
  ],
  grid: [
    "Use grid-template-areas for readability.",
    "Prefer auto-fit over fixed columns."
  ],
  arraylist: [
    "Initialize ArrayList with capacity for performance.",
    "Use ensureCapacity for large inserts."
  ],
  linkedlist: [
    "LinkedList is better for frequent insertions.",
    "Avoid random access on LinkedList."
  ],
  recursion: [
    "Always define a base case in recursion.",
    "Memoization prevents exponential recursion."
  ],
  loop: [
    "Avoid heavy work inside loops.",
    "Cache loop length for performance."
  ]
};

const aiTips = {
  "html-form": [
    "Always associate labels with inputs.",
    "Use required attribute for validation.",
    "Prefer semantic form structure."
  ],
  semantic: [
    "Use semantic tags for accessibility.",
    "Avoid div-only layouts.",
    "Structure page with landmarks."
  ],
  "css-anim": [
    "Prefer transform for smooth animation.",
    "Avoid animating layout properties.",
    "Use will-change carefully."
  ]
};

// ===============================
// REAL AI TIP FETCH (STEP 5 READY)
// ===============================



async function createStudyCard() {
  const topic = getTopic();
  const concept = detectAIConcept() || getConcept();

  let selectedTip = "Loading AI tip...";

  try {
    const res = await fetch(
  `http://localhost:5000/tip?topic=${topic}&concept=${concept || ""}`
);

    const data = await res.json();
    if (data.tip) selectedTip = data.tip;
  } catch (e) {
    selectedTip = "AI tip unavailable.";
  }

  const card = document.createElement("div");

  card.style.width = "100%";
  card.style.maxWidth = "300px";
  card.style.background = "#0b1220";
  card.style.color = "#e5e7eb";
  card.style.borderRadius = "10px";
  card.style.padding = "14px";
  card.style.margin = "8px auto";
  card.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
  card.style.fontFamily = "Arial";
  card.style.textAlign = "center";

  card.innerHTML = `
    <div style="color:#22c55e;font-weight:600;margin-bottom:6px">
      Study Tip
    </div>
    <div style="font-size:13px;line-height:1.4">
      ${selectedTip}
    </div>
  `;

  return {
    card,
    topic,
    tip: selectedTip   // ✅ correct
  };
}

// // ===============================
// // REPLACE AD (ASYNC SAFE)
// // ===============================



async function replaceAd(ad) {
  if (!ad) return;
  if (ad.dataset.aiDone === "1") return;

  const h = ad.offsetHeight;
  if (h < 80) return;

  ad.dataset.aiDone = "1";

  ad.innerHTML = "";
  ad.style.display = "flex";
  ad.style.justifyContent = "center";
  ad.style.alignItems = "flex-start";
  ad.style.padding = "8px 0";

  const cardData = await createStudyCard();

  ad.appendChild(cardData.card);

  // ⭐ SAVE STATS HERE
  updateStats(cardData.topic, cardData.tip);
}





// ===============================
// YOUTUBE
// ===============================

function scanYouTube() {
  const ads = document.querySelectorAll(`
    ytd-display-ad-renderer,
    ytd-companion-slot-renderer,
    ytd-ad-slot-renderer,
    ytd-promoted-video-renderer,
    ytd-in-feed-ad-layout-renderer
  `);

  ads.forEach(replaceAd);
}

// ===============================
// GEEKSFORGEEKS
// ===============================


function scanGFG() {
  const ads = document.querySelectorAll(`
    [id*="GFG_AD"],
    .adsbygoogle,
    iframe[src*="googlesyndication"]
  `);

  ads.forEach(el => {
    const container = el.closest("div");
    replaceAd(container);
  });
}


// ===============================
// W3SCHOOLS
// ===============================


function scanW3() {
  const ads = document.querySelectorAll(`
    #right .sidesection,
    #right iframe[src*="googlesyndication"],
    #right [id*="ad"],
    #right [class*="ad"],
    #right #stickyadcontainer,
    #right #footer-skyscraper
  `);

  ads.forEach(el => {
    if (el.closest("#main")) return;
    const container = el.closest(".sidesection") || el;
    replaceAd(container);
  });
}

// ===============================
// ROUTER
// ===============================
function scanSite() {
  const host = location.hostname;

  if (host.includes("youtube.com")) scanYouTube();
  else if (host.includes("geeksforgeeks.org")) scanGFG();
  else if (host.includes("w3schools.com")) scanW3();
}

// ===============================
// OBSERVER
// ===============================
function initObserver() {
  scanSite();
  const obs = new MutationObserver(() => scanSite());
  obs.observe(document.body, { childList: true, subtree: true });
}

// ===============================
// YOUTUBE SPA NAV
// ===============================
let lastURL = location.href;
setInterval(() => {
  if (location.href !== lastURL) {
    lastURL = location.href;
    setTimeout(scanSite, 1200);
  }
}, 1000);

// ===============================
initObserver();




// ===============================
// DASHBOARD BRIDGE (React ↔ Extension)
// ===============================

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type !== "GET_AG_STATS") return;

  if (!chrome?.storage?.local) {
    window.postMessage({
      type: "AG_STATS_RESPONSE",
      data: {}
    }, "*");
    return;
  }

  chrome.storage.local.get(
    ["ag_stats", "ag_recentTips"],
    (res) => {
      const stats = res.ag_stats || {
        adsBlockedToday: 0,
        cardsSeen: 0,
        topics: {}
      };

      const tips = res.ag_recentTips || [];

      window.postMessage(
        {
          type: "AG_STATS_RESPONSE",
          data: {
            ...stats,
            tips
          }
        },
        "*"
      );
    }
  );
});









/* ===============================
   ROBUST YOUTUBE AD DETECTOR
=============================== */

let agQuizOverlay = null;
let agAdActive = false;
let agObserverStarted = false;
let agQuizInterval = null;

function isYouTubeAdPlaying() {
  return !!(
    document.querySelector(".ad-showing") ||
    document.querySelector(".ytp-ad-player-overlay") ||
    document.querySelector(".ytp-ad-overlay-container") ||
    document.querySelector(".ytp-ad-text")
  );
}

function detectYouTubeVideoAd() {
  const adNow = isYouTubeAdPlaying();

  // ---------- AD START ----------
  if (adNow && !agAdActive) {
    agAdActive = true;
    console.log("AG: Ad started");

    showQuizOverlay();

    // long ads → multiple quizzes
    agQuizInterval = setInterval(() => {
      if (isYouTubeAdPlaying()) {
        console.log("AG: Next quiz in same ad");
        removeQuizOverlay();
        showQuizOverlay();
      }
    }, 15000);
  }

  // ---------- AD END ----------
  if (!adNow && agAdActive) {
    agAdActive = false;
    console.log("AG: Ad ended");

    removeQuizOverlay();

    if (agQuizInterval) {
      clearInterval(agQuizInterval);
      agQuizInterval = null;
    }
  }
}

function initYouTubeAdObserver() {
  if (agObserverStarted) return;

  const player =
    document.querySelector("#movie_player") ||
    document.querySelector(".html5-video-player");

  if (!player) return;

  const observer = new MutationObserver(detectYouTubeVideoAd);

  observer.observe(player, {
    attributes: true,
    childList: true,
    subtree: true
  });

  agObserverStarted = true;
  console.log("AG: YouTube observer started");
}

setInterval(initYouTubeAdObserver, 1500);


/* ===============================
   AI QUIZ FETCH (LOCAL SERVER + RANDOM DIFFICULTY)
=============================== */

async function fetchAIQuiz() {
  try {
    const difficulties = ["easy", "medium", "hard"];
    const difficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

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

    const res = await fetch(
      `http://localhost:5000/quiz?topic=${randomTopic}&difficulty=${difficulty}`
    );

    const data = await res.json();

    if (!data || !data.question) return null;

    return data;
  } catch (e) {
    console.log("AG quiz fetch failed:", e);
    return null;
  }
}


/* ===============================
   QUIZ OVERLAY (FULL VIDEO COVER)
=============================== */

async function showQuizOverlay() {
  if (agQuizOverlay) return;

  const player = document.querySelector("#movie_player");
  if (!player) return;

  agQuizOverlay = document.createElement("div");

  Object.assign(agQuizOverlay.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.55)",
    zIndex: "999999",
    pointerEvents: "none"
  });

  const modal = document.createElement("div");

  Object.assign(modal.style, {
    width: "70%",
    maxWidth: "720px",
    maxHeight: "80%",
    overflowY: "auto",
    background: "rgba(11,18,32,0.98)",
    color: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
    fontFamily: "Arial",
    textAlign: "center",
    pointerEvents: "auto"
  });

  modal.innerHTML = `
    <div style="font-size:22px;font-weight:600;margin-bottom:14px;">
      Quick DSA Quiz
    </div>
    <div style="opacity:0.7">Loading question...</div>
  `;

  agQuizOverlay.appendChild(modal);
  player.appendChild(agQuizOverlay);

  let quiz = await fetchAIQuiz();

  const question =
    quiz?.question ||
    "What is the time complexity of Binary Search?";

  const options =
    quiz?.options || ["O(n)", "O(log n)", "O(n²)"];

  const answerIndex =
    quiz?.answerIndex ?? 1;

  const explanation =
    quiz?.explanation ||
    "Binary Search halves the search space each step → O(log n)";

  modal.innerHTML = `
    <div style="font-size:22px;font-weight:600;margin-bottom:14px;">
      Quick DSA Quiz
    </div>

    <div style="font-size:18px;margin-bottom:18px;">
      ${question}
    </div>

    <div id="ag-options">
      ${options.map((opt,i)=>createOption(opt,i===answerIndex)).join("")}
    </div>

    <div id="ag-explanation" style="
        margin-top:16px;
        font-size:14px;
        display:none;
        color:#93c5fd;
    ">
      ${explanation}
    </div>
  `;

  modal.querySelectorAll(".ag-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const isCorrect = opt.dataset.correct === "true";

      modal.querySelectorAll(".ag-option").forEach(o => {
        o.style.pointerEvents = "none";
        o.style.opacity = "0.6";
      });

      opt.style.background = isCorrect
        ? "rgba(34,197,94,0.25)"
        : "rgba(239,68,68,0.25)";

      opt.style.border = isCorrect
        ? "1px solid #22c55e"
        : "1px solid #ef4444";

      const exp = modal.querySelector("#ag-explanation");
      if (exp) exp.style.display = "block";
    });
  });
}

function removeQuizOverlay() {
  if (agQuizOverlay) {
    agQuizOverlay.remove();
    agQuizOverlay = null;
  }
}

function createOption(text, correct) {
  return `
    <div class="ag-option" data-correct="${correct}" style="
      margin:10px 0;
      padding:12px;
      border-radius:10px;
      border:1px solid rgba(255,255,255,0.2);
      cursor:pointer;
      transition:all .2s ease;
    ">
      ${text}
    </div>
  `;
}