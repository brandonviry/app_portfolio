# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

Portfolio professionnel de VIRY Brandon — Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker. Développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture basée sur l'Atomic Design.

## 🚀 Pages & Fonctionnalités

### Pages publiques

| Route | Description |
|-------|-------------|
| `/` | Page principale (accueil) |
| `/accueil` | Redirect → `/` |
| `/blog` | Listing de tous les articles avec filtre par catégorie |
| `/blog/[slug]` | Article individuel avec rendu Markdown complet |
| `/projets` | Galerie des projets avec filtres (catégorie, technologie, tri) |
| `/contact` | Page de contact dédiée |
| `/dev` | Ancienne page d'accueil portfolio conservée (brouillon) |

### Page / (page principale)

Ordre des sections :

1. **Hero** : Nom VIRY Brandon + 4 rôles — décoration graphique : grille de points, watermark, coins géométriques, étiquettes latérales, année dynamique
2. **À propos** (`DescriptionSection`) : photo + 2 paragraphes bio + boutons "Me contacter" / "Voir mes projets" (scroll vers section suivante)
3. **Voir mes projets** : 3 pôles DEV / CRAFT / GRAPH — DEV → `/projets`, CRAFT → Notion, GRAPH → Behance
4. **Derniers articles** : 6 derniers articles publiés depuis Supabase + CTA → `/blog`
5. **Technologies + Languages** : stack technique et langages maîtrisés
6. **FAQ** : questions fréquentes
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
- **Base de Données** : Supabase PostgreSQL (UUIDs, timestamps, RLS)
- **Dashboard** : Statistiques en temps réel (total projets, catégories, technologies)
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
│   ├── admin/                        # Interface admin (protégée)
│   │   ├── login/
│   │   ├── projects/                 # CRUD projets
│   │   └── articles/                 # ✨ CRUD articles
│   ├── api/
│   │   ├── contact/route.ts          # Envoi emails (Resend)
│   │   ├── projects/route.ts         # API publique projets
│   │   ├── admin/projects/           # API CRUD admin projets (Supabase)
│   │   ├── admin/articles/           # ✨ API CRUD admin articles (Supabase)
│   │   └── auth/[...nextauth]/       # NextAuth routes
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
│   │   ├── icon/, badge/, avatar/
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
│           ├── hero/                 # Hero page /dev
│           ├── benefits/
│           ├── cta/
│           ├── description/
│           ├── faq/
│           ├── languages/
│           ├── projets/
│           ├── social-proof/
│           ├── technologies/
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
│   ├── articles_data.ts              # ✨ Données articles de fallback
│   ├── benefits_data.ts
│   ├── competences_data.ts
│   ├── description_data.ts
│   ├── faq_data.ts
│   ├── logos_data.ts
│   └── testimonials_data.ts
│
└── types/
    ├── article.ts                    # ✨ Type Article
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

### Table `projects` (existante)

Gérée via l'interface admin `/admin/projects`. Voir la documentation Supabase existante.

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
- **Navbar / Footer** : liens Accueil, Blog, Contact (Projets retiré de la navigation principale)
- **Images dans les articles** : toujours utiliser `![alt](url)` — les URLs sans extension ne sont pas détectées automatiquement. Domaines autorisés dans `next.config.js` : `i.ibb.co`, `raw.githubusercontent.com`, `images.unsplash.com`, `lokhatmedias.com`, `www.salonemploi.re`, `i.pinimg.com`
- **Blocs de code dans Supabase** : utiliser 4 espaces d'indentation plutôt que les backticks triples (évite les problèmes de copier-coller dans l'éditeur SQL)
- **Champ `publie`** : un article en `false` n'est jamais visible publiquement, utile pour les brouillons

## 📝 License

Ce projet n'a pas de licence spécifique.

## 🤝 Contact

**Brandon VIRY** — brandonviry@gmail.com
