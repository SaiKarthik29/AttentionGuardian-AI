import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Search, RefreshCw, Brain, Lightbulb, HelpCircle, WifiOff, ChevronRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import mockYoutube from "@/assets/mock-youtube.png";
import mockYoutubeReplaced from "@/assets/mock-youtube-replaced.png";
import mockW3schools from "@/assets/mock-w3schools.jpg";
import mockGeeksforgeeks from "@/assets/mock-geeksforgeeks.jpg";

const PLATFORMS = [
  { id: "youtube", name: "YouTube", color: "hsl(0 72% 51%)", icon: "▶", image: mockYoutube },
  { id: "w3schools", name: "W3Schools", color: "hsl(142 76% 36%)", icon: "W3", image: mockW3schools },
  { id: "geeksforgeeks", name: "GeeksforGeeks", color: "hsl(142 76% 36%)", icon: "GfG", image: mockGeeksforgeeks },
];

const STUDY_TIPS: Record<string, string[]> = {
  HTML: ["Use semantic HTML tags like <article>, <section>", "Always add alt attributes to images", "Use <meta> tags for SEO optimization"],
  CSS: ["Use Flexbox for 1D layouts, Grid for 2D", "CSS variables make theming easy", "Use clamp() for responsive typography"],
  JavaScript: ["Practice array methods: map, filter, reduce", "Understand closures and scope", "Use async/await over raw promises"],
  DSA: ["Practice sorting algorithms daily", "Understand Big O notation", "Use hash maps for O(1) lookups"],
};

const TOPICS = ["HTML", "CSS", "JavaScript", "DSA"];

