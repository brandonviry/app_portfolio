import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, articles: data, count: data?.length ?? 0 });
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

    if (!body.slug || !body.titre || !body.auteur || !body.date_publication || !body.categorie) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants : slug, titre, auteur, date_publication, categorie' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert([{
        slug: body.slug,
        titre: body.titre,
        auteur: body.auteur,
        date_publication: body.date_publication,
        categorie: body.categorie,
        image_src: body.image_src || null,
        extrait: body.extrait || null,
        contenu: body.contenu || null,
        publie: body.publie ?? false,
      }])
      .select()
      .single();

    if (error) {
      const message = error.code === '23505'
        ? 'Ce slug est déjà utilisé par un autre article'
        : error.message;
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true, article: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
