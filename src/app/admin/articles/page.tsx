'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Plus, Search, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type ArticleAdmin = {
  id: string;
  slug: string;
  titre: string;
  auteur: string;
  date_publication: string;
  categorie: string;
  image_src: string | null;
  extrait: string | null;
  publie: boolean;
  created_at: string;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'publie' | 'brouillon'>('tous');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/articles');
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
        setError(null);
      } else {
        setError(data.error || 'Erreur lors du chargement');
      }
    } catch {
      setError('Erreur de connexion à l\'API');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, titre: string) => {
    if (!confirm(`Supprimer définitivement l'article "${titre}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await loadArticles();
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleTogglePublie = async (article: ArticleAdmin) => {
    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...article, publie: !article.publie }),
      });
      const data = await res.json();
      if (data.success) {
        setArticles(prev => prev.map(a => a.id === article.id ? data.article : a));
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la mise à jour');
    }
  };

  const allCategories = Array.from(new Set(articles.map(a => a.categorie))).sort();

  const filtered = articles.filter(a => {
    const matchSearch = a.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.categorie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === 'tous' ||
      (filterStatus === 'publie' && a.publie) ||
      (filterStatus === 'brouillon' && !a.publie);
    const matchCategory = !filterCategory || a.categorie === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-text-secondary">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-red-500/10 border-2 border-red-500 p-6 max-w-md text-center">
          <p className="text-red-500 font-semibold mb-2">Erreur</p>
          <p className="text-text-secondary text-sm mb-4">{error}</p>
          <button onClick={loadArticles} className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition-colors">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const totalPublies = articles.filter(a => a.publie).length;
  const totalBrouillons = articles.filter(a => !a.publie).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">Gestion des articles</h1>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span>{articles.length} article{articles.length > 1 ? 's' : ''} au total</span>
                <span className="text-accent font-semibold">{totalPublies} publié{totalPublies > 1 ? 's' : ''}</span>
                <span className="text-text-muted">{totalBrouillons} brouillon{totalBrouillons > 1 ? 's' : ''}</span>
              </div>
            </div>
            <Link
              href="/admin/articles/new"
              className={cn(
                "inline-flex items-center gap-2",
                "bg-accent text-white",
                "px-6 py-3 font-semibold",
                "hover:bg-accent/90 transition-colors"
              )}
            >
              <Plus className="w-5 h-5" />
              Nouvel article
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Rechercher par titre ou catégorie..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as 'tous' | 'publie' | 'brouillon')}
              className={cn(
                "px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
              )}
            >
              <option value="tous">Tous les statuts</option>
              <option value="publie">Publiés</option>
              <option value="brouillon">Brouillons</option>
            </select>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className={cn(
                "px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
              )}
            >
              <option value="">Toutes les catégories</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {(searchTerm || filterStatus !== 'tous' || filterCategory) && (
            <div className="flex items-center gap-3 mt-3">
              <p className="text-text-secondary text-sm">
                {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
              </p>
              <button
                onClick={() => { setSearchTerm(''); setFilterStatus('tous'); setFilterCategory(''); }}
                className="text-accent text-sm hover:underline"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        {/* Liste */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border/20">
            <p className="text-text-secondary mb-2">Aucun article trouvé</p>
            <Link href="/admin/articles/new" className="text-accent hover:underline text-sm">
              Créer le premier article →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map(article => (
              <div
                key={article.id}
                className={cn(
                  "border-2 p-5 transition-all duration-200 group",
                  article.publie
                    ? "bg-surface-1/10 border-border/20 hover:border-accent/50"
                    : "bg-surface-1/5 border-dashed border-border/30 hover:border-accent/30"
                )}
              >
                <div className="flex gap-4">
                  {/* Image couverture */}
                  {article.image_src && (
                    <div className="w-24 h-24 flex-shrink-0 bg-surface-2 overflow-hidden">
                      <img
                        src={article.image_src}
                        alt={article.titre}
                        className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                            {article.titre}
                          </h3>
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-semibold shrink-0",
                            article.publie
                              ? "bg-green-500/10 text-green-500"
                              : "bg-surface-2 text-text-muted"
                          )}>
                            {article.publie ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                          <span className="bg-accent/10 text-accent px-2 py-0.5 font-semibold">
                            {article.categorie}
                          </span>
                          <span>{article.auteur}</span>
                          <span>{article.date_publication}</span>
                          <span className="font-mono opacity-60">/blog/{article.slug}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleTogglePublie(article)}
                          className={cn(
                            "p-2 transition-colors duration-200",
                            article.publie
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                              : "bg-surface-2 text-text-muted hover:bg-accent/10 hover:text-accent"
                          )}
                          title={article.publie ? 'Dépublier' : 'Publier'}
                        >
                          {article.publie ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <Link
                          href={`/admin/articles/${article.id}`}
                          className={cn(
                            "p-2",
                            "bg-accent/10 text-accent",
                            "hover:bg-accent hover:text-white",
                            "transition-colors duration-200"
                          )}
                          title="Éditer"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(article.id, article.titre)}
                          className={cn(
                            "p-2",
                            "bg-red-500/10 text-red-500",
                            "hover:bg-red-500 hover:text-white",
                            "transition-colors duration-200"
                          )}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {article.extrait && (
                      <p className="text-sm text-text-secondary line-clamp-2 mt-2">
                        {article.extrait}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
