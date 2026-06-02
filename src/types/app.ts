export type AppType = 'web' | 'executable' | 'saas';

export type App = {
  slug: string;
  nom: string;
  tagline?: string;
  description?: string;
  categorie: string;
  type: AppType;
  icone_url?: string;
  image_url?: string;
  cta_primaire_label: string;
  cta_primaire_url: string;
  cta_secondaire_label?: string;
  cta_secondaire_url?: string;
  plateforme: string[];
  version?: string;
};
