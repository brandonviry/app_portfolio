'use client';

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "@/store/faq_data";

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24",
      "overflow-hidden"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-accent/5 via-transparent to-transparent",
        "opacity-50"
      )} />

      <div className={cn(
        "max-w-4xl mx-auto",
        "px-4 sm:px-6"
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
            Questions Fréquentes
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
            Retrouvez les réponses aux questions les plus courantes
          </Typography>
        </div>

        {/* FAQ List */}
        <div className={cn(
          "space-y-4"
        )}>
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={cn(
                  "group relative",
                  "border-2 border-border/20",
                  "bg-surface-1/50",
                  "backdrop-blur-sm",
                  "transition-all duration-300",
                  isOpen && [
                    "border-accent/50",
                    "shadow-lg shadow-accent/10"
                  ]
                )}
              >
                {/* Corner accents */}
                <div className={cn(
                  "absolute top-0 left-0",
                  "w-2 h-2",
                  "border-t-2 border-l-2",
                  isOpen ? "border-accent" : "border-transparent",
                  "transition-colors duration-300"
                )} />

                <div className={cn(
                  "absolute bottom-0 right-0",
                  "w-2 h-2",
                  "border-b-2 border-r-2",
                  isOpen ? "border-cta" : "border-transparent",
                  "transition-colors duration-300"
                )} />

                {/* Question */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className={cn(
                    "w-full",
                    "flex items-center justify-between gap-4",
                    "p-4 md:p-6",
                    "text-left",
                    "transition-colors duration-200",
                    "hover:bg-surface-2/30",
                    "focus:outline-none",
                    "focus:ring-2 focus:ring-accent/20"
                  )}
                >
                  <Typography
                    level="h6"
                    className={cn(
                      "text-base md:text-lg",
                      "font-semibold",
                      "transition-colors duration-200",
                      isOpen ? "text-accent" : "text-text-primary",
                      "group-hover:text-accent"
                    )}
                  >
                    {faq.question}
                  </Typography>

                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      "transition-all duration-300",
                      isOpen ? [
                        "rotate-180",
                        "text-accent"
                      ] : "text-text-secondary"
                    )}
                    strokeWidth={2.5}
                  />
                </button>

                {/* Answer */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className={cn(
                      "px-4 md:px-6 pb-4 md:pb-6",
                      "border-t-2 border-border/10"
                    )}>
                      <Typography
                        level="body1"
                        className={cn(
                          "text-text-secondary",
                          "text-sm md:text-base",
                          "leading-relaxed",
                          "pt-4"
                        )}
                      >
                        {faq.answer}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                {isOpen && (
                  <div className={cn(
                    "absolute top-4 right-4",
                    "w-1.5 h-1.5",
                    "bg-cta",
                    "animate-pulse"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
