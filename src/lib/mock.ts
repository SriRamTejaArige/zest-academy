// Mock data for Zest Academy frontend shell

export type Course = {
  id: string;
  title: string;
  teacher: string;
  teacherId: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  students: number;
  hours: number;
  lessons: number;
  thumbnail: string;
  description: string;
  tags: string[];
  free?: boolean;
};

export type Teacher = {
  id: string;
  name: string;
  title: string;
  rating: number;
  students: number;
  courses: number;
  avatar: string;
  bio: string;
};

export type Note = {
  id: string;
  title: string;
  subject: string;
  semester: string;
  type: "PDF" | "DOCX" | "PPT" | "Image";
  size: string;
  downloads: number;
  uploader: string;
  date: string;
};

export type LiveClass = {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  startsAt: string;
  duration: string;
  enrolled: number;
  status: "Upcoming" | "Live" | "Ended";
};

export type Quiz = {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  attempts: number;
};

export type DoubtThread = {
  id: string;
  title: string;
  body: string;
  author: string;
  subject: string;
  upvotes: number;
  answers: number;
  time: string;
  tags: string[];
};

const img = (seed: string, w = 800, h = 480) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

export const categories = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Computer Science", "English", "Economics", "History",
  "Design", "Business",
];

export const courses: Course[] = [
  { id: "c1", title: "JEE Mathematics — Complete Crash Course", teacher: "Dr. Aarav Mehta", teacherId: "t1", category: "Mathematics", level: "Advanced", price: 1499, rating: 4.9, students: 12450, hours: 48, lessons: 124, thumbnail: img("1635070041078-e363dbd005cb"), description: "Master calculus, algebra, and coordinate geometry with strategy-first lectures.", tags: ["JEE", "Calculus", "Algebra"] },
  { id: "c2", title: "Class 12 Physics — Boards + NEET", teacher: "Priya Sharma", teacherId: "t2", category: "Physics", level: "Intermediate", price: 999, rating: 4.8, students: 8800, hours: 60, lessons: 98, thumbnail: img("1532094349884-543bc11b234d"), description: "Concept-first physics with PYQ analysis and weekly mock tests.", tags: ["NEET", "Boards"] },
  { id: "c3", title: "Full-Stack Web Development Bootcamp", teacher: "Rohan Iyer", teacherId: "t3", category: "Computer Science", level: "Beginner", price: 0, free: true, rating: 4.9, students: 24300, hours: 72, lessons: 180, thumbnail: img("1517694712202-14dd9538aa97"), description: "From HTML to React, Node, and Postgres. Build 6 real projects.", tags: ["React", "Node", "Free"] },
  { id: "c4", title: "Organic Chemistry — Reaction Mastery", teacher: "Dr. Neha Kapoor", teacherId: "t4", category: "Chemistry", level: "Advanced", price: 1299, rating: 4.7, students: 5400, hours: 36, lessons: 84, thumbnail: img("1532634922-8fe0b757fb13"), description: "Mechanism-based learning with 500+ reactions and shortcuts.", tags: ["JEE", "NEET"] },
  { id: "c5", title: "English Communication & IELTS Prep", teacher: "Sara Khan", teacherId: "t5", category: "English", level: "Beginner", price: 699, rating: 4.6, students: 6700, hours: 28, lessons: 64, thumbnail: img("1546410531-bb4caa6b424d"), description: "Speak fluently and crack IELTS 7.5+ with proven frameworks.", tags: ["IELTS", "Spoken"] },
  { id: "c6", title: "Data Structures & Algorithms in Python", teacher: "Karthik Rao", teacherId: "t6", category: "Computer Science", level: "Intermediate", price: 1199, rating: 4.9, students: 18900, hours: 55, lessons: 140, thumbnail: img("1555066931-4365d14bab8c"), description: "Crack FAANG interviews with 250+ patterns and live coding.", tags: ["DSA", "Python"] },
  { id: "c7", title: "Microeconomics — CBSE & CUET", teacher: "Anita Verma", teacherId: "t7", category: "Economics", level: "Intermediate", price: 599, rating: 4.5, students: 3200, hours: 22, lessons: 48, thumbnail: img("1554224155-6726b3ff858f"), description: "Graphs, theory and case studies — fully board-aligned.", tags: ["CBSE", "CUET"] },
  { id: "c8", title: "Biology for NEET — Botany Special", teacher: "Dr. Vikram Singh", teacherId: "t8", category: "Biology", level: "Advanced", price: 1099, rating: 4.8, students: 7100, hours: 42, lessons: 96, thumbnail: img("1530026405186-ed1f139313f8"), description: "NCERT line-by-line with diagram memorization tricks.", tags: ["NEET", "Botany"] },
];

