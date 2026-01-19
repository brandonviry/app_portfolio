'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon?: LucideIcon;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  isMobile?: boolean;
}

export function Navigation({ items, className, isMobile }: NavigationProps) {
  const pathname = usePathname();

  return (
    <ul 
      className={cn(
        // Base styles
        "flex items-center",
        "gap-3",
        // Mobile styles
        isMobile && [
          "flex-col w-full",
          "p-3",
          "bg-surface-1/80",
          "backdrop-blur-md",
          "border border-border/20",
          "",
          "shadow-sm"
        ],
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <li 
            key={item.name} 
            className={cn(
              "relative",
              isMobile && "w-full"
            )}
          >
            <Link
              href={item.href}
              className={cn(
                // Base styles
                "flex items-center justify-center gap-2",
                "px-4 py-3",
                "text-base font-medium",
                "transition-all duration-200",
                // Width
                isMobile ? "w-full" : "w-auto",
                // Colors & Effects - CTA visible par défaut
                isActive ? [
                  "bg-cta/15",
                  "text-cta",
                  "shadow-md shadow-cta/20",
                  "border-2 border-cta"
                ].join(" ") : [
                  "text-cta",
                  "hover:bg-cta/10",
                  "hover:shadow-sm shadow-cta/10",
                  "hover:border-cta",
                  "border-2 border-cta/30"
                ].join(" ")
              )}
            >
              {item.icon && (
                <item.icon
                  className="w-4 h-4"
                  strokeWidth={2.5}
                />
              )}
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
