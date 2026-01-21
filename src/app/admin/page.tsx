'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderGit2, Plus, Edit, BarChart3, Clock } from 'lucide-react';
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

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    categories: 0,
    technologies: 0,
    recent: [] as Project[]
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);

        // Calculer les statistiques
        const allCategories = new Set(data.projects.flatMap((p: Project) => p.categories));
        const allTechnologies = new Set(data.projects.flatMap((p: Project) => p.technologies));
        const recent = data.projects.slice(-5).reverse(); // 5 derniers projets

        setStats({
          total: data.projects.length,
          categories: allCategories.size,
          technologies: allTechnologies.size,
          recent
        });
      }
    } catch (err) {
      console.error('Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  };

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
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
