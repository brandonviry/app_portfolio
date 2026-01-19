import { competencesData } from '@/store/competences_data';

// Type pour une technologie
export interface Technology {
  name: string;
  category: string;
}

export function getTechnologies(): Technology[] {
  // Récupère toutes les technologies de toutes les catégories
  const allTechnologies: Technology[] = [];

  competencesData.forEach(comp => {
    comp.CompTechnique.forEach(tech => {
      allTechnologies.push({
        name: tech,
        category: comp.description
      });
    });
  });

  return allTechnologies;
}

// Récupère les technologies groupées par catégorie
export function getTechnologiesByCategory() {
  return competencesData.map(comp => ({
    category: comp.description,
    technologies: comp.CompTechnique
  }));
}
