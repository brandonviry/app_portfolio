import { notion } from './client';

export type Description = {
  description: string;
  CompTechnique: string[];
  lang: string[];
};

export async function getDescription(): Promise<Description | null> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_CV!,
      sorts: [
        {
          property: 'description',
          direction: 'ascending',
        },
      ],
    });

    const result = response.results.map((page: any) => {
      const properties = page.properties;
      return {
        description: properties.description?.title.map((title: any) => title.plain_text).join('') || '',
        CompTechnique: properties.CompTechnique?.multi_select?.map((tag: any) => tag.name) || [],
        lang: properties.lang?.multi_select?.map((tag: any) => tag.name) || [],
      };
    })[0];

    return result || null;
  } catch (error) {
    console.error('Error fetching description from Notion:', error);
    return null;
  }
}