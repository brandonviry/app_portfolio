'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
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
          "rounded-2xl",
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
                "block px-4 py-3",
                "text-base font-medium",
                "rounded-xl",
                "transition-all duration-200",
                "text-center",
                // Width
                isMobile ? "w-full" : "w-auto",
                // Colors & Effects
                isActive ? [
                  "bg-surface-2/90",
                  "text-text-primary",
                  "shadow-sm",
                  "border border-border/20"
                ].join(" ") : [
                  "text-text-secondary/90",
                  "hover:text-text-primary",
                  "hover:bg-surface-1/90",
                  "hover:border-border/20",
                  "hover:shadow-sm",
                  "border border-transparent"
                ].join(" ")
              )}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
