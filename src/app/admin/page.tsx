'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderGit2, Plus, Edit, BarChart3, Clock, FileText, Eye, AppWindow } from 'lucide-react';
import { cn } from '@/lib/utils';

type Project = {
  titre: string;
  Description: string;
  Cover?: string;
  Lien?: string;
  categories: string[];
  technologies: string[];
  year?: number;
};

type ArticleAdmin = {
  id: string;
  titre: string;
  categorie: string;
  publie: boolean;
  date_publication: string;
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<ArticleAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    categories: 0,
    technologies: 0,
    recent: [] as Project[]
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then(r => r.json()),
      fetch('/api/admin/articles').then(r => r.json()),
    ]).then(([projData, artData]) => {
      if (projData.success) {
        setProjects(projData.projects);
        const allCategories = new Set(projData.projects.flatMap((p: Project) => p.categories));
        const allTechnologies = new Set(projData.projects.flatMap((p: Project) => p.technologies));
        setStats({
          total: projData.projects.length,
          categories: allCategories.size,
          technologies: allTechnologies.size,
          recent: projData.projects.slice(-5).reverse(),
        });
      }
      if (artData.success) {
        setArticles(artData.articles);
      }
    }).catch(err => console.error('Erreur chargement:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Dashboard Admin
          </h1>
          <p className="text-text-secondary">
            Gestion du portfolio - Interface d&apos;administration
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Projets */}
          <Link
            href="/admin/projects"
            className={cn(
              "p-6",
              "bg-accent/10 border-2 border-accent/30",
              "hover:bg-accent/20",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-accent/20",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <FolderGit2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-accent mb-1">
                  Gérer les projets
                </h3>
                <p className="text-sm text-text-secondary">
                  Voir, éditer, supprimer les projets existants
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/projects/new"
            className={cn(
              "p-6",
              "bg-surface-1/10 border-2 border-border/20",
              "hover:border-accent/50",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-surface-2",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Nouveau projet
                </h3>
                <p className="text-sm text-text-secondary">
                  Ajouter un nouveau projet au portfolio
                </p>
              </div>
            </div>
          </Link>

          {/* Articles */}
          <Link
            href="/admin/articles"
            className={cn(
              "p-6",
              "bg-cta/10 border-2 border-cta/30",
              "hover:bg-cta/20",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-cta/20",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <FileText className="w-6 h-6 text-cta" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cta mb-1">
                  Gérer les articles
                </h3>
                <p className="text-sm text-text-secondary">
                  Blog — créer, éditer, publier les articles
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/articles/new"
            className={cn(
              "p-6",
              "bg-surface-1/10 border-2 border-border/20",
              "hover:border-cta/50",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-surface-2",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <Plus className="w-6 h-6 text-cta" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Nouvel article
                </h3>
                <p className="text-sm text-text-secondary">
                  Rédiger un nouvel article de blog
                </p>
              </div>
            </div>
          </Link>

          {/* Store — Apps */}
          <Link
            href="/admin/apps"
            className={cn(
              "p-6",
              "bg-accent/5 border-2 border-accent/20",
              "hover:bg-accent/10",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-accent/10",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <AppWindow className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-accent mb-1">
                  Gérer le store
                </h3>
                <p className="text-sm text-text-secondary">
                  Apps, outils et SaaS — créer, éditer, publier
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/apps/new"
            className={cn(
              "p-6",
              "bg-surface-1/10 border-2 border-border/20",
              "hover:border-accent/50",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12",
                "bg-surface-2",
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform"
              )}>
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Nouvelle app
                </h3>
                <p className="text-sm text-text-secondary">
                  Ajouter une app au store
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Total projets */}
          <div className={cn(
            "p-6",
            "bg-surface-1/10 border-2 border-border/20"
          )}>
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-accent" />
              <span className="text-4xl font-bold text-accent">
                {stats.total}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Projets totaux
            </h3>
            <p className="text-sm text-text-secondary">
              Dans le portfolio
            </p>
          </div>

          {/* Catégories */}
          <div className={cn(
            "p-6",
            "bg-surface-1/10 border-2 border-border/20"
          )}>
            <div className="flex items-center justify-between mb-4">
              <FolderGit2 className="w-8 h-8 text-accent" />
              <span className="text-4xl font-bold text-accent">
                {stats.categories}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Catégories
            </h3>
            <p className="text-sm text-text-secondary">
              Différentes catégories
            </p>
          </div>

          {/* Technologies */}
          <div className={cn(
            "p-6",
            "bg-surface-1/10 border-2 border-border/20"
          )}>
            <div className="flex items-center justify-between mb-4">
              <Edit className="w-8 h-8 text-accent" />
              <span className="text-4xl font-bold text-accent">
                {stats.technologies}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Technologies
            </h3>
            <p className="text-sm text-text-secondary">
              Technologies utilisées
            </p>
          </div>

          {/* Articles publiés */}
          <div className={cn(
            "p-6",
            "bg-surface-1/10 border-2 border-border/20"
          )}>
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-cta" />
              <span className="text-4xl font-bold text-cta">
                {articles.filter(a => a.publie).length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Articles publiés
            </h3>
            <p className="text-sm text-text-secondary">
              Visibles sur /blog
            </p>
          </div>

          {/* Brouillons */}
          <div className={cn(
            "p-6",
            "bg-surface-1/10 border-2 border-border/20"
          )}>
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-text-muted" />
              <span className="text-4xl font-bold text-text-muted">
                {articles.filter(a => !a.publie).length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Brouillons
            </h3>
            <p className="text-sm text-text-secondary">
              Non publiés
            </p>
          </div>
        </div>

        {/* Derniers projets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-text-primary">
                Projets récents
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-accent hover:underline text-sm"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid gap-4">
            {stats.recent.map((project, index) => {
              // Calculer l'index réel (les 5 derniers)
              const realIndex = projects.length - stats.recent.length + index;

              return (
                <Link
                  key={realIndex}
                  href={`/admin/projects/${realIndex}`}
                  className={cn(
                    "p-4",
                    "bg-surface-1/10 border-2 border-border/20",
                    "hover:border-accent/50",
                    "transition-all duration-200",
                    "group"
                  )}
                >
                  <div className="flex gap-4">
                    {project.Cover && (
                      <div className="w-20 h-20 flex-shrink-0 bg-surface-2 overflow-hidden">
                        <img
                          src={project.Cover}
                          alt={project.titre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
                        {project.titre}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                        {project.Description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.categories.slice(0, 3).map(cat => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Edit className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Derniers articles */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-cta" />
              <h2 className="text-2xl font-bold text-text-primary">
                Articles récents
              </h2>
            </div>
            <Link href="/admin/articles" className="text-cta hover:underline text-sm">
              Voir tout →
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-border/20">
              <p className="text-text-secondary mb-2">Aucun article</p>
              <Link href="/admin/articles/new" className="text-cta hover:underline text-sm">
                Créer le premier article →
              </Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {articles.slice(0, 5).map(article => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className={cn(
                    "p-4",
                    "bg-surface-1/10 border-2 border-border/20",
                    "hover:border-cta/50",
                    "transition-all duration-200",
                    "group flex items-center justify-between"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={cn(
                      "w-2 h-2 shrink-0",
                      article.publie ? "bg-green-500" : "bg-text-muted/40"
                    )} />
                    <span className="font-semibold text-text-primary group-hover:text-cta transition-colors truncate">
                      {article.titre}
                    </span>
                    <span className="shrink-0 px-2 py-0.5 bg-cta/10 text-cta text-xs font-semibold">
                      {article.categorie}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-text-muted hidden sm:block">
                      {article.date_publication}
                    </span>
                    <Edit className="w-4 h-4 text-text-secondary group-hover:text-cta transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Info utiles */}
        <div className={cn(
          "mt-8 p-6",
          "bg-accent/10 border-2 border-accent/30"
        )}>
          <h3 className="text-lg font-bold text-accent mb-3">
            💡 Informations utiles
          </h3>
          <ul className="space-y-2 text-sm text-text-primary">
            <li>• Les modifications sont sauvegardées directement dans <code className="bg-surface-2 px-2 py-0.5">src/store/projects_data.ts</code></li>
            <li>• Un backup automatique est créé avant chaque modification</li>
            <li>• Les backups sont stockés avec un timestamp pour traçabilité</li>
            <li>• Utilisez ImgBB ou un hébergeur similaire pour les images</li>
            <li>• Les changements sont immédiatement visibles sur le site</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
