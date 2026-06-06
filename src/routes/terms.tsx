import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-14 prose dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground mt-2">Last updated: May 25, 2026</p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>Welcome to Zest Academy. By using our platform, you agree to these terms. Please read them carefully.</p>
          <h2 className="text-foreground font-semibold text-base">1. Use of Service</h2>
          <p>You must be at least 13 years old to use Zest Academy. You agree to use the service for lawful, educational purposes only.</p>
          <h2 className="text-foreground font-semibold text-base">2. Accounts</h2>
          <p>You're responsible for safeguarding your password and for any activity under your account.</p>
          <h2 className="text-foreground font-semibold text-base">3. Content</h2>
          <p>All courses, notes, and live classes are protected by copyright. Redistribution without permission is prohibited.</p>
          <h2 className="text-foreground font-semibold text-base">4. Payments & Refunds</h2>
          <p>Paid plans renew automatically. You may cancel anytime. Refunds within 7 days for unused courses.</p>
        </div>
      </div>
    </SiteShell>
  );
}
