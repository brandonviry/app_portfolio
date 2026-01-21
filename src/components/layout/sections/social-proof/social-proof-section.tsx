import { Typography } from "@/components/ui/typography/typography";
import { LogoDisplay } from "@/components/ui/logo/logo-display";
import { cn } from "@/lib/utils";
import { LogosData } from "@/store/logos_data";

// Logos des clients/partenaires



export function SocialProofSection() {
  return (
    <section className={cn(
      "relative",
      "py-16 md:py-20",
      "overflow-hidden"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-to-b from-transparent via-accent/5 to-transparent"
      )} />

      <div className={cn(
        "max-w-7xl mx-auto",
        "px-4 sm:px-6 lg:px-8"
      )}>
        {/* Heading */}
        <div className={cn(
          "text-center",
          "mb-12"
        )}>
          <Typography
            level="h3"
            className={cn(
              "text-accent",
              "uppercase tracking-wider",
              "text-sm font-bold"
            )}
          >
           Ils m&apos;ont fait confiance
          </Typography>
        </div>

        {/* Logos Grid */}
        <div className={cn(
          "flex flex-wrap",
          "justify-center",
          "gap-8 md:gap-12",
          "items-center"
        )}>
          {LogosData.map((logo) => (
            <LogoDisplay
              key={logo.id}
              imageUrl={logo.imageUrl}
              name={logo.name}
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
