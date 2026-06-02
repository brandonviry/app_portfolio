# CLAUDE.md — Briefing projet app_portfolio

Ce fichier est lu automatiquement par Claude Code à chaque session. Il contient le contexte essentiel pour travailler sur ce projet sans perdre de temps.

---

## Qui est l'utilisateur

**VIRY Brandon** — Développeur web & Graphiste freelance basé à La Réunion.
- Email : brandonviry@gmail.com
- GitHub : github.com/brandonviry
- Site en production : **https://devweb.viry-brandon.fr**

---

## Mot-clé SEO principal

> **"Développeur graphiste La Réunion"**

Ce mot-clé doit apparaître dans : titre de page, meta description, H1 (via `sr-only` si nécessaire), H2, footer, copyright. Ne jamais utiliser "Product maker" — terme explicitement rejeté par l'utilisateur.

---

## Architecture — Atomic Design (règle stricte)

```
src/components/ui/        → Atomes (bouton, card, typography, form…)
src/components/layout/    → Organismes (sections, header, footer, navbar)
src/app/                  → Pages (assemblage d'organismes)
```

**Règle de création** : toujours vérifier si l'atome/organisme existe avant d'en créer un. Remonter la chaîne : UI → Composant → Layout → Page.

---

## Stack technique

- **Next.js 15** App Router + Turbopack | **React 19** | **TypeScript** strict
- **Tailwind CSS** avec variables CSS custom (`var(--accent)`, `var(--cta)`…)
- **Supabase** (PostgreSQL) — `supabase` (anon) + `supabaseAdmin` (service_role) dans `src/lib/supabase.ts`
- **NextAuth v5** — admin unique via env vars, route `/admin/*` protégée par `middleware.ts`
- **Resend** — emails via `/api/contact`
- **Zod** + **react-hook-form** — validation formulaires
- **Framer Motion** — animations | **Lucide React** — icônes

---

## Pages du site

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil (Hero, À propos, Compétences, Articles, Technologies, FAQ, CTA) |
| `/blog` | Listing articles — `force-dynamic` |
| `/blog/[slug]` | Article individuel — JSON-LD `Article` |
| `/store` | Store d'apps — `force-dynamic` |
| `/store/[slug]` | Page détail app — JSON-LD `SoftwareApplication` |
| `/contact` | Formulaire de contact |
| `/admin` | Dashboard admin (protégé) |
| `/admin/articles` | CRUD articles |
| `/admin/apps` | CRUD store apps |
| `/admin/projects` | CRUD projets |

---

## Base de données Supabase

### Table `articles`
Champs clés : `slug`, `titre`, `auteur`, `date_publication`, `categorie`, `image_src`, `extrait`, `contenu`, `publie`

### Table `apps`
Champs clés : `slug`, `nom`, `tagline`, `description`, `categorie`, `type` (web/saas/executable), `icone_url`, `image_url`, `cta_primaire_label`, `cta_primaire_url`, `cta_secondaire_label`, `cta_secondaire_url`, `plateforme` (TEXT[]), `version`, `publie`

RLS activé sur les deux tables : `publie = true` pour la lecture publique, `service_role` pour l'admin.

---

## SEO — ce qui est en place

- **`src/app/sitemap.ts`** — sitemap dynamique (articles + apps depuis Supabase), remplace l'ancien `public/sitemap.xml`
- **`src/app/robots.ts`** — bloque `/admin/` et `/api/`, pointe vers le sitemap
- **JSON-LD `Person`** sur `/` — knowledge panel Google
- **JSON-LD `Article`** sur `/blog/[slug]` — rich snippets
- **JSON-LD `SoftwareApplication`** sur `/store/[slug]` — rich snippets
- **Tag de vérification Google** dans `src/app/layout.tsx` (`metadata.verification.google`)
- **Template titre** : `%s | VIRY Brandon` défini dans `layout.tsx`
- **`force-dynamic`** sur `/blog/page.tsx` et `/store/page.tsx` — données Supabase toujours fraîches

---

## Conventions de design

- **Aucun border-radius** — coins géométriques partout
- **Accent** : `#00a8e8` (bleu électrique) — titres, liens actifs
- **CTA** : `#ff3b3f` (rouge vif) — boutons d'action
- Grille de points, coins décoratifs, palette accent/cta cohérente sur toutes les pages
- Composant `<Typography level="...">` pour tous les textes (ne pas utiliser des `<h1>` HTML bruts)

---

## Conventions de code

- Commits en français, convention `feat/fix/docs/seo/refactor`
- Pas de commentaires inutiles dans le code
- `cn()` de `@/lib/utils` pour les classes Tailwind conditionnelles
- Pages Server Component par défaut — `'use client'` uniquement si interactivité nécessaire
- Toujours ajouter `export const dynamic = 'force-dynamic'` sur les pages qui lisent Supabase en temps réel

---

## À ne jamais faire

- Utiliser "Product maker" ou "portfolio" dans le contenu visible ou les métadonnées
- Créer un composant de niveau supérieur sans vérifier les niveaux inférieurs (Atomic Design)
- Committer sans vérifier les erreurs ESLint/TypeScript
- Introduire une nouvelle dépendance sans que l'utilisateur le demande explicitement
- Écrire du border-radius dans les styles

---

## Workflow habituel

1. Lire les fichiers concernés avant de modifier
2. Modifier / créer les fichiers
3. Vérifier TypeScript : `npx tsc --noEmit` (via PowerShell)
4. `git add` fichiers spécifiques (jamais `git add -A`)
5. `git commit` avec message en français
6. `git push origin main` — attendre confirmation de l'utilisateur si action sensible
