import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { pricingPlans } from "@/lib/mock";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

function PricingPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <Badge variant="secondary" className="rounded-full">Pricing</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Simple plans. Big outcomes.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Start free. Upgrade when you're ready. Cancel anytime.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
          {pricingPlans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-7 bg-card ${p.highlight ? "border-primary ring-2 ring-primary/30 shadow-xl scale-[1.02]" : "border-border"}`}>
              {p.highlight && <Badge className="gradient-zest text-primary-foreground border-0 mb-3">Most Popular</Badge>}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price === 0 ? "Free" : `₹${p.price}`}</span>
                {p.price > 0 && <span className="text-sm text-muted-foreground">/{p.period}</span>}
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth/register">
                <Button className={`w-full mt-6 ${p.highlight ? "gradient-zest text-primary-foreground border-0" : ""}`} variant={p.highlight ? "default" : "outline"}>
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          Supports UPI, cards, net banking, wallets. Razorpay & Stripe ready.
        </div>
      </div>
    </SiteShell>
  );
}
