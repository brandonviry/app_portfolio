import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables d\'environnement Supabase manquantes');
}

// Client pour le frontend (utilise anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client pour le backend/admin (utilise service_role key)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Types TypeScript pour les projets (format Supabase BDD)
export type ProjectDB = {
  id: string;
  titre: string;
  description: string;
  cover: string | null;
  lien: string | null;
  categories: string[];
  technologies: string[];
  year: number | null;
  created_at: string;
  updated_at: string;
};

// Type compatible avec l'ancien format (pour les composants existants)
export type Project = {
  id: string;
  titre: string;
  Description: string;  // Ancien format avec majuscule
  Cover?: string;       // Ancien format avec majuscule
  Lien?: string;        // Ancien format avec majuscule
  categories: string[];
  technologies: string[];
  year?: number;
};

// Fonction pour convertir ProjectDB → Project (ancien format)
export function convertProjectToLegacyFormat(dbProject: ProjectDB): Project {
  return {
    id: dbProject.id,
    titre: dbProject.titre,
    Description: dbProject.description,
    Cover: dbProject.cover || undefined,
    Lien: dbProject.lien || undefined,
    categories: dbProject.categories,
    technologies: dbProject.technologies,
    year: dbProject.year || undefined
  };
}
