import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://devweb.viry-brandon.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/store`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('publie', true);

  const articlePages: MetadataRoute.Sitemap = (articles || []).map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const { data: apps } = await supabase
    .from('apps')
    .select('slug, updated_at')
    .eq('publie', true);

  const appPages: MetadataRoute.Sitemap = (apps || []).map((a) => ({
    url: `${BASE_URL}/store/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...appPages];
}
