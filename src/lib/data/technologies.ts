// Type pour une technologie
export interface Technology {
  name: string;
  icon: string; // Sera utilisé comme fallback emoji simple
}

export async function getTechnologies(): Promise<Technology[]> {
  try {
    const response = await fetch('/api/competences');
    if (!response.ok) {
      throw new Error('Failed to fetch competences');
    }
    const competences = await response.json();
    return competences[0]?.CompTechnique.map((tech: string) => ({
      name: tech,
      icon: '💻' // Icône par défaut, sera remplacée par le système dynamique
    })) || [];
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
}
