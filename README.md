# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

Portfolio professionnel de VIRY Brandon — Développeur web & Graphiste basé à La Réunion. Développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture basée sur l'Atomic Design.

## 🚀 Pages & Fonctionnalités

### Pages publiques

| Route | Description |
|-------|-------------|
| `/` | Page principale (accueil) |
| `/accueil` | Redirect → `/` |
| `/blog` | Listing de tous les articles avec filtre par catégorie |
| `/blog/[slug]` | Article individuel avec rendu Markdown complet |
| `/store` | ✨ Store — listing de toutes les apps publiées |
| `/store/[slug]` | ✨ Page détail d'une app (CTAs, description, plateformes) |
| `/projets` | Galerie des projets avec filtres (catégorie, technologie, tri) |
| `/contact` | Page de contact dédiée |
| `/dev` | Ancienne page d'accueil portfolio conservée (brouillon) |

### Page / (page principale)

Ordre des sections :

1. **Hero** : Nom VIRY Brandon + 4 rôles — décoration graphique : grille de points, watermark, coins géométriques, étiquettes latérales, année dynamique
2. **À propos** (`DescriptionSection`) : photo + 2 paragraphes bio + boutons "Me contacter" / "Voir mes projets" (scroll vers section suivante)
3. **Voir mes projets** : 3 pôles DEV / CRAFT / GRAPH — DEV → `/projets`, CRAFT → Notion, GRAPH → Behance
4. **Derniers articles** : 6 derniers articles publiés depuis Supabase + CTA → `/blog`
5. **Savoir-faire** : onglets DEV / CRAFT / GRAPH — chaque pôle affiche ses outils groupés par sous-catégorie (`skills_data.ts`)
6. **FAQ** : 9 questions réparties sur les 3 pôles (3 DEV, 3 CRAFT, 3 GRAPH)
7. **CTA final** : bouton "Me contacter" → `/contact`

### Blog /blog & /blog/[slug]
- **Listing** : tous les articles publiés depuis Supabase, filtrage client-side instantané par catégorie
- **Article** : rendu Markdown complet avec branding, embeds médias automatiques (YouTube, TikTok, images)
- **Génération statique** : `generateStaticParams` pour les articles publiés, `generateMetadata` (SEO)

### Portfolio /projets
- **Filtrage Avancé** : par catégorie, par technologie (dropdown multi-sélection groupé), tri personnalisable
- **Logique AND/OR** intelligente entre filtres, tooltips explicatifs
- **Projets** : Chargés depuis Supabase PostgreSQL

### 🎛️ Interface Admin
- **Authentification Sécurisée** : NextAuth.js avec hash bcrypt
- **CRUD Projets** : Créer, lire, modifier, supprimer via interface web
- **CRUD Articles** : Gestion complète du blog
- **✨ CRUD Store** : Gestion des apps (web, SaaS, exécutables) avec plateformes et CTAs
- **Base de Données** : Supabase PostgreSQL (UUIDs, timestamps, RLS)
- **Dashboard** : Statistiques en temps réel (total projets, articles, apps)
- **Production Ready** : Compatible Vercel (filesystem read-only)

## 🛠️ Stack Technique

### Frontend & Architecture
- **Framework** : Next.js 15.1+ avec App Router et Turbopack
- **Runtime** : React 19+
- **Language** : TypeScript 5.0+ (strict mode, alias `@/*`)
- **Styles** : Tailwind CSS 3.4+ avec variables CSS custom
- **Icônes** : Lucide React
- **Animations** : Framer Motion 12
- **Utilitaires CSS** : clsx, tailwind-merge, class-variance-authority (CVA)
- **Architecture** : Atomic Design (Atomes → Molécules → Organismes → Pages)

### Backend & Authentification
- **Base de données** : Supabase (PostgreSQL) — projets + articles
- **Authentification** : NextAuth.js 5.0+ beta (Credentials, JWT)
- **Sécurité** : bcryptjs (hash)
- **API Routes** : Next.js App Router
- **Emails** : Resend (API route `/api/contact`)

