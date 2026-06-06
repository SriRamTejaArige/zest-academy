import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=70" alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div>
              <div className="text-lg font-semibold">Aarav Sharma</div>
              <div className="text-sm text-muted-foreground">Student • Class 12</div>
              <Button variant="link" className="p-0 h-auto text-xs text-primary">Change photo</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input defaultValue="Aarav Sharma" /></div>
            <div><Label>Email</Label><Input defaultValue="aarav@zest.dev" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
            <div><Label>Class / Standard</Label><Input defaultValue="Class 12 — Science" /></div>
          </div>
          <div><Label>Bio</Label><Textarea rows={3} defaultValue="Aspiring engineer prepping for JEE 2026." /></div>
          <div className="flex justify-end gap-2"><Button variant="outline">Cancel</Button><Button className="gradient-zest text-primary-foreground border-0">Save changes</Button></div>
        </div>
      </div>
    </SiteShell>
  );
}
