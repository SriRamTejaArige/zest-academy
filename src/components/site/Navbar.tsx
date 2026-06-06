import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, Menu, Moon, Sun, Bell, GraduationCap, X, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyTheme, getTheme, toggleTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "@/lib/auth";

const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/live", label: "Live Classes" },
  { to: "/notes", label: "Notes" },
  { to: "/teachers", label: "Teachers" },
  { to: "/community", label: "Community" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { location } = useRouterState();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = getTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  // Close dropdown when clicking outside it
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleLogout() {
    setMenuOpen(false);
    await signOut();
    navigate({ to: "/" });
  }

  // Initials for the avatar circle (first two letters of name or email)
  const initials = (() => {
    const name = profile?.full_name || user?.email || "";
    return name
      .split(/\s+/)
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
  })();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-zest text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Zest <span className="text-gradient-zest">Academy</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {nav.map((n) => {
            const active = location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  active ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, notes, teachers..." className="pl-9 h-9" />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setTheme(toggleTheme())} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/notifications" className="hidden sm:inline-flex">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </Link>

          {/* === AUTH STATE === */}
          {loading ? (
            // Brief skeleton while we check the session — prevents flicker
            <div className="hidden sm:block h-8 w-20 rounded-md bg-secondary animate-pulse" />
          ) : user ? (
            // Logged in: show avatar with dropdown
            <div ref={menuRef} className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1 hover:bg-secondary transition-colors"
              >
                <div className="grid h-7 w-7 place-items-center rounded-full gradient-zest text-primary-foreground text-xs font-bold">
                  {initials}
                </div>
                <span className="text-sm font-medium pr-1 max-w-[120px] truncate">
                  {profile?.full_name || user.email}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <div className="text-sm font-semibold truncate">{profile?.full_name || "Account"}</div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                    {profile?.role && (
                      <div className="mt-1 inline-block rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs capitalize">
                        {profile.role}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); navigate({ to: "/dashboard" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary text-left"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); navigate({ to: "/profile" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary text-left"
                  >
                    <UserIcon className="h-4 w-4" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary text-left text-destructive border-t border-border"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Logged out: show original Sign In / Get Started
            <>
              <Link to="/auth/login" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth/register" className="hidden sm:inline-flex">
                <Button size="sm" className="gradient-zest text-primary-foreground border-0 hover:opacity-90">Get Started</Button>
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border/60 mt-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary">
                    Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary">
                    Profile
                  </Link>
                  <button
                    onClick={() => { setOpen(false); handleLogout(); }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-destructive hover:bg-secondary"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to="/auth/login" className="flex-1"><Button variant="outline" className="w-full">Sign In</Button></Link>
                  <Link to="/auth/register" className="flex-1"><Button className="w-full gradient-zest text-primary-foreground border-0">Get Started</Button></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}