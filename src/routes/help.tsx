import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, CreditCard, Video, Award, Bot, Users } from "lucide-react";

export const Route = createFileRoute("/help")({ component: Help });

const topics = [
  { Icon: BookOpen, title: "Getting started", desc: "Set up your account & first course" },
  { Icon: Video, title: "Live classes", desc: "Join, raise hand, get recordings" },
  { Icon: CreditCard, title: "Payments & refunds", desc: "Plans, upgrades, invoices" },
  { Icon: Award, title: "Certificates", desc: "Download & verify your credentials" },
  { Icon: Bot, title: "AI Tutor", desc: "Tips for getting the best answers" },
  { Icon: Users, title: "Community rules", desc: "Posting, moderation, reputation" },
];

function Help() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground mt-2">Search guides, FAQs, and best practices.</p>
          <div className="relative mt-6 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-11 h-12" placeholder="Search 'reset password', 'live class'..." />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {topics.map((t) => (
            <Link key={t.title} to="/contact" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-zest text-primary-foreground mb-3"><t.Icon className="h-5 w-5" /></div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
