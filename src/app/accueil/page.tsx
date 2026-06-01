import type { Metadata } from "next";
import { HeroAccueilSection } from "@/components/layout/sections/hero-accueil/hero-accueil-section";
import { CompetencesSection } from "@/components/layout/sections/competences/competences-section";
import { ArticlesSection } from "@/components/layout/sections/articles/articles-section";
import { AproposSection } from "@/components/layout/sections/apropos/apropos-section";
import { ContactAccueilSection } from "@/components/layout/sections/contact-accueil/contact-accueil-section";

export const metadata: Metadata = {
  title: "Accueil - VIRY Brandon",
  description:
    "VIRY Brandon — Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker.",
};

export default function AccueilPage() {
  return (
    <main className="flex-1 w-full">
      <HeroAccueilSection />
      <CompetencesSection />
      <ArticlesSection />
      <AproposSection />
      <ContactAccueilSection />
    </main>
  );
}
