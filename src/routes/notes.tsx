import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Search, Bookmark, Upload, File as FileIcon } from "lucide-react";
import { notes } from "@/lib/mock";

export const Route = createFileRoute("/notes")({ component: NotesPage });

const typeIcon: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-5 w-5 text-destructive" />,
  DOCX: <FileText className="h-5 w-5 text-primary" />,
  PPT: <FileText className="h-5 w-5 text-accent" />,
  Image: <FileIcon className="h-5 w-5 text-muted-foreground" />,
};

function NotesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => notes.filter((n) =>
    n.title.toLowerCase().includes(q.toLowerCase()) || n.subject.toLowerCase().includes(q.toLowerCase())
  ), [q]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Notes Library</h1>
            <p className="text-muted-foreground mt-1">Premium PDFs, DOCX, PPT & handwritten notes — searchable by subject.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes..." className="pl-9" />
            </div>
            <Button className="gradient-zest text-primary-foreground border-0"><Upload className="h-4 w-4 mr-1" /> Upload</Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((n) => (
            <div key={n.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
                  {typeIcon[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold leading-snug line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">by {n.uploader} • {n.date}</p>
                </div>
                <button aria-label="Bookmark" className="text-muted-foreground hover:text-primary">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="secondary">{n.subject}</Badge>
                <Badge variant="outline">{n.semester}</Badge>
                <Badge variant="outline">{n.type}</Badge>
                <span className="text-muted-foreground ml-auto">{n.size}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{n.downloads.toLocaleString()} downloads</span>
                <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1" /> Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
