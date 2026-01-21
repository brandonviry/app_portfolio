import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Si pas de session et pas sur la page de login, NextAuth redirigera automatiquement
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec déconnexion */}
      <header className="border-b-2 border-border/20 bg-surface-1/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
            >
              <Home className="w-5 h-5" />
              <h2 className="text-lg font-bold">
                Admin Panel
              </h2>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/admin/projects"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Projets
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-text-secondary">
                Connecté en tant que
              </p>
              <p className="text-sm font-semibold text-text-primary">
                {session.user?.email}
              </p>
            </div>

            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/admin/login' });
              }}
            >
              <button
                type="submit"
                className={cn(
                  "flex items-center gap-2",
                  "px-4 py-2",
                  "bg-red-500/10 text-red-500",
                  "border-2 border-red-500/30",
                  "hover:bg-red-500 hover:text-white hover:border-red-500",
                  "transition-all duration-200",
                  "font-semibold text-sm"
                )}
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main>
        {children}
      </main>
    </div>
  );
}
