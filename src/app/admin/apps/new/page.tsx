'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Plus, Eye, EyeOff } from 'lucide-react';
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

type AppForm = {
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

const CTA_LABELS: Record<string, string> = {
  web: 'Ouvrir l\'app',
  saas: 'Accéder',
  executable: 'Télécharger',
};

export default function NewAppPage() {
  const router = useRouter();
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<AppForm>({
    slug: '',
    nom: '',
    tagline: '',
    description: '',
    categorie: '',
    type: 'web',
    icone_url: '',
    image_url: '',
    cta_primaire_label: 'Ouvrir l\'app',
    cta_primaire_url: '',
    cta_secondaire_label: '',
    cta_secondaire_url: '',
    plateforme: [],
    version: '',
    publie: false,
  });

  const setField = <K extends keyof AppForm>(key: K, value: AppForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleNomChange = (value: string) => {
    setField('nom', value);
    if (!slugManual) setField('slug', toSlug(value));
  };

  const handleTypeChange = (value: string) => {
    setField('type', value);
    setField('cta_primaire_label', CTA_LABELS[value] || 'Ouvrir');
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
      const res = await fetch('/api/admin/apps', {
        method: 'POST',
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
      alert('Erreur lors de la création');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/apps" className="inline-flex items-center gap-2 text-accent hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour au store
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-text-primary">Nouvelle app</h1>
          </div>
          <p className="text-text-secondary">Ajouter une application au store</p>
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
              onChange={e => handleNomChange(e.target.value)}
              autoFocus
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary placeholder:text-text-secondary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="Ex: TaskFlow Pro"
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
                placeholder="taskflow-pro"
              />
            </div>
            {slugManual && (
              <button
                onClick={() => { setSlugManual(false); setField('slug', toSlug(form.nom)); }}
                className="text-xs text-accent hover:underline"
              >
                Resynchroniser depuis le nom
              </button>
            )}
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Tagline <span className="text-text-muted font-normal">(accroche courte — affiché dans le listing)</span>
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={e => setField('tagline', e.target.value)}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary placeholder:text-text-secondary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="Ex: Gérez vos tâches sans effort"
            />
          </div>

          {/* Type + Catégorie + Version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Type <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Catégorie <span className="text-red-500">*</span>
              </label>
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
                placeholder="Productivité"
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
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="1.0.0"
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
                {form.publie ? 'Visible publiquement sur /store' : 'Non visible — enregistrée comme brouillon'}
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
                placeholder="https://..."
              />
              {form.icone_url && (
                <img src={form.icone_url} alt="Aperçu icône" className="mt-2 w-16 h-16 object-cover border border-border/20"
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
                placeholder="https://..."
              />
              {form.image_url && (
                <img src={form.image_url} alt="Aperçu cover" className="mt-2 w-full h-24 object-cover border border-border/20"
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
                placeholder="Label du bouton"
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
                placeholder="https://mon-app.com"
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

          {/* Description longue */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Description <span className="text-text-muted font-normal">(page détail)</span>
            </label>
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
              placeholder="Description détaillée de l'app, ses fonctionnalités, son contexte..."
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
                "bg-accent text-white px-6 py-4 font-bold text-lg",
                "hover:bg-accent/90",
                "disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              )}
            >
              <Save className="w-6 h-6" />
              {saving ? 'Création...' : `Créer l'app${form.publie ? ' et publier' : ' (brouillon)'}`}
            </button>

            <Link
              href="/admin/apps"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-surface-1/10 text-text-primary px-6 py-4",
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
