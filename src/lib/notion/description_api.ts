import { notion } from './client';
import { 
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Description = {
  description: string;
  CompTechnique: string[];
  lang: string[];
};

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

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

    const getTitle = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'title' in prop) {
        const titleProp = prop as TitlePropertyItemObjectResponse;
        const titleArray = titleProp.title;
        if (Array.isArray(titleArray)) {
          return titleArray.map(title => title.plain_text).join('');
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

    const firstPage = response.results[0] as NotionPage;
    if (!firstPage || !('properties' in firstPage)) {
      console.error('No valid description found in Notion database');
      return null;
    }

    const properties = firstPage.properties;
    return {
      description: getTitle(properties.description),
      CompTechnique: getMultiSelect(properties.CompTechnique),
      lang: getMultiSelect(properties.lang),
    };

  } catch (error) {
    console.error('Error fetching description from Notion database:', error);
    return null;
  }
}