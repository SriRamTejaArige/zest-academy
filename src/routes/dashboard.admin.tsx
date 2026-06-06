import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, DollarSign, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { adminUsersData, teachers } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/admin")({ component: AdminDash });

function AdminDash() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground">Platform health, moderation & analytics.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Users} label="Total users" value="254,890" hint="+1,240 this week" />
          <Stat icon={BookOpen} label="Active courses" value="8,432" hint="+34 this week" />
          <Stat icon={DollarSign} label="Revenue (MTD)" value="₹42.3L" hint="+12% MoM" />
          <Stat icon={ShieldAlert} label="Open reports" value="17" hint="3 high priority" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3">Growth (last 4 weeks)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminUsersData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="var(--primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="teachers" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Teacher approvals</h3>
            <div className="space-y-3">
              {teachers.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <img src={t.avatar} className="h-10 w-10 rounded-xl object-cover" alt={t.name} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.title}</div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-accent"><CheckCircle2 className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" className="text-destructive"><XCircle className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Recent moderation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { type: "Course", title: "Spam course flagged: 'Earn ₹50K daily'", action: "Removed" },
                { type: "Note", title: "Plagiarism report on 'JS Cheatsheet'", action: "Under review" },
                { type: "User", title: "User banned for abusive comments", action: "Banned" },
                { type: "Live", title: "Live class extension request", action: "Approved" },
              ].map((m, i) => (
                <li key={i} className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
                  <div>
                    <Badge variant="outline" className="mr-2">{m.type}</Badge>
                    <span>{m.title}</span>
                  </div>
                  <Badge variant="secondary">{m.action}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ icon: Icon, label, value, hint }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-primary" />
      <div className="text-2xl font-bold mt-3">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {hint && <div className="text-[11px] text-accent mt-1">{hint}</div>}
    </div>
  );
}
