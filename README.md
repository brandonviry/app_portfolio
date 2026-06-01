# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

Portfolio professionnel de VIRY Brandon — Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker. Développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture Atomic Design.

---

## 🗺️ Pages & Routes

| Route | Description |
|-------|-------------|
| `/accueil` | Page principale : Hero, Compétences, Derniers articles, À propos, Contact |
| `/blog` | Listing de tous les articles avec filtre par catégorie |
| `/blog/[slug]` | Article individuel avec rendu Markdown complet |
| `/projets` | Galerie des projets avec filtres avancés |
| `/contact` | Page de contact |
| `/dev` | Ancienne page d'accueil portfolio (conservée) |
| `/admin` | Interface admin protégée (NextAuth) |

---

## 🚀 Fonctionnalités

### Page `/accueil`
- **Hero graphique** : Nom VIRY Brandon + 4 rôles, décoration géométrique (grille de points, watermark, coins accent/cta, étiquettes latérales, année dynamique)
- **Compétences** : 3 blocs DEV / CRAFT / GRAPH
- **Derniers articles** : 6 derniers articles publiés depuis Supabase
- **À propos** : Biographie complète + réseaux sociaux
- **Contact** : Formulaire complet (Nom, Prénom, Mail, Sujet, Message, consentement RGPD)

### Blog `/blog` & `/blog/[slug]`
- Listing avec filtre par catégorie (client-side, instantané)
- Pages articles avec rendu **Markdown complet** et **embeds médias automatiques**
- Données 100 % depuis Supabase (table `articles`)
- Génération statique (`generateStaticParams`) pour les articles publiés

### Portfolio `/projets`
- Filtres par catégorie, technologie (dropdown multi-sélection groupé), tri
- Projets chargés depuis Supabase PostgreSQL

### Interface Admin `/admin`
- Authentification NextAuth.js + bcrypt
- CRUD complet projets et articles via Supabase
- Dashboard statistiques en temps réel

---

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

---

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

---

## 🛠️ Stack Technique

### Frontend & Architecture
- **Framework** : Next.js 15.1+ avec App Router et Turbopack
- **Runtime** : React 19+
- **Language** : TypeScript 5.0+ (strict, alias `@/*`)
- **Styles** : Tailwind CSS 3.4+ avec variables CSS custom
- **Icônes** : Lucide React
- **Animations** : Framer Motion 12
- **Utilitaires CSS** : clsx, tailwind-merge, class-variance-authority (CVA)
- **Architecture** : Atomic Design (Atomes → Molécules → Organismes → Pages)

### Backend & Données
- **Base de données** : Supabase (PostgreSQL) — projets + articles
- **Authentification** : NextAuth.js 5.0+ beta (Credentials, JWT, bcryptjs)
- **API Routes** : Next.js App Router
- **Emails** : Resend (`/api/contact`)

### Blog & Contenu
- **Markdown** : react-markdown + remark-gfm (GFM : tableaux, barré, autolinks)
- **Embeds** : YouTube (youtube-nocookie), TikTok (iframe v2)
- **Images** : détection automatique ou syntaxe `![alt](url)`

### Formulaires & Validation
- **react-hook-form** + **@hookform/resolvers** + **Zod**

---

## 📂 Structure du Projet

```
src/
├── app/
│   ├── accueil/                      # Page principale
│   ├── blog/
│   │   ├── page.tsx                  # Listing articles (/blog)
│   │   └── [slug]/page.tsx           # Article individuel (/blog/[slug])
│   ├── projets/
│   ├── contact/
│   ├── dev/                          # Ancienne homepage (conservée)
│   ├── admin/                        # Interface admin protégée
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── projects/route.ts
│   │   ├── admin/projects/
│   │   └── auth/[...nextauth]/
│   └── layout.tsx
│
├── components/
│   ├── ui/                           # ⚛️ Atomes
│   │   ├── article/
│   │   │   └── article-content.tsx   # Parseur Markdown + médias
│   │   ├── media/
│   │   │   ├── article-image.tsx     # Rendu image branding
│   │   │   ├── youtube-embed.tsx     # Embed YouTube 16:9
│   │   │   └── tiktok-embed.tsx      # Embed TikTok 9:16
│   │   ├── button/, typography/, card/, form/, ...
│   │
│   └── layout/                       # 🏗️ Organismes
│       ├── header/navbar.tsx
│       ├── footer/footer.tsx
│       └── sections/
│           ├── hero-accueil/         # Hero graphique décoré
│           ├── competences/          # Blocs DEV / CRAFT / GRAPH
│           ├── articles/             # Derniers articles (Supabase)
│           ├── apropos/              # Bio + réseaux sociaux
│           ├── contact-accueil/      # Formulaire complet
│           ├── blog/                 # Listing blog avec filtres
│           └── hero/, benefits/, faq/, ...
│
├── lib/
│   ├── supabase.ts                   # Clients + types + CRUD projets & articles
│   ├── auth.ts
│   └── utils.ts
│
├── store/
│   └── articles_data.ts              # Données statiques de fallback
│
└── types/
    ├── article.ts                    # Type Article
    └── project.ts
```

---

## 📦 Installation

```bash
git clone https://github.com/BrandonViry/app_portfolio.git
cd app_portfolio
npm install
```

Créer `.env.local` :

```env
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx

# Emails
RESEND_API_KEY=re_xxx

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<généré>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<généré via node generate-hash.js "MotDePasse">
```

```bash
npm run dev
```

---

## 🎨 Design System

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--accent` | `#00a8e8` | Bleu électrique — titres, liens actifs, décorations |
| `--cta` | `#ff3b3f` | Rouge vif — boutons d'action, coins bas |
| `--background` | `#ffffff` / `#0d0d0d` | Fond clair / sombre |
| `--surface-1/2/3` | Niveaux de gris | Cartes, conteneurs, code |
| `--text-primary/secondary/muted` | Hiérarchie texte | — |

Conventions : **aucun border-radius**, coins géométriques, grille de points, palette accent/cta cohérente sur toutes les pages.

---

## ⚠️ Notes importantes

- **Images dans les articles** : toujours utiliser `![alt](url)` — les URLs sans extension ne sont pas détectées automatiquement
- **Blocs de code dans Supabase** : utiliser 4 espaces d'indentation plutôt que les backticks triples (évite les problèmes de copier-coller dans l'éditeur SQL)
- **Champ `publie`** : un article en `false` n'est jamais visible publiquement, utile pour les brouillons
- **Section Témoignages** : commentée dans `dev/page.tsx`, à décommenter quand les données sont prêtes
- **Liens CRAFT / GRAPH** dans la section Compétences : pointent vers `/blog/...` non encore créés

---

## 🚀 Déploiement (Vercel)

```
Build Command  : npm run build
Output         : .next
Install        : npm install
```

Variables d'environnement à configurer dans les paramètres Vercel (identiques à `.env.local`).

---

## 📝 License

Aucune licence spécifique.

## 🤝 Contact

**Brandon VIRY** — brandonviry@gmail.com
