import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Typography } from '@/components/ui/typography/typography';
import { Button } from '@/components/ui/button/button';
import { Divider } from '@/components/ui/decoration/divider';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Globe, ExternalLink, Download, ArrowLeft, Monitor } from 'lucide-react';
import type { App } from '@/types/app';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getAppBySlug(slug: string): Promise<App | null> {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', slug)
    .eq('publie', true)
    .single();

  if (error || !data) return null;
  return data as App;
}

async function getPublishedApps(): Promise<App[]> {
  const { data } = await supabase.from('apps').select('slug').eq('publie', true);
  return (data || []) as App[];
}

export async function generateStaticParams() {
  const apps = await getPublishedApps();
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return { title: 'App introuvable | VIRY Brandon' };

  return {
    title: `${app.nom} | Store VIRY Brandon`,
    description: app.tagline || `${app.nom} — ${app.categorie}`,
  };
}

const TYPE_META: Record<string, { icon: React.ReactNode; label: string }> = {
  web: { icon: <Globe className="w-4 h-4" />, label: 'Web App' },
  saas: { icon: <ExternalLink className="w-4 h-4" />, label: 'SaaS' },
  executable: { icon: <Download className="w-4 h-4" />, label: 'Exécutable' },
};

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  const typeMeta = TYPE_META[app.type] || { icon: <Monitor className="w-4 h-4" />, label: app.type };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.nom,
    description: app.tagline || app.description,
    applicationCategory: app.categorie,
    operatingSystem: app.plateforme?.join(', ') || 'Web',
    url: app.cta_primaire_url,
    ...(app.version && { softwareVersion: app.version }),
    ...(app.image_url && { image: app.image_url }),
    author: {
      '@type': 'Person',
      name: 'VIRY Brandon',
      url: 'https://devweb.viry-brandon.fr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <main className="flex-1 w-full">

      {/* En-tête */}
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

        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">

          {/* Retour */}
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au store
          </Link>

          <div className="flex items-start gap-5 mb-6">
            {/* Icône */}
            {app.icone_url ? (
              <img
                src={app.icone_url}
                alt={app.nom}
                className="w-20 h-20 object-cover shrink-0 border border-border/20"
              />
            ) : (
              <div className="w-20 h-20 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                {typeMeta.icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold bg-accent text-white">
                  {typeMeta.icon}
                  {typeMeta.label}
                </span>
                <span className="px-2 py-0.5 text-xs border border-border/30 text-text-muted">
                  {app.categorie}
                </span>
                {app.version && (
                  <span className="px-2 py-0.5 text-xs border border-border/30 text-text-muted font-mono">
                    v{app.version}
                  </span>
                )}
              </div>

              <Typography
                level="h1"
                className="text-text-primary font-extrabold tracking-tight leading-tight"
              >
                {app.nom}
              </Typography>

              {app.tagline && (
                <Typography level="body1" className="text-text-secondary mt-2 leading-relaxed">
                  {app.tagline}
                </Typography>
              )}
            </div>
          </div>

          <Divider variant="gradient" align="left" />

          {/* Plateformes */}
          {app.plateforme && app.plateforme.length > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-xs text-text-muted uppercase tracking-wider">Plateformes :</span>
              {app.plateforme.map(p => (
                <span key={p} className="px-2 py-0.5 text-xs border border-border/30 text-text-secondary">
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* Image de couverture */}
          {app.image_url && (
            <div className="mt-8 overflow-hidden border border-border/20">
              <img
                src={app.image_url}
                alt={app.nom}
                className="w-full object-cover max-h-80"
              />
            </div>
          )}
        </div>
      </section>

      {/* Corps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">

          {/* Description */}
          {app.description && (
            <div className="mb-12">
              <Typography level="body1" className="text-text-secondary leading-loose whitespace-pre-wrap">
                {app.description}
              </Typography>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="cta"
              size="lg"
              href={app.cta_primaire_url}
              external
              className="gap-2"
            >
              {TYPE_META[app.type]?.icon}
              {app.cta_primaire_label}
            </Button>

            {app.cta_secondaire_url && app.cta_secondaire_label && (
              <Button
                variant="outline"
                size="lg"
                href={app.cta_secondaire_url}
                external
                className="gap-2"
              >
                {app.cta_secondaire_label}
              </Button>
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-border/20">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au store
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
