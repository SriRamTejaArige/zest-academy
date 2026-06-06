import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, Video, Users, DollarSign, Star } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { teacherRevenue, courses } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/teacher")({ component: TeacherDash });

function TeacherDash() {
  return (
    <DashboardShell role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Teacher Studio</h1>
            <p className="text-muted-foreground">Manage your content, classes, and earnings.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Upload className="h-4 w-4 mr-1" /> Upload Notes</Button>
            <Button className="gradient-zest text-primary-foreground border-0"><Plus className="h-4 w-4 mr-1" /> New Course</Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Users} label="Active students" value="4,820" />
          <Stat icon={Video} label="Published courses" value="8" />
          <Stat icon={Star} label="Avg. rating" value="4.85" />
          <Stat icon={DollarSign} label="This month" value="₹68,200" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Revenue (6 months)</h3>
            <Badge variant="secondary">+24% MoM</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={teacherRevenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-4">Your courses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-2 px-2">Title</th>
                  <th className="py-2 px-2">Students</th>
                  <th className="py-2 px-2">Rating</th>
                  <th className="py-2 px-2">Revenue</th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, 5).map((c) => (
                  <tr key={c.id} className="border-b border-border/60">
                    <td className="py-3 px-2 font-medium">{c.title}</td>
                    <td className="px-2">{c.students.toLocaleString()}</td>
                    <td className="px-2">{c.rating}</td>
                    <td className="px-2">₹{(c.students * c.price / 100).toFixed(0)}K</td>
                    <td className="px-2 text-right"><Button size="sm" variant="ghost">Manage</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-primary" />
      <div className="text-2xl font-bold mt-3">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
