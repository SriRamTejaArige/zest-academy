import { supabase } from "./supabase";
import type { Course } from "./mock";

// Converts a Supabase 'courses' row into the Course shape the UI expects.
// Fields not yet in DB (rating, students count, hours, lessons) get sensible
// defaults — we'll wire real values from the database in later steps.
function rowToCourse(row: any): Course {
  const colorHex = (row.thumbnail_color ?? "#7DB800").replace("#", "");
  const emoji = row.thumbnail_emoji ?? "📚";
  return {
    id: row.id,
    title: row.title,
    teacher: "Zest Teacher",        // will become real via JOIN with profiles
    teacherId: row.teacher_id ?? "",
    category: row.category ?? "General",
    level: (row.level ?? "Beginner") as Course["level"],
    price: row.price ?? 0,
    rating: 4.8,                    // placeholder until we have reviews
    students: 0,                    // placeholder until we count enrollments
    hours: 0,
    lessons: 0,
    thumbnail: `https://placehold.co/800x480/${colorHex}/ffffff?text=${encodeURIComponent(emoji)}`,
    description: row.description ?? "",
    tags: row.category ? [row.category] : [],
    free: (row.price ?? 0) === 0,
  };
}

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
  return (data ?? []).map(rowToCourse);
}