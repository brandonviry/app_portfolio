import { Typography } from "@/components/ui/typography/typography";
import { ArticleCard } from "@/components/ui/card/article-card";
import { Button } from "@/components/ui/button/button";
import { Divider } from "@/components/ui/decoration/divider";
import { getPublishedArticles } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export async function ArticlesSection() {
  const articles = await getPublishedArticles();
  const latest = articles.slice(0, 6);

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

        {latest.length > 0 ? (
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            "max-w-6xl mx-auto"
          )}>
            {latest.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                author={article.author}
                date={article.date}
                category={article.category}
                href={`/blog/${article.slug}`}
                imageSrc={article.imageSrc}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted">Aucun article publié pour l&apos;instant.</p>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button href="/blog" variant="cta" size="lg" className="gap-3">
            Voir tous les articles
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
