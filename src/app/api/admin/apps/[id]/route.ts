import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('apps')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'App non trouvée' }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, app: data });
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

    if (!body.slug || !body.nom || !body.categorie || !body.type || !body.cta_primaire_url) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants : slug, nom, categorie, type, cta_primaire_url' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('apps')
      .update({
        slug: body.slug,
        nom: body.nom,
        tagline: body.tagline || null,
        description: body.description || null,
        categorie: body.categorie,
        type: body.type,
        icone_url: body.icone_url || null,
        image_url: body.image_url || null,
        cta_primaire_label: body.cta_primaire_label || 'Ouvrir',
        cta_primaire_url: body.cta_primaire_url,
        cta_secondaire_label: body.cta_secondaire_label || null,
        cta_secondaire_url: body.cta_secondaire_url || null,
        plateforme: body.plateforme || [],
        version: body.version || null,
        publie: body.publie ?? false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const message = error.code === '23505'
        ? 'Ce slug est déjà utilisé par une autre app'
        : error.code === 'PGRST116'
          ? 'App non trouvée'
          : error.message;
      const status = error.code === 'PGRST116' ? 404 : error.code === '23505' ? 400 : 500;
      return NextResponse.json({ success: false, error: message }, { status });
    }

    return NextResponse.json({ success: true, app: data });
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

    const { data: app, error: selectError } = await supabaseAdmin
      .from('apps')
      .select('nom')
      .eq('id', id)
      .single();

    if (selectError) {
      if (selectError.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'App non trouvée' }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: selectError.message }, { status: 500 });
    }

    const { error: deleteError } = await supabaseAdmin
      .from('apps')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ success: false, error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `App "${app.nom}" supprimée` });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
