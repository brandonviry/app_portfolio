import type { Metadata } from "next";
import { Typography } from "@/components/ui/typography/typography";
import { Divider } from "@/components/ui/decoration/divider";
import { BlogListingSection } from "@/components/layout/sections/blog/blog-listing-section";
import { getPublishedArticles } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog - VIRY Brandon",
  description: "Articles de VIRY Brandon sur le développement web, le design graphique et l'automatisation.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="flex-1 w-full">

      {/* En-tête */}
      <section className={cn(
        "relative py-20 md:py-28 overflow-hidden",
        "border-b border-border/20"
      )}>
        <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-accent/50" />
        <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-accent/30" />

        <div className="container mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-accent/80 tracking-[0.3em] uppercase font-medium">
              viry-brandon.fr
            </span>
            <div className="w-8 h-px bg-accent/60" />
          </div>

          <Typography level="h1" className="text-accent font-extrabold tracking-tight">
            Blog
          </Typography>

          <Divider variant="gradient" align="center" className="mx-auto" />

          <Typography level="body1" className="text-text-secondary max-w-xl mx-auto">
            Graphisme, développement web, Full-Stack Product making — mes créations et réflexions.
          </Typography>
        </div>
      </section>

      <BlogListingSection articles={articles} />
    </main>
  );
}
