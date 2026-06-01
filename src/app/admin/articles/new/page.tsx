'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Plus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

function todayFrench(): string {
  const d = new Date();
  return `${MOIS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function toSlug(titre: string): string {
  return titre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const CATEGORIES_SUGGEREES = ['Design', 'Développement', 'Graphisme', 'Branding', 'Tech', 'Tutoriel', 'Projet', 'Créativité'];
const DOMAINES_AUTORISES = ['i.ibb.co', 'images.unsplash.com', 'raw.githubusercontent.com', 'lokhatmedias.com'];

type ArticleForm = {
  slug: string;
  titre: string;
  auteur: string;
  date_publication: string;
  categorie: string;
  image_src: string;
  extrait: string;
  contenu: string;
  publie: boolean;
};

export default function NewArticlePage() {
  const router = useRouter();
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ArticleForm>({
    slug: '',
    titre: '',
    auteur: 'chikara974',
    date_publication: todayFrench(),
    categorie: '',
    image_src: '',
    extrait: '',
    contenu: '',
    publie: false,
  });

  const setField = <K extends keyof ArticleForm>(key: K, value: ArticleForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleTitreChange = (value: string) => {
    setField('titre', value);
    if (!slugManual) {
      setField('slug', toSlug(value));
    }
  };

  const handleSave = async () => {
    if (!form.titre.trim()) { alert('Le titre est requis'); return; }
    if (!form.slug.trim()) { alert('Le slug est requis'); return; }
    if (!form.categorie.trim()) { alert('La catégorie est requise'); return; }

    try {
      setSaving(true);
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          image_src: form.image_src || null,
          extrait: form.extrait || null,
          contenu: form.contenu || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/articles');
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
          <Link href="/admin/articles" className="inline-flex items-center gap-2 text-accent hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-text-primary">Nouvel article</h1>
          </div>
          <p className="text-text-secondary">Créer un nouvel article de blog</p>
        </div>

        <div className="space-y-6">

          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.titre}
              onChange={e => handleTitreChange(e.target.value)}
              autoFocus
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary placeholder:text-text-secondary",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="Ex: Mon guide complet sur Figma"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center mb-1">
              <span className="text-text-muted text-sm shrink-0">/blog/</span>
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
                placeholder="mon-guide-complet-sur-figma"
              />
            </div>
            <p className="text-xs text-text-secondary">
              Généré automatiquement depuis le titre.{' '}
              {slugManual && (
                <button
                  onClick={() => { setSlugManual(false); setField('slug', toSlug(form.titre)); }}
                  className="text-accent hover:underline"
                >
                  Resynchroniser depuis le titre
                </button>
              )}
            </p>
          </div>

          {/* Ligne : Auteur + Date + Catégorie */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Auteur</label>
              <input
                type="text"
                value={form.auteur}
                onChange={e => setField('auteur', e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Date de publication</label>
              <input
                type="text"
                value={form.date_publication}
                onChange={e => setField('date_publication', e.target.value)}
                className={cn(
                  "w-full px-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                )}
                placeholder="juin 2, 2026"
              />
              <p className="text-xs text-text-secondary mt-1">Format : mois jour, année</p>
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
                placeholder="Design"
              />
              <datalist id="categories-list">
                {CATEGORIES_SUGGEREES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          {/* Statut publié */}
          <div className={cn(
            "flex items-center justify-between p-4",
            "border-2",
            form.publie ? "border-green-500/30 bg-green-500/5" : "border-border/20 bg-surface-1/10"
          )}>
            <div>
              <p className="font-semibold text-text-primary">
                {form.publie ? 'Article publié' : 'Brouillon'}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {form.publie
                  ? 'Visible publiquement sur /blog'
                  : 'Non visible — sera enregistré comme brouillon'}
              </p>
            </div>
            <button
              onClick={() => setField('publie', !form.publie)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-semibold transition-all",
                form.publie
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-surface-2 text-text-secondary hover:border-accent/50 border-2 border-border/20 hover:text-accent"
              )}
            >
              {form.publie ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {form.publie ? 'Publié' : 'Publier'}
            </button>
          </div>

          {/* Image de couverture */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Image de couverture (URL)
            </label>
            <input
              type="url"
              value={form.image_src}
              onChange={e => setField('image_src', e.target.value)}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="https://i.ibb.co/example/image.jpg"
            />
            {form.image_src && (
              <div className="mt-3">
                <p className="text-xs text-text-secondary mb-2">Aperçu :</p>
                <img
                  src={form.image_src}
                  alt="Aperçu"
                  className="w-64 h-40 object-cover bg-surface-2 border-2 border-border/20"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="text-xs text-text-secondary mt-2">
              Hébergeurs recommandés : {DOMAINES_AUTORISES.join(', ')}
            </p>
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Extrait <span className="text-text-muted font-normal">(résumé court — affiché dans le listing et le SEO)</span>
            </label>
            <textarea
              value={form.extrait}
              onChange={e => setField('extrait', e.target.value)}
              rows={3}
              className={cn(
                "w-full px-4 py-3",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary resize-vertical",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="Une phrase ou deux décrivant l'article..."
            />
            <p className="text-xs text-text-secondary mt-1">{form.extrait.length} caractères</p>
          </div>

          {/* Contenu Markdown */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Contenu <span className="text-text-muted font-normal">(Markdown)</span>
            </label>
            <div className={cn(
              "mb-2 px-3 py-2 text-xs text-text-muted",
              "bg-surface-2 border border-border/20",
              "flex flex-wrap gap-x-4 gap-y-1"
            )}>
              <span>## Titre h2</span>
              <span>**gras**</span>
              <span>_italique_</span>
              <span>`code`</span>
              <span>- liste</span>
              <span>{">"} citation</span>
              <span>![alt](url) image</span>
              <span>URL YouTube/TikTok seule = embed auto</span>
            </div>
            <textarea
              value={form.contenu}
              onChange={e => setField('contenu', e.target.value)}
              rows={20}
              className={cn(
                "w-full px-4 py-3 font-mono text-sm",
                "bg-surface-1/10 border-2 border-border/20",
                "text-text-primary resize-vertical leading-6",
                "focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              placeholder="## Introduction&#10;&#10;Votre contenu en Markdown..."
            />
            <p className="text-xs text-text-secondary mt-1">{form.contenu.length} caractères</p>
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
              {saving ? 'Création...' : `Créer l'article${form.publie ? ' et publier' : ' (brouillon)'}`}
            </button>

            <Link
              href="/admin/articles"
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
