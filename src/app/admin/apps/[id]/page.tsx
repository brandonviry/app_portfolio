'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Trash2, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function toSlug(nom: string): string {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const CATEGORIES_SUGGEREES = ['Productivité', 'Dev Tool', 'Design', 'Automatisation', 'Utilitaire', 'SaaS', 'Jeu', 'Autre'];
const PLATEFORMES = ['Web', 'Windows', 'Mac', 'Linux', 'Android', 'iOS'];

const CTA_LABELS: Record<string, string> = {
  web: 'Ouvrir l\'app',
  saas: 'Accéder',
  executable: 'Télécharger',
};

type AppForm = {
  id: string;
  slug: string;
  nom: string;
  tagline: string;
  description: string;
  categorie: string;
  type: string;
  icone_url: string;
  image_url: string;
  cta_primaire_label: string;
  cta_primaire_url: string;
  cta_secondaire_label: string;
  cta_secondaire_url: string;
  plateforme: string[];
  version: string;
  publie: boolean;
};

export default function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [form, setForm] = useState<AppForm>({
    id: '', slug: '', nom: '', tagline: '', description: '',
    categorie: '', type: 'web', icone_url: '', image_url: '',
    cta_primaire_label: 'Ouvrir l\'app', cta_primaire_url: '',
    cta_secondaire_label: '', cta_secondaire_url: '',
    plateforme: [], version: '', publie: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManual, setSlugManual] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/apps/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const a = data.app;
          setForm({
            id: a.id,
            slug: a.slug,
            nom: a.nom,
            tagline: a.tagline || '',
            description: a.description || '',
            categorie: a.categorie,
            type: a.type,
            icone_url: a.icone_url || '',
            image_url: a.image_url || '',
            cta_primaire_label: a.cta_primaire_label,
            cta_primaire_url: a.cta_primaire_url,
            cta_secondaire_label: a.cta_secondaire_label || '',
            cta_secondaire_url: a.cta_secondaire_url || '',
            plateforme: a.plateforme || [],
            version: a.version || '',
            publie: a.publie,
          });
        } else {
          setError(data.error || 'App introuvable');
        }
      })
      .catch(() => setError('Erreur de connexion'))
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof AppForm>(key: K, value: AppForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (value: string) => {
    setField('type', value);
    if (!form.cta_primaire_label || Object.values(CTA_LABELS).includes(form.cta_primaire_label)) {
      setField('cta_primaire_label', CTA_LABELS[value] || 'Ouvrir');
    }
  };

  const togglePlateforme = (p: string) => {
    setField('plateforme', form.plateforme.includes(p)
      ? form.plateforme.filter(x => x !== p)
      : [...form.plateforme, p]
    );
  };

  const handleSave = async () => {
    if (!form.nom.trim()) { alert('Le nom est requis'); return; }
    if (!form.slug.trim()) { alert('Le slug est requis'); return; }
    if (!form.categorie.trim()) { alert('La catégorie est requise'); return; }
    if (!form.cta_primaire_url.trim()) { alert('L\'URL principale est requise'); return; }

    try {
      setSaving(true);
      const res = await fetch(`/api/admin/apps/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tagline: form.tagline || null,
          description: form.description || null,
          icone_url: form.icone_url || null,
          image_url: form.image_url || null,
          cta_secondaire_label: form.cta_secondaire_label || null,
          cta_secondaire_url: form.cta_secondaire_url || null,
          version: form.version || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/apps');
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Supprimer définitivement "${form.nom}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/apps/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/apps');
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-text-secondary">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-red-500/10 border-2 border-red-500 p-6 max-w-md text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-500 font-semibold mb-2">Erreur</p>
          <p className="text-text-secondary text-sm mb-4">{error}</p>
          <Link href="/admin/apps" className="block bg-red-500 text-white px-4 py-2 text-center hover:bg-red-600 transition-colors">
            Retour au store
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
          <Link href="/admin/apps" className="inline-flex items-center gap-2 text-accent hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour au store
          </Link>
          <h1 className="text-4xl font-bold text-text-primary mb-1">Éditer l&apos;app</h1>
          <p className="text-text-secondary text-sm font-mono">/store/{form.slug}</p>
        </div>

        <div className="space-y-6">

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.nom}
              onChange={e => {
                setField('nom', e.target.value);
                if (!slugManual) setField('slug', toSlug(e.target.value));
              }}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center mb-1">
              <span className="text-text-muted text-sm shrink-0">/store/</span>
              <input
                type="text"
                value={form.slug}
                onChange={e => { setSlugManual(true); setField('slug', e.target.value); }}
                className={cn(
                  "flex-1 px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary font-mono text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
            </div>
            <p className="text-xs text-text-muted">
              ⚠️ Modifier le slug change l&apos;URL publique de l&apos;app.{' '}
              <button
                onClick={() => { setSlugManual(false); setField('slug', toSlug(form.nom)); }}
                className="text-accent hover:underline"
              >
                Regénérer depuis le nom
              </button>
            </p>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={e => setField('tagline', e.target.value)}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
            />
          </div>

          {/* Type + Catégorie + Version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Type <span className="text-red-500">*</span></label>
              <select
                value={form.type}
                onChange={e => handleTypeChange(e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
                )}
              >
                <option value="web">Web App</option>
                <option value="saas">SaaS</option>
                <option value="executable">Exécutable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Catégorie <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.categorie}
                onChange={e => setField('categorie', e.target.value)}
                list="categories-list"
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
              <datalist id="categories-list">
                {CATEGORIES_SUGGEREES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Version</label>
              <input
                type="text"
                value={form.version}
                onChange={e => setField('version', e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
            </div>
          </div>

          {/* Plateformes */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">Plateformes</label>
            <div className="flex flex-wrap gap-2">
              {PLATEFORMES.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlateforme(p)}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold border-2 transition-all",
                    form.plateforme.includes(p)
                      ? "bg-accent text-white border-accent"
                      : "bg-transparent text-text-secondary border-border/40 hover:border-accent/60 hover:text-accent"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Statut */}
          <div className={cn(
            "flex items-center justify-between p-4 border-2",
            form.publie ? "border-green-500/30 bg-green-500/5" : "border-border/20 bg-surface-1/10"
          )}>
            <div>
              <p className="font-semibold text-text-primary">{form.publie ? 'App publiée' : 'Brouillon'}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                {form.publie ? 'Visible publiquement sur /store' : 'Non visible du public'}
              </p>
            </div>
            <button
              onClick={() => setField('publie', !form.publie)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-semibold transition-all",
                form.publie
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-surface-2 text-text-secondary border-2 border-border/20 hover:border-accent/50 hover:text-accent"
              )}
            >
              {form.publie ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {form.publie ? 'Publiée' : 'Publier'}
            </button>
          </div>

          {/* Icône + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Icône (URL)</label>
              <input
                type="url"
                value={form.icone_url}
                onChange={e => setField('icone_url', e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
              {form.icone_url && (
                <img src={form.icone_url} alt="Icône" className="mt-2 w-16 h-16 object-cover border border-border/20"
                  onError={e => { e.currentTarget.style.display = 'none'; }} />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Image de couverture (URL)</label>
              <input
                type="url"
                value={form.image_url}
                onChange={e => setField('image_url', e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
              {form.image_url && (
                <img src={form.image_url} alt="Cover" className="mt-2 w-full h-24 object-cover border border-border/20"
                  onError={e => { e.currentTarget.style.display = 'none'; }} />
              )}
            </div>
          </div>

          {/* CTA Principal */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              CTA principal <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={form.cta_primaire_label}
                onChange={e => setField('cta_primaire_label', e.target.value)}
                className={cn(
                  "px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
              <input
                type="url"
                value={form.cta_primaire_url}
                onChange={e => setField('cta_primaire_url', e.target.value)}
                className={cn(
                  "md:col-span-2 px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
            </div>
          </div>

          {/* CTA Secondaire */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              CTA secondaire <span className="text-text-muted font-normal">(optionnel)</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={form.cta_secondaire_label}
                onChange={e => setField('cta_secondaire_label', e.target.value)}
                className={cn(
                  "px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="En savoir plus"
              />
              <input
                type="url"
                value={form.cta_secondaire_url}
                onChange={e => setField('cta_secondaire_url', e.target.value)}
                className={cn(
                  "md:col-span-2 px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              rows={6}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary resize-vertical",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
            />
            <p className="text-xs text-text-secondary mt-1">{form.description.length} caractères</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t-2 border-border/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2",
                "bg-accent text-white px-6 py-3 font-semibold",
                "hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                "bg-red-500/10 text-red-500 px-6 py-3 font-semibold",
                "border-2 border-red-500 hover:bg-red-500 hover:text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              )}
            >
              <Trash2 className="w-5 h-5" />
              Supprimer
            </button>

            <Link
              href="/admin/apps"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-surface-1/10 text-text-primary px-6 py-3",
                "border-2 border-border/20 hover:border-accent/50 transition-colors"
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
