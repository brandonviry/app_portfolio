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

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'VIRY Brandon',
  jobTitle: 'Développeur Web & Graphiste',
  description:
    "Développeur web & graphiste basé à La Réunion — création d'interfaces, identités visuelles et automatisation.",
  url: 'https://devweb.viry-brandon.fr',
  sameAs: [
    'https://github.com/brandonviry/',
    'https://linkedin.com/in/brandon-viry-81187b237',
    'https://www.instagram.com/virybrandon/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'La Réunion',
    addressCountry: 'FR',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="flex-1 w-full">
        <HeroAccueilSection />
        <DescriptionSection />
        <CompetencesSection />
        <ArticlesSection />
        <TechnologiesSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    </>
  );
}
