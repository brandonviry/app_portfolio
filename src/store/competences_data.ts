/**
 * Store local pour les données de compétences techniques
 */

export type Competence = {
  description: string;
  CompTechnique: string[];
};

export const competencesData: Competence[] = [
  {
    description: 'Langages de programmation',
    CompTechnique: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C',
      'C++',
      'Shell'
    ]
  },
  {
    description: 'Frontend & Design',
    CompTechnique: [
      'React.js',
      'Next.js',
      'HTML5',
      'CSS',
      'SCSS',
      'PUG',
      'Vite.js',
      'Figma',
      'UX/UI'
    ]
  },
  {
    description: 'Backend & Base de données',
    CompTechnique: [
      'Express.js',
      'MySQL'
    ]
  },
  {
    description: 'DevOps & Déploiement',
    CompTechnique: [
      'Git',
      'Vercel',
      'VPS OVH',
      'VS Code'
    ]
  },
  {
    description: 'Méthodologies',
    CompTechnique: [
      'Méthode Agile',
      'Méthode Spiral',
      'Méthode Cascade'
    ]
  },
  {
    description: 'Soft Skills',
    CompTechnique: [
      'Stratégique',
      'Sens du détail',
      'Travail en équipe',
      'Résolution de problèmes',
      'Gestion du temps',
      'Autonomie',
      'Adaptabilité'
    ]
  }
];
