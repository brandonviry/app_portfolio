# Portfolio de Brandon VIRY

![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)

Portfolio professionnel développé avec Next.js 15, TypeScript et Tailwind CSS. Architecture moderne basée sur l'Atomic Design, présentant 62 projets avec système de filtrage avancé.

## 🚀 Fonctionnalités

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
- **Gestion de Contenu** : Stores TypeScript locaux (62 projets, compétences, témoignages)
- **Formulaire de Contact** : Intégration API Route Next.js pour l'envoi d'emails
- **SEO Ready** : Structure optimisée pour le référencement
- **Responsive Design** : Adaptation mobile-first avec breakpoints Tailwind (sm, md, lg, xl)

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 15.1+ avec App Router et Turbopack
- **Runtime** : React 19+
- **Language** : TypeScript 5.0+
- **Styles** : Tailwind CSS 3.4+
- **Gestion de Contenu** : Stores TypeScript locaux
- **Emails** : API Route Next.js (migration depuis EmailJS)
- **Icônes** : Lucide React
- **Utilitaires** : clsx, tailwind-merge
- **Architecture** : Atomic Design Pattern

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
Créez un fichier `.env.local` à la racine du projet avec vos informations pour l'API d'envoi d'emails :
```env
# Configuration email (à adapter selon votre service)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASSWORD=votre_mot_de_passe
EMAIL_FROM=contact@votreportfolio.com
EMAIL_TO=votremail@example.com
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚙️ Configuration

### Contenu du Portfolio

Le contenu est géré via des stores TypeScript locaux dans le dossier `src/store/` :

- **`projects_data.ts`** : 62 projets avec catégories et technologies
  - Chaque projet contient : titre, description, catégories, technologies, liens, images
  - Les catégories et technologies sont extraites dynamiquement pour les filtres

- **`competences_data.ts`** : Compétences organisées par domaines

- **`benefits_data.ts`** : Avantages et services proposés

- **`faq_data.ts`** : Questions fréquentes

- **`testimonials_data.ts`** : Témoignages clients (⚠️ actuellement commentés dans le code en attendant des témoignages réels - à décommenter dans `src/app/page.tsx` quand prêt)

- **`logos_data.ts`** : Logos des technologies et clients

- **`technology-groups.ts`** (config) : Configuration des groupes de technologies pour le dropdown de filtrage

Modifiez ces fichiers pour personnaliser votre portfolio.

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

### API d'envoi d'emails

Le formulaire de contact utilise une API Route Next.js (`src/app/api/contact/route.ts`). Configurez votre service d'envoi d'emails préféré (Nodemailer, SendGrid, Resend, etc.) dans cette route.

## 📂 Structure du Projet

```
src/
├── app/                          # Next.js App Router
│   ├── api/contact/             # API Route pour le formulaire
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
├── store/                       # Stores de données
│   ├── projects_data.ts         # 62 projets
│   ├── competences_data.ts
│   ├── benefits_data.ts
│   ├── faq_data.ts
│   ├── testimonials_data.ts
│   └── logos_data.ts
└── lib/
    └── utils.ts                 # Utilitaires (cn function)
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

*Portfolio développé avec ❤️ et Next.js 15*