export const teachers: Teacher[] = [
  { id: "t1", name: "Dr. Aarav Mehta", title: "IIT-B • Maths", rating: 4.9, students: 24000, courses: 6, avatar: img("1500648767791-00dcc994a43e", 200, 200), bio: "15+ years coaching JEE toppers. Author of 3 bestsellers." },
  { id: "t2", name: "Priya Sharma", title: "Physics Expert", rating: 4.8, students: 18000, courses: 4, avatar: img("1494790108377-be9c29b29330", 200, 200), bio: "Ex-AIIMS faculty. Loves making physics intuitive." },
  { id: "t3", name: "Rohan Iyer", title: "Senior Engineer • Google", rating: 4.9, students: 32000, courses: 8, avatar: img("1633332755192-727a05c4013d", 200, 200), bio: "Builds production systems by day, teaches by night." },
  { id: "t4", name: "Dr. Neha Kapoor", title: "Chemistry PhD", rating: 4.7, students: 9000, courses: 5, avatar: img("1438761681033-6461ffad8d80", 200, 200), bio: "Research scientist turned educator. Mechanism queen." },
  { id: "t5", name: "Sara Khan", title: "IELTS Trainer", rating: 4.6, students: 11000, courses: 3, avatar: img("1487412720507-e7ab37603c6f", 200, 200), bio: "Cambridge-certified. Helped 2,000+ students study abroad." },
  { id: "t6", name: "Karthik Rao", title: "Engineering Manager • Meta", rating: 4.9, students: 22000, courses: 7, avatar: img("1507003211169-0a1dd7228f2d", 200, 200), bio: "Trained 500+ engineers. FAANG interviewer for 6 years." },
];

export const notes: Note[] = [
  { id: "n1", title: "Calculus Master Notes — Class 12", subject: "Mathematics", semester: "Class 12", type: "PDF", size: "8.4 MB", downloads: 4520, uploader: "Dr. Aarav Mehta", date: "2 days ago" },
  { id: "n2", title: "Modern Physics Cheatsheet", subject: "Physics", semester: "Class 12", type: "PDF", size: "3.1 MB", downloads: 2890, uploader: "Priya Sharma", date: "1 week ago" },
  { id: "n3", title: "React Hooks Complete Guide", subject: "Computer Science", semester: "All", type: "DOCX", size: "1.7 MB", downloads: 6730, uploader: "Rohan Iyer", date: "3 days ago" },
  { id: "n4", title: "Organic Reactions Map", subject: "Chemistry", semester: "Class 12", type: "Image", size: "2.5 MB", downloads: 3210, uploader: "Dr. Neha Kapoor", date: "5 days ago" },
  { id: "n5", title: "DSA Patterns — Top 80", subject: "Computer Science", semester: "All", type: "PDF", size: "12.0 MB", downloads: 9120, uploader: "Karthik Rao", date: "Today" },
  { id: "n6", title: "Indian Economy 2024 Notes", subject: "Economics", semester: "Class 12", type: "PPT", size: "6.2 MB", downloads: 1450, uploader: "Anita Verma", date: "2 weeks ago" },
  { id: "n7", title: "Botany Diagrams Handbook", subject: "Biology", semester: "Class 12", type: "PDF", size: "14.8 MB", downloads: 5400, uploader: "Dr. Vikram Singh", date: "4 days ago" },
  { id: "n8", title: "IELTS Writing Templates", subject: "English", semester: "All", type: "DOCX", size: "0.8 MB", downloads: 2210, uploader: "Sara Khan", date: "1 day ago" },
];

