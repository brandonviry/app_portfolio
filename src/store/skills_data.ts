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
      "Next.js", "React", "SvelteKit", "Astro",
      "TypeScript", "JavaScript", "HTML5/CSS3", "Tailwind CSS",
      "Shadcn-ui", "Zustand", "React Hook Form", "Zod",
      "Node.js/Express", "Python/FastAPI", "PostgreSQL", "MySQL",
      "Prisma", "WebSockets", "Supabase",
      "Ionic", "Tauri v2",
      "Docker", "Git", "GitHub Actions", "Vercel", "OVH",
      "Vitest", "Playwright", "Jest", "Cypress",
      "Bash", "Rust", "Go",
      "VS Code", "VSCodium", "Windsurf", "Zed",
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
