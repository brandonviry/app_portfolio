#!/usr/bin/env node

/**
 * Script de migration des projets vers Supabase
 *
 * Usage: node scripts/migrate-to-supabase.js
 *
 * Prérequis:
 * - Avoir configuré SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erreur: Variables d\'environnement manquantes');
  console.error('   Assurez-vous que SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définis dans .env.local');
  process.exit(1);
}

// Créer le client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Importer les données locales
const projectsDataPath = path.join(__dirname, '../src/store/projects_data.ts');

// Fonction pour charger dynamiquement le module TypeScript
async function loadProjectsData() {
  try {
    // En Node.js, on ne peut pas directement importer du TypeScript
    // On va lire le fichier et extraire les données
    const fs = require('fs');
    const content = fs.readFileSync(projectsDataPath, 'utf-8');

    // Extraire le tableau de projets du fichier TypeScript
    const match = content.match(/export const projectsData: Project\[\] = (\[[\s\S]*\]);/);

    if (!match) {
      throw new Error('Impossible de trouver projectsData dans le fichier');
    }

    // Évaluer le contenu JSON
    const projectsData = eval(match[1]);
    return projectsData;
  } catch (error) {
    console.error('❌ Erreur lors du chargement des données:', error.message);
    process.exit(1);
  }
}

async function migrateProjects() {
  console.log('🚀 Début de la migration vers Supabase...\n');

  // Charger les données
  const projectsData = await loadProjectsData();

  console.log(`📊 ${projectsData.length} projets trouvés dans projects_data.ts\n`);

  // Transformer les données pour correspondre au schéma Supabase
  const projectsForSupabase = projectsData.map(project => ({
    titre: project.titre,
    description: project.Description, // Note: Majuscule dans le fichier local
    cover: project.Cover || null,
    lien: project.Lien || null,
    categories: project.categories || [],
    technologies: project.technologies || [],
    year: project.year || null
  }));

  // Insérer les projets par batch de 100 (limite Supabase)
  const batchSize = 100;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < projectsForSupabase.length; i += batchSize) {
    const batch = projectsForSupabase.slice(i, i + batchSize);

    console.log(`📤 Insertion du batch ${Math.floor(i / batchSize) + 1} (${batch.length} projets)...`);

    const { data, error } = await supabase
      .from('projects')
      .insert(batch)
      .select();

    if (error) {
      console.error(`❌ Erreur lors de l'insertion du batch:`, error.message);
      errors += batch.length;
    } else {
      inserted += data.length;
      console.log(`✅ ${data.length} projets insérés avec succès`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ DE LA MIGRATION');
  console.log('='.repeat(60));
  console.log(`Total:    ${projectsForSupabase.length} projets`);
  console.log(`✅ Succès: ${inserted} projets`);
  console.log(`❌ Erreurs: ${errors} projets`);
  console.log('='.repeat(60) + '\n');

  if (errors === 0) {
    console.log('🎉 Migration terminée avec succès !');
    console.log('\n📝 Prochaines étapes:');
    console.log('   1. Vérifiez les données dans l\'interface Supabase');
    console.log('   2. Mettez à jour les routes API pour utiliser Supabase');
    console.log('   3. Testez l\'interface admin en local');
    console.log('   4. Déployez sur Vercel avec les nouvelles variables d\'environnement\n');
  } else {
    console.log('⚠️  Migration terminée avec des erreurs');
    console.log('   Vérifiez les logs ci-dessus pour plus de détails\n');
  }
}

// Exécution
migrateProjects().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
