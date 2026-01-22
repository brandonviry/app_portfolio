import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/projects
 * Retourne la liste de tous les projets depuis Supabase
 */
export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase GET /api/admin/projects:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la récupération des projets',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projects,
      count: projects?.length || 0
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/projects:', error);
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

/**
 * POST /api/admin/projects
 * Crée un nouveau projet dans Supabase
 */
export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();

    // Validation des champs requis
    if (!newProject.titre || !newProject.description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Les champs "titre" et "description" sont requis'
        },
        { status: 400 }
      );
    }

    // Validation des tableaux
    if (!Array.isArray(newProject.categories) || !Array.isArray(newProject.technologies)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Les champs "categories" et "technologies" doivent être des tableaux'
        },
        { status: 400 }
      );
    }

    // Insérer dans Supabase
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        titre: newProject.titre,
        description: newProject.description,
        cover: newProject.cover || null,
        lien: newProject.lien || null,
        categories: newProject.categories,
        technologies: newProject.technologies,
        year: newProject.year || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase POST /api/admin/projects:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la création du projet',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Projet créé avec succès',
      project: data
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur POST /api/admin/projects:', error);
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
