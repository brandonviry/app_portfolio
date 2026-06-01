import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";

const roles = [
  "Programmeur",
  "Développeur web",
  "Graphiste & Designer Visuel",
  "Full-Stack Product maker",
];

export function HeroAccueilSection() {
  return (
    <section
      className={cn(
        "relative min-h-[calc(100vh-4rem)]",
        "flex flex-col items-center justify-center",
        "py-16 md:py-24",
        "text-center"
      )}
    >
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-accent/5 via-transparent to-transparent",
        "opacity-75"
      )} />

      <div className={cn("space-y-8", "px-4 sm:px-6", "max-w-4xl mx-auto")}>
        <div className="space-y-3">
          <Typography
            level="h1"
            className={cn(
              "text-accent",
              "tracking-tight leading-tight",
              "text-5xl md:text-7xl lg:text-8xl font-extrabold"
            )}
          >
            VIRY Brandon
          </Typography>

          <div className="flex flex-col items-center gap-1 pt-4">
            {roles.map((role) => (
              <Typography
                key={role}
                level="h4"
                className="text-text-secondary font-normal tracking-wide"
              >
                {role}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
