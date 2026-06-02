export type SkillGroup = {
  title: string;
  tools: string[];
};

export type SkillPole = {
  id: string;
  label: string;
  description: string;
  groups: SkillGroup[];
};

export const skillsData: SkillPole[] = [
  {
    id: "dev",
    label: "DEV",
    description: "Développement web & applications",
    groups: [
      {
        title: "Web & Frameworks",
        tools: ["Next.js", "React", "SvelteKit", "Astro", "Tailwind CSS", "Shadcn-ui"],
      },
      {
        title: "Backend & BDD",
        tools: ["Node.js/Express", "Python/FastAPI", "PostgreSQL", "MySQL", "Prisma", "WebSockets", "Supabase"],
      },
      {
        title: "Langages",
        tools: ["TypeScript", "JavaScript", "HTML5/CSS3", "Bash", "Rust", "Go"],
      },
      {
        title: "Mobile & Desktop",
        tools: ["Ionic", "Tauri v2"],
      },
      {
        title: "DevOps & Tests",
        tools: ["Docker", "Git", "GitHub Actions", "Vercel", "OVH", "Vitest", "Playwright", "Jest", "Cypress"],
      },
      {
        title: "Environnement",
        tools: ["VS Code", "VSCodium", "Windsurf", "Zed"],
      },
    ],
  },
  {
    id: "craft",
    label: "CRAFT",
    description: "No-code, automatisation & outils digitaux",
    groups: [
      {
        title: "No-code & CMS",
        tools: ["Webflow", "WordPress"],
      },
      {
        title: "Automatisation",
        tools: ["Zapier", "Make"],
      },
      {
        title: "Gestion & Paiement",
        tools: ["Notion", "Airtable", "Stripe"],
      },
    ],
  },
  {
    id: "graph",
    label: "GRAPH",
    description: "Design graphique & identité visuelle",
    groups: [
      {
        title: "Design & Maquette",
        tools: ["Figma", "Affinity Suite"],
      },
      {
        title: "Retouche & Création",
        tools: ["Photoshop", "Illustrator", "InDesign", "Canva"],
      },
    ],
  },
];
