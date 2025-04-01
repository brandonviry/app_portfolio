import { getDescription } from '@/lib/notion/description_api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('Fetching description...');
    const description = await getDescription();
    console.log('Description received:', description);
    
    if (!description) {
      console.log('No description found');
      return NextResponse.json(
        { error: 'Description not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(description);
  } catch (error) {
    console.error('Error in description API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch description' },
      { status: 500 }
    );
  }
}
