import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/projects/[id]
 * Récupère un projet spécifique par son UUID
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Projet non trouvé' },
          { status: 404 }
        );
      }

      console.error('Erreur Supabase GET /api/admin/projects/[id]:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la récupération du projet',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Erreur GET /api/admin/projects/[id]:', error);
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
 * PUT /api/admin/projects/[id]
 * Met à jour un projet existant
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedProject = await request.json();

    // Validation
    if (!updatedProject.titre || !updatedProject.description) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
        titre: updatedProject.titre,
        description: updatedProject.description,
        cover: updatedProject.cover || null,
        lien: updatedProject.lien || null,
        categories: updatedProject.categories,
        technologies: updatedProject.technologies,
        year: updatedProject.year || null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Projet non trouvé' },
          { status: 404 }
        );
      }

      console.error('Erreur Supabase PUT /api/admin/projects/[id]:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la mise à jour du projet',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      project: data
    });

  } catch (error) {
    console.error('Erreur PUT /api/admin/projects/[id]:', error);
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
 * DELETE /api/admin/projects/[id]
 * Supprime un projet
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer le projet avant de le supprimer (pour le retourner)
    const { data: project, error: selectError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (selectError) {
      if (selectError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Projet non trouvé' },
          { status: 404 }
        );
      }

      console.error('Erreur Supabase SELECT before DELETE:', selectError);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la récupération du projet',
          details: selectError.message
        },
        { status: 500 }
      );
    }

    // Supprimer le projet
    const { error: deleteError } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Erreur Supabase DELETE /api/admin/projects/[id]:', deleteError);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la suppression du projet',
          details: deleteError.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Projet supprimé avec succès',
      deletedProject: project
    });

  } catch (error) {
    console.error('Erreur DELETE /api/admin/projects/[id]:', error);
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
