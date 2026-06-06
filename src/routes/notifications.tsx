import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bell, Calendar, BookOpen, DollarSign, Megaphone } from "lucide-react";
import { notifications } from "@/lib/mock";

const icons: Record<string, any> = {
  live: Calendar, course: BookOpen, assignment: Bell, payment: DollarSign, announcement: Megaphone,
};

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="mt-6 space-y-2">
          {notifications.map((n) => {
            const Icon = icons[n.type] || Bell;
            return (
              <div key={n.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.time} ago</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
