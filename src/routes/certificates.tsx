import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";
import { certificates } from "@/lib/mock";

export const Route = createFileRoute("/certificates")({ component: CertsPage });

function CertsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground mt-1">Verifiable, shareable & lifetime — for every completed course.</p>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {certificates.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="aspect-[16/10] gradient-zest p-6 text-primary-foreground relative">
                <Award className="h-10 w-10" />
                <div className="mt-6 text-xs uppercase tracking-widest opacity-90">Certificate of Completion</div>
                <div className="mt-2 text-xl font-bold leading-tight">{c.course}</div>
                <div className="mt-6 text-xs opacity-90">Issued {c.date} • ID {c.id_no}</div>
              </div>
              <div className="p-4 flex gap-2 justify-end">
                <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                <Button size="sm" className="gradient-zest text-primary-foreground border-0"><Download className="h-4 w-4 mr-1" /> Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
