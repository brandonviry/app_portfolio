// Type pour une technologie
export interface Technology {
  name: string;
  icon: string;
}

// Mapping des icônes pour les technologies
export const technologyIcons: { [key: string]: string } = {
  'React': '⚛️',
  'Nextjs': '▲',
  'TypeScript': '🔷',
  'JavaScript': '💛',
  'HTML5': '🌐',
  'CSS': '🎨',
  'SCSS': '💅',
  'Nodejs': '🟢',
  'MySQL': '🐬',
  'Git': '📚',
  'Java': '☕',
  'Python': '🐍',
  'C': '⚙️',
  'Shell': '🐚',
  'Expressjs': '🚂',
  'Vitejs': '⚡',
  'PUG': '🐶',
  'Figma': '🎯',
  'VScode': '📝',
};

export async function getTechnologies(): Promise<Technology[]> {
  try {
    const response = await fetch('/api/competences');
    if (!response.ok) {
      throw new Error('Failed to fetch competences');
    }
    const competences = await response.json();
    return competences[0]?.CompTechnique.map((tech: string) => ({
      name: tech,
      icon: technologyIcons[tech.replace(/[\s.-]/g, '')] || '💻'
    })) || [];
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
}
