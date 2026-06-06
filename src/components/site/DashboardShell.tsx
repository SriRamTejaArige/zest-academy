import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Video, Award, Bell, User, GraduationCap, BarChart3, Users, Shield, FileText } from "lucide-react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Role = "student" | "teacher" | "admin";

const items: Record<Role, { to: string; label: string; Icon: any }[]> = {
  student: [
    { to: "/dashboard/student", label: "Overview", Icon: LayoutDashboard },
    { to: "/courses", label: "My Courses", Icon: BookOpen },
    { to: "/live", label: "Live Classes", Icon: Video },
    { to: "/certificates", label: "Certificates", Icon: Award },
    { to: "/notifications", label: "Notifications", Icon: Bell },
    { to: "/profile", label: "Profile", Icon: User },
  ],
  teacher: [
    { to: "/dashboard/teacher", label: "Overview", Icon: LayoutDashboard },
    { to: "/dashboard/teacher", label: "My Content", Icon: BookOpen },
    { to: "/live", label: "Live Sessions", Icon: Video },
    { to: "/dashboard/teacher", label: "Analytics", Icon: BarChart3 },
    { to: "/profile", label: "Profile", Icon: User },
  ],
  admin: [
    { to: "/dashboard/admin", label: "Overview", Icon: LayoutDashboard },
    { to: "/dashboard/admin", label: "Users", Icon: Users },
    { to: "/dashboard/admin", label: "Content", Icon: FileText },
    { to: "/dashboard/admin", label: "Moderation", Icon: Shield },
    { to: "/dashboard/admin", label: "Analytics", Icon: BarChart3 },
  ],
};

export function DashboardShell({ role, children }: { role: Role; children: React.ReactNode }) {
  const { location } = useRouterState();
  const nav = items[role];
  const labels: Record<Role, string> = { student: "Student", teacher: "Teacher", admin: "Admin" };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 flex-1 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-border bg-card p-4 sticky top-20">
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-zest text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">{labels[role]} Panel</div>
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map((i, idx) => {
                const active = location.pathname === i.to && idx === 0;
                return (
                  <Link key={idx} to={i.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                    <i.Icon className="h-4 w-4" /> {i.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-border/60 flex flex-col gap-2 text-xs">
              <Link to="/dashboard/student" className="text-muted-foreground hover:text-foreground">Switch to Student</Link>
              <Link to="/dashboard/teacher" className="text-muted-foreground hover:text-foreground">Switch to Teacher</Link>
              <Link to="/dashboard/admin" className="text-muted-foreground hover:text-foreground">Switch to Admin</Link>
            </div>
          </div>
        </aside>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
