'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Plus, Search, Eye, EyeOff, ExternalLink, Download, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppAdmin = {
  id: string;
  slug: string;
  nom: string;
  tagline: string | null;
  categorie: string;
  type: string;
  icone_url: string | null;
  cta_primaire_label: string;
  cta_primaire_url: string;
  plateforme: string[];
  version: string | null;
  publie: boolean;
  created_at: string;
};

const TYPE_ICON: Record<string, React.ReactNode> = {
  web: <Globe className="w-3 h-3" />,
  saas: <ExternalLink className="w-3 h-3" />,
  executable: <Download className="w-3 h-3" />,
};

const TYPE_LABEL: Record<string, string> = {
  web: 'Web App',
  saas: 'SaaS',
  executable: 'Exécutable',
};

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'publie' | 'brouillon'>('tous');
  const [filterType, setFilterType] = useState('');

  useEffect(() => { loadApps(); }, []);

  const loadApps = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/apps');
      const data = await res.json();
      if (data.success) {
        setApps(data.apps);
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

  const handleDelete = async (id: string, nom: string) => {
    if (!confirm(`Supprimer définitivement l'app "${nom}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/apps/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await loadApps();
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleTogglePublie = async (app: AppAdmin) => {
    try {
      const res = await fetch(`/api/admin/apps/${app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...app, publie: !app.publie }),
      });
      const data = await res.json();
      if (data.success) {
        setApps(prev => prev.map(a => a.id === app.id ? data.app : a));
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la mise à jour');
    }
  };

  const filtered = apps.filter(a => {
    const matchSearch = a.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.categorie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === 'tous' ||
      (filterStatus === 'publie' && a.publie) ||
      (filterStatus === 'brouillon' && !a.publie);
    const matchType = !filterType || a.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-text-secondary">Chargement des apps...</p>
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
          <button onClick={loadApps} className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition-colors">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const totalPublies = apps.filter(a => a.publie).length;
  const totalBrouillons = apps.filter(a => !a.publie).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">Gestion du Store</h1>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span>{apps.length} app{apps.length > 1 ? 's' : ''} au total</span>
                <span className="text-accent font-semibold">{totalPublies} publiée{totalPublies > 1 ? 's' : ''}</span>
                <span className="text-text-muted">{totalBrouillons} brouillon{totalBrouillons > 1 ? 's' : ''}</span>
              </div>
            </div>
            <Link
              href="/admin/apps/new"
              className={cn(
                "inline-flex items-center gap-2",
                "bg-accent text-white",
                "px-6 py-3 font-semibold",
                "hover:bg-accent/90 transition-colors"
              )}
            >
              <Plus className="w-5 h-5" />
              Nouvelle app
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Rechercher par nom ou catégorie..."
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
              <option value="publie">Publiées</option>
              <option value="brouillon">Brouillons</option>
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className={cn(
                "px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
              )}
            >
              <option value="">Tous les types</option>
              <option value="web">Web App</option>
              <option value="saas">SaaS</option>
              <option value="executable">Exécutable</option>
            </select>
          </div>

          {(searchTerm || filterStatus !== 'tous' || filterType) && (
            <div className="flex items-center gap-3 mt-3">
              <p className="text-text-secondary text-sm">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterStatus('tous'); setFilterType(''); }}
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
            <p className="text-text-secondary mb-2">Aucune app trouvée</p>
            <Link href="/admin/apps/new" className="text-accent hover:underline text-sm">
              Créer la première app →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map(app => (
              <div
                key={app.id}
                className={cn(
                  "border-2 p-5 transition-all duration-200 group",
                  app.publie
                    ? "bg-surface-1/10 border-border/20 hover:border-accent/50"
                    : "bg-surface-1/5 border-dashed border-border/30 hover:border-accent/30"
                )}
              >
                <div className="flex gap-4">
                  {/* Icône */}
                  <div className="w-16 h-16 flex-shrink-0 bg-surface-2 overflow-hidden flex items-center justify-center">
                    {app.icone_url ? (
                      <img
                        src={app.icone_url}
                        alt={app.nom}
                        className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <Globe className="w-8 h-8 text-text-muted/40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                            {app.nom}
                          </h3>
                          {app.version && (
                            <span className="text-xs text-text-muted font-mono">v{app.version}</span>
                          )}
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-semibold shrink-0",
                            app.publie ? "bg-green-500/10 text-green-500" : "bg-surface-2 text-text-muted"
                          )}>
                            {app.publie ? 'Publiée' : 'Brouillon'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                          <span className="bg-accent/10 text-accent px-2 py-0.5 font-semibold">
                            {app.categorie}
                          </span>
                          <span className="flex items-center gap-1">
                            {TYPE_ICON[app.type]}
                            {TYPE_LABEL[app.type] || app.type}
                          </span>
                          {app.plateforme.length > 0 && (
                            <span>{app.plateforme.join(', ')}</span>
                          )}
                          <span className="font-mono opacity-60">/store/{app.slug}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleTogglePublie(app)}
                          className={cn(
                            "p-2 transition-colors duration-200",
                            app.publie
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                              : "bg-surface-2 text-text-muted hover:bg-accent/10 hover:text-accent"
                          )}
                          title={app.publie ? 'Dépublier' : 'Publier'}
                        >
                          {app.publie ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <Link
                          href={`/admin/apps/${app.id}`}
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
                          onClick={() => handleDelete(app.id, app.nom)}
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

                    {app.tagline && (
                      <p className="text-sm text-text-secondary line-clamp-1 mt-1">{app.tagline}</p>
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
