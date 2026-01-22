import { NextResponse } from 'next/server';
import { supabase, convertProjectToLegacyFormat, type ProjectDB } from '@/lib/supabase';

/**
 * GET /api/projects
 * Route publique pour récupérer tous les projets
 * Utilisée par le portfolio côté client
 * Convertit les données au format legacy pour compatibilité
 */
export async function GET() {
  try {
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase GET /api/projects:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la récupération des projets',
          details: error.message
        },
        { status: 500 }
      );
    }

    // Convertir au format legacy (majuscules)
    const projects = (dbProjects || []).map((p: ProjectDB) => convertProjectToLegacyFormat(p));

    return NextResponse.json({
      success: true,
      projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Erreur GET /api/projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
