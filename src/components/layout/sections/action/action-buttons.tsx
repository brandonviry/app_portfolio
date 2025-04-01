import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ActionButtons() {
  return (
    <section 
      className={cn(
        "flex flex-wrap items-center justify-center",
        "gap-4 md:gap-6",
        "py-4"
      )}
    >
      <Link href="/projets">
        <Button 
          variant="cta" 
          size="lg"
          className={cn(
            "min-w-[180px]",
            "shadow-lg shadow-accent/10",
            "hover:shadow-xl hover:shadow-accent/20",
            "transition-shadow duration-300"
          )}
        >
          Voir mes projets
        </Button>
      </Link>
      <Link href="/contact">
        <Button 
          variant="outline" 
          size="lg"
          className={cn(
            "min-w-[180px]",
            "border-border/20",
            "hover:border-accent/20",
            "hover:bg-surface-1/50",
            "transition-colors duration-300"
          )}
        >
          Me contacter
        </Button>
      </Link>
    </section>
  );
}
