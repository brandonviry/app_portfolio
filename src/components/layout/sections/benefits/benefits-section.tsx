import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { BenefitCard } from "@/components/ui/card/benefit-card";
import { benefitsData } from "@/store/benefits_data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24",
      "overflow-hidden"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-cta/5 via-transparent to-transparent",
        "opacity-50"
      )} />

      <div className={cn(
        "max-w-7xl mx-auto",
        "px-4 sm:px-6 lg:px-8"
      )}>
        {/* Heading */}
        <div className={cn(
          "text-center",
          "mb-16",
          "space-y-4"
        )}>
          <Typography
            level="h2"
            className={cn(
              "text-accent",
              "text-3xl md:text-4xl lg:text-5xl",
              "font-bold tracking-tight"
            )}
          >
            Pourquoi me choisir ?
          </Typography>

          <Typography
            level="body1"
            className={cn(
              "text-text-secondary",
              "text-base md:text-lg",
              "leading-relaxed",
              "max-w-2xl mx-auto"
            )}
          >
            Les avantages de travailler avec moi sur vos projets web
          </Typography>
        </div>

        {/* Benefits Grid */}
        <div className={cn(
          "grid gap-4 md:gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {benefitsData.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className={cn(
          "flex justify-center",
          "mt-12 md:mt-16"
        )}>
          <Button
            variant="cta"
            size="lg"
            href="/contact"
            className="group/cta"
          >
            <span>Me contacter</span>
            <ArrowRight
              className={cn(
                "ml-2 w-5 h-5",
                "transition-transform duration-200",
                "group-hover/cta:translate-x-1"
              )}
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
