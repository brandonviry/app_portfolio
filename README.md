l# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)

Portfolio professionnel développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture moderne basée sur l'Atomic Design, présentant 62 projets avec système de filtrage avancé.

## 🚀 Fonctionnalités

### Portfolio Public
- **Design System Fintech** : Interface utilisateur élégante avec branding cohérent (pas de border-radius, corners accent, effets scan line)
- **Architecture Atomique** : Organisation du code selon les principes d'Atomic Design (Atoms → Molecules → Organisms → Pages)
- **Filtrage Avancé** :
  - Filtres par catégorie (dynamiques, basés sur les projets)
  - Filtres par technologie (dropdown multi-sélection avec groupes)
  - Tri personnalisable (par défaut, titre A-Z/Z-A, par catégorie)
  - Logique AND/OR intelligente entre filtres
  - Tooltips explicatifs pour la compréhension des filtres
- **Performance Optimisée** :
  - Next.js 15 avec App Router et React Server Components
  - Turbopack pour le développement ultra-rapide
  - Hydratation optimisée (prévention des erreurs SSR/Client)
- **Formulaire de Contact** : Intégration API Route Next.js pour l'envoi d'emails
- **SEO Ready** : Structure optimisée pour le référencement
- **Responsive Design** : Adaptation mobile-first avec breakpoints Tailwind (sm, md, lg, xl)

### 🎛️ Interface Admin (v2.0 - Supabase)
- **Authentification Sécurisée** : NextAuth.js avec hash bcrypt (OWASP 2024)
- **CRUD Projets Complet** : Créer, lire, modifier, supprimer les projets via interface web
- **Base de Données Supabase** : PostgreSQL avec UUIDs, timestamps automatiques, RLS
- **Dashboard Statistiques** : Vue d'ensemble en temps réel (total projets, catégories, technologies)
- **Recherche & Filtrage** : Recherche texte et filtre par catégorie
- **Production Ready** : Fonctionne en production Vercel (filesystem read-only compatible)
- **Design Cohérent** : Interface admin qui respecte le design system fintech
- **Documentation Complète** : Guide de migration Supabase inclus

## 🛠️ Technologies Utilisées

### Frontend & Architecture
- **Framework** : Next.js 15.1+ avec App Router et Turbopack
- **Runtime** : React 19+
- **Language** : TypeScript 5.0+
- **Styles** : Tailwind CSS 3.4+
- **Icônes** : Lucide React
- **Utilitaires** : clsx, tailwind-merge
- **Architecture** : Atomic Design Pattern

### Backend & Authentification
- **Authentification** : NextAuth.js 5.0+ (beta)
- **Sécurité** : bcryptjs (hash 12 rounds)
- **Session** : JWT avec cookies httpOnly
- **API Routes** : Next.js App Router
- **Base de données** : Supabase (PostgreSQL)

### Gestion de Contenu
- **Projets** : Base de données Supabase PostgreSQL (60+ projets)
- **Autres stores** : TypeScript locaux (compétences, témoignages, FAQ)
- **Admin** : Interface web complète avec CRUD Supabase
- **Architecture** : Client Supabase avec types TypeScript
- **Emails** : API Route Next.js via Resend

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

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` à la racine du projet :

**Pour Supabase (requis) :**
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx
```

**Pour l'envoi d'emails (Resend) :**
```env
RESEND_API_KEY=re_votre_cle_api_resend
```

**Pour l'interface admin (génération via script) :**
```bash
# Générez vos credentials avec le script fourni
node generate-hash.js "VotreMotDePasseSecurise123!"
```

