import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "wouter";

/**
 * Header Component
 * Design: Warm minimalist with subtle navigation
 */
export default function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-6xl flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Accelerated English</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/blueprint" className="text-foreground hover:text-primary transition-colors">
            Blueprint
          </Link>
          <Link href="/progress" className="text-foreground hover:text-primary transition-colors">
            Progress
          </Link>
          <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
            Resources
          </Link>
        </nav>

        {/* CTA Button */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setLocation('/blueprint')}>
          Get Started
        </Button>
      </div>
    </header>
  );
}
