import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { CourseCard } from "@/components/site/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, type Course } from "@/lib/mock";
import { fetchCourses } from "@/lib/courses";

export const Route = createFileRoute("/courses")({ component: CoursesPage });

function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [level, setLevel] = useState<string>("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch((e) => setError(e.message ?? "Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((c) =>
      (cat === "All" || c.category === cat) &&
      (level === "All" || c.level === level) &&
      (q === "" || c.title.toLowerCase().includes(q.toLowerCase()) || c.teacher.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat, level, courses]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Courses</h1>
            <p className="text-muted-foreground mt-1">
              {loading ? "Loading courses..." : `Browse ${courses.length} courses across ${categories.length} subjects.`}
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses..." className="pl-9" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Pill active={cat === "All"} onClick={() => setCat("All")}>All</Pill>
          {categories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-muted-foreground mr-1">Level:</span>
          {["All", "Beginner", "Intermediate", "Advanced"].map((l) => (
            <Pill key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Pill>
          ))}
        </div>

        {error && (
          <div className="text-center py-16 text-destructive">Error loading courses: {error}</div>
        )}
        {loading && !error && (
          <div className="text-center py-16 text-muted-foreground">Loading courses from Supabase…</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No courses match your filters.</div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        active ? "gradient-zest text-primary-foreground border-transparent" : "bg-card border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export { Badge, Button };