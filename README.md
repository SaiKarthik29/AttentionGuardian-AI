# 🛡️ Attention Guardian AI

**Attention Guardian AI** is a productivity Chrome Extension that replaces distracting advertisements on learning websites with AI‑generated study tips and interactive quizzes.
It helps users stay focused while browsing educational content by turning distractions into micro‑learning moments.

---

# ✨ Features

* 🚫 Replaces ads with educational AI tips
* 🧠 Context‑aware tips based on page topic
* 🎯 AI quiz overlay during YouTube ads
* 📊 React dashboard for usage statistics
* ⚡ Fast local AI server (Node.js)
* 🔒 Privacy‑friendly (runs locally)

---

# 🧩 Architecture

```
Chrome Extension (content.js)
        ↓
Local AI Server (Node.js + OpenRouter)
        ↓
AI‑generated Tips / Quiz
        ↓
Rendered in Webpage instead of Ads
```

Dashboard:

```
Chrome Storage → React Dashboard UI
```

---

# 🌐 Supported Sites

* YouTube
* GeeksforGeeks
* W3Schools
* Javatpoint

---

# 📦 Project Structure

```
AttentionGuardian-AI
│
├── extension/           # Chrome extension
│   ├── content.js
│   ├── background.js
│   ├── style.css
│   ├── manifest.json
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
│
├── dashboard/           # React analytics dashboard
│   ├── src/
│   └── public/
│
├── server.js            # AI tip server
├── package.json
├── .env                 # API key
```

---

# 🚀 Installation Guide (Step‑by‑Step)

## 1️⃣ Clone the Repository

```
git clone https://github.com/SaiKarthik29/AttentionGuardian-AI.git
cd AttentionGuardian-AI
```

---

# 🔑 2️⃣ Setup AI Key

Create a `.env` file in the root folder:

```
OPENROUTER_KEY=your_openrouter_api_key_here
```

Get free key from:
👉 [https://openrouter.ai/keys](https://openrouter.ai/keys)

---

# 🤖 3️⃣ Start AI Server

```
npm install
npm start
```

You should see:

```
AI server running at http://localhost:5000
```

Test in browser:

```
http://localhost:5000/tip?topic=javascript&concept=loop
```

---

# 🧩 4️⃣ Load Chrome Extension

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the **extension** folder

Extension will appear in Chrome toolbar.

---

# 🧪 5️⃣ Test Extension

Open any supported learning site:

* [https://www.w3schools.com](https://www.w3schools.com)
* [https://www.geeksforgeeks.org](https://www.geeksforgeeks.org)
* [https://www.youtube.com](https://www.youtube.com)

Ads will be replaced by:

```
Study Tip
AI‑generated learning tip
```

On YouTube ads → AI quiz overlay appears.

---

# 📊 6️⃣ Run Dashboard (Optional)

```
cd dashboard
npm install
npm start
```

Dashboard shows:

* Tips shown
* Topics learned
* Cards displayed

---

# 🧠 How It Works

1. Content script scans page for ads
2. Detects topic from page content
3. Requests AI tip from local server
4. AI generates contextual tip
5. Extension replaces ad with tip card

YouTube ads → replaced by quiz overlay.

---

# 🔒 Privacy

* No browsing data sent externally
* AI server runs locally
* Only topic/concept sent to AI API

---

# 🛠️ Tech Stack

* JavaScript
* Chrome Extension API (Manifest V3)
* Node.js + Express
* OpenRouter AI
* React (Dashboard)
* Chrome Storage API

---

# 🎯 Use Cases

* Students learning programming
* Coding interview prep
* Distraction‑free study browsing
* Micro‑learning reinforcement

---

# 📌 Future Enhancements

* Publish to Chrome Web Store
* Deploy AI server to cloud
* Personalized learning model
* Gamified quizzes & streaks

---

# 👨‍💻 Author

**Sai Karthik Sriram**
GitHub: [https://github.com/SaiKarthik29](https://github.com/SaiKarthik29)

---

# ⭐ If you like this project

Give it a ⭐ on GitHub and share!

---

# ✅ Status

✔ Extension working
✔ AI tips generation
✔ Quiz overlay
✔ Dashboard analytics

Production‑ready for local usage.