export const liveClasses: LiveClass[] = [
  { id: "l1", title: "JEE Maths Doubt Marathon", teacher: "Dr. Aarav Mehta", subject: "Mathematics", startsAt: "Today, 6:00 PM", duration: "120 min", enrolled: 1240, status: "Live" },
  { id: "l2", title: "Physics PYQ Solving — Optics", teacher: "Priya Sharma", subject: "Physics", startsAt: "Tomorrow, 5:00 PM", duration: "90 min", enrolled: 820, status: "Upcoming" },
  { id: "l3", title: "React Server Components Deep Dive", teacher: "Rohan Iyer", subject: "Computer Science", startsAt: "Sat, 11:00 AM", duration: "75 min", enrolled: 2100, status: "Upcoming" },
  { id: "l4", title: "Organic Mechanism Workshop", teacher: "Dr. Neha Kapoor", subject: "Chemistry", startsAt: "Sun, 4:00 PM", duration: "60 min", enrolled: 540, status: "Upcoming" },
  { id: "l5", title: "IELTS Speaking Mock", teacher: "Sara Khan", subject: "English", startsAt: "Yesterday", duration: "45 min", enrolled: 320, status: "Ended" },
];

export const quizzes: Quiz[] = [
  { id: "q1", title: "Calculus — Limits & Continuity", subject: "Mathematics", questions: 30, duration: "45 min", difficulty: "Medium", attempts: 12400 },
  { id: "q2", title: "Newton's Laws Mock", subject: "Physics", questions: 25, duration: "30 min", difficulty: "Easy", attempts: 9800 },
  { id: "q3", title: "JavaScript Arrays & Objects", subject: "Computer Science", questions: 40, duration: "60 min", difficulty: "Hard", attempts: 21000 },
  { id: "q4", title: "Periodic Table Rapid Fire", subject: "Chemistry", questions: 50, duration: "20 min", difficulty: "Easy", attempts: 5400 },
  { id: "q5", title: "DSA Patterns — Sliding Window", subject: "Computer Science", questions: 20, duration: "40 min", difficulty: "Hard", attempts: 14000 },
  { id: "q6", title: "Human Physiology", subject: "Biology", questions: 35, duration: "45 min", difficulty: "Medium", attempts: 7200 },
];

export const doubts: DoubtThread[] = [
  { id: "d1", title: "How to solve definite integrals with substitution?", body: "I get stuck when limits change after substitution. Any tricks?", author: "Riya P.", subject: "Mathematics", upvotes: 142, answers: 8, time: "3h ago", tags: ["Calculus", "JEE"] },
  { id: "d2", title: "Why does useEffect run twice in dev?", body: "My fetch fires twice in development mode. Is this a bug?", author: "Ankit S.", subject: "Computer Science", upvotes: 289, answers: 14, time: "1h ago", tags: ["React", "Hooks"] },
  { id: "d3", title: "SN1 vs SN2 — when to use which?", body: "Confused about substrate stability + nucleophile rules.", author: "Meera K.", subject: "Chemistry", upvotes: 76, answers: 5, time: "8h ago", tags: ["Organic", "Mechanism"] },
  { id: "d4", title: "Best way to memorize botany diagrams?", body: "Any active recall technique that works for plant anatomy?", author: "Dev R.", subject: "Biology", upvotes: 54, answers: 6, time: "Yesterday", tags: ["NEET", "Botany"] },
  { id: "d5", title: "IELTS Speaking — how to extend answers?", body: "Examiner says my answers are too short. Help!", author: "Zoya A.", subject: "English", upvotes: 31, answers: 4, time: "2 days ago", tags: ["IELTS"] },
];

