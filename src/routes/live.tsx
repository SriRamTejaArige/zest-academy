import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Users } from "lucide-react";
import { liveClasses } from "@/lib/mock";

export const Route = createFileRoute("/live")({ component: LivePage });

function LivePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Live Classes</h1>
        <p className="text-muted-foreground mt-1">Join HD live sessions with real teachers — raise hand, chat, get answers.</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {liveClasses.map((lc) => (
            <div key={lc.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center">
                <Video className="h-12 w-12 text-foreground/60" />
                {lc.status === "Live" && (
                  <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground border-0 animate-pulse">● LIVE</Badge>
                )}
              </div>
              <div className="p-5">
                <Badge variant="outline" className="mb-2">{lc.subject}</Badge>
                <h3 className="font-semibold leading-snug">{lc.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">with {lc.teacher}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {lc.startsAt}</span>
                  <span>•</span>
                  <span>{lc.duration}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {lc.enrolled.toLocaleString()}</span>
                </div>
                <Button className="w-full mt-4 gradient-zest text-primary-foreground border-0" disabled={lc.status === "Ended"}>
                  {lc.status === "Live" ? "Join Live Class" : lc.status === "Upcoming" ? "Set Reminder" : "Watch Recording"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
