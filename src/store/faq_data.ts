/**
 * Store local pour les données FAQ (Foire Aux Questions)
 */

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "Votre stack technique est très large (du Web au Bas niveau). Quelle est votre véritable spécialité ?",
    answer: "Je suis avant tout un Développeur Web Full-Stack. Mon cœur de métier reste l'écosystème React/Next.js pour le front et Node.js/Python pour le back. Cependant, ma curiosité pour l'ingénierie logicielle m'a poussé à explorer des langages comme Rust ou Zig pour comprendre les enjeux de performance et de gestion mémoire. Cela me permet aujourd'hui d'avoir une vision plus 'architecturale' et optimisée, même sur des projets web classiques."
  },
  {
    id: 2,
    question: "Vous affichez une utilisation intensive d'outils IA (Claude, Gemini, Copilot). Est-ce que vous codez encore ?",
    answer: "Absolument. Je considère l'IA comme un partenaire de 'pair-programming', pas comme un remplaçant. J'utilise Claude pour challenger mes architectures et Gemini/Codex pour accélérer l'écriture de scripts répétitifs. Cela me libère du temps pour me concentrer sur la logique métier complexe, la qualité du code (Clean Code) et l'expérience utilisateur, là où ma valeur ajoutée est réelle."
  },
  {
    id: 3,
    question: "Vos expériences professionnelles sont assez courtes. Êtes-vous prêt pour des projets long terme ?",
    answer: "Mes stages courts chez Lokhat Medias et Simplon étaient des missions commandos : il fallait être opérationnel tout de suite (rédaction, diagnostic, création de pages). J'ai appris à m'intégrer et à délivrer vite. Aujourd'hui, je recherche justement un environnement stable pour m'investir sur la durée et voir évoluer un produit de A à Z."
  },
  {
    id: 4,
    question: "Pourquoi mentionner des langages 'Legacy' et 'Modernes' dans votre CV ?",
    answer: "L'informatique évolue vite. Je voulais illustrer ma capacité à faire le pont entre l'existant et le futur. Je comprends les bases solides du C++ ou Java, mais je me forme activement aux successeurs comme Rust ou Go qui apportent sécurité et performance. Cela signifie que je peux maintenir du code existant tout en proposant des refontes progressives vers des technologies plus pérennes."
  },
  {
    id: 5,
    question: "Concernant votre cursus universitaire (Licence Informatique), où en êtes-vous ?",
    answer:"J'ai validé un niveau Bac+2 en Informatique à l'Université de la Réunion, ce qui m'a donné des bases théoriques solides (algorithmique, logique). J'ai ensuite rejoint Simplon pour développer une autre facette indispensable : les soft skills. J'y ai appris à travailler en équipe, à communiquer efficacement et à gérer des projets collaboratifs. Aujourd'hui, j'allie donc la rigueur technique universitaire à la capacité d'adaptation humaine."
  }
];
