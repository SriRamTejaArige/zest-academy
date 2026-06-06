import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, BookOpen, Clock, Award } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { courses, studentProgress, liveClasses, certificates } from "@/lib/mock";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/dashboard/student")({ component: StudentDash });

function StudentDash() {
  const { user, profile } = useAuth();
  // Pick the friendliest available label: first word of full name, else email prefix
  const displayName =
    profile?.full_name?.split(/\s+/)[0] ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <DashboardShell role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, {displayName} 👋</h1>
          <p className="text-muted-foreground">Pick up where you left off and keep your streak alive.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Flame} label="Streak" value="14 days" tint="bg-primary/15 text-primary" />
          <StatCard icon={Trophy} label="XP earned" value="3,240" tint="bg-accent/15 text-accent" />
          <StatCard icon={BookOpen} label="Enrolled" value="6 courses" tint="bg-secondary text-foreground" />
          <StatCard icon={Clock} label="This week" value="8h 25m" tint="bg-secondary text-foreground" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Weekly study minutes</h3>
              <Badge variant="secondary">+18% vs last week</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentProgress}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="minutes" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">Upcoming live</h3>
            <div className="space-y-3">
              {liveClasses.slice(0, 3).map((lc) => (
                <div key={lc.id} className="rounded-lg border border-border p-3">
                  <div className="text-sm font-medium leading-snug">{lc.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{lc.startsAt} • {lc.teacher}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Continue learning</h3>
            <Link to="/courses" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((c, i) => (
              <Link to="/courses/$id" params={{ id: c.id }} key={c.id} className="rounded-xl border border-border overflow-hidden group">
                <img src={c.thumbnail} alt={c.title} className="aspect-video w-full object-cover" />
                <div className="p-3 space-y-2">
                  <div className="text-sm font-medium line-clamp-1">{c.title}</div>
                  <Progress value={[42, 78, 25][i]} />
                  <div className="text-xs text-muted-foreground">{[42, 78, 25][i]}% complete</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-3">
              {["🔥 14-day streak", "🏆 Top 5% in DSA Quiz", "📚 50 lessons", "⚡ Speed Learner", "🎯 Goal Crusher"].map((a) => (
                <Badge key={a} variant="secondary" className="rounded-full px-3 py-1">{a}</Badge>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Recent certificates</h3>
            <ul className="space-y-2 text-sm">
              {certificates.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
                  <span>{c.course}</span>
                  <Button variant="ghost" size="sm">Download</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ icon: Icon, label, value, tint }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-bold mt-3">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}