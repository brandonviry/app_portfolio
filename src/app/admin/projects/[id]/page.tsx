'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, X, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
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

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const projectId = parseInt(resolvedParams.id, 10);

  const [project, setProject] = useState<Project>({
    titre: '',
    Description: '',
    Cover: '',
    Lien: '',
    categories: [],
    technologies: [],
    year: undefined
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Champs temporaires pour ajouter catégories/technologies
  const [newCategory, setNewCategory] = useState('');
  const [newTechnology, setNewTechnology] = useState('');

  // Charger le projet
  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setProject(data.project);
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

  // Sauvegarder les modifications
  const handleSave = async () => {
    // Validation
    if (!project.titre.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (!project.Description.trim()) {
      alert('La description est requise');
      return;
    }

    if (project.categories.length === 0) {
      alert('Au moins une catégorie est requise');
      return;
    }

    if (project.technologies.length === 0) {
      alert('Au moins une technologie est requise');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Projet mis à jour avec succès !');
        router.push('/admin/projects');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (err) {
      alert('❌ Erreur lors de la sauvegarde');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Supprimer le projet
  const handleDelete = async () => {
    if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer définitivement "${project.titre}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Projet supprimé avec succès');
        router.push('/admin/projects');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (err) {
      alert('❌ Erreur lors de la suppression');
      console.error(err);
    }
  };

  // Ajouter une catégorie
  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !project.categories.includes(trimmed)) {
      setProject({ ...project, categories: [...project.categories, trimmed] });
      setNewCategory('');
    }
  };

  // Retirer une catégorie
  const removeCategory = (cat: string) => {
    setProject({
      ...project,
      categories: project.categories.filter(c => c !== cat)
    });
  };

  // Ajouter une technologie
  const addTechnology = () => {
    const trimmed = newTechnology.trim();
    if (trimmed && !project.technologies.includes(trimmed)) {
      setProject({ ...project, technologies: [...project.technologies, trimmed] });
      setNewTechnology('');
    }
  };

  // Retirer une technologie
  const removeTechnology = (tech: string) => {
    setProject({
      ...project,
      technologies: project.technologies.filter(t => t !== tech)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement du projet...</p>
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
          <p className="text-text-secondary text-sm text-center mb-4">{error}</p>
          <Link
            href="/admin/projects"
            className="block w-full bg-red-500 text-white px-4 py-2 text-center hover:bg-red-600 transition-colors"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </Link>

          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Éditer le projet
          </h1>
          <p className="text-text-secondary">ID: {projectId}</p>
        </div>

        {/* Formulaire */}
        <div className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={project.titre}
              onChange={(e) => setProject({ ...project, titre: e.target.value })}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200"
              )}
              placeholder="Titre du projet"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Description *
            </label>
            <textarea
              value={project.Description}
              onChange={(e) => setProject({ ...project, Description: e.target.value })}
              rows={6}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200",
                "resize-vertical"
              )}
              placeholder="Description détaillée du projet"
            />
            <p className="text-xs text-text-secondary mt-1">
              {project.Description.length} caractères
            </p>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              URL de l&apos;image de couverture
            </label>
            <input
              type="url"
              value={project.Cover || ''}
              onChange={(e) => setProject({ ...project, Cover: e.target.value })}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200"
              )}
              placeholder="https://example.com/image.png"
            />
            {project.Cover && (
              <div className="mt-3">
                <p className="text-xs text-text-secondary mb-2">Preview:</p>
                <img
                  src={project.Cover}
                  alt="Preview"
                  className="w-48 h-48 object-cover bg-surface-2"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage invalide%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
          </div>

          {/* Lien */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Lien du projet
            </label>
            <input
              type="url"
              value={project.Lien || ''}
              onChange={(e) => setProject({ ...project, Lien: e.target.value })}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200"
              )}
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Année */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Année
            </label>
            <input
              type="number"
              value={project.year || ''}
              onChange={(e) => setProject({
                ...project,
                year: e.target.value ? parseInt(e.target.value, 10) : undefined
              })}
              min="2000"
              max="2030"
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200"
              )}
              placeholder="2024"
            />
          </div>

          {/* Catégories */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Catégories *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                className={cn(
                  "flex-1 px-4 py-2",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="Ajouter une catégorie"
              />
              <button
                onClick={addCategory}
                className={cn(
                  "px-4 py-2",
                  "bg-accent text-white",
                  "hover:bg-accent/90",
                  "transition-colors"
                )}
              >
                Ajouter
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.categories.map(cat => (
                <div
                  key={cat}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-3 py-1",
                    "bg-accent/10 text-accent",
                    "border border-accent/30"
                  )}
                >
                  <span className="text-sm font-semibold">{cat}</span>
                  <button
                    onClick={() => removeCategory(cat)}
                    className="hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Technologies *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className={cn(
                  "flex-1 px-4 py-2",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="Ajouter une technologie"
              />
              <button
                onClick={addTechnology}
                className={cn(
                  "px-4 py-2",
                  "bg-accent text-white",
                  "hover:bg-accent/90",
                  "transition-colors"
                )}
              >
                Ajouter
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <div
                  key={tech}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-2 py-1",
                    "bg-surface-2 text-text-primary",
                    "text-sm"
                  )}
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t-2 border-border/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2",
                "bg-accent text-white",
                "px-6 py-3",
                "font-semibold",
                "hover:bg-accent/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors duration-200"
              )}
            >
              <Save className="w-5 h-5" />
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>

            <button
              onClick={handleDelete}
              disabled={saving}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-red-500/10 text-red-500",
                "px-6 py-3",
                "font-semibold",
                "border-2 border-red-500",
                "hover:bg-red-500 hover:text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors duration-200"
              )}
            >
              <Trash2 className="w-5 h-5" />
              Supprimer
            </button>

            <Link
              href="/admin/projects"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-surface-1/10 text-text-primary",
                "px-6 py-3",
                "border-2 border-border/20",
                "hover:border-accent/50",
                "transition-colors duration-200"
              )}
            >
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
