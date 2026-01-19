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
};

// Mapping des niveaux de langue
export const languageLevels: { [key: string]: string } = {
  'Français': 'Courant',
  'Créol': 'Maternel',

};

// Données statiques des langues parlées
const spokenLanguages = ['Français', 'Créol'];

export function getLanguages(): Language[] {
  return spokenLanguages.map((lang: string) => ({
    name: lang,
    icon: languageIcons[lang] || '🌐',
    level: languageLevels[lang] || 'Intermédiaire'
  }));
}
