import type { Metadata } from "next";
import { HeroAccueilSection } from "@/components/layout/sections/hero-accueil/hero-accueil-section";
import { DescriptionSection } from "@/components/layout/sections/description/description-section";
import { CompetencesSection } from "@/components/layout/sections/competences/competences-section";
import { ArticlesSection } from "@/components/layout/sections/articles/articles-section";
import { TechnologiesSection } from "@/components/layout/sections/technologies/technologies-section";
import { FAQSection } from "@/components/layout/sections/faq/faq-section";
import { FinalCTASection } from "@/components/layout/sections/cta/final-cta-section";

export const metadata: Metadata = {
  title: "Développeur Graphiste La Réunion | VIRY Brandon",
  description:
    "Développeur web & graphiste basé à La Réunion — création d'interfaces, identités visuelles et automatisation. Disponible en freelance.",
};

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <HeroAccueilSection />
      <DescriptionSection />
      <CompetencesSection />
      <ArticlesSection />
      <TechnologiesSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
