import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, apps: data, count: data?.length ?? 0 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.slug || !body.nom || !body.categorie || !body.type || !body.cta_primaire_url) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants : slug, nom, categorie, type, cta_primaire_url' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('apps')
      .insert([{
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
      }])
      .select()
      .single();

    if (error) {
      const message = error.code === '23505'
        ? 'Ce slug est déjà utilisé par une autre app'
        : error.message;
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true, app: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
