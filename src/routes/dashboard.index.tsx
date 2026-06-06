import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/dashboard/")({ component: DashboardIndex });

function DashboardIndex() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Still figuring out the session — wait.
    if (loading) return;

    // Not logged in — bounce to login.
    if (!user) {
      navigate({ to: "/auth/login" });
      return;
    }

    // Wait until we've also pulled the profile (with the role).
    if (!profile) return;

    // Route to the right dashboard based on role.
    if (profile.role === "admin") navigate({ to: "/dashboard/admin" });
    else if (profile.role === "teacher") navigate({ to: "/dashboard/teacher" });
    else navigate({ to: "/dashboard/student" });
  }, [user, profile, loading, navigate]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-muted-foreground text-sm">
        Loading your dashboard…
      </div>
    </SiteShell>
  );
}