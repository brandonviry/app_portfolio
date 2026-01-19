/**
 * Store local pour les données de projets
 */

export type Project = {
  titre: string;
  Description: string;
  Cover?: string | undefined;
  Lien?: string | undefined;
};

export const projectsData: Project[] = [
  {
    titre: 'Advanced Post Views Manager',
    Description: 'Version: 0.6.0 Auteur: Viry Brandon Statut: Phase 4 - 85% Complet',
    Cover: 'https://i.ibb.co/5W2297B6/cover-Advanced-Post-Views-Manager.png',
    Lien: 'https://github.com/brandonviry/advanced-post-views-manager'
  },
  {
    titre: 'Ar',
    Description: 'Application web de réalité augmentée utilisant AR.js et A-Frame. Permet d\'afficher des objets 3D interactifs dans le monde réel via la caméra du navigateur, sans installation d\'application.',
    Cover: 'https://i.ibb.co/63Db3Ns/cover-arjs-web.png',
    Lien: 'https://github.com/brandonviry/Ar'
  },
  {
    titre: 'Bat',
    Description: 'Un système de surveillance de batterie professionnel et modulaire pour ordinateurs portables, développé en Python avec une architecture moderne et extensible.',
    Cover: 'https://i.ibb.co/27GX7T5N/cover-battery-monitoring.png',
    Lien: 'https://github.com/brandonviry/Bat'
  },
  {
    titre: 'botTurtle',
    Description: 'Projet développé avec passion',
    Cover: 'https://placehold.co/1080x720/png',
    Lien: 'https://github.com/brandonviry/botTurtle'
  },
  {
    titre: 'Breakdance Timer Plugin',
    Description: 'Un plugin WordPress personnalisé qui ajoute un élément de minuteur (countdown timer) pour Breakdance Builder.',
    Cover: 'https://i.ibb.co/3G7XnMg/cover-timer-wp-breakdance.png',
    Lien: 'https://github.com/brandonviry/breakdance-timer'
  },
  {
    titre: 'Calculatrice Basique',
    Description: 'une calculatrice simple qui permet des opérations arithmétiques de base.',
    Cover: 'https://i.ibb.co/h7WRYg0/calc-basique.png',
    Lien: 'https://github.com/brandonviry/Calculatrice-Basique'
  },
  {
    titre: 'Candidature',
    Description: 'Portfolio Candidature - Brandon Viry',
    Cover: 'https://i.ibb.co/9k9456FV/cover-candidature.png',
    Lien: 'https://github.com/brandonviry/candidature'
  },
  {
    titre: 'carteFAC',
    Description: 'Projet développé avec passion',
    Cover: 'https://placehold.co/1080x720/png',
    Lien: 'https://github.com/brandonviry/carteFAC'
  },
  {
    titre: 'choix-du-pays',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/ZT4gWCv/payflag.png',
    Lien: 'https://github.com/brandonviry/choix-du-pays'
  },
  {
    titre: 'Click Frenzy',
    Description: 'Un jeu de réflexes addictif où vous devez cliquer sur des cibles le plus rapidement possible pour maximiser votre score en 30 secondes !',
    Cover: 'https://i.ibb.co/HLC55RL4/Sans-titret.png',
    Lien: 'https://github.com/brandonviry/Click-Frenzy/blob/main/README.md'
  },
  {
    titre: 'Contrôle de LEDs avec un microcontrôleur AVR',
    Description: 'Projet développé avec passion',
    Cover: 'https://camo.githubusercontent.com/44d3b60c654d3eec390680655b617c5e357b8ed1ed5e53a5998b06cd80537b58/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f33642f63342f38352f33646334383537643663343263323835353432656434656536323463303733332e706e67',
    Lien: 'https://github.com/brandonviry/projetleddm'
  },
  {
    titre: 'convertisseur_unites',
    Description: 'Cette application en ligne de commande permet de convertir des valeurs entre différentes unités de longueur, de masse et de température.',
    Cover: 'https://i.ibb.co/x8gFdXMC/cover-convertisseur-unites.png',
    Lien: 'https://github.com/brandonviry/convertisseur_unites'
  },
  {
    titre: 'correction-session-2-info-2',
    Description: 'Projet développé avec passion',
    Cover: 'https://placehold.co/1080x720/png?text=correction+session+2+info+2',
    Lien: 'https://github.com/brandonviry/correction-session-2-info-2'
  },
  {
    titre: 'correction-session-2-info-2-avancer',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/Lg21SQH/lerougailsaucisses.png',
    Lien: 'https://github.com/brandonviry/correction-session-2-info-2-avancer'
  },
  {
    titre: 'Cour_py_3',
    Description: 'Ceci est un test de BULMA CSS. Comme il n\'y a pas de JavaScript, j\'ai ajouté jQuery pour le test. Et c\'est aussi un cour de base programmation en python 3.',
    Cover: 'https://i.ibb.co/JnQ3pYF/cour-py.png',
    Lien: 'https://github.com/brandonviry/Cour_py_3'
  },
  {
    titre: 'ctOS Mini-Game',
    Description: 'Jeu de 10 énigmes de difficulté croissante avec système de score, chronomètre speedrun et easter eggs cachés. Interface inspirée du système ctOS de Watch Dogs 1.',
    Cover: 'https://placehold.co/1080x720/png?text=ctOS+Mini-Game',
    Lien: 'https://github.com/brandonviry/base-de-bonner'
  },
  {
    titre: 'Danmachi-1',
    Description: 'C\’était un site web sur un animé que j’adore. Je l’avais fait il y a très longtemps, comme exercice de TD en première année d’université.',
    Cover: 'https://i.ibb.co/dwWjtvq3/cover-danmachi-1.png',
    Lien: 'https://github.com/brandonviry/Danmachi-1'
  },
  {
    titre: 'Danmachi-3',
    Description: 'Autre approche d\'amélioration de DanMachi 1',
    Cover: 'https://placehold.co/1080x720/png?text=Danmachi+3',
    Lien: 'https://github.com/brandonviry/Danmachi-3'
  },
  {
    titre: 'Danmachi-4',
    Description: 'C’était un site web sur un animé que j’adore, DanMachi saison 1, réalisé avec un framework et une bibliothèque UI.',
    Cover: 'https://i.ibb.co/XSK9x8h/danmachi4.png',
    Lien: 'https://github.com/brandonviry/Danmachi-4'
  },
  {
    titre: 'Danmachi_2',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/8BpBgZ2/danmachi2.png',
    Lien: 'https://github.com/brandonviry/Danmachi_2'
  },
  {
    titre: 'dee',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/2Pv641Y/dee.png',
    Lien: 'https://github.com/brandonviry/dee'
  },
  {
    titre: 'dee2',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/VvWJ6Lp/dee2.png',
    Lien: 'https://github.com/brandonviry/dee2'
  },
  {
    titre: 'delice-mobile',
    Description: 'Application web complète pour food truck  à la Réunion, construite avec Next.js 16, TypeScript et Tailwind CSS.',
    Cover: 'https://i.ibb.co/RpVFWTrT/Screenshot-2025-10-25-at-18-31-12-D-lice-Mobile-Food-Truck-R-union-Cuisine-Cr-ole-Fusion.png',
    Lien: 'https://github.com/brandonviry/delice-mobile'
  },
  {
    titre: 'exoPythonCourTd',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/qLcpT0mp/cover-exopy3.png',
    Lien: 'https://github.com/brandonviry/exoPythonCourTd'
  },
  {
    titre: 'ExoTD3-langC',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/mF6Fs3P8/cover-exoctd3.png',
    Lien: 'https://github.com/brandonviry/ExoTD3-langC'
  },
  {
    titre: 'ggplot2',
    Description: 'Projet développé avec passion',
    Cover: 'https://placehold.co/1080x720/png?text=ggplot+2',
    Lien: 'https://github.com/brandonviry/ggplot2'
  },
  {
    titre: 'guess_the_number',
    Description: 'Ce programme est un jeu de devinette développé en Rust. C\'est mon premier programme écrit en Rust !',
    Cover: 'https://i.ibb.co/rG5x9M7q/cover-geste-nomber.png',
    Lien: 'https://github.com/brandonviry/guess_the_number'
  },
  {
    titre: 'Générateur de Texte Graffiti',
    Description: 'Ce projet est une application Svelte qui permet de créer et de personnaliser du texte avec des effets de graffiti. L\'utilisateur peut modifier divers aspects du texte, y compris la taille, la couleur, la police, et appliquer différents effets de graffiti.',
    Cover: 'https://i.ibb.co/C5hc5jb/gen-g.png',
    Lien: 'https://github.com/brandonviry/G-n-rateur-de-Texte-Graffiti'
  },
  {
    titre: 'HSKsite',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/8Lz0559B/cover-ref-HSKsite.png',
    Lien: 'https://github.com/brandonviry/HSKsite'
  },
  {
    titre: 'hsksiteHUB',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/jgscmNv/hsksitehub.png',
    Lien: 'https://github.com/brandonviry/hsksiteHUB'
  },
  {
    titre: 'leetspeakgo',
    Description: 'Ce programme Go permet de convertir un texte en leetspeak, une forme d\'écriture alternative utilisée sur Internet.Ceci est un petit exercice d\'entrainement et c\'est mon premier programme en go .',
    Cover: 'https://i.ibb.co/H8czK0s/leetspeakgo.png',
    Lien: 'https://github.com/brandonviry/leetspeakgo'
  },
  {
    titre: 'M-tache',
    Description: 'M-tâche est une application de gestion de tâches simple et efficace qui vous permet d\'organiser votre travail quotidien. L\'application offre une interface utilisateur claire et des fonctionnalités essentielles pour une productivité optimale.',
    Cover: 'https://i.ibb.co/pCTH6q3/cover-m-tache.png',
    Lien: 'https://github.com/brandonviry/M-tache'
  },
  {
    titre: 'MDTO',
    Description: 'MDTO est un projet de traitement de texte qui fournit des outils pour extraire et formater des informations à partir de fichiers texte. Le But c\'est de faire la mise ne forme du post LinkedIn et le sauvegarde dans un fichier text.',
    Cover: 'https://i.ibb.co/MX1nsD1/cover-mdto.png',
    Lien: 'https://github.com/brandonviry/MDTO'
  },
  {
    titre: 'Morce',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/273Hjdvc/cover-Morse-traduction.png',
    Lien: 'https://github.com/brandonviry/Morce'
  },
  {
    titre: 'Morpion (Tic-Tac-Toe)',
    Description: 'Jeu de Morpion classique jouable directement dans le terminal, développé en Rust.',
    Cover: 'https://i.ibb.co/LzT1PrhS/morpion-tui.png',
    Lien: 'https://github.com/brandonviry/morpion-tui'
  },
  {
    titre: 'Morpion-1.0.2',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/dM68mnm/morpion1-0-2.png',
    Lien: 'https://github.com/brandonviry/Morpion-1.0.2'
  },
  {
    titre: 'morpion1.0.1',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/t22KT9B/morpion1-0-1.png',
    Lien: 'https://github.com/brandonviry/morpion1.0.1'
  },
  {
    titre: 'morpion1.0.3',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/3fdVFqW/morpion1-0-3.png',
    Lien: 'https://github.com/brandonviry/morpion1.0.3'
  },
  {
    titre: 'Morpion1.0',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/wRjV2QL/morpionv1.png',
    Lien: 'https://github.com/brandonviry/Morpion1.0'
  },
  {
    titre: 'Moyenne',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/GC1qM1d/moyenne.png',
    Lien: 'https://github.com/brandonviry/Moyenne'
  },
  {
    titre: 'Naruto',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/d608hLk/narutoxhinata.png',
    Lien: 'https://github.com/brandonviry/Naruto'
  },
  {
    titre: 'Neopixels',
    Description: 'Un programme neopixel pour le cas d\'un gyrophare pour la police',
    Cover: 'https://i.ibb.co/mth9dVX/neopixel.jpg',
    Lien: 'https://github.com/brandonviry/Neopixels'
  },
  {
    titre: 'NewsGAMES',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/zh2yKYKS/cover-news-game.png',
    Lien: 'https://github.com/brandonviry/NewsGAMES'
  },
  {
    titre: 'Notes-Manager',
    Description: 'Notes Manager est une application en ligne de commande écrite en Rust pour gérer des notes. Elle permet d\'ajouter, lister, lire et supprimer des notes via des commandes simples. Les notes sont stockées dans un fichier JSON pour une gestion facile et sécurisée.',
    Cover: 'https://i.ibb.co/LMmqTgM/cover-manager-note.png',
    Lien: 'https://github.com/brandonviry/Notes-Manager'
  },
  {
    titre: 'PendueLua',
    Description: 'Ce programme implémente un jeu de pendu simple en Lua en utilisant le concept de programmation orientée objet (POO). Le jeu sélectionne un mot aléatoire parmi une liste, et le joueur doit deviner les lettres du mot avant d\'épuiser toutes les tentatives.',
    Cover: 'https://i.ibb.co/5gcWfyRP/cover-penduelua.png',
    Lien: 'https://github.com/brandonviry/PendueLua'
  },
  {
    titre: 'Portfolio-CIF',
    Description: 'Ce projet est un portfolio présentant les projets réalisés durant ma formation CIF. Il met en avant mes compétences en développement web et permet de visualiser divers travaux réalisés au cours de la formation.',
    Cover: 'https://i.ibb.co/sR29qjD/portfolio-cif.png',
    Lien: 'https://github.com/brandonviry/Portfolio-CIF'
  },
  {
    titre: 'portfolio-viry-brandon',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/zCpMhpH/cover-portfolio.png',
    Lien: 'https://github.com/brandonviry/portfolio-viry-brandon'
  },
  {
    titre: 'QCU',
    Description: 'QCU (Questionnaire à Choix Unique) est une application web interactive de questionnaire sur la cybersécurité. Elle permet aux utilisateurs de tester leurs connaissances sur divers sujets liés à la sécurité informatique, incluant les réseaux, les malwares, les protocoles de sécurité et les organismes de cybersécurité.',
    Cover: 'https://i.ibb.co/SDkbhLRz/cover-qcu.png',
    Lien: 'https://github.com/brandonviry/QCU'
  },
  {
    titre: 'robotPICS',
    Description: 'Un projet de robot suiveur de ligne développé avec Arduino, capable de détecter et suivre des lignes noires sur une surface blanche à l\'aide de capteurs optiques.',
    Cover: 'https://i.ibb.co/xQrGw5K/cover-robot-PICS.png',
    Lien: 'https://github.com/brandonviry/robotPICS'
  },
  {
    titre: 'Sans titre',
    Description: 'Projet développé avec passion'
  },
  {
    titre: 'Shifumi Pro - Rock Paper Scissors Game',
    Description: 'Une application web moderne et interactive de Pierre-Feuille-Ciseaux avec intelligence artificielle, statistiques avancées et interface utilisateur premium.',
    Cover: 'https://i.ibb.co/GZr1j9m/shifumi-pro-cover.png',
    Lien: 'https://github.com/brandonviry/Shifumi-Pro'
  },
  {
    titre: 'Site Vitrine - L\'Obsidienne',
    Description: 'Site web du restaurant gastronomique L\'Obsidienne, réalisé avec Astro et Tailwind CSS.',
    Cover: 'https://i.ibb.co/849qcwnT/og-image.jpg',
    Lien: 'https://github.com/brandonviry/L-OBSIDIENNE---site-vitrine-simple-page-'
  },
  {
    titre: 'Site-web-viry-brandon',
    Description: 'Site web personnel de VIRY Brandon qui sera utilisé pour la gestion de mes projets et publications. Le but est de créer un site web personnel (application web même si pour l\'instant cela ressemble à un site) dynamique et original.',
    Cover: 'https://i.ibb.co/nkZPTrv/Site-de-viry-brandon.png',
    Lien: 'https://github.com/brandonviry/Site-web-viry-brandon'
  },
  {
    titre: 'SpaceShooter',
    Description: 'Space Shooter Deluxe est un jeu de tir spatial arcade classique en 2D d. Le joueur controle un vaisseau spatial qui doit survivre contre des vagues infinies d\'ennemis de plus en plus difficiles dans un système de progression basé sur les vagues.',
    Cover: 'https://i.ibb.co/gFdDbjbZ/Screenshot-2025-11-21-at-09-44-23-Space-Shooter-by-brandonviry.png',
    Lien: 'https://brandonviry.itch.io/spaceshooter'
  },
  {
    titre: 'testeidx',
    Description: 'Salut tout le monde ! Google a enfin sorti leur IDE de programmation en ligne. C\'est un peu comme VSCode, mais en ligne, et c\'est vraiment cool. La connexion est un peu lente au démarrage, mais ça promet.J\'ai testé en créant une petite application Next.js. J\'ai suivi simplement les inscriptions et tout était bien, j\'ai pu configurer mon environnement de développement facilement. C\'est très semblable à VSCode dans l\'interface et j\'ai pu démarrer mes projets très rapidement. C\'est fluide et réactif.Ensuite, j\'ai essayé d\'installer sadnc ui , mais ça a rechargé la page et je ne sais pas pourquoi il n\'a pas conservé toute la configuration. J\'ai quand même pu installer un bouton rapidement pour voir si ça fonctionnait. Ensuite, j\'ai ajouté un composant de card pour créer un petit compteur et tester React avec Next.js sur la plateforme . J\'en ai profité pour tester l\'IA mais j\'ai reçu un message disant que l\'IA n\'était pas activée pour ma région. C\'est dommage, mais j\'ai quand même pu créer un compteur basique. C\'est un peu lent lorsque je teste le résultat, mais ça ne m\'a pas trop gêné.J\'ai amélioré le rendu visa avec un peu de code Tailwind CSS. Ensuite, j\'ai modifié les métadonnées et je suis passé au Next.js concrét pour créer une nouvelle page. J\'ai créé un dossier, j\'y ai ajouté une page pour le compteur décrémenté qui récupère sa valeur dans une route dynamique.Et pour finir j\'ai crée un repository github pour publié ceci.',
    Cover: 'https://i.ibb.co/x8KwN61/testeidx.png',
    Lien: 'https://github.com/brandonviry/testeidx'
  },
  {
    titre: 'tf2',
    Description: 'Projet développé avec passion',
    Cover: 'https://placehold.co/1080x720/png?text=tf2',
    Lien: 'https://github.com/brandonviry/tf2'
  },
  {
    titre: 'Timer GUI — Horloge numérique Rust (Iced)',
    Description: 'Application d’horloge GUI en Rust, propre et modulaire, avec personnalisation complète via JSON: thèmes (couleurs), typographie, mise en page, et horloges « monde » (fuseaux IANA). Build utilisateur prêt à l’emploi + plusieurs thèmes inclus.',
    Cover: 'https://i.ibb.co/HpXNKyxn/Capture-d-cran-2025-10-25-184629.png',
    Lien: 'https://github.com/brandonviry/Timer-GUI-Horloge-num-rique-Rust-Iced-'
  },
  {
    titre: 'Transcripteur Audio/Vidéo',
    Description: 'Un outil en ligne de commande puissant et rapide pour transcrire des fichiers audio et vidéo en texte brut et en sous-titres (format SRT), basé sur faster-whisper.',
    Cover: 'https://placehold.co/600x400.png?text=Transcripteur+Audio/Vid%C3%A9o',
    Lien: 'https://github.com/brandonviry/Transcripteur-Audio-Video'
  },
  {
    titre: 'WASM_GO',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/wCbGP7Z/wasmgo.png',
    Lien: 'https://github.com/brandonviry/WASM_GO'
  },
  {
    titre: 'websimia_creation',
    Description: 'Projet développé avec passion',
    Cover: 'https://i.ibb.co/RkJkwMks/cover-websim.png',
    Lien: 'https://github.com/brandonviry/websimia_creation'
  },
  {
    titre: '[ ALPHA ] Roguelike Multi, Exploration et Combat',
    Description: 'Un jeu roguelike multijoueur avec génération procédurale de salles, système de graphe 12x12, et commandes admin professionnelles!',
    Cover: 'https://i.ibb.co/x8jrpTgq/ALPHA-Roguelike-Multi-Exploration-et-Combat.png',
    Lien: 'https://github.com/brandonviry/-Roguelike-Multiplayer---Jeu-de-Salles-Proc-durales'
  }
];
