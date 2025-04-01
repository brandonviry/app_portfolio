import { NextResponse } from 'next/server';
import { getCompetences } from '@/lib/notion/comp_api';

export async function GET() {
  try {
    const competences = await getCompetences();
    return NextResponse.json(competences);
  } catch (error) {
    console.error('Error in competences API route:', error);
    return NextResponse.json({ error: 'Failed to fetch competences' }, { status: 500 });
  }
}