const QUIZZES = [
  { q: "Which algorithm explores graph level by level?", options: ["DFS", "BFS", "Binary Search", "Heap Sort"], answer: 1, explanation: "BFS (Breadth-First Search) explores all neighbors at the current depth before moving to the next level." },
  { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Heap", "Tree"], answer: 1, explanation: "Stack follows Last In First Out." },
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, explanation: "Binary search halves the search space each step, giving O(log n)." },
  { q: "Which sorting algorithm has best average case?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], answer: 1, explanation: "Quick Sort has O(n log n) average time complexity." },
  { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Digital Ordinance Map", "Document Order Map"], answer: 0, explanation: "DOM stands for Document Object Model." },
];

function incrementStat(key: string) {
  const val = parseInt(localStorage.getItem(key) || "0");
  localStorage.setItem(key, String(val + 1));
}

const SimulationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<typeof PLATFORMS[0] | null>(null);
  const [adsHighlighted, setAdsHighlighted] = useState(false);
  const [adsReplaced, setAdsReplaced] = useState(false);
  const [detectedTopic, setDetectedTopic] = useState("");
  const [aiTip, setAiTip] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [quiz, setQuiz] = useState(QUIZZES[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showQuizOverlay, setShowQuizOverlay] = useState(false);

  const totalSteps = 8;

  const selectPlatform = (p: typeof PLATFORMS[0]) => {
    setPlatform(p);
    setStep(1);
  };

  const scanAds = () => {
    setAdsHighlighted(true);
    setTimeout(() => setStep(2), 1200);
  };

  const replaceAds = () => {
    setAdsReplaced(true);
    incrementStat("adsBlocked");
    incrementStat("adsBlocked");
    incrementStat("adsBlocked");
    incrementStat("tipsViewed");
    setStep(3);
  };

  const detectTopic = useCallback(() => {
    const t = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    setDetectedTopic(t);
    incrementStat("topicsLearned");
    setStep(4);
  }, []);

  const generateTip = useCallback(() => {
    setAiLoading(true);
    setTimeout(() => {
      const tips = STUDY_TIPS[detectedTopic] || STUDY_TIPS.JavaScript;
      setAiTip(tips[Math.floor(Math.random() * tips.length)]);
      incrementStat("tipsViewed");
      setAiLoading(false);
      setStep(5);
    }, 2000);
  }, [detectedTopic]);

  const openQuizOverlay = useCallback(() => {
    const q = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
    setQuiz(q);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowQuizOverlay(true);
    setStep(6);
  }, []);

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    setAnswered(true);
    incrementStat("quizzesAttempted");
  };

  const toggleOffline = () => {
    setShowQuizOverlay(false);
    setOfflineMode(!offlineMode);
    setStep(7);
    if (!offlineMode) {
      const q = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
      setQuiz(q);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setStep(0);
    setPlatform(null);
    setAdsHighlighted(false);
    setAdsReplaced(false);
    setDetectedTopic("");
    setAiTip("");
    setSelectedAnswer(null);
    setAnswered(false);
    setOfflineMode(false);
    setShowQuizOverlay(false);
  };

  // Render the platform image with overlays
  const renderPlatformView = () => {
    if (!platform) return null;
    return (
      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 border-b border-border/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 bg-muted/50 rounded px-3 py-1 text-xs text-muted-foreground">
            https://www.{platform.id}.com
          </div>
        </div>

        {/* Platform screenshot */}
        <div className="relative">
          <img
            src={platform.id === "youtube" && adsReplaced ? mockYoutubeReplaced : platform.image}
            alt={`${platform.name} simulation`}
            className="w-full h-auto"
            loading="lazy"
          />

          {/* Ad highlight overlay */}
          {adsHighlighted && !adsReplaced && (
            <div className="absolute inset-0 animate-fade-up">
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-destructive/5" />
              {/* Ad detection boxes */}
              <div className="absolute top-[10%] right-[3%] w-[25%] h-[30%] border-2 border-destructive rounded-lg animate-pulse flex items-center justify-center bg-destructive/20 backdrop-blur-sm">
                <span className="text-destructive font-bold text-xs md:text-sm px-2 py-1 bg-destructive/30 rounded">⚠ AD DETECTED</span>
              </div>
              <div className="absolute top-[45%] right-[3%] w-[25%] h-[20%] border-2 border-destructive rounded-lg animate-pulse flex items-center justify-center bg-destructive/20 backdrop-blur-sm">
                <span className="text-destructive font-bold text-xs md:text-sm px-2 py-1 bg-destructive/30 rounded">⚠ AD DETECTED</span>
              </div>
              <div className="absolute bottom-[10%] left-[5%] w-[50%] h-[15%] border-2 border-destructive rounded-lg animate-pulse flex items-center justify-center bg-destructive/20 backdrop-blur-sm">
                <span className="text-destructive font-bold text-xs md:text-sm px-2 py-1 bg-destructive/30 rounded">⚠ BANNER AD DETECTED</span>
              </div>
            </div>
          )}

          {/* Replaced ads overlay - study tips */}
          {adsReplaced && (
            <div className="absolute inset-0 animate-fade-up">
              {platform?.id === "youtube" ? (
                <>
                  {/* YouTube-style study tip banner at top */}
                  <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[60%] rounded-xl bg-[hsl(160_60%_15%/0.95)] backdrop-blur-sm border border-primary/30 p-4 text-center">
                    <p className="text-primary text-xs font-semibold mb-1">Study Tip</p>
                    <p className="text-primary-foreground text-xs md:text-sm">Practice writing code daily to reinforce your understanding of fundamentals.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-[10%] right-[3%] w-[25%] h-[30%] border-2 border-primary rounded-lg flex items-center justify-center bg-primary/90 backdrop-blur-sm p-2">
                    <div className="text-center text-primary-foreground">
                      <Lightbulb className="w-5 h-5 mx-auto mb-1" />
                      <p className="text-[10px] md:text-xs font-bold">💡 Study Tip</p>
                      <p className="text-[9px] md:text-xs mt-1">Use Flexbox for 1D layouts, Grid for 2D</p>
                    </div>
                  </div>
                  <div className="absolute top-[45%] right-[3%] w-[25%] h-[20%] border-2 border-primary rounded-lg flex items-center justify-center bg-primary/90 backdrop-blur-sm p-2">
                    <div className="text-center text-primary-foreground">
                      <p className="text-[10px] md:text-xs font-bold">📐 Quick Fact</p>
                      <p className="text-[9px] md:text-xs mt-1">CSS variables make theming easy</p>
                    </div>
                  </div>
                  <div className="absolute bottom-[10%] left-[5%] w-[50%] h-[15%] border-2 border-primary rounded-lg flex items-center justify-center bg-primary/90 backdrop-blur-sm p-2">
                    <div className="text-center text-primary-foreground">
                      <p className="text-[10px] md:text-xs font-bold">🎨 Pro Tip: Use clamp() for responsive typography</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Quiz overlay on the image */}
          {showQuizOverlay && (
            <div className="absolute inset-0 bg-[hsl(220_20%_10%/0.85)] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up">
              <div className="rounded-2xl p-6 md:p-8 max-w-lg w-full bg-[hsl(220_25%_14%)] border border-[hsl(220_20%_25%)] shadow-2xl">
                <h3 className="text-lg md:text-xl font-bold text-center text-foreground mb-2">Quick DSA Quiz</h3>
                <p className="text-center text-muted-foreground text-sm md:text-base mb-6">{quiz.q}</p>
                <div className="space-y-3 mb-4">
                  {quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => !answered && setSelectedAnswer(i)}
                      className={`w-full text-center p-3 md:p-4 rounded-lg border transition-all text-sm md:text-base ${
                        answered
                          ? i === quiz.answer
                            ? "border-primary bg-primary/20 text-foreground"
                            : i === selectedAnswer
                            ? "border-destructive bg-destructive/10 text-muted-foreground"
                            : "border-[hsl(220_20%_25%)] text-muted-foreground"
                          : selectedAnswer === i
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-[hsl(220_20%_25%)] text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {!answered ? (
                  <Button onClick={submitAnswer} disabled={selectedAnswer === null} className="w-full mt-2">
                    Submit Answer
                  </Button>
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-primary text-sm">{quiz.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Attention Guardian AI</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <button onClick={() => navigate("/simulation")} className="text-sm text-foreground transition-colors">Simulation</button>
            <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</button>
            <button onClick={() => navigate("/about")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            </div>
            <Progress value={((step + 1) / totalSteps) * 100} className="h-2" />
          </div>

          {/* Step 0: Select Platform */}
          {step === 0 && (
            <div className="animate-fade-up text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Select a Platform</h2>
              <p className="text-muted-foreground mb-8">Choose a website to simulate ad replacement</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {PLATFORMS.map((p) => (
                  <button key={p.id} onClick={() => selectPlatform(p)} className="glass-card rounded-xl overflow-hidden hover-lift text-center group">
                    <div className="relative h-32 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="text-2xl mb-1">{p.icon}</div>
                      <div className="font-semibold">{p.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Show Platform with Ads */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Browsing {platform?.name}
              </h2>
              {renderPlatformView()}
              <div className="flex justify-center mt-6">
                {!adsHighlighted ? (
                  <Button onClick={scanAds} className="gap-2 glow-primary" size="lg">
                    <Search className="w-4 h-4" /> Scan for Ads
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-destructive mb-3 text-sm animate-pulse">⚠ 3 ads detected! Scanning...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Replace Ads */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-4 text-center">Ads Detected! 🚨</h2>
              <p className="text-muted-foreground mb-6 text-center">3 distracting advertisements found on this page</p>
              {renderPlatformView()}
              <div className="flex justify-center mt-6">
                <Button onClick={replaceAds} className="gap-2 glow-primary" size="lg">
                  <RefreshCw className="w-4 h-4" /> Replace Ads with Study Tips
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Ads replaced */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-4 text-center">Ads Replaced! ✨</h2>
              <p className="text-muted-foreground mb-6 text-center">3 ads transformed into learning content</p>
              {renderPlatformView()}
              <div className="flex justify-center mt-6">
                <Button onClick={detectTopic} className="gap-2" size="lg">
                  <Brain className="w-4 h-4" /> Detect Learning Topic
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Topic Detected */}
          {step === 4 && (
            <div className="animate-fade-up text-center">
              <h2 className="text-2xl font-bold mb-4">Topic Detected 🎯</h2>
              <div className="glass-card rounded-xl p-8 max-w-sm mx-auto mb-8 glow-primary">
                <div className="text-sm text-primary mb-2">Detected Topic</div>
                <div className="text-4xl font-bold gradient-text">{detectedTopic}</div>
              </div>
              <Button onClick={generateTip} className="gap-2" size="lg">
                <Lightbulb className="w-4 h-4" /> Generate AI Study Tip
              </Button>
            </div>
          )}

          {/* Step 5: AI Tip */}
          {step === 5 && (
            <div className="animate-fade-up text-center">
              <h2 className="text-2xl font-bold mb-4">AI Generated Tip 🤖</h2>
              {aiLoading ? (
                <div className="glass-card rounded-xl p-8 max-w-md mx-auto">
                  <div className="animate-shimmer h-4 rounded w-3/4 mx-auto mb-3" />
                  <div className="animate-shimmer h-4 rounded w-1/2 mx-auto" />
                  <p className="text-sm text-muted-foreground mt-4">AI is thinking...</p>
                </div>
              ) : (
                <>
                  <div className="glass-card rounded-xl p-8 max-w-md mx-auto mb-8 glow-primary">
                    <Lightbulb className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-lg">{aiTip}</p>
                    <p className="text-xs text-muted-foreground mt-3">Topic: {detectedTopic}</p>
                  </div>
                  <Button onClick={openQuizOverlay} className="gap-2" size="lg">
                    <HelpCircle className="w-4 h-4" /> Take a Quiz
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Step 6: Quiz shown as overlay on the platform image */}
          {step === 6 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Quiz Overlay on {platform?.name} 📝
              </h2>
              {renderPlatformView()}
              {answered && (
                <div className="flex justify-center mt-6">
                  <Button onClick={toggleOffline} className="gap-2" size="lg">
                    <WifiOff className="w-4 h-4" /> Try Offline Mode
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Offline Mode */}
          {step === 7 && (
            <div className="animate-fade-up text-center">
              <h2 className="text-2xl font-bold mb-4">Offline Mode 📴</h2>
              <div className="glass-card rounded-xl p-6 max-w-sm mx-auto mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">AI Server Status</span>
                  <button
                    onClick={() => setOfflineMode(!offlineMode)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      offlineMode ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                    }`}
                  >
                    {offlineMode ? "OFFLINE" : "ONLINE"}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {offlineMode ? "Using cached quizzes from local storage" : "Connected to AI server"}
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 max-w-lg mx-auto mb-8">
                <p className="text-sm text-muted-foreground mb-3">Random Offline Quiz:</p>
                <p className="font-semibold mb-4">{quiz.q}</p>
                <div className="space-y-2 mb-4">
                  {quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => !answered && setSelectedAnswer(i)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                        answered
                          ? i === quiz.answer ? "border-success bg-success/10" : i === selectedAnswer ? "border-destructive bg-destructive/10" : "border-border"
                          : selectedAnswer === i ? "border-primary bg-primary/10" : "border-border"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {!answered ? (
                  <Button onClick={submitAnswer} disabled={selectedAnswer === null} size="sm" className="w-full">Submit</Button>
                ) : (
                  <p className={`font-bold ${selectedAnswer === quiz.answer ? "text-success" : "text-destructive"}`}>
                    {selectedAnswer === quiz.answer ? "✅ Correct!" : "❌ Wrong!"}
                  </p>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={restart} className="gap-2">
                  <RefreshCw className="w-4 h-4" /> Restart Simulation
                </Button>
                <Button onClick={() => navigate("/dashboard")} className="gap-2">
                  View Dashboard <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
