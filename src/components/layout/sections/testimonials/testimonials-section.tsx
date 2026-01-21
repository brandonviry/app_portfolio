import { Typography } from "@/components/ui/typography/typography";
import { TestimonialCard } from "@/components/ui/card/testimonial-card";
import { testimonialsData } from "@/store/testimonials_data";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24",
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
            Témoignages 
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
            Ce qu'ils disent de moi
          </Typography>
        </div>

        {/* Testimonials Grid */}
        <div className={cn(
          "grid gap-6 md:gap-8",
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {testimonialsData.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
