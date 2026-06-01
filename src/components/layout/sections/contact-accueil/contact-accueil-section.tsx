import { Typography } from "@/components/ui/typography/typography";
import { ContactFormFull } from "@/components/ui/form/contact-form-full";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

export function ContactAccueilSection() {
  return (
    <section className={cn("relative py-16 md:py-24 overflow-hidden")}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-1/20 via-transparent to-surface-1/20 opacity-50" />

      <div className={cn("container mx-auto px-4 sm:px-6")}>
        <div className={cn("text-center max-w-2xl mx-auto mb-16 space-y-4")}>
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Contact
          </Typography>
          <Divider variant="gradient" align="center" className="mx-auto" />
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactFormFull />
        </div>
      </div>
    </section>
  );
}
