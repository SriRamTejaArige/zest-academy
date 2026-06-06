import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  PlayCircle, Clock, Users, Star, CheckCircle2, Award, Globe,
  Heart, Share2, ListVideo, Lock,
} from "lucide-react";
import { courses } from "@/lib/mock";

export const Route = createFileRoute("/courses/$id")({
  component: CourseDetail,
  loader: ({ params }) => {
    const c = courses.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
});

function CourseDetail() {
  const c = Route.useLoaderData();
  const lessons = Array.from({ length: 12 }).map((_, i) => ({
    id: i, title: `Lesson ${i + 1}: ${c.title.split("—")[0].trim()} – Part ${i + 1}`, mins: 8 + (i % 5) * 4, free: i < 2,
  }));

  return (
    <SiteShell>
      <div className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="rounded-full mb-3">{c.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{c.title}</h1>
            <p className="mt-3 text-muted-foreground">{c.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {c.rating} ({(c.students / 10).toFixed(0)} reviews)</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {c.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {c.hours}h • {c.lessons} lessons</span>
              <Badge variant="outline">{c.level}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Taught by</span>
              <Link to="/teachers" className="font-medium text-primary hover:underline">{c.teacher}</Link>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
              <div className="relative aspect-video bg-muted">
                <img src={c.thumbnail} alt={c.title} className="h-full w-full object-cover" />
                <button className="absolute inset-0 grid place-items-center bg-black/30 hover:bg-black/50 transition-colors">
                  <div className="grid h-16 w-16 place-items-center rounded-full gradient-zest text-primary-foreground">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="text-3xl font-bold">{c.free ? "Free" : `₹${c.price}`}</div>
                <Button className="w-full gradient-zest text-primary-foreground border-0" size="lg">
                  {c.free ? "Enroll Now" : "Buy Course"}
                </Button>
                <Button variant="outline" className="w-full" size="lg">Add to Cart</Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1"><Heart className="h-4 w-4 mr-1" /> Wishlist</Button>
                  <Button variant="ghost" size="sm" className="flex-1"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                </div>
                <ul className="space-y-2 text-sm pt-3 border-t border-border/60">
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {c.hours} hours of content</li>
                  <li className="flex items-center gap-2"><ListVideo className="h-4 w-4 text-primary" /> {c.lessons} lessons</li>
                  <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certificate of completion</li>
                  <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Lifetime access</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="curriculum">
            <TabsList>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum" className="space-y-2 mt-4">
              {lessons.map((l) => (
                <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  {l.free ? <PlayCircle className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                  <div className="flex-1 text-sm">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{l.mins} min</div>
                  {l.free && <Badge variant="secondary" className="text-[10px]">Preview</Badge>}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <h3 className="font-semibold text-lg">What you'll learn</h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {["Core concepts from scratch", "Real-world projects", "Exam strategies", "Cheatsheets & summaries", "Doubt-solving access", "Lifetime updates"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {x}</li>
                ))}
              </ul>
              <h3 className="font-semibold text-lg pt-4">Prerequisites</h3>
              <p className="text-sm text-muted-foreground">Basic understanding of the subject. We start from fundamentals.</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1 text-primary"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
                  <p className="text-sm mt-2">Brilliant course! The teacher explains each concept with crystal clarity.</p>
                  <div className="text-xs text-muted-foreground mt-2">— Student {i + 1} • 2 weeks ago</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="qa" className="mt-4 text-muted-foreground text-sm">
              No questions yet. Be the first to ask!
            </TabsContent>
          </Tabs>
        </div>
        <aside>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-sm font-semibold mb-3">Your progress</div>
            <Progress value={0} />
            <div className="text-xs text-muted-foreground mt-2">Start the course to track progress.</div>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