### Blog & Contenu
- **Markdown** : react-markdown + remark-gfm (GFM : tableaux, barré, autolinks)
- **Embeds** : YouTube (youtube-nocookie), TikTok (iframe v2)
- **Images** : détection automatique ou syntaxe `![alt](url)`

### Formulaires & Validation
- **react-hook-form** + **@hookform/resolvers** + **Zod**

### Données
- **Projets** : Supabase PostgreSQL
- **Articles** : Supabase PostgreSQL (table `articles`)
- **✨ Apps** : Supabase PostgreSQL (table `apps`)
- **Stores statiques** : TypeScript locaux (`src/store/`) — compétences, FAQ, témoignages, logos

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/BrandonViry/app_portfolio.git
cd app_portfolio
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement dans `.env.local` :

```env
# Supabase (requis)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx

# Emails (Resend)
RESEND_API_KEY=re_votre_cle_api_resend

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<généré>

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<généré via node generate-hash.js "MotDePasse">
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000)

**Interface admin** : [http://localhost:3000/admin](http://localhost:3000/admin)

## 📂 Structure du Projet

```
src/
├── app/                              # Next.js App Router
│   ├── accueil/                      # Redirect → /
│   ├── blog/                         # ✨ Blog
│   │   ├── page.tsx                  # Listing articles (/blog)
│   │   └── [slug]/page.tsx           # Article individuel (/blog/[slug])
│   ├── dev/                          # Page ancienne homepage portfolio (conservée)
│   ├── projets/                      # Galerie projets avec filtres
│   ├── contact/                      # Page de contact
│   ├── store/                        # ✨ Store public
│   │   ├── page.tsx                  # Listing apps (/store)
│   │   └── [slug]/page.tsx           # Page détail app (/store/[slug])
│   ├── admin/                        # Interface admin (protégée)
│   │   ├── login/
│   │   ├── projects/                 # CRUD projets
│   │   ├── articles/                 # CRUD articles
│   │   └── apps/                     # ✨ CRUD store apps
│   ├── api/
│   │   ├── contact/route.ts          # Envoi emails (Resend)
│   │   ├── projects/route.ts         # API publique projets
│   │   ├── admin/projects/           # API CRUD admin projets (Supabase)
│   │   ├── admin/articles/           # API CRUD admin articles (Supabase)
│   │   ├── admin/apps/               # ✨ API CRUD admin apps (Supabase)
│   │   └── auth/[...nextauth]/       # NextAuth routes
│   ├── sitemap.ts                    # ✨ Sitemap dynamique (articles + apps depuis Supabase)
│   ├── robots.ts                     # ✨ Robots.txt (bloque /admin/ et /api/)
│   ├── layout.tsx                    # Layout global (Navbar + Footer)
│   └── page.tsx                      # Route / (racine)
│
├── components/
│   ├── ui/                           # ⚛️ Atomes — composants indivisibles
│   │   ├── article/
│   │   │   └── article-content.tsx   # ✨ Parseur Markdown + médias
│   │   ├── media/
│   │   │   ├── article-image.tsx     # ✨ Rendu image branding
│   │   │   ├── youtube-embed.tsx     # ✨ Embed YouTube 16:9
│   │   │   └── tiktok-embed.tsx      # ✨ Embed TikTok 9:16
│   │   ├── button/button.tsx
│   │   ├── typography/typography.tsx
│   │   ├── card/
│   │   │   ├── article-card.tsx      # ✨ Carte article (image, catégorie, titre, auteur, date)
│   │   │   ├── project-card.tsx
│   │   │   ├── benefit-card.tsx
│   │   │   └── testimonial-card.tsx
│   │   ├── form/
│   │   │   ├── contact-form.tsx      # Formulaire simple (Nom, Email, Message)
│   │   │   ├── contact-form-full.tsx # ✨ Formulaire complet (6 champs + consentement RGPD)
│   │   │   ├── form-input.tsx
│   │   │   ├── form-textarea.tsx
│   │   │   └── form-checkbox.tsx     # ✨ Atome checkbox avec label et gestion d'erreur
│   │   ├── chip/, dropdown/, filter/ # Filtres projets
│   │   ├── decoration/divider.tsx
│   │   ├── chip/, dropdown/, filter/ # Filtres projets
│   │   ├── decoration/divider.tsx
│   │   ├── badge/
│   │   │   ├── skill-tag.tsx         # ✨ Tag statique outil/compétence (section Savoir-faire)
│   │   │   ├── level-badge.tsx
│   │   │   └── status-badge.tsx
│   │   ├── icon/, avatar/
│   │   ├── navigation/navigation.tsx
│   │   └── ...
│   │
│   └── layout/                       # 🏗️ Organismes — assemblage de composants
│       ├── header/navbar.tsx
│       ├── footer/footer.tsx
│       └── sections/
│           ├── hero-accueil/         # ✨ Hero page principale
│           ├── competences/          # ✨ Blocs DEV / CRAFT / GRAPH ("Voir mes projets")
│           ├── articles/             # ✨ Grille derniers articles (Supabase) + CTA blog
│           ├── description/          # ✨ À propos — photo + bio + boutons CTA
│           ├── apropos/              # Biographie + réseaux sociaux (non utilisé sur /)
│           ├── contact-accueil/      # Section contact (non utilisé sur /)
│           ├── blog/                 # ✨ Listing blog avec filtres + lien retour
│           ├── technologies/         # ✨ Section "Savoir-faire" — onglets DEV/CRAFT/GRAPH
│           ├── hero/                 # Hero page /dev
│           ├── benefits/
│           ├── cta/
│           ├── faq/
│           ├── languages/
│           ├── projets/
│           ├── social-proof/
│           └── testimonials/
│
├── config/
│   ├── metadata.ts                   # Métadonnées SEO par page
│   └── technology-groups.ts          # Groupes de technologies pour dropdown
│
├── lib/
│   ├── supabase.ts                   # Clients Supabase (anon + admin) + types + CRUD articles
│   ├── auth.ts                       # Configuration NextAuth
│   ├── apollo/client.ts              # Client Apollo GraphQL
│   └── utils.ts                      # Utilitaires (cn)
│
├── middleware.ts                     # Protection routes /admin/*
│
├── store/                            # Données statiques TypeScript
│   ├── skills_data.ts                # ✨ 3 pôles DEV/CRAFT/GRAPH avec sous-groupes d'outils
│   ├── articles_data.ts              # ✨ Données articles de fallback
│   ├── benefits_data.ts
│   ├── competences_data.ts
│   ├── description_data.ts
│   ├── faq_data.ts                   # FAQ restructurée — 3 DEV + 3 CRAFT + 3 GRAPH
│   ├── logos_data.ts
│   └── testimonials_data.ts
│
└── types/
    ├── article.ts                    # Type Article
    ├── app.ts                        # ✨ Type App (store)
    └── project.ts
