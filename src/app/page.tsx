import type { Metadata } from "next";
import { HeroAccueilSection } from "@/components/layout/sections/hero-accueil/hero-accueil-section";
import { CompetencesSection } from "@/components/layout/sections/competences/competences-section";
import { TechnologiesSection } from "@/components/layout/sections/technologies/technologies-section";
import { LanguagesSection } from "@/components/layout/sections/languages/languages-section";
import { ArticlesSection } from "@/components/layout/sections/articles/articles-section";
import { DescriptionSection } from "@/components/layout/sections/description/description-section";
import { FAQSection } from "@/components/layout/sections/faq/faq-section";
import { FinalCTASection } from "@/components/layout/sections/cta/final-cta-section";

export const metadata: Metadata = {
  title: "Accueil - VIRY Brandon",
  description:
    "VIRY Brandon — Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker.",
};

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <HeroAccueilSection />
      <CompetencesSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnologiesSection />
        <LanguagesSection />
      </div>
      <ArticlesSection />
      <DescriptionSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