export const testimonials = [
  { name: "Aditi Verma", role: "AIR 234 — JEE Advanced", text: "Zest Academy's structured roadmap and live doubt classes made the impossible look easy.", avatar: img("1517841905240-472988babdf9", 120, 120) },
  { name: "Rahul Nair", role: "Full-Stack Developer @ Razorpay", text: "Got my first dev job in 5 months. The community + projects were game-changing.", avatar: img("1599566150163-29194dcaad36", 120, 120) },
  { name: "Sneha Iyer", role: "NEET Qualifier", text: "The notes library alone saved me 100+ hours. AI tutor is brilliant for last-minute doubts.", avatar: img("1494790108377-be9c29b29330", 120, 120) },
];

export const faqs = [
  { q: "Is Zest Academy free to start?", a: "Yes! We have a generous free tier with selected courses, notes, and community access. Premium plans unlock everything." },
  { q: "How do live classes work?", a: "Live classes are HD streams hosted by verified teachers. You can raise hand, chat, vote in polls, and get recordings." },
  { q: "Will I get a certificate?", a: "Yes — every completed course generates a shareable, verifiable certificate you can add to LinkedIn." },
  { q: "Can teachers earn on Zest?", a: "Absolutely. Apply as a teacher, get approved, and earn from every enrollment + sponsored live classes." },
  { q: "Does AI tutor replace teachers?", a: "No. It's a 24/7 assistant for instant doubts, summaries, and quizzes — designed to complement human teachers." },
  { q: "Can I download notes offline?", a: "Yes, all approved notes can be downloaded in PDF/DOCX/PPT formats." },
];

export const stats = [
  { value: "250K+", label: "Active Learners" },
  { value: "1,200+", label: "Expert Teachers" },
  { value: "8,400+", label: "Courses & Notes" },
  { value: "96%", label: "Satisfaction" },
];

export const studentProgress = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 80 },
  { day: "Wed", minutes: 65 },
  { day: "Thu", minutes: 120 },
  { day: "Fri", minutes: 95 },
  { day: "Sat", minutes: 150 },
  { day: "Sun", minutes: 70 },
];

export const teacherRevenue = [
  { month: "Jan", revenue: 24000 },
  { month: "Feb", revenue: 31000 },
  { month: "Mar", revenue: 28000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 68000 },
];

export const adminUsersData = [
  { week: "W1", students: 1200, teachers: 24 },
  { week: "W2", students: 1450, teachers: 31 },
  { week: "W3", students: 1820, teachers: 38 },
  { week: "W4", students: 2240, teachers: 45 },
];

export const pricingPlans = [
  { name: "Free", price: 0, period: "forever", features: ["Access to free courses", "Limited notes library", "Community access", "Basic AI tutor (10 q/day)"], cta: "Get Started", highlight: false },
  { name: "Premium", price: 499, period: "month", features: ["All courses unlocked", "Unlimited notes & live classes", "Certificates", "Priority AI tutor", "Offline downloads"], cta: "Start Premium", highlight: true },
  { name: "Yearly Pro", price: 3999, period: "year", features: ["Everything in Premium", "1-on-1 mentor sessions", "Job placement support", "Early access to new content"], cta: "Go Pro", highlight: false },
];

export const notifications = [
  { id: 1, type: "live", title: "JEE Maths Doubt Marathon starts in 30 min", time: "30 min" },
  { id: 2, type: "course", title: "New course: 'Advanced React Patterns' published", time: "2h" },
  { id: 3, type: "assignment", title: "Assignment 'Calculus Set 4' due tomorrow", time: "5h" },
  { id: 4, type: "payment", title: "Payment of ₹1,499 received for JEE Maths course", time: "Yesterday" },
  { id: 5, type: "announcement", title: "Dr. Mehta posted an announcement in your batch", time: "2 days" },
];

export const certificates = [
  { id: "cert1", course: "Full-Stack Web Development Bootcamp", date: "Jun 12, 2025", id_no: "ZA-FS-00231" },
  { id: "cert2", course: "DSA in Python", date: "Apr 03, 2025", id_no: "ZA-DSA-01129" },
  { id: "cert3", course: "IELTS Communication", date: "Jan 19, 2025", id_no: "ZA-IELTS-00482" },
];
