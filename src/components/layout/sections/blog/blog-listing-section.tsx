"use client";

import { useState, useMemo } from "react";
import { Typography } from "@/components/ui/typography/typography";
import { ArticleCard } from "@/components/ui/card/article-card";
import type { Article } from "@/types/article";
import { cn } from "@/lib/utils";

const ALL = "Tous";

interface BlogListingSectionProps {
  articles: Article[];
}

export function BlogListingSection({ articles }: BlogListingSectionProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)));
    return [ALL, ...unique];
  }, [articles]);

  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => active === ALL ? articles : articles.filter((a) => a.category === active),
    [active, articles]
  );

  return (
    <section className="relative py-16 md:py-24">
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium tracking-wide uppercase",
                "border transition-all duration-200",
                active === cat
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-secondary border-border/40 hover:border-accent/60 hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
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
          <div className="text-center py-24">
            <Typography level="body1" className="text-text-muted">
              Aucun article dans cette catégorie.
            </Typography>
          </div>
        )}

        {/* Compteur */}
        <p className="mt-10 text-xs text-text-muted tracking-widest uppercase text-right">
          {filtered.length} article{filtered.length > 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