Puis ajoutez dans `.env.local` :
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<généré-par-le-script>

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<généré-par-le-script>
```

📖 Voir [doc/phase-4-migration-supabase.md](./doc/phase-4-migration-supabase.md) pour le guide complet de configuration Supabase.

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

6. **Accès à l'interface admin** :
   - URL : [http://localhost:3000/admin](http://localhost:3000/admin)
   - Connectez-vous avec les credentials configurés
   - Gérez vos projets directement depuis l'interface web

## ⚙️ Configuration

### Contenu du Portfolio

#### Projets (Base de données Supabase)
- **60+ projets** stockés dans PostgreSQL via Supabase
- Chaque projet contient : titre, description, catégories, technologies, liens, images
- Les catégories et technologies sont extraites dynamiquement pour les filtres
- **Gestion via interface admin** :
  - Accédez à `/admin` après authentification
  - CRUD complet : Créer, lire, modifier, supprimer
  - Fonctionne en production Vercel
  - Stockage persistant et scalable

#### Autres contenus (Stores TypeScript locaux)
Le contenu statique est géré via des fichiers dans `src/store/` :

- **`competences_data.ts`** : Compétences organisées par domaines
- **`benefits_data.ts`** : Avantages et services proposés
- **`faq_data.ts`** : Questions fréquentes
- **`testimonials_data.ts`** : Témoignages clients (⚠️ actuellement commentés - à décommenter quand prêt)
- **`logos_data.ts`** : Logos des technologies et clients
- **`technology-groups.ts`** (config) : Configuration des groupes de technologies pour le dropdown

**Modification du contenu statique :**
- Éditez directement les fichiers `.ts` dans `src/store/`
- Utile pour modifications en masse ou scripts

### Configuration des groupes de technologies

Le fichier `src/config/technology-groups.ts` définit comment les technologies sont groupées dans le dropdown de filtrage :

```typescript
export const TECHNOLOGY_GROUPS = {
  'Frontend': ['React', 'Next.js', 'Vue.js', ...],
  'Backend': ['Node.js', 'PHP', 'Python', ...],
  'Mobile': ['React Native', 'Flutter', ...],
  // ... autres groupes
} as const;
```

Ajoutez vos technologies dans les groupes appropriés ou créez de nouveaux groupes selon vos besoins.

### Interface Admin (v2.0 - Supabase)

**Accès :**
- Dashboard : `/admin`
- Login : `/admin/login`
- Gestion projets : `/admin/projects`

**Fonctionnalités :**
- ✅ CRUD complet des projets (Supabase PostgreSQL)
- ✅ Recherche et filtrage en temps réel
- ✅ Statistiques dynamiques
- ✅ Support UUIDs pour identification unique
- ✅ Fonctionne en production Vercel (pas de limitation filesystem)
- ✅ Authentification sécurisée (NextAuth.js + bcrypt)

**Architecture :**
- Routes API : `/api/admin/projects` (GET/POST) et `/api/admin/projects/[id]` (GET/PUT/DELETE)
- Client Supabase : `src/lib/supabase.ts`
- Types TypeScript pour sécurité des données

### API d'envoi d'emails

Le formulaire de contact utilise l'API Resend via la route Next.js (`src/app/api/contact/route.ts`).

## 📂 Structure du Projet

```
src/
├── app/                          # Next.js App Router
│   ├── admin/                   # 🎛️ Interface Admin (v2.0 Supabase)
│   │   ├── layout.tsx           # Layout admin avec header/déconnexion
│   │   ├── page.tsx             # Dashboard statistiques
│   │   ├── login/page.tsx       # Page de connexion
│   │   └── projects/            # Gestion des projets (Supabase)
│   │       ├── page.tsx         # Liste + recherche/filtre (UUIDs)
│   │       ├── new/page.tsx     # Formulaire création
│   │       └── [id]/page.tsx    # Formulaire édition (UUID)
│   ├── api/
│   │   ├── projects/            # 📡 API Publique
│   │   │   └── route.ts         # GET (portfolio public)
│   │   ├── admin/projects/      # 🔐 API CRUD Admin
│   │   │   ├── route.ts         # GET/POST (Supabase)
│   │   │   └── [id]/route.ts    # GET/PUT/DELETE (UUID)
│   │   ├── auth/                # 🔐 NextAuth Routes
│   │   │   └── [...nextauth]/route.ts
│   │   └── contact/route.ts     # API emails
│   ├── projets/page.tsx         # Page projets (charge via API)
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Page d'accueil
├── components/
│   ├── ui/                      # Atoms (composants atomiques)
│   │   ├── button/
│   │   ├── card/
│   │   ├── chip/                # FilterChip
│   │   ├── dropdown/            # TechnologyDropdown, SortDropdown
│   │   ├── filter/              # CategoryFilter, ProjectFilters
│   │   ├── form/                # ContactForm
│   │   ├── logo/
│   │   ├── rating/
│   │   └── tooltip/             # InfoTooltip
│   └── layout/                  # Organisms et structure
│       ├── header/              # Navbar
│       ├── footer/              # Footer
│       └── sections/            # Sections de page
│           ├── benefits/
│           ├── competences/
│           ├── cta/
│           ├── faq/
│           ├── hero/
│           ├── projets/         # ProjectsSection avec filtres
│           ├── social-proof/
│           └── testimonials/
├── config/
│   └── technology-groups.ts     # Configuration groupes tech
├── lib/
│   ├── auth.ts                  # 🔐 Configuration NextAuth
│   └── utils.ts                 # Utilitaires (cn function)
├── middleware.ts                # 🔐 Protection routes /admin/*
├── store/                       # Stores de données
│   ├── projects_data.ts         # 62 projets
│   ├── competences_data.ts
│   ├── benefits_data.ts
│   ├── faq_data.ts
│   ├── testimonials_data.ts
│   └── logos_data.ts
├── generate-hash.js             # 🔧 Script génération credentials
└── doc/                         # 📚 Documentation (8 fichiers)
```

## 🎨 Design System

Le portfolio utilise un design system fintech cohérent :

- **Pas de border-radius** : Design géométrique et moderne
- **Corners accent** : Petits accents dans les coins (top-left) pour les éléments interactifs
- **Scan line effects** : Animations de balayage au survol
- **Palette de couleurs** : Définie dans `tailwind.config.ts`
  - `accent` : Couleur principale d'accentuation
  - `cta` : Call-to-action
  - `surface-1`, `surface-2` : Niveaux de surface
  - `text-primary`, `text-secondary` : Hiérarchie typographique

## 🚀 Déploiement

Le projet est optimisé pour Vercel avec Next.js 15 :

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans les paramètres Vercel
3. Le déploiement est automatique à chaque push sur `main`

**Build Command** : `npm run build`
**Output Directory** : `.next`
**Install Command** : `npm install`

## ⚠️ Notes Importantes

### Section Témoignages
La section testimonials est actuellement **commentée** dans `src/app/page.tsx` car elle contient des données de démonstration. Pour l'activer :

1. Ajoutez de vrais témoignages dans `src/store/testimonials_data.ts`
2. Décommentez l'import et le composant dans `src/app/page.tsx` :
```typescript
// Décommenter ces lignes :
// import { TestimonialsSection } from "@/components/layout/sections/testimonials/testimonials-section";
// import { testimonials } from "@/store/testimonials_data";

// Et dans le JSX :
// <TestimonialsSection testimonials={testimonials} />
```

### Hydratation React
Le projet utilise des patterns d'hydratation sécurisés pour éviter les erreurs SSR/Client :
- `isMounted` state dans les composants client avec rendu conditionnel
- `suppressHydrationWarning` sur le `<body>` pour les classes de fonts Next.js
- Rendu côté client uniquement pour les dropdowns et tooltips

## 📝 License

Ce projet n'a pas de licence spécifique.

## 🤝 Contact

**Brandon VIRY**
Email : brandonviry@gmail.com

---

*Portfolio développé en  Next.js 15*

