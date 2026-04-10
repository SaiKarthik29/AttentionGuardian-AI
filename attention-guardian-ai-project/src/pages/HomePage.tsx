import { useNavigate } from "react-router-dom";
import { Shield, Zap, Brain, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdToLearningIllustration = () => (
  <div className="relative flex items-center justify-center gap-4 md:gap-8 py-8">
    {/* Ad Card */}
    <div className="glass-card rounded-lg p-4 w-32 md:w-44 text-center opacity-60 border-destructive/30 animate-fade-up">
      <div className="text-xs text-muted-foreground mb-2">Advertisement</div>
      <div className="h-16 bg-destructive/10 rounded flex items-center justify-center text-destructive text-2xl">
        🚫
      </div>
      <div className="text-[10px] text-muted-foreground mt-2">Buy Now! 50% Off!</div>
    </div>

    {/* Arrow */}
    <div className="flex flex-col items-center gap-1 animate-fade-up-delay-1">
      <Sparkles className="w-5 h-5 text-primary animate-pulse-slow" />
      <ArrowRight className="w-8 h-8 text-primary" />
      <span className="text-[10px] text-primary font-medium">AI Magic</span>
    </div>

    {/* Learning Card */}
    <div className="glass-card rounded-lg p-4 w-32 md:w-44 text-center border-primary/30 glow-primary animate-fade-up-delay-2">
      <div className="text-xs text-primary mb-2">Study Tip</div>
      <div className="h-16 bg-primary/10 rounded flex items-center justify-center text-2xl">
        💡
      </div>
      <div className="text-[10px] text-foreground mt-2">Use Flexbox for layouts!</div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: string }) => (
  <div className={`glass-card rounded-xl p-6 hover-lift ${delay}`}>
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Attention Guardian AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <button onClick={() => navigate("/simulation")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulation</button>
            <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</button>
            <button onClick={() => navigate("/about")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</button>
          </div>
          <Button size="sm" onClick={() => navigate("/simulation")}>
            Try Demo
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs text-primary mb-8 animate-fade-up">
            <Sparkles className="w-3 h-3" />
            AI-Powered Learning Extension
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up leading-tight">
            <span className="gradient-text">Attention Guardian</span>
            <br />
            <span className="text-foreground">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-1">
            Transform distracting ads into personalized learning experiences.
            Study tips, quizzes, and analytics — all powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
            <Button size="lg" className="glow-primary gap-2 px-8" onClick={() => navigate("/simulation")}>
              <Zap className="w-4 h-4" /> Start Simulation
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8" onClick={() => navigate("/dashboard")}>
              View Dashboard
            </Button>
          </div>

          <AdToLearningIllustration />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-fade-up">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={Shield} title="Ad Detection" description="Intelligently scans webpages to identify and highlight distracting advertisements in real-time." delay="animate-fade-up" />
            <FeatureCard icon={Brain} title="AI Tip Generation" description="Generates personalized study tips based on the content you're learning, powered by AI." delay="animate-fade-up-delay-1" />
            <FeatureCard icon={Zap} title="Interactive Quizzes" description="Tests your knowledge with context-aware quizzes that adapt to your learning progress." delay="animate-fade-up-delay-2" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
