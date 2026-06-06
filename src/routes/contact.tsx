import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-14 grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
          <p className="text-muted-foreground mt-2">We typically respond within 24 hours.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> hello@zestacademy.com</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> +91 80-4567-8901</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> Bangalore, India</div>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <div><Label>Name</Label><Input placeholder="Your name" /></div>
          <div><Label>Email</Label><Input type="email" placeholder="you@email.com" /></div>
          <div><Label>Message</Label><Textarea rows={5} placeholder="How can we help?" /></div>
          <Button className="w-full gradient-zest text-primary-foreground border-0">Send message</Button>
        </form>
      </div>
    </SiteShell>
  );
}
