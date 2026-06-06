import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Chrome, GraduationCap as StudentIcon, BookOpen } from "lucide-react";
import { useState } from "react";
import { signUp, type UserRole } from "@/lib/auth";

export const Route = createFileRoute("/auth/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await signUp({ email, password, fullName, role });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    // Success — Supabase auto-signs them in. Send them to their dashboard.
    navigate({ to: "/dashboard" });
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8">
          <Link to="/" className="flex items-center gap-2 justify-center mb-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-zest text-primary-foreground"><GraduationCap className="h-5 w-5" /></div>
            <span className="text-xl font-bold">Zest <span className="text-gradient-zest">Academy</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-center">Create your account</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">Choose how you want to use Zest</p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              { id: "student" as const, label: "Student", Icon: StudentIcon },
              { id: "teacher" as const, label: "Teacher", Icon: BookOpen },
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`rounded-xl border p-3 text-xs flex flex-col items-center gap-1 transition-all ${
                  role === r.id ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.Icon className="h-4 w-4" /> {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 mt-5">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full gradient-zest text-primary-foreground border-0">
              {loading ? "Creating account…" : `Create ${role} account`}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" disabled className="w-full"><Chrome className="h-4 w-4 mr-2" /> Google (coming soon)</Button>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}