```

> ✨ = ajouté récemment

## 🎨 Design System

Palette de couleurs définie via variables CSS dans `globals.css` et `tailwind.config.ts` :

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--accent` | `#00a8e8` | Bleu électrique — titres, liens actifs |
| `--cta` | `#ff3b3f` | Rouge vif — boutons d'action |
| `--background` | `#ffffff` / `#0d0d0d` | Fond (clair / sombre) |
| `--surface-1/2/3` | Niveaux de surface | Cartes, conteneurs |
| `--text-primary/secondary/muted` | Hiérarchie texte | — |

Conventions : **aucun border-radius**, coins géométriques, grille de points, palette accent/cta cohérente sur toutes les pages.

## 🎛️ Interface Admin

| Route | Accès |
|-------|-------|
| `/admin` | Dashboard statistiques |
| `/admin/login` | Connexion |
| `/admin/projects` | Liste projets |
| `/admin/projects/new` | Créer un projet |
| `/admin/projects/[id]` | Modifier un projet |
| `/admin/articles` | Liste articles (recherche, filtres statut/catégorie) |
| `/admin/articles/new` | Créer un article |
| `/admin/articles/[id]` | Modifier / supprimer un article |
| `/admin/apps` | ✨ Liste apps du store (recherche, filtres statut/type) |
| `/admin/apps/new` | ✨ Créer une app |
| `/admin/apps/[id]` | ✨ Modifier / supprimer une app |

