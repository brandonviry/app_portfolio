import { Typography } from "@/components/ui/typography/typography";
import { ContactForm } from "@/components/ui/form/contact-form";
import { ContactInfo } from "@/components/ui/contact/contact-info";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section 
      className={cn(
        "relative",
        "py-16 md:py-24",
        "overflow-hidden"
      )}
    >
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-to-b from-surface-1/20 via-transparent to-surface-1/20",
        "opacity-50"
      )} />

      <div className={cn(
        "container mx-auto",
        "px-4 sm:px-6",
        "relative"
      )}>
        {/* Header */}
        <div className={cn(
          "text-center",
          "max-w-2xl mx-auto",
          "mb-16"
        )}>
          <Typography 
            level="h2" 
            className={cn(
              "text-accent",
              "mb-4"
            )}
          >
            Me Contacter
          </Typography>
          <Typography 
            level="body1" 
            className={cn(
              "text-text-secondary",
              "leading-relaxed"
            )}
          >
            N'hésitez pas à me contacter pour discuter de vos projets ou pour toute autre question.
            Je vous répondrai dans les plus brefs délais.
          </Typography>
        </div>

        {/* Content Grid */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2",
          "gap-8 lg:gap-12",
          "max-w-6xl mx-auto"
        )}>
          {/* Contact Form */}
          <div className={cn(
            "w-full",
            "order-2 lg:order-1"
          )}>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className={cn(
            "w-full",
            "order-1 lg:order-2"
          )}>
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
