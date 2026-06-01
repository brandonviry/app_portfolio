import { Typography } from "@/components/ui/typography/typography";
import { ArticleCard } from "@/components/ui/card/article-card";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

const articles = [
  {
    title: "Dragovia Studios – Identité Visuelle & Univers de Marque",
    author: "chikara974",
    date: "mai 19, 2025",
    category: "Graphiste",
    href: "/blog/dragovia-studios-identite-visuelle",
    imageSrc: undefined,
  },
  {
    title: "Saints Row: The Third — Campagne Instagram publicitaire",
    author: "chikara974",
    date: "mai 19, 2025",
    category: "Graphiste",
    href: "/blog/saints-row-campagne-instagram",
    imageSrc: undefined,
  },
  {
    title: "CodeNova : Identité & Mini Campagne Instagram",
    author: "chikara974",
    date: "mai 17, 2025",
    category: "Graphiste",
    href: "/blog/codenova-identite-mini-campagne-instagram",
    imageSrc: undefined,
  },
  {
    title: "Article de Full-Stack Product Maker",
    author: "chikara974",
    date: "mai 17, 2025",
    category: "Full-Stack Product Maker",
    href: "/blog/full-stack-product-maker-viry-brandon",
    imageSrc: undefined,
  },
  {
    title: "Article de développeur web",
    author: "chikara974",
    date: "mai 16, 2025",
    category: "Développeur web",
    href: "/blog/projet-de-developpement-web-viry-brandon",
    imageSrc: undefined,
  },
];

export function ArticlesSection() {
  return (
    <section className={cn("relative py-16 md:py-24")}>
      <div className={cn("container mx-auto px-4 sm:px-6")}>
        <div className={cn("text-center max-w-2xl mx-auto mb-16 space-y-4")}>
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Dernier article
          </Typography>
          <Divider variant="gradient" align="center" className="mx-auto" />
        </div>

        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "max-w-6xl mx-auto"
        )}>
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
