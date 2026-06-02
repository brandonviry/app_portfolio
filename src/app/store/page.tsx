import type { Metadata } from 'next';
import { Typography } from '@/components/ui/typography/typography';
import { Divider } from '@/components/ui/decoration/divider';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Globe, ExternalLink, Download } from 'lucide-react';
import type { App } from '@/types/app';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Store — Apps & Outils | VIRY Brandon',
  description: 'Applications web, SaaS et outils créés par VIRY Brandon — développeur graphiste La Réunion. Web apps, exécutables et services disponibles.',
};

async function getPublishedApps(): Promise<App[]> {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('publie', true)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data as App[];
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  web: <Globe className="w-3.5 h-3.5" />,
  saas: <ExternalLink className="w-3.5 h-3.5" />,
  executable: <Download className="w-3.5 h-3.5" />,
};

const TYPE_LABEL: Record<string, string> = {
  web: 'Web App',
  saas: 'SaaS',
  executable: 'Exécutable',
};

export default async function StorePage() {
  const apps = await getPublishedApps();

  return (
    <main className="flex-1 w-full">

      {/* En-tête */}
      <section className={cn(
        "relative py-20 md:py-28 overflow-hidden",
        "border-b border-border/20"
      )}>
        <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-accent/50" />
        <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-accent/30" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-accent/80 tracking-[0.3em] uppercase font-medium">
              viry-brandon.fr
            </span>
            <div className="w-8 h-px bg-accent/60" />
          </div>

          <Typography level="h1" className="text-accent font-extrabold tracking-tight">
            Store
            <span className="sr-only"> — Applications & Outils par VIRY Brandon, Développeur Graphiste La Réunion</span>
          </Typography>

          <Divider variant="gradient" align="center" className="mx-auto" />

          <Typography level="body1" className="text-text-secondary max-w-xl mx-auto">
            Applications, outils et services créés par VIRY Brandon — web apps, SaaS et exécutables.
          </Typography>
        </div>
      </section>

      {/* Grille d'apps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">

          {apps.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-border/20 max-w-xl mx-auto">
              <Typography level="h4" className="text-text-muted font-normal mb-2">
                Aucune app disponible pour l&apos;instant
              </Typography>
              <Typography level="body2" className="text-text-muted">
                Revenez bientôt.
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/store/${app.slug}`}
                  className={cn(
                    "group relative flex flex-col",
                    "border border-border/20 bg-surface-1",
                    "transition-all duration-300",
                    "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
                  )}
                >
                  {/* Coin décoratif */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/40 group-hover:border-accent transition-colors duration-300" />

                  {/* Image de couverture */}
                  {app.image_url && (
                    <div className="w-full h-40 overflow-hidden bg-surface-2">
                      <img
                        src={app.image_url}
                        alt={app.nom}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-3 p-5 flex-1">
                    {/* Icône + Nom */}
                    <div className="flex items-center gap-3">
                      {app.icone_url ? (
                        <img src={app.icone_url} alt="" className="w-10 h-10 object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                          {TYPE_ICON[app.type] || <Globe className="w-4 h-4 text-accent" />}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                          {app.nom}
                        </p>
                        {app.version && (
                          <p className="text-xs text-text-muted font-mono">v{app.version}</p>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-accent/10 text-accent">
                        {TYPE_ICON[app.type]}
                        {TYPE_LABEL[app.type] || app.type}
                      </span>
                      <span className="px-2 py-0.5 text-xs border border-border/30 text-text-muted">
                        {app.categorie}
                      </span>
                    </div>

                    {/* Tagline */}
                    {app.tagline && (
                      <p className="text-sm text-text-secondary leading-relaxed flex-1">
                        {app.tagline}
                      </p>
                    )}

                    {/* Plateformes */}
                    {app.plateforme && app.plateforme.length > 0 && (
                      <p className="text-xs text-text-muted">
                        {app.plateforme.join(' · ')}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-3 border-t border-border/10">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-sm font-semibold",
                        "text-accent group-hover:underline"
                      )}>
                        {app.cta_primaire_label} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
