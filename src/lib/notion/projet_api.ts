import { notion } from './client';

export type Project = {
  titre: string;
  Description: string;
  Cover?: string;
  Lien?: string;
};

export async function getProjects() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_PROJET!,
      sorts: [
        {
          property: 'titre',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        titre: properties.titre?.title[0]?.plain_text || '',
        Description: properties.Description?.rich_text[0]?.plain_text || '',
        Cover: properties['Cover ']?.rich_text[0]?.plain_text || properties.Cover?.url || properties.Cover?.rich_text[0]?.plain_text || '',
        Lien: properties.Lien?.rich_text[0]?.plain_text || properties.lien?.url || '',
      };
    });
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    throw error;
  }
}
