import { createClient } from '@supabase/supabase-js';
import type { Article } from '@/types/article';

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

// ─── Articles ────────────────────────────────────────────────────────────────

export type ArticleDB = {
  id: string;
  slug: string;
  titre: string;
  auteur: string;
  date_publication: string;
  categorie: string;
  image_src: string | null;
  extrait: string | null;
  contenu: string | null;
  publie: boolean;
  created_at: string;
  updated_at: string;
};

export function convertArticleDBToArticle(db: ArticleDB): Article {
  return {
    slug: db.slug,
    title: db.titre,
    author: db.auteur,
    date: db.date_publication,
    category: db.categorie,
    imageSrc: db.image_src ?? undefined,
    excerpt: db.extrait ?? undefined,
    content: db.contenu ?? undefined,
  };
}

// Lecture publique — articles publiés (client anon)
export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('publie', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data as ArticleDB[]).map(convertArticleDBToArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('publie', true)
    .single();

  if (error || !data) return null;
  return convertArticleDBToArticle(data as ArticleDB);
}

// Lecture admin — tous les articles (client service_role)
export async function getAllArticlesAdmin(): Promise<ArticleDB[]> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as ArticleDB[];
}

export async function createArticle(
  article: Omit<ArticleDB, 'id' | 'created_at' | 'updated_at'>
): Promise<ArticleDB> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert(article)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ArticleDB;
}

export async function updateArticle(
  id: string,
  article: Partial<Omit<ArticleDB, 'id' | 'created_at'>>
): Promise<ArticleDB> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .update({ ...article, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ArticleDB;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
