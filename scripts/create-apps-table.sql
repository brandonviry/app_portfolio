-- Table apps — Store d'applications VIRY Brandon
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  categorie TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'web',
  icone_url TEXT,
  image_url TEXT,
  cta_primaire_label TEXT NOT NULL DEFAULT 'Ouvrir',
  cta_primaire_url TEXT NOT NULL,
  cta_secondaire_label TEXT,
  cta_secondaire_url TEXT,
  plateforme TEXT[] NOT NULL DEFAULT '{}',
  version TEXT,
  publie BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- Lecture publique uniquement pour les apps publiées
CREATE POLICY "Apps publiees visibles par tous"
  ON apps FOR SELECT
  USING (publie = true);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS apps_slug_idx ON apps (slug);
CREATE INDEX IF NOT EXISTS apps_publie_idx ON apps (publie);
CREATE INDEX IF NOT EXISTS apps_categorie_idx ON apps (categorie);
