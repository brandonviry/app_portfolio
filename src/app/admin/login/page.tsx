'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou mot de passe incorrect');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className={cn(
            "inline-block p-4 mb-4",
            "bg-accent/10 border-2 border-accent"
          )}>
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Admin Access
          </h1>
          <p className="text-text-secondary">
            Connexion à l&apos;interface d&apos;administration
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={cn(
                  "w-full pl-10 pr-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-200"
                )}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className={cn(
                  "w-full pl-10 pr-4 py-3",
                  "bg-surface-1/10 border-2 border-border/20",
                  "text-text-primary placeholder:text-text-secondary",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-200"
                )}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div className="bg-red-500/10 border-2 border-red-500 p-3 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3",
              "bg-accent text-white font-semibold",
              "hover:bg-accent/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Info sécurité */}
        <div className="mt-6 p-4 bg-surface-1/10 border-2 border-border/20">
          <p className="text-xs text-text-secondary text-center">
            🔒 Accès réservé aux administrateurs autorisés
          </p>
        </div>
      </div>
    </div>
  );
}
