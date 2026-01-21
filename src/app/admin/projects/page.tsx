'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Plus, Search, AlertCircle } from 'lucide-react';
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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Charger les projets
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
        setError(null);
      } else {
        setError(data.error || 'Erreur lors du chargement');
      }
    } catch (err) {
      setError('Erreur de connexion à l\'API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un projet
  const handleDelete = async (index: number) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${projects[index].titre}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/projects/${index}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Recharger la liste
        await loadProjects();
        alert('Projet supprimé avec succès');
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (err) {
      alert('Erreur lors de la suppression');
      console.error(err);
    }
  };

  // Filtrer les projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.Description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || project.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Extraire toutes les catégories uniques
  const allCategories = Array.from(new Set(projects.flatMap(p => p.categories))).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-red-500/10 border-2 border-red-500 p-6 rounded max-w-md">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-center font-semibold mb-2">Erreur</p>
          <p className="text-text-secondary text-sm text-center">{error}</p>
          <button
            onClick={loadProjects}
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                Gestion des projets
              </h1>
              <p className="text-text-secondary">
                {projects.length} projet{projects.length > 1 ? 's' : ''} au total
              </p>
            </div>

            <Link
              href="/admin/projects/new"
              className={cn(
                "inline-flex items-center gap-2",
                "bg-accent text-white",
                "px-6 py-3",
                "font-semibold",
                "hover:bg-accent/90",
                "transition-colors duration-200"
              )}
            >
              <Plus className="w-5 h-5" />
              Nouveau projet
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Rechercher par titre ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50",
                  "transition-all duration-200"
                )}
              />
            </div>

            {/* Filtre catégorie */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={cn(
                "px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200",
                "cursor-pointer"
              )}
            >
              <option value="">Toutes les catégories</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Résultats */}
          {searchTerm || selectedCategory ? (
            <p className="text-text-secondary text-sm mt-4">
              {filteredProjects.length} résultat{filteredProjects.length > 1 ? 's' : ''}
            </p>
          ) : null}
        </div>

        {/* Liste des projets */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-surface-1/10 border-2 border-dashed border-border/20">
            <p className="text-text-secondary mb-4">Aucun projet trouvé</p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="text-accent hover:underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => {
              // Trouver l'index réel dans le tableau complet
              const realIndex = projects.indexOf(project);

              return (
                <div
                  key={realIndex}
                  className={cn(
                    "bg-surface-1/10 border-2 border-border/20",
                    "p-6",
                    "hover:border-accent/50",
                    "transition-all duration-200",
                    "group"
                  )}
                >
                  <div className="flex gap-6">
                    {/* Cover image */}
                    {project.Cover && (
                      <div className="w-32 h-32 flex-shrink-0 bg-surface-2 overflow-hidden">
                        <img
                          src={project.Cover}
                          alt={project.titre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-text-primary mb-1">
                            {project.titre}
                          </h3>
                          {project.year && (
                            <p className="text-sm text-text-secondary">
                              Année: {project.year}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/projects/${realIndex}`}
                            className={cn(
                              "p-2",
                              "bg-accent/10 text-accent",
                              "hover:bg-accent hover:text-white",
                              "transition-colors duration-200"
                            )}
                            title="Éditer"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(realIndex)}
                            className={cn(
                              "p-2",
                              "bg-red-500/10 text-red-500",
                              "hover:bg-red-500 hover:text-white",
                              "transition-colors duration-200"
                            )}
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                        {project.Description}
                      </p>

                      {/* Catégories */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories.map(cat => (
                          <span
                            key={cat}
                            className={cn(
                              "px-2 py-1",
                              "bg-accent/10 text-accent",
                              "text-xs font-semibold"
                            )}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 5).map(tech => (
                          <span
                            key={tech}
                            className={cn(
                              "px-2 py-0.5",
                              "bg-surface-2 text-text-secondary",
                              "text-xs"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-xs text-text-secondary px-2 py-0.5">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Lien */}
                      {project.Lien && (
                        <a
                          href={project.Lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline text-sm mt-2 inline-block"
                        >
                          Voir le projet →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
