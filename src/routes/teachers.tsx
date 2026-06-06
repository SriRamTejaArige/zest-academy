import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen } from "lucide-react";
import { teachers } from "@/lib/mock";

export const Route = createFileRoute("/teachers")({ component: TeachersPage });

function TeachersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Our Teachers</h1>
        <p className="text-muted-foreground mt-1">Verified educators from IITs, AIIMS, and global tech companies.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {teachers.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{t.bio}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> {t.rating}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {t.students.toLocaleString()}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {t.courses} courses</span>
              </div>
              <Button variant="outline" className="w-full mt-4">View Profile</Button>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