## ✍️ Rédaction des articles — Syntaxe complète

> **Important** : le contenu des articles est stocké en texte brut dans Supabase (champ `contenu`). Le rendu Markdown est appliqué automatiquement à l'affichage.

### Syntaxe Markdown supportée

```markdown
# Titre h1 (bleu accent)
## Titre h2 (avec bordure basse)
### Titre h3
#### Titre h4

Paragraphe normal avec du **gras**, de l'_italique_ et du `code inline`.

- Élément de liste
- Autre élément avec **gras**

> Citation avec bordure accent gauche

---  ← séparateur (divider gradient)

[Texte du lien](https://url.com)

~~texte barré~~
```

### Blocs de code

Utiliser **4 espaces d'indentation** (recommandé dans Supabase) :

```
    function bonjour(nom) {
      return `Bonjour, ${nom} !`;
    }
```

### Tableaux (GitHub Flavored Markdown)

```markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Valeur A  | Valeur B  | Valeur C  |
```

### Images

```markdown
![Description de l'image](https://url-de-l-image.com/photo.jpg)
```

> ⚠️ Toujours utiliser la syntaxe Markdown `![alt](url)` pour les images.
> Une URL directe seule sur une ligne ne fonctionne que si elle se termine par `.jpg`, `.png`, `.webp`, etc.
> Les URLs dynamiques (Supabase Storage, Cloudinary, Picsum...) doivent obligatoirement utiliser `![alt](url)`.

### Embeds vidéo (automatiques)

Coller l'URL de la vidéo **seule sur une ligne** — le composant d'embed est chargé automatiquement :

```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID

https://www.tiktok.com/@username/video/VIDEO_ID
```

> Les URLs YouTube et TikTok sont détectées automatiquement — pas besoin de syntaxe spéciale.

### Exemple d'article complet dans Supabase

```
## Introduction

Paragraphe d'introduction avec du **texte important** et un `mot technique`.

## Ma section

- Point 1
- Point 2
- Point 3

> "Une citation inspirante."

## Image du projet

![Aperçu du projet](https://mon-storage.supabase.co/images/projet.jpg)

## Démonstration vidéo

https://www.youtube.com/watch?v=dQw4w9WgXcQ

## Tableau récapitulatif

| Outil | Usage |
|-------|-------|
| Figma | Design |
| VS Code | Dev |

---

Concept & réalisation : VIRY Brandon
```

## 🗄️ Base de données Supabase

### Table `articles`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (auto) |
| `slug` | TEXT UNIQUE | URL de l'article (`/blog/mon-slug`) |
| `titre` | TEXT | Titre affiché |
| `auteur` | TEXT | Nom de l'auteur |
| `date_publication` | TEXT | Date lisible (`mai 19, 2025`) |
| `categorie` | TEXT | Catégorie (filtre blog) |
| `image_src` | TEXT | Image de couverture (optionnel) |
| `extrait` | TEXT | Résumé court (SEO + listing) |
| `contenu` | TEXT | Corps de l'article en Markdown |
| `publie` | BOOLEAN | `true` = visible publiquement |
| `created_at` | TIMESTAMPTZ | Créé automatiquement |
| `updated_at` | TIMESTAMPTZ | Mis à jour automatiquement |

### SQL — Création de la table

