import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Mail, Phone, Chrome } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/auth/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
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
          <h1 className="text-2xl font-bold text-center">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">Sign in to continue your learning</p>

          <Tabs defaultValue="email" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email"><Mail className="h-3.5 w-3.5 mr-1" /> Email</TabsTrigger>
              <TabsTrigger value="phone" disabled><Phone className="h-3.5 w-3.5 mr-1" /> Phone OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="text-right text-xs"><a href="#" className="text-primary hover:underline">Forgot password?</a></div>

                {error && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full gradient-zest text-primary-foreground border-0">
                  {loading ? "Signing in…" : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="phone" className="space-y-3 mt-4">
              <div><Label>Phone</Label><Input type="tel" placeholder="+91 98765 43210" disabled /></div>
              <Button disabled className="w-full gradient-zest text-primary-foreground border-0">Send OTP (coming soon)</Button>
            </TabsContent>
          </Tabs>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" disabled className="w-full"><Chrome className="h-4 w-4 mr-2" /> Google (coming soon)</Button>

          <div className="text-center text-sm text-muted-foreground mt-6">
            New here? <Link to="/auth/register" className="text-primary font-medium hover:underline">Create an account</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}