# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)

Portfolio professionnel de VIRY Brandon — Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker. Développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture basée sur l'Atomic Design.

## 🚀 Pages & Fonctionnalités

### Pages publiques

| Route | Description |
|-------|-------------|
| `/accueil` | Page principale : Hero (nom + rôles), Compétences, Derniers articles, À propos, Contact |
| `/projets` | Galerie des projets avec filtres (catégorie, technologie, tri) |
| `/contact` | Page de contact dédiée |
| `/dev` | Ancienne page d'accueil portfolio conservée (sections : Hero, Technologies, Langages, Description, Benefits, FAQ, CTA) |

### Page /accueil (nouvelle page principale)

- **Hero** : Nom VIRY Brandon + 4 rôles listés (Programmeur, Développeur web, Graphiste & Designer Visuel, Full-Stack Product maker)
- **Compétences** : 3 blocs DEV / CRAFT / GRAPH avec liens — DEV pointe vers `/projets` ; CRAFT et GRAPH vers les articles de blog à venir
- **Derniers Articles** : Grille des 5 derniers articles (données statiques, extensibles via API blog)
- **À propos** : Biographie complète + liens réseaux sociaux (Instagram, LinkedIn, Reddit)
- **Contact** : Formulaire complet (Nom, Prénom, Mail, Sujet, Message, consentement RGPD) avec validation Zod

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
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : NextAuth.js 5.0+ beta (Credentials, JWT)
- **Sécurité** : bcryptjs (hash)
- **API Routes** : Next.js App Router
- **Emails** : Resend (API route `/api/contact`)

### Formulaires & Validation
- **react-hook-form** + **@hookform/resolvers** + **Zod**

### Données
- **Projets** : Supabase PostgreSQL
- **Articles** : Données statiques (extensibles)
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

5. Ouvrez [http://localhost:3000/accueil](http://localhost:3000/accueil)

**Interface admin** : [http://localhost:3000/admin](http://localhost:3000/admin)

## 📂 Structure du Projet

```
src/
├── app/                              # Next.js App Router
│   ├── accueil/                      # ✨ Page principale (Hero, Compétences, Articles, À propos, Contact)
│   ├── dev/                          # Page ancienne homepage portfolio (conservée)
│   ├── projets/                      # Galerie projets avec filtres
│   ├── contact/                      # Page de contact
│   ├── admin/                        # Interface admin (protégée)
│   │   ├── login/
│   │   └── projects/                 # CRUD projets
│   ├── api/
│   │   ├── contact/route.ts          # Envoi emails (Resend)
│   │   ├── projects/route.ts         # API publique projets
│   │   ├── admin/projects/           # API CRUD admin (Supabase)
│   │   └── auth/[...nextauth]/       # NextAuth routes
│   ├── layout.tsx                    # Layout global (Navbar + Footer)
│   └── page.tsx                      # Route / (racine)
│
├── components/
│   ├── ui/                           # ⚛️ Atomes — composants indivisibles
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
│           ├── hero-accueil/         # ✨ Hero page /accueil
│           ├── competences/          # ✨ Blocs DEV / CRAFT / GRAPH
│           ├── articles/             # ✨ Grille derniers articles
│           ├── apropos/              # ✨ Biographie + réseaux sociaux
│           ├── contact-accueil/      # ✨ Section contact page /accueil
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
│   ├── supabase.ts                   # Clients Supabase (anon + admin) + types
│   ├── auth.ts                       # Configuration NextAuth
│   ├── apollo/client.ts              # Client Apollo GraphQL
│   └── utils.ts                      # Utilitaires (cn)
│
├── middleware.ts                     # Protection routes /admin/*
│
├── store/                            # Données statiques TypeScript
│   ├── benefits_data.ts
│   ├── competences_data.ts
│   ├── description_data.ts
│   ├── faq_data.ts
│   ├── logos_data.ts
│   └── testimonials_data.ts
│
└── types/
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

## 🎛️ Interface Admin

| Route | Accès |
|-------|-------|
| `/admin` | Dashboard statistiques |
| `/admin/login` | Connexion |
| `/admin/projects` | Liste projets |
| `/admin/projects/new` | Créer un projet |
| `/admin/projects/[id]` | Modifier un projet |

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
- **Articles blog** : données statiques dans `articles-section.tsx` — à connecter à une API blog (les slugs `/blog/...` sont déjà en place)
- **Liens CRAFT / GRAPH** dans la section Compétences : pointent vers `/blog/...` non encore créés

## 📝 License

Ce projet n'a pas de licence spécifique.

## 🤝 Contact

**Brandon VIRY** — brandonviry@gmail.com
