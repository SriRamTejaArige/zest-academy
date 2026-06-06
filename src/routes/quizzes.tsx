import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ListChecks, Trophy } from "lucide-react";
import { quizzes } from "@/lib/mock";

export const Route = createFileRoute("/quizzes")({ component: QuizzesPage });

function QuizzesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quizzes & Tests</h1>
        <p className="text-muted-foreground mt-1">Practice MCQs, mock tests, and timed exams with auto-evaluation.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {quizzes.map((q) => (
            <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{q.subject}</Badge>
                <Badge variant="outline" className={q.difficulty === "Hard" ? "border-destructive text-destructive" : q.difficulty === "Medium" ? "border-primary text-primary" : "border-accent text-accent"}>
                  {q.difficulty}
                </Badge>
              </div>
              <h3 className="font-semibold leading-snug">{q.title}</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><ListChecks className="h-3 w-3" /> {q.questions} Qs</div>
                <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {q.duration}</div>
                <div className="flex items-center gap-1"><Trophy className="h-3 w-3" /> {q.attempts.toLocaleString()}</div>
              </div>
              <Button className="w-full mt-4 gradient-zest text-primary-foreground border-0">Start Quiz</Button>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
