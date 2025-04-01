'use client';

import Link from 'next/link';
import { Navigation } from '@/components/ui/navigation/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography/typography';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay pour le menu mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm",
          "md:hidden",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "z-40"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu mobile */}
      <div 
        className={cn(
          // Base
          "md:hidden",
          "fixed left-0 right-0 top-16",
          // Animation
          "transition-all duration-300 ease-in-out",
          // Visibility
          isOpen ? [
            "opacity-100",
            "translate-y-0",
            "pointer-events-auto"
          ].join(" ") : [
            "opacity-0",
            "-translate-y-4",
            "pointer-events-none"
          ].join(" "),
          // Padding & Background
          "px-4 py-3",
          "bg-background/95 backdrop-blur-lg",
          "shadow-lg",
          "z-50"
        )}
      >
        <Navigation items={navigation} isMobile />
      </div>

      <header 
        className={cn(
          // Position & Layout
          "fixed top-0 w-full",
          // Background & Effects
          "bg-gradient-to-b from-background/80 to-background/60",
          "backdrop-blur-md",
          // Border
          "border-b border-border/10",
          // Shadow
          "shadow-sm shadow-accent/5",
          "z-30"
        )}
      >
        <nav className="max-w-6xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className={cn(
                  "relative",
                  "group",
                  "flex items-center gap-2"
                )}
              >
                <Typography 
                  level="h6" 
                  className={cn(
                    "text-text-primary",
                    "font-bold",
                    "transition-colors duration-200",
                    "group-hover:text-accent"
                  )}
                >
                   Portfolio VIRY BRANDON
                </Typography>
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:block">
              <Navigation items={navigation} />
            </div>

            {/* Bouton menu mobile */}
            <div className="md:hidden">
              <button
                type="button"
                className={cn(
                  // Base
                  "p-2",
                  "rounded-xl",
                  // Colors
                  "text-text-secondary",
                  "hover:text-text-primary",
                  "hover:bg-surface-1/80",
                  // Border & Shadow
                  "border border-border/10",
                  "hover:border-border/20",
                  // Focus
                  "focus:outline-none",
                  "focus:ring-2",
                  "focus:ring-accent/20",
                  // Transition
                  "transition-all duration-200",
                  "relative",
                  "z-50"
                )}
                aria-label="Menu principal"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="h-5 w-5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
