/**
 * Configuration des groupes de technologies pour le filtrage
 */

export const TECHNOLOGY_GROUPS = {
  'Frontend': [
    'React',
    'Next.js',
    'Svelte',
    'Astro',
    'HTML',
    'HTML5',
    'HTML5/CSS3',
    'A-Frame',
    'AR.js'
  ],
  'Styling': [
    'Tailwind CSS',
    'TailwindCSS',
    'Tailwind',
    'Sass',
    'CSS',
    'CSS3',
    'Bulma',
    'Mui'
  ],
  'Backend': [
    'PHP',
    'PHP ',
    'Python',
    'Go',
    'Rust',
    'Node.js'
  ],
  'TypeScript/JavaScript': [
    'TypeScript',
    'JavaScript',
    'Vite',
    'webpack',
    'jQuery'
  ],
  'UI Libraries': [
    'Radix UI',
    'shadcn/ui',
    '@wordpress/components',
    '@wordpress/scripts',
    'Iced',
    'clsx',
    'Recharts',
    'qrcode.react',
    'Zod',
    'Zustand',
    '@hookform',
    '@notionhq'
  ],
  'Mobile': [
    'Flutter',
    'React Native'
  ],
  'API/Services': [
    'WordPress REST API',
    'Notion API',
    'YouTube',
    'YouTube API',
    'WordPress AJAX'
  ],
  'Hardware/Embedded': [
    'Arduino',
    'C',
    'C++',
    'MicroControleur'
  ],
  'Gaming/Scripting': [
    'Roblox',
    'Rojo',
    'Lua'
  ],
  'Build Tools': [
    'cargo',
    'Cargo',
    'webpack',
    'Vite',
    'Batchfile',
    'Shell'
  ],
  'CMS/WordPress': [
    'WordPress',
    'wp_options',
    'uploads directory'
  ],
  'Rust Ecosystem': [
    'Rust',
    'Anyhow',
    'Chrono',
    'crossterm',
    'Directories',
    'Iced',
    'Once_cell',
    'Serde',
    'thiserror'
  ],
  'Autres': [
    'WebAssembly',
    'R',
    'JSON',
    'kmz',
    'ggplot2'
  ]
} as const;

/**
 * Type pour les noms de groupes
 */
export type TechnologyGroupName = keyof typeof TECHNOLOGY_GROUPS;

/**
 * Trouve le groupe d'une technologie donnée
 */
export function getTechnologyGroup(technology: string): TechnologyGroupName | null {
  for (const [groupName, technologies] of Object.entries(TECHNOLOGY_GROUPS)) {
    if (technologies.includes(technology as any)) {
      return groupName as TechnologyGroupName;
    }
  }
  return null;
}

/**
 * Retourne toutes les technologies d'un groupe
 */
export function getTechnologiesInGroup(groupName: TechnologyGroupName): readonly string[] {
  return TECHNOLOGY_GROUPS[groupName] || [];
}

/**
 * Groupe les technologies par leur groupe
 * Retourne un Map avec le nom du groupe et les technologies présentes dans la liste
 */
export function groupTechnologies(technologies: string[]): Map<TechnologyGroupName | 'Non classées', string[]> {
  const grouped = new Map<TechnologyGroupName | 'Non classées', string[]>();

  technologies.forEach(tech => {
    const group = getTechnologyGroup(tech);
    const groupKey = group || 'Non classées';

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, []);
    }
    grouped.get(groupKey)!.push(tech);
  });

  return grouped;
}
