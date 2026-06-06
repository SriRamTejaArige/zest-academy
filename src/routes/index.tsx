import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Search, Sparkles, PlayCircle, BookOpen, Users, Trophy, Bot,
  ArrowRight, Star, Zap, ShieldCheck, Globe,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { CourseCard } from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { teachers, liveClasses, testimonials, stats, faqs, categories, type Course } from "@/lib/mock";
import { fetchCourses } from "@/lib/courses";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="rounded-full gradient-zest text-primary-foreground border-0 mb-4">
                <Sparkles className="h-3 w-3 mr-1" /> AI-powered learning, made joyful
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Learn boldly.<br />
                Grow with <span className="text-gradient-zest">Zest</span>.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Live HD classes, premium courses, an endless notes library, smart quizzes, and a 24/7
                AI tutor — built for India's most ambitious learners.
              </p>
              <form className="mt-7 flex gap-2 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search 'JEE Maths', 'React', 'NEET Biology'..." className="pl-11 h-12 text-base" />
                </div>
                <Button size="lg" className="h-12 gradient-zest text-primary-foreground border-0 hover:opacity-90">
                  Search
                </Button>
              </form>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/courses">
                  <Button size="lg" variant="default" className="gradient-zest text-primary-foreground border-0">
                    Explore Courses <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/live">
                  <Button size="lg" variant="outline">
                    <PlayCircle className="mr-1.5 h-4 w-4" /> Watch Live Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> 4.9 / 5 by 38K learners</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> Verified teachers</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl"
            >
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-gradient-zest">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=70"
                alt="Students learning"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-background/90 backdrop-blur p-3 border border-border">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-zest text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">AI Tutor is online</div>
                  <div className="text-xs text-muted-foreground">Ask anything, anytime — instant answers.</div>
                </div>
                <Button size="sm" variant="ghost">Try →</Button>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-4 shadow-xl hidden md:flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <div>
                <div className="text-sm font-semibold">12K+ certificates</div>
                <div className="text-xs text-muted-foreground">issued this year</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((c) => (
            <Link key={c} to="/courses" className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <Section title="Popular Courses" subtitle="Hand-picked by our learning team" link="/courses">
        {courses.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-sm">Loading courses…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.slice(0, 8).map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
          </div>
        )}
      </Section>

      {/* LIVE CLASSES */}
      <Section title="Upcoming Live Classes" subtitle="Join real-time, ask doubts, get answers" link="/live">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveClasses.slice(0, 3).map((lc, i) => (
            <motion.div
              key={lc.id}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                {lc.status === "Live" && <Badge className="bg-destructive text-destructive-foreground border-0 animate-pulse">● LIVE</Badge>}
                {lc.status === "Upcoming" && <Badge variant="secondary">{lc.startsAt}</Badge>}
                <Badge variant="outline">{lc.subject}</Badge>
              </div>
              <h3 className="font-semibold text-lg leading-snug">{lc.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">with {lc.teacher}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{lc.duration} • {lc.enrolled.toLocaleString()} enrolled</span>
                <Button size="sm" className="gradient-zest text-primary-foreground border-0">
                  {lc.status === "Live" ? "Join Now" : "Set Reminder"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="rounded-full mb-3">Everything you need</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One platform. Every learning superpower.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: PlayCircle, title: "HD Live Classes", desc: "Crystal-clear streams with chat, polls, whiteboard, and recordings." },
            { icon: BookOpen, title: "Notes Library", desc: "Searchable PDFs, DOCX & PPTs by subject, semester, and language." },
            { icon: Bot, title: "AI Tutor 24/7", desc: "Instant doubt solving, summaries, and quiz generation." },
            { icon: Trophy, title: "Quizzes & Certs", desc: "Auto-graded tests, leaderboards, and verifiable certificates." },
            { icon: Users, title: "Community", desc: "Topic-wise discussions, upvotes, and best-answer markings." },
            { icon: Zap, title: "Gamified Streaks", desc: "Earn XP, badges, and climb the daily learning leaderboard." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-zest text-primary-foreground mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="relative overflow-hidden rounded-3xl border border-border gradient-zest p-10 md:p-14 text-primary-foreground">
          <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-background/90 text-foreground border-0 rounded-full mb-3"><Sparkles className="h-3 w-3 mr-1" /> New</Badge>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">Meet Zest AI — your personal study sidekick.</h3>
              <p className="mt-3 opacity-90 max-w-lg">Summarize notes, generate quizzes, get step-by-step solutions, and design your weekly study plan. Built for Indian curricula.</p>
              <div className="mt-5 flex gap-3">
                <Button size="lg" variant="secondary">Try AI Tutor</Button>
                <Button size="lg" variant="outline" className="border-white/40 text-primary-foreground bg-transparent hover:bg-white/10">Learn more</Button>
              </div>
            </div>
            <div className="rounded-2xl bg-background/95 text-foreground p-5 border border-white/30 shadow-2xl">
              <div className="text-xs text-muted-foreground">Student asked</div>
              <div className="mt-1 font-medium">Explain definite integrals with substitution in 3 steps.</div>
              <div className="mt-4 text-xs text-muted-foreground">Zest AI replied</div>
              <ol className="mt-1 list-decimal list-inside text-sm space-y-1">
                <li>Choose u = f(x), compute du/dx.</li>
                <li>Rewrite limits: x = a, b → u = f(a), f(b).</li>
                <li>Integrate in u, then plug new limits — done!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* TOP TEACHERS */}
      <Section title="Learn from the best" subtitle="Verified teachers with proven track records" link="/teachers">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.slice(0, 3).map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-6 flex gap-4 hover:shadow-lg transition-shadow">
              <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.title}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" /> {t.rating}</span>
                  <span>{t.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="rounded-full mb-3">Loved by learners</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Success stories that fuel us.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-1 text-primary mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border/60">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="rounded-full mb-3">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Questions, answered.</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center">
          <Globe className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your learning journey starts today.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Join 250,000+ students already growing on Zest Academy. Free to start, premium when you're ready.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/auth/register"><Button size="lg" className="gradient-zest text-primary-foreground border-0">Create Free Account</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="outline">See Pricing</Button></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Section({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {link && (
          <Link to={link} className="text-sm text-primary font-medium hover:underline shrink-0">
            View all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}