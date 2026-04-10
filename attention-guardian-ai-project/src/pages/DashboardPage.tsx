import { useNavigate } from "react-router-dom";
import { Shield, BarChart3, PieChart, TrendingUp, BookOpen, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["hsl(250,80%,62%)", "hsl(142,76%,46%)", "hsl(280,70%,55%)", "hsl(220,70%,50%)"];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ adsBlocked: 0, quizzesAttempted: 0, topicsLearned: 0, tipsViewed: 0 });

  useEffect(() => {
    setStats({
      adsBlocked: parseInt(localStorage.getItem("adsBlocked") || "0"),
      quizzesAttempted: parseInt(localStorage.getItem("quizzesAttempted") || "0"),
      topicsLearned: parseInt(localStorage.getItem("topicsLearned") || "0"),
      tipsViewed: parseInt(localStorage.getItem("tipsViewed") || "0"),
    });
  }, []);

  const barData = [
    { name: "Ads Blocked", value: stats.adsBlocked },
    { name: "Quizzes", value: stats.quizzesAttempted },
    { name: "Topics", value: stats.topicsLearned },
    { name: "Tips", value: stats.tipsViewed },
  ];

  const pieData = [
    { name: "Ads Blocked", value: stats.adsBlocked || 1 },
    { name: "Quizzes", value: stats.quizzesAttempted || 1 },
    { name: "Topics", value: stats.topicsLearned || 1 },
    { name: "Tips", value: stats.tipsViewed || 1 },
  ];

  const statCards = [
    { icon: Shield, label: "Ads Blocked", value: stats.adsBlocked, color: "text-primary" },
    { icon: Brain, label: "Quizzes Attempted", value: stats.quizzesAttempted, color: "text-success" },
    { icon: BookOpen, label: "Topics Learned", value: stats.topicsLearned, color: "text-accent" },
    { icon: Zap, label: "Tips Viewed", value: stats.tipsViewed, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Attention Guardian AI</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <button onClick={() => navigate("/simulation")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulation</button>
            <button onClick={() => navigate("/dashboard")} className="text-sm text-foreground transition-colors">Dashboard</button>
            <button onClick={() => navigate("/about")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-up">Your Learning Activity</h1>
          <p className="text-muted-foreground mb-8 animate-fade-up-delay-1">Track your progress as Attention Guardian AI transforms your browsing</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-5 hover-lift animate-fade-up">
                <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 animate-fade-up-delay-1">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Activity Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(230,25%,11%)", border: "1px solid hsl(230,20%,18%)", borderRadius: 8, color: "hsl(210,40%,96%)" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card rounded-xl p-6 animate-fade-up-delay-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-accent" /> Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPie>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={4}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(230,25%,11%)", border: "1px solid hsl(230,20%,18%)", borderRadius: 8, color: "hsl(210,40%,96%)" }} />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Progress */}
          <div className="glass-card rounded-xl p-6 mt-6 animate-fade-up-delay-3">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" /> Learning Progress
            </h3>
            <div className="space-y-4">
              {[
                { label: "HTML", pct: Math.min(100, stats.topicsLearned * 25) },
                { label: "CSS", pct: Math.min(100, stats.tipsViewed * 15) },
                { label: "JavaScript", pct: Math.min(100, stats.quizzesAttempted * 20) },
                { label: "DSA", pct: Math.min(100, stats.adsBlocked * 5) },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.pct}%`, background: COLORS[i] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button onClick={() => navigate("/simulation")} className="gap-2">
              Run More Simulations <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
