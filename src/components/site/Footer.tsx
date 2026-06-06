import { Link } from "@tanstack/react-router";
import { GraduationCap, Twitter, Instagram, Youtube, Github, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-zest text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Zest <span className="text-gradient-zest">Academy</span></span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            Premium online learning for India's brightest students. Live classes, notes, quizzes,
            community, and an AI tutor — all in one beautifully crafted platform.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-foreground" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-foreground" /></a>
            <a href="#" aria-label="YouTube"><Youtube className="h-5 w-5 hover:text-foreground" /></a>
            <a href="#" aria-label="GitHub"><Github className="h-5 w-5 hover:text-foreground" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-foreground" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/courses" className="hover:text-foreground">Courses</Link></li>
            <li><Link to="/live" className="hover:text-foreground">Live Classes</Link></li>
            <li><Link to="/notes" className="hover:text-foreground">Notes Library</Link></li>
            <li><Link to="/quizzes" className="hover:text-foreground">Quizzes</Link></li>
            <li><Link to="/certificates" className="hover:text-foreground">Certificates</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/teachers" className="hover:text-foreground">Teachers</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/help" className="hover:text-foreground">Help Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Weekly tips, free notes & exam updates.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@email.com" />
            <Button type="submit" className="gradient-zest text-primary-foreground border-0">Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Zest Academy. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/faq" className="hover:text-foreground">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
