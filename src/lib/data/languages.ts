// Type pour une langue
export interface Language {
  name: string;
  level: string;
  icon: string;
}

// Mapping des icônes pour les langues
export const languageIcons: { [key: string]: string } = {
  'Français': '🇫🇷',
  'Créol': '🇷🇪',
  'Anglais': '🇬🇧',
};

// Mapping des niveaux de langue
export const languageLevels: { [key: string]: string } = {
  'Français': 'Courant',
  'Créol': 'Maternel',
  'Anglais': 'Intermédiaire',
};

export async function getLanguages(): Promise<Language[]> {
  try {
    const response = await fetch('/api/competences');
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    const competences = await response.json();
    return competences[0]?.lang.map((lang: string) => ({
      name: lang,
      icon: languageIcons[lang] || '🌐',
      level: languageLevels[lang] || 'Intermédiaire'
    })) || [];
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}
