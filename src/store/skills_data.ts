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
        title: "Développement Web & Stack",
        tools: [
          "Next.js/React", "SvelteKit (Svelte 5)", "Astro", "React/TypeScript",
          "Next.js (SSR/SSG)", "Tailwind CSS", "Node.js/Express (JWT)",
          "Python FastAPI/Flask", "PostgreSQL/MySQL + Prisma", "WebSockets", "Supabase",
        ],
      },
      {
        title: "Mobile & Desktop",
        tools: ["Ionic (Capacitor)", "Tauri v2"],
      },
      {
        title: "Langages (Legacy → Moderne)",
        tools: [
          "TypeScript", "JavaScript", "HTML5/CSS3",
          "Python → Mojo", "C++ → Rust", "Java/C# → Go", "C → Zig",
          "Bash", "Python", "Rust",
        ],
      },
      {
        title: "Outils, Qualité & DevOps",
        tools: [
          "Zustand", "React Hook Form", "Zod", "Shadcn-ui",
          "Vitest", "Playwright (E2E)", "Jest", "Cypress",
          "Git", "GitHub Actions", "Docker", "Vercel/VPS", "OVH",
          "UX/UI responsive", "Mobile-first",
        ],
      },
      {
        title: "Méthodes & Soft Skills",
        tools: [
          "Agile/Scrum", "Documentation technique",
          "Revues de code", "Polyvalence et adaptation aux besoins projet",
        ],
      },
      {
        title: "Environnement de Développement",
        tools: [
          "VSCodium + Claude Code", "VS Code + GPT-Codex",
          "Windsurf + Gemini Pro/DeepSeek V3", "03 + Kimi K2", "Zed + Mistral CLI",
        ],
      },
    ],
  },
  {
    id: "craft",
    label: "CRAFT",
    description: "No-code, automatisation & outils digitaux",
    groups: [
      {
        title: "Code & Développement",
        tools: ["JavaScript", "Python", "HTML", "CSS", "React", "Git"],
      },
      {
        title: "Web & CMS",
        tools: ["WordPress", "Webflow", "Framer"],
      },
      {
        title: "No-Code",
        tools: ["Notion", "Airtable", "Système.io"],
      },
      {
        title: "Automatisation",
        tools: ["Zapier", "Make (Integromat)", "N8N", "Webhooks", "API", "Workflows"],
      },
      {
        title: "Design & Contenu",
        tools: ["Canva", "Figma", "Suite Affinity", "UI/UX Design", "Design System", "Prototypage"],
      },
      {
        title: "Tunnel de vente & Paiement",
        tools: ["Stripe", "Système.io"],
      },
      {
        title: "Outils collaboratifs",
        tools: ["Discord", "WhatsApp", "Agile", "Code Review", "Documentation"],
      },
      {
        title: "Vision Produit",
        tools: ["Stratégie", "MVP", "Tests", "Itération"],
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
