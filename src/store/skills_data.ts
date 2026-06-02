export type SkillPole = {
  id: string;
  label: string;
  description: string;
  tools: string[];
};

export const skillsData: SkillPole[] = [
  {
    id: "dev",
    label: "DEV",
    description: "Développement web & applications",
    tools: [
      "Next.js", "React", "TypeScript", "Tailwind CSS",
      "Supabase", "Node.js", "Python", "PostgreSQL",
      "Docker", "Git", "GitHub Actions", "Vercel",
    ],
  },
  {
    id: "craft",
    label: "CRAFT",
    description: "No-code, automatisation & outils digitaux",
    tools: [
      "Webflow", "Notion", "Zapier", "Make",
      "WordPress", "Stripe", "Airtable",
    ],
  },
  {
    id: "graph",
    label: "GRAPH",
    description: "Design graphique & identité visuelle",
    tools: [
      "Figma", "Photoshop", "Illustrator",
      "Affinity Suite", "Canva", "InDesign",
    ],
  },
];
