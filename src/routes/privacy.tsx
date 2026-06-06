import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Last updated: May 25, 2026</p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>Your privacy matters. This policy explains what we collect, how we use it, and your rights.</p>
          <h2 className="text-foreground font-semibold text-base">Data we collect</h2>
          <p>Email, name, learning progress, device info, and content you create on the platform.</p>
          <h2 className="text-foreground font-semibold text-base">How we use it</h2>
          <p>To personalize learning, send notifications, process payments, and improve our service.</p>
          <h2 className="text-foreground font-semibold text-base">Your rights</h2>
          <p>You can access, export, or delete your data anytime from your profile settings.</p>
          <h2 className="text-foreground font-semibold text-base">Contact</h2>
          <p>Questions? Email privacy@zestacademy.com</p>
        </div>
      </div>
    </SiteShell>
  );
}
