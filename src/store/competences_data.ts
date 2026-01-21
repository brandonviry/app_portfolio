/**
 * Store local pour les données de compétences techniques
 * Basé sur les compétences actuelles et l'évolution vers des technologies modernes
 */

export type Competence = {
  description: string;
  CompTechnique: string[];
};

export const competencesData: Competence[] = [
  {
    description: 'Développement Web & Stack',
    CompTechnique: [
      'Next.js/React',
      'SvelteKit (Svelte 5)',
      'Astro',
      'React/TypeScript',
      'Next.js (SSR/SSG)',
      'Tailwind CSS',
      'Node.js/Express (JWT)',
      'Python FastAPI/Flask',
      'PostgreSQL/MySQL + Prisma',
      'WebSockets',
      'Supabase'
    ]
  },
  {
    description: 'Mobile & Desktop',
    CompTechnique: [
      'Ionic (Capacitor)',
      'Tauri v2'
    ]
  },
  {
    description: 'Langages (Legacy → Moderne)',
    CompTechnique: [
      'TypeScript',
      'JavaScript',
      'HTML5/CSS3',
      'Python → Mojo',
      'C++ → Rust',
      'Java/C# → Go',
      'C → Zig',
      'Bash',
      'Python',
      'Rust'
    ]
  },
  {
    description: 'Outils, Qualité & DevOps',
    CompTechnique: [
      'Zustand',
      'React Hook Form',
      'Zod',
      'Shadcn-ui',
      'Vitest',
      'Playwright (E2E)',
      'Jest',
      'Cypress',
      'Git',
      'GitHub Actions',
      'Docker',
      'Vercel/VPS',
      'OVH',
      'Figma',
      'UX/UI responsive',
      'Mobile-first'
    ]
  },
  {
    description: 'Méthodes & Soft Skills',
    CompTechnique: [
      'Agile/Scrum',
      'Documentation technique',
      'Revues de code',
      'Polyvalence et adaptation aux besoins projet'
    ]
  },
  {
    description: 'Environnement de Développement',
    CompTechnique: [
      'VSCodium + Claude Code',
      'VS Code + GPT-Codex',
      'Windsurf + Gemini Pro/DeepSeek V3',
      '03 + Kimi K2',
      'Zed + Mistral CLI'
    ]
  }
];
