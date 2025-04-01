import { notion } from './client';

export type Competence = {
  description: string;
  CompTechnique: string[];
  lang: string[];
};

export async function getCompetences() {
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

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        description: properties.description?.title[0]?.plain_text || '',
        CompTechnique: properties.CompTechnique?.multi_select?.map((tag: any) => tag.name) || [],
        lang: properties.lang?.multi_select?.map((tag: any) => tag.name) || [],
      };
    });
  } catch (error) {
    console.error('Error fetching Notion CV database:', error);
    throw error;
  }
}
