import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Heart, Globe, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About <span className="text-gradient-zest">Zest Academy</span></h1>
        <p className="text-lg text-muted-foreground mt-4">We're on a mission to make world-class education zestful, accessible, and joyful — for every Indian student.</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {[
            { Icon: Heart, title: "Student-first", desc: "Every feature, animation, and lesson is shaped by real learner feedback." },
            { Icon: Globe, title: "Pan-India access", desc: "Available in 12+ languages with low-bandwidth mode." },
            { Icon: Users, title: "1,200+ teachers", desc: "Verified educators from IITs, AIIMS & global tech firms." },
            { Icon: Sparkles, title: "AI-native", desc: "Built with AI tutoring, summarization, and adaptive learning at the core." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-zest text-primary-foreground mb-3"><f.Icon className="h-5 w-5" /></div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold">Our story</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Zest Academy was founded in 2024 by educators and engineers tired of clunky, ad-filled learning platforms.
            We built Zest to feel less like a textbook and more like a beautifully designed game — where every win, streak,
            and certificate is celebrated. Today, 250,000+ learners trust us with their growth.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