```sql
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  titre TEXT NOT NULL,
  auteur TEXT NOT NULL DEFAULT 'chikara974',
  date_publication TEXT NOT NULL,
  categorie TEXT NOT NULL,
  image_src TEXT,
  extrait TEXT,
  contenu TEXT,
  publie BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles publiés visibles" ON articles
  FOR SELECT USING (publie = true);

CREATE POLICY "Service role full access" ON articles
  FOR ALL USING (auth.role() = 'service_role');
```

### Table `apps` ✨

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (auto) |
| `slug` | TEXT UNIQUE | URL de l'app (`/store/mon-app`) |
| `nom` | TEXT | Nom de l'app |
| `tagline` | TEXT | Accroche courte (listing) |
| `description` | TEXT | Description longue (page détail) |
| `categorie` | TEXT | Catégorie (ex: Productivité, Dev Tool) |
| `type` | TEXT | `web` / `saas` / `executable` |
| `icone_url` | TEXT | URL de l'icône (optionnel) |
| `image_url` | TEXT | Image de couverture (optionnel) |
| `cta_primaire_label` | TEXT | Label du bouton principal (ex: "Ouvrir l'app") |
| `cta_primaire_url` | TEXT | Lien du bouton principal |
| `cta_secondaire_label` | TEXT | Label bouton secondaire (optionnel) |
| `cta_secondaire_url` | TEXT | Lien bouton secondaire (optionnel) |
| `plateforme` | TEXT[] | Tableaux de plateformes (`["Web", "Windows"]`) |
| `version` | TEXT | Version de l'app (optionnel, ex: `1.2.0`) |
| `publie` | BOOLEAN | `true` = visible publiquement sur `/store` |
| `created_at` | TIMESTAMPTZ | Créé automatiquement |
| `updated_at` | TIMESTAMPTZ | Mis à jour automatiquement |

### SQL — Création de la table `apps`

```sql
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

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apps publiees visibles par tous"
  ON apps FOR SELECT USING (publie = true);

CREATE INDEX IF NOT EXISTS apps_slug_idx ON apps (slug);
CREATE INDEX IF NOT EXISTS apps_publie_idx ON apps (publie);
```

> Le fichier complet est disponible dans `scripts/create-apps-table.sql`.

### SQL — Exemples d'insertion (test)

Coller dans **Supabase → SQL Editor** pour tester l'affichage du store :

```sql
INSERT INTO apps (slug, nom, tagline, description, categorie, type, icone_url, image_url, cta_primaire_label, cta_primaire_url, cta_secondaire_label, cta_secondaire_url, plateforme, version, publie)
VALUES

-- Web App
(
  'taskflow-pro',
  'TaskFlow Pro',
  'Gérez vos tâches sans effort',
  'TaskFlow Pro est une application web de gestion de tâches pensée pour les indépendants et les petites équipes. Organisez vos projets, définissez des priorités et suivez votre progression en temps réel.',
  'Productivité',
  'web',
  null,
  null,
  'Ouvrir l''app',
  'https://exemple.com/taskflow',
  null,
  null,
  ARRAY['Web'],
  '1.2.0',
  true
),

-- SaaS
(
  'designsync',
  'DesignSync',
  'Synchronisez vos assets Figma en un clic',
  'DesignSync connecte vos fichiers Figma à votre codebase. Exportez automatiquement les tokens de design, les icônes et les composants vers votre projet. Compatible React, Vue et Svelte.',
  'Design',
  'saas',
  null,
  null,
  'Accéder',
  'https://exemple.com/designsync',
  'Voir la démo',
  'https://exemple.com/designsync/demo',
  ARRAY['Web'],
  '2.0.1',
  true
),

-- Exécutable
(
  'devkit-cli',
  'DevKit CLI',
  'Votre boîte à outils de développeur en ligne de commande',
  'DevKit CLI regroupe une collection d''utilitaires pour développeurs : génération de slugs, conversion de formats, hash de fichiers, minification CSS/JS et bien plus. Fonctionne hors ligne, sans dépendances cloud.',
  'Dev Tool',
  'executable',
  null,
  null,
  'Télécharger',
  'https://exemple.com/devkit/releases/latest',
  null,
  null,
  ARRAY['Windows', 'Mac', 'Linux'],
  '0.9.4',
  true
);
```

