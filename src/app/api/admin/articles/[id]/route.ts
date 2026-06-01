import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Article non trouvé' }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article: data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.slug || !body.titre || !body.auteur || !body.date_publication || !body.categorie) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants : slug, titre, auteur, date_publication, categorie' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        slug: body.slug,
        titre: body.titre,
        auteur: body.auteur,
        date_publication: body.date_publication,
        categorie: body.categorie,
        image_src: body.image_src || null,
        extrait: body.extrait || null,
        contenu: body.contenu || null,
        publie: body.publie ?? false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const message = error.code === '23505'
        ? 'Ce slug est déjà utilisé par un autre article'
        : error.code === 'PGRST116'
          ? 'Article non trouvé'
          : error.message;
      const status = error.code === 'PGRST116' ? 404 : error.code === '23505' ? 400 : 500;
      return NextResponse.json({ success: false, error: message }, { status });
    }

    return NextResponse.json({ success: true, article: data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: article, error: selectError } = await supabaseAdmin
      .from('articles')
      .select('titre')
      .eq('id', id)
      .single();

    if (selectError) {
      if (selectError.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Article non trouvé' }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: selectError.message }, { status: 500 });
    }

    const { error: deleteError } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ success: false, error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Article "${article.titre}" supprimé` });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
