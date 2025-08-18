# Portfolio de Brandon VIRY



![Next.js](https://img.shields.io/badge/Next.js-13.5+-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)

Portfolio professionnel développé avec Next.js 13, TypeScript et Tailwind CSS. Présente mes projets, compétences et expériences de manière moderne et responsive.

## 🚀 Fonctionnalités

- **Design Modern** : Interface utilisateur élégante et responsive avec Tailwind CSS
- **Performance Optimisée** : Utilisation des dernières fonctionnalités de Next.js 13
- **Base de Données Notion** : Intégration avec l'API Notion pour gérer le contenu
- **Formulaire de Contact** : Système d'envoi d'emails avec EmailJS
- **SEO Optimisé** : Meta tags, sitemap.xml et robots.txt configurés
- **Progressive Web App (PWA)** : Installation possible sur les appareils mobiles

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 13.5+
- **Language** : TypeScript 5.0+
- **Styles** : Tailwind CSS 3.0+
- **Base de Données** : Notion API
- **Emails** : EmailJS
- **Animations** : Framer Motion
- **Validation** : Zod
- **Formulaires** : React Hook Form

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
Créez un fichier `.env.local` à la racine du projet avec :
```env
NOTION_API_KEY=votre_clé_api_notion
NOTION_DATABASE_ID_PROJET=votre_id_database_projets
NOTION_DATABASE_ID_CV=votre_id_database_cv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚙️ Configuration

### Notion API

1. Créez un compte [Notion](https://www.notion.so/)
2. Créez une nouvelle intégration dans [My Integrations](https://www.notion.so/my-integrations)
3. Copiez l'API Key dans votre `.env.local`
4. Partagez vos bases de données Notion avec votre intégration
5. Copiez les IDs des bases de données dans votre `.env.local`

### EmailJS

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template email
4. Copiez les IDs (Service, Template, Public Key) dans votre `.env.local`

## 🚀 Déploiement

Le projet est configuré pour être déployé sur Vercel. Les variables d'environnement doivent être configurées dans les paramètres du projet sur Vercel.

## 📝 License

Ce projet est sous licence aucune licence .

## 🤝 Contact

Brandon VIRY - brandonviry@gmail.com

