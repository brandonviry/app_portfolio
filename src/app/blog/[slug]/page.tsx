import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { Divider } from "@/components/ui/decoration/divider";
import { getArticleBySlug, getPublishedArticles } from "@/lib/supabase";
import { ArticleContent } from "@/components/ui/article/article-content";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable - VIRY Brandon" };

  return {
    title: `${article.title} - VIRY Brandon`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://devweb.viry-brandon.fr',
    },
    datePublished: article.date,
    ...(article.imageSrc && { image: article.imageSrc }),
    publisher: {
      '@type': 'Person',
      name: 'VIRY Brandon',
      url: 'https://devweb.viry-brandon.fr',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://devweb.viry-brandon.fr/blog/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="flex-1 w-full">

      {/* En-tête article */}
      <section className={cn(
        "relative py-20 md:py-28 overflow-hidden",
        "border-b border-border/20"
      )}>
        <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-accent/50" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-cta/40" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-accent text-white">
            {article.category}
          </span>

          <Typography
            level="h1"
            className="text-text-primary font-extrabold tracking-tight leading-tight"
          >
            {article.title}
          </Typography>

          <Divider variant="gradient" align="left" />

          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>{article.author}</span>
            <span className="w-1 h-1 bg-text-muted/50 inline-block" />
            <span>{article.date}</span>
          </div>

          {article.excerpt && (
            <Typography level="body1" className="text-text-secondary leading-relaxed">
              {article.excerpt}
            </Typography>
          )}
        </div>
      </section>

      {/* Corps de l'article */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">

          {article.content ? (
            <ArticleContent content={article.content} />
          ) : (
            <div className={cn(
              "relative flex flex-col items-center justify-center gap-4",
              "py-24 border border-dashed border-border/40",
              "text-center"
            )}>
              <Typography level="h4" className="text-text-muted font-normal">
                Contenu à venir
              </Typography>
              <Typography level="body2" className="text-text-muted max-w-xs">
                Cet article est en cours de rédaction.
              </Typography>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border/20">
            <Button variant="ghost" href="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
