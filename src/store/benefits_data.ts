/**
 * Store local pour les données des bénéfices (Benefits)
 */

export type Benefit = {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon?: string; // Nom de l'icône Lucide React (optionnel)
};

export const benefitsData: Benefit[] = [
  {
    id: 1,
    title: "Développement Augmenté",
    description: "Une productivité décuplée grâce à la maîtrise des outils d'IA pour le prototypage et l'architecture.",
    features: [
      "Prototypage rapide (AI-Assisted)",
      "Architecture validée (Claude/Gemini)",
      "Déploiement continu (Vercel/Docker)"
    ],
    icon: "Zap"
  },
  {
    id: 2,
    title: "Qualité & Fiabilité",
    description: "Des applications robustes, testées de bout en bout et documentées pour faciliter la maintenance.",
    features: [
      "Tests E2E & Unitaires (Vitest/Playwright)",
      "Code propre & Documentation",
      "Approche Mobile-First & Responsive"
    ],
    icon: "ShieldCheck"
  },
  {
    id: 3,
    title: "Stack Moderne & Performante",
    description: "Une expertise technique alliant la flexibilité du Web moderne à la rigueur de l'ingénierie logicielle.",
    features: [
      "Next.js (SSR/SSG) & React",
      "Design System (Tailwind/Shadcn)",
      "Performance & Optimisation"
    ],
    icon: "Cpu"
  },
  {
    id: 4,
    title: "Partenaire Engagé",
    description: "Plus qu'un développeur, un collaborateur adaptable axé sur la résolution de problèmes et l'humain.",
    features: [
      "Communication transparente",
      "Esprit d'équipe (Soft Skills Simplon)",
      "Adaptabilité aux besoins métier"
    ],
    icon: "Handshake"
  }
];
