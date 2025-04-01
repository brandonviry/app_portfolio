import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/notion/projet_api';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in GET /api/notion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
