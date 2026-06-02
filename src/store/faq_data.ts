export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const faqData: FAQ[] = [
  // DEV
  {
    id: 1,
    question: "Votre stack technique est très large. Quelle est votre véritable spécialité ?",
    answer: "Je suis avant tout un développeur web Full-Stack. Mon cœur de métier reste l'écosystème React/Next.js pour le front et Node.js/Python pour le back. Ma curiosité pour l'ingénierie logicielle m'a poussé à explorer des langages comme Rust ou Go — pas pour les mettre sur un CV, mais pour comprendre les enjeux de performance et d'architecture. Cela me donne une vision plus globale, même sur des projets web classiques."
  },
  {
    id: 2,
    question: "Vous utilisez beaucoup d'outils IA. Est-ce que vous codez encore vraiment ?",
    answer: "Absolument. Je considère l'IA comme un partenaire de pair-programming, pas comme un remplaçant. Claude me sert à challenger mes architectures, Gemini ou Codex à accélérer les tâches répétitives. Ça me libère du temps pour me concentrer sur ce qui compte : la logique métier, la qualité du code et l'expérience utilisateur — là où ma valeur ajoutée est réelle."
  },
  {
    id: 3,
    question: "Pourquoi mentionner des langages 'Legacy → Moderne' dans votre profil ?",
    answer: "L'informatique évolue vite. Je voulais illustrer ma capacité à faire le pont entre l'existant et le futur. Je comprends les bases du C++ ou de Java, mais je me forme activement aux successeurs comme Rust ou Go qui apportent sécurité et performance. Concrètement : je peux maintenir du code existant tout en proposant des refontes progressives vers des technologies plus pérennes."
  },

  // CRAFT
  {
    id: 4,
    question: "Quelle différence entre ce que tu fais en no-code et du vrai développement ?",
    answer: "La différence, c'est le choix de l'outil adapté au besoin. Le no-code me permet de construire des solutions fonctionnelles rapidement — landing pages, workflows automatisés, bases de données — sans la lourdeur d'un stack complet. Quand le besoin est plus complexe, spécifique ou nécessite de la scalabilité, je code. Les deux approches sont complémentaires, pas opposées."
  },
  {
    id: 5,
    question: "Comment tu choisis entre coder une solution ou utiliser un outil no-code ?",
    answer: "J'évalue sur trois critères : le délai, la complexité et la maintenance à long terme. Un client qui a besoin d'un site en une semaine ou d'un workflow automatisé sans équipe tech ? Le no-code est la bonne réponse. Une app avec une logique métier sur-mesure ou des contraintes de performance ? Le code s'impose. L'objectif est toujours de délivrer de la valeur efficacement."
  },
  {
    id: 6,
    question: "Tu utilises Notion et Airtable pour quel type de projets ?",
    answer: "Notion pour la gestion de la connaissance, la documentation projet et les wikis clients. Airtable pour les bases de données structurées — suivi de contenu, gestion d'inventaires, CRM simple. Combinés à Zapier ou Make, ils deviennent de véritables hubs d'automatisation qui font gagner des heures chaque semaine."
  },

  // GRAPH
  {
    id: 7,
    question: "Tu es dev et graphiste, comment tu gères les deux ?",
    answer: "Les deux se nourrissent mutuellement. Mon background dev me rend plus techniquement conscient en design — je crée des interfaces réellement construisibles. Et ma sensibilité graphique me rend meilleur développeur — je pense à l'UX et à la cohérence visuelle dès le départ. En pratique, j'ajuste selon le projet : parfois je pilote par le design, parfois par le code."
  },
  {
    id: 8,
    question: "Quel est ton processus pour créer une identité visuelle ?",
    answer: "Je commence toujours par comprendre les valeurs de la marque, sa cible et son contexte. Ensuite : moodboard, palette de couleurs, recherche typographique. Puis des concepts de logo — toujours sur papier d'abord. Enfin, le travail de refinement sur Figma ou Illustrator. Je livre un kit de marque complet : variations du logo, système de couleurs et règles d'usage."
  },
  {
    id: 9,
    question: "Quels types de projets graphiques tu cibles ?",
    answer: "Les créateurs, les petites entreprises et les entrepreneurs locaux qui ont besoin d'une identité visuelle cohérente — souvent en partant de zéro. Je fais aussi du contenu digital : visuels réseaux sociaux, présentations, miniatures YouTube — pour ceux qui veulent un résultat professionnel sans budget agence."
  },
];
