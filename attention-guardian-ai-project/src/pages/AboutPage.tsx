import { useNavigate } from "react-router-dom";
import { Shield, Eye, Brain, HelpCircle, BarChart3, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Eye, title: "Ad Detection", desc: "Scans web pages in real-time to identify and highlight advertising content using pattern matching." },
  { icon: Brain, title: "AI Study Tips", desc: "Generates contextual study tips based on detected topics using simulated AI processing." },
  { icon: HelpCircle, title: "Quiz Overlay", desc: "Interactive quiz popups that test your knowledge with instant feedback and scoring." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Tracks your learning metrics including ads blocked, quizzes taken, and topics covered." },
];

const AboutPage = () => {
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</button>
            <button onClick={() => navigate("/about")} className="text-sm text-foreground transition-colors">About</button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Problem & Solution */}
          <section className="mb-16 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About the Project</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-8">
                <div className="text-3xl mb-4">😵</div>
                <h3 className="text-xl font-bold mb-3 text-destructive">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Online ads are everywhere — flashy banners, auto-playing videos, clickbait pop-ups.
                  They break concentration, waste time, and reduce productivity for students and learners.
                </p>
              </div>
              <div className="glass-card rounded-xl p-8">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-success">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Attention Guardian AI replaces distracting ads with personalized study tips, interactive quizzes,
                  and learning content — turning wasted time into productive learning moments.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center animate-fade-up">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className={`glass-card rounded-xl p-6 hover-lift animate-fade-up-delay-${Math.min(i, 3)}`}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Demo Video */}
          <section className="mb-16 animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Project Demonstration</h2>
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 border border-border">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster=""
                >
                  <source src="/videos/project.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-muted-foreground">
                See the complete simulation in action — from ad detection to quiz completion.
              </p>
            </div>
          </section>

          <div className="text-center animate-fade-up">
            <Button size="lg" onClick={() => navigate("/simulation")} className="gap-2 glow-primary">
              Try the Simulation <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
