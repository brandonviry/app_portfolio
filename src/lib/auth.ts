import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Utilisateur admin (stocké en variable d'environnement)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const timestamp = new Date().toISOString();

        // Validation des credentials
        if (!credentials?.email || !credentials?.password) {
          console.warn(`[AUTH] ${timestamp} - Tentative de connexion avec credentials manquants`);
          return null;
        }

        // Vérification de la configuration
        if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
          console.error(`[AUTH] ${timestamp} - ERREUR CONFIGURATION: Variables d'environnement manquantes`);
          return null;
        }

        // Vérification email
        if (credentials.email !== ADMIN_EMAIL) {
          console.warn(`[AUTH] ${timestamp} - Tentative de connexion échouée pour: ${credentials.email}`);
          return null;
        }

        // Vérification password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          ADMIN_PASSWORD_HASH as string
        );

        if (!isValid) {
          console.warn(`[AUTH] ${timestamp} - Échec d'authentification pour: ${credentials.email}`);
          return null;
        }

        // Connexion réussie
        console.info(`[AUTH] ${timestamp} - Connexion réussie pour: ${credentials.email}`);

        return {
          id: "1",
          email: ADMIN_EMAIL,
          name: "Admin"
        };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname === '/admin/login';

      if (isOnAdmin && !isOnLogin) {
        if (!isLoggedIn) return false;
        return true;
      }

      return true;
    }
  },
  session: {
    strategy: "jwt",
  },
});