> Supprimer les données de test après validation :
> ```sql
> DELETE FROM apps WHERE slug IN ('taskflow-pro', 'designsync', 'devkit-cli');
> ```

### CTA par type d'app

| Type | Label par défaut | Action |
|------|-----------------|--------|
| `web` | Ouvrir l'app | Lien externe vers la web app |
| `saas` | Accéder | Lien externe vers le service |
| `executable` | Télécharger | Lien de téléchargement direct |

### Table `projects` (existante)

Gérée via l'interface admin `/admin/projects`. Voir la documentation Supabase existante.

## 🔍 SEO

### Mot-clé principal

`Développeur graphiste La Réunion` — présent dans le titre, la meta description, le H1 (sr-only), le H2, le footer et le copyright.

### Sitemap dynamique

`src/app/sitemap.ts` génère automatiquement `/sitemap.xml` à chaque requête en incluant :
- Pages statiques : `/`, `/blog`, `/store`, `/contact`
- Articles publiés : `/blog/[slug]` avec `lastModified` depuis `updated_at`
- Apps publiées : `/store/[slug]` avec `lastModified` depuis `updated_at`

> Soumettre le sitemap dans **Google Search Console → Sitemaps** : `https://devweb.viry-brandon.fr/sitemap.xml`

### Robots.txt

`src/app/robots.ts` bloque les crawlers sur `/admin/` et `/api/`, autorise le reste, et pointe vers le sitemap.

### JSON-LD Structured Data

| Page | Type schema.org | Effet |
|------|----------------|-------|
| `/` | `Person` | Knowledge panel Google (nom, liens sociaux, localisation) |
| `/blog/[slug]` | `Article` | Rich snippets (date, auteur) |
| `/store/[slug]` | `SoftwareApplication` | Rich snippets style Play Store |

### Rendu dynamique

`/blog` et `/store` ont `export const dynamic = 'force-dynamic'` — les données Supabase sont toujours fraîches sans redéploiement.

### Métadonnées

- Template global : `%s | VIRY Brandon` (défini dans `layout.tsx`)
- Tag de vérification Google dans `layout.tsx` (`metadata.verification.google`)
- Open Graph et Twitter Card activés par défaut via Next.js

---

## 🚀 Déploiement (Vercel)

1. Connectez le repository GitHub à Vercel
2. Configurez les variables d'environnement dans les paramètres Vercel
3. Le déploiement est automatique à chaque push sur `main`

```
Build Command  : npm run build
Output         : .next
Install        : npm install
```

## ⚠️ Notes

- **Section Témoignages** : commentée dans `/dev/page.tsx`, décommenter quand les données sont prêtes
- **Liens CRAFT / GRAPH** : CRAFT → Notion (Davecraft), GRAPH → Behance
- **Sitemap dynamique** : remplace `public/sitemap.xml` — les nouvelles pages sont indexées automatiquement sans intervention
- **Navbar / Footer** : liens Accueil, Blog, Store, Contact (Projets retiré de la navigation principale)
- **Images dans les articles** : toujours utiliser `![alt](url)` — les URLs sans extension ne sont pas détectées automatiquement. Domaines autorisés dans `next.config.js` : `i.ibb.co`, `raw.githubusercontent.com`, `images.unsplash.com`, `lokhatmedias.com`, `www.salonemploi.re`, `i.pinimg.com`
- **Blocs de code dans Supabase** : utiliser 4 espaces d'indentation plutôt que les backticks triples (évite les problèmes de copier-coller dans l'éditeur SQL)
- **Champ `publie`** : un article en `false` n'est jamais visible publiquement, utile pour les brouillons

## 📝 License

Ce projet n'a pas de licence spécifique.

## 🤝 Contact

**Brandon VIRY** — brandonviry@gmail.com
