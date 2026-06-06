import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Users, Clock } from "lucide-react";
import type { Course } from "@/lib/mock";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        to="/courses/$id"
        params={{ id: course.id }}
        className="group block overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.free && (
            <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              FREE
            </span>
          )}
          <span className="absolute top-3 right-3 rounded-md bg-background/90 px-2 py-1 text-xs font-medium">
            {course.level}
          </span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">{course.category}</Badge>
          </div>
          <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground">by {course.teacher}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> {course.rating}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.hours}h</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-2">
            <div className="font-bold text-lg">
              {course.free ? "Free" : `₹${course.price}`}
            </div>
            <div className="text-xs text-primary font-medium group-hover:underline">View →</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
