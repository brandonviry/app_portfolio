'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, X, ArrowLeft, Plus } from 'lucide-react';
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

export default function NewProjectPage() {
  const router = useRouter();

  const [project, setProject] = useState<Project>({
    titre: '',
    Description: '',
    Cover: '',
    Lien: '',
    categories: [],
    technologies: [],
    year: new Date().getFullYear()
  });

  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newTechnology, setNewTechnology] = useState('');

  // Catégories et technologies suggérées (basées sur les données existantes)
  const suggestedCategories = ['Web', 'WordPress', 'Mobile', 'Jeux', '3D/AR', 'IA/ML', 'Plugin'];
  const suggestedTechnologies = [
    'React', 'Next.js', 'TypeScript', 'PHP', 'WordPress', 'Python',
    'Node.js', 'Tailwind CSS', 'MySQL', 'PostgreSQL'
  ];

  // Sauvegarder le nouveau projet
  const handleSave = async () => {
    // Validation
    if (!project.titre.trim()) {
      alert('⚠️ Le titre est requis');
      return;
    }

    if (!project.Description.trim()) {
      alert('⚠️ La description est requise');
      return;
    }

    if (project.categories.length === 0) {
      alert('⚠️ Au moins une catégorie est requise');
      return;
    }

    if (project.technologies.length === 0) {
      alert('⚠️ Au moins une technologie est requise');
      return;
    }

    try {
      setSaving(true);

      // Transformer les données pour correspondre au format Supabase (minuscules)
      const projectData = {
        titre: project.titre,
        description: project.Description, // Conversion: Description → description
        cover: project.Cover || undefined,
        lien: project.Lien || undefined,
        categories: project.categories,
        technologies: project.technologies,
        year: project.year
      };

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Projet créé avec succès !');
        router.push('/admin/projects');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (err) {
      alert('❌ Erreur lors de la création');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Ajouter une catégorie
  const addCategory = (cat: string) => {
    const trimmed = cat.trim();
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
  const addTechnology = (tech: string) => {
    const trimmed = tech.trim();
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

          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-text-primary">
              Nouveau projet
            </h1>
          </div>
          <p className="text-text-secondary">Créer un nouveau projet dans le portfolio</p>
        </div>

        {/* Formulaire */}
        <div className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Titre * <span className="text-red-500">✱</span>
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
              placeholder="Ex: Advanced Post Views Manager"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Description * <span className="text-red-500">✱</span>
            </label>
            <textarea
              value={project.Description}
              onChange={(e) => setProject({ ...project, Description: e.target.value })}
              rows={8}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "transition-all duration-200",
                "resize-vertical"
              )}
              placeholder="Description détaillée du projet, ses fonctionnalités, son objectif..."
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
              placeholder="https://i.ibb.co/example/image.png"
            />
            {project.Cover && (
              <div className="mt-3">
                <p className="text-xs text-text-secondary mb-2">Preview:</p>
                <img
                  src={project.Cover}
                  alt="Preview"
                  className="w-48 h-48 object-cover bg-surface-2 border-2 border-border/20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <p className="text-xs text-text-secondary mt-1">
              💡 Conseil : Utilisez ImgBB ou un hébergeur d&apos;images
            </p>
          </div>

          {/* Lien */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Lien du projet (GitHub, démo, etc.)
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
              Catégories * <span className="text-red-500">✱</span>
            </label>

            {/* Suggestions */}
            <div className="mb-3">
              <p className="text-xs text-text-secondary mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => addCategory(cat)}
                    disabled={project.categories.includes(cat)}
                    className={cn(
                      "px-3 py-1 text-sm",
                      "border border-border/30",
                      project.categories.includes(cat)
                        ? "bg-accent/10 text-accent border-accent/30"
                        : "bg-surface-1/10 text-text-secondary hover:border-accent/50 hover:text-accent",
                      "transition-colors",
                      "disabled:opacity-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Champ personnalisé */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory(newCategory))}
                className={cn(
                  "flex-1 px-4 py-2",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="Ou créer une catégorie personnalisée"
              />
              <button
                onClick={() => addCategory(newCategory)}
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

            {/* Catégories sélectionnées */}
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
              Technologies * <span className="text-red-500">✱</span>
            </label>

            {/* Suggestions */}
            <div className="mb-3">
              <p className="text-xs text-text-secondary mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTechnologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => addTechnology(tech)}
                    disabled={project.technologies.includes(tech)}
                    className={cn(
                      "px-2 py-1 text-xs",
                      "border border-border/30",
                      project.technologies.includes(tech)
                        ? "bg-surface-2 text-text-primary border-accent/30"
                        : "bg-surface-1/10 text-text-secondary hover:border-accent/50 hover:text-accent",
                      "transition-colors",
                      "disabled:opacity-50"
                    )}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Champ personnalisé */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(newTechnology))}
                className={cn(
                  "flex-1 px-4 py-2",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="Ou créer une technologie personnalisée"
              />
              <button
                onClick={() => addTechnology(newTechnology)}
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

            {/* Technologies sélectionnées */}
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
                "px-6 py-4",
                "font-bold text-lg",
                "hover:bg-accent/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors duration-200"
              )}
            >
              <Save className="w-6 h-6" />
              {saving ? 'Création en cours...' : 'Créer le projet'}
            </button>

            <Link
              href="/admin/projects"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-surface-1/10 text-text-primary",
                "px-6 py-4",
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
