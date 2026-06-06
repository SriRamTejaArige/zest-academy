import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, MessageSquare, Bot } from "lucide-react";
import { useState } from "react";
import { doubts } from "@/lib/mock";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Doubts & Discussions</h1>
            <p className="text-muted-foreground mt-1">Ask doubts, help others, build reputation.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <Input placeholder="What's your doubt? Be specific..." />
            <Textarea placeholder="Add details, context, what you've tried..." rows={3} />
            <div className="flex justify-end">
              <Button className="gradient-zest text-primary-foreground border-0">Post Doubt</Button>
            </div>
          </div>
          {doubts.map((d) => (
            <div key={d.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <button className="text-muted-foreground hover:text-primary"><ArrowUp className="h-4 w-4" /></button>
                  <span className="text-sm font-semibold">{d.upvotes}</span>
                  <button className="text-muted-foreground hover:text-destructive"><ArrowDown className="h-4 w-4" /></button>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold leading-snug">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{d.body}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="secondary">{d.subject}</Badge>
                    {d.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                    <span className="text-muted-foreground ml-auto flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {d.answers} answers</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">by {d.author} • {d.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <AITutorCard />
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Top Contributors</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {["Ankit S.", "Riya P.", "Karthik R.", "Sneha I."].map((n, i) => (
                <li key={n} className="flex items-center justify-between">
                  <span>#{i + 1} {n}</span>
                  <span className="text-xs text-muted-foreground">{(2000 - i * 240)} XP</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}

function AITutorCard() {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Hi! I'm Zest AI. Ask me anything — concepts, doubts, formulas." },
  ]);
  const [input, setInput] = useState("");
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-zest text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">Zest AI Tutor</div>
          <div className="text-xs text-muted-foreground">Always online</div>
        </div>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={`rounded-lg p-2 ${m.role === "ai" ? "bg-secondary" : "bg-primary/10"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setMsgs([...msgs, { role: "user", text: input }, { role: "ai", text: "Great question! (Mock answer — wire to Lovable AI in next round.)" }]);
          setInput("");
        }}
      >
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask AI..." />
        <Button type="submit" size="sm" className="gradient-zest text-primary-foreground border-0">Send</Button>
      </form>
    </div>
  );
}
