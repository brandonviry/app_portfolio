import { notion } from './client';
import { 
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Competence = {
  description: string;
  CompTechnique: string[];
  lang: string[];
};

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

export async function getCompetences(): Promise<Competence[]> {
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

    return response.results.map((page: NotionPage) => {
      if (!('properties' in page)) return { description: '', CompTechnique: [], lang: [] };
      
      const properties = page.properties;

      const getTitle = (prop: unknown): string => {
        if (prop && typeof prop === 'object' && 'title' in prop) {
          const titleProp = prop as TitlePropertyItemObjectResponse;
          const titleArray = titleProp.title;
          if (Array.isArray(titleArray) && titleArray.length > 0) {
            return titleArray[0].plain_text;
          }
        }
        return '';
      };

      const getMultiSelect = (prop: unknown): string[] => {
        if (prop && typeof prop === 'object' && 'multi_select' in prop) {
          const multiSelectProp = prop as MultiSelectPropertyItemObjectResponse;
          return multiSelectProp.multi_select.map(tag => tag.name);
        }
        return [];
      };

      return {
        description: getTitle(properties.description),
        CompTechnique: getMultiSelect(properties.CompTechnique),
        lang: getMultiSelect(properties.lang),
      };
    });
  } catch (error) {
    console.error('Error fetching Notion CV database:', error);
    throw error;
  }
}
