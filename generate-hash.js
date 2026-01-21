#!/usr/bin/env node

/**
 * Script de génération de hash bcrypt pour l'authentification admin
 *
 * Utilisation: node generate-hash.js <votre-mot-de-passe>
 *
 * Ce script génère:
 * - Un hash bcrypt sécurisé du mot de passe fourni
 * - Un secret aléatoire cryptographiquement sûr pour NextAuth
 *
 * Sécurité:
 * - Utilise bcrypt avec 12 rounds (recommandation OWASP 2024)
 * - Génère un secret de 256 bits en base64
 * - Les valeurs ne sont jamais stockées en clair
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Configuration
const BCRYPT_ROUNDS = 12; // Recommandation OWASP pour 2024
const SECRET_BYTES = 32;  // 256 bits

/**
 * Valide la force du mot de passe
 */
function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  return errors;
}

/**
 * Affiche l'aide
 */
function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          Générateur de hash pour authentification admin        ║
╚════════════════════════════════════════════════════════════════╝

Usage:
  node generate-hash.js <mot-de-passe>

Exemples:
  node generate-hash.js "MonMotDePasse123!"
  node generate-hash.js 'Admin$ecure2024'

Exigences mot de passe:
  • Minimum 8 caractères
  • Au moins une majuscule
  • Au moins une minuscule
  • Au moins un chiffre
  • Caractères spéciaux recommandés

Sécurité:
  • Hash bcrypt avec ${BCRYPT_ROUNDS} rounds (OWASP 2024)
  • Secret cryptographique de ${SECRET_BYTES * 8} bits
  • Échappement automatique pour fichiers .env
`);
}

/**
 * Point d'entrée principal
 */
function main() {
  // Récupération du mot de passe depuis les arguments
  const password = process.argv[2];

  // Vérification de la présence du mot de passe
  if (!password) {
    console.error('\n❌ Erreur: Mot de passe requis\n');
    showHelp();
    process.exit(1);
  }

  // Validation de la force du mot de passe
  const errors = validatePassword(password);

  if (errors.length > 0) {
    console.error('\n⚠️  Attention: Mot de passe faible\n');
    errors.forEach(error => console.error(`   • ${error}`));
    console.error('\n   Voulez-vous continuer quand même? (non recommandé)');
    console.error('   Pour un mot de passe sécurisé, utilisez --help\n');
  }

  try {
    // Génération du hash bcrypt
    console.log('\n🔐 Génération du hash bcrypt...');
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);

    // Génération du secret NextAuth
    console.log('🔑 Génération du secret NextAuth...');
    const secret = crypto.randomBytes(SECRET_BYTES).toString('base64');

    // Échappement des $ pour les fichiers .env
    const escapedHash = hash.replace(/\$/g, '\\$');

    // Affichage des résultats
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║              ✅ GÉNÉRATION RÉUSSIE                             ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('📋 Copiez ces lignes dans votre fichier .env.local :\n');
    console.log('─'.repeat(64));
    console.log('\n# NextAuth Configuration');
    console.log('NEXTAUTH_URL=http://localhost:3000');
    console.log(`NEXTAUTH_SECRET=${secret}`);
    console.log('\n# Admin Credentials');
    console.log('ADMIN_EMAIL=admin@example.com');
    console.log(`ADMIN_PASSWORD_HASH=${escapedHash}`);
    console.log('\n' + '─'.repeat(64));

    console.log('\n📝 Instructions:\n');
    console.log('   1. Ouvrez le fichier .env.local à la racine du projet');
    console.log('   2. Copiez-collez les lignes ci-dessus à la fin du fichier');
    console.log('   3. Modifiez ADMIN_EMAIL si nécessaire');
    console.log('   4. Sauvegardez le fichier');
    console.log('   5. Redémarrez le serveur: npm run dev\n');

    console.log('🔐 Connexion:\n');
    console.log(`   URL:           http://localhost:3000/admin/login`);
    console.log(`   Email:         admin@example.com (ou celui configuré)`);
    console.log(`   Mot de passe:  ${password}\n`);

    console.log('⚠️  Sécurité:\n');
    console.log('   • Ne committez JAMAIS le fichier .env.local');
    console.log('   • Ajoutez .env.local au .gitignore');
    console.log('   • Changez le mot de passe en production');
    console.log('   • Utilisez un gestionnaire de secrets en prod (Vercel, AWS Secrets)\n');

  } catch (error) {
    console.error('\n❌ Erreur lors de la génération:\n');
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
}

// Exécution
main();
