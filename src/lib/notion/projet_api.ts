import { notion } from './client';
import { 
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Project = {
  titre: string;
  Description: string;
  Cover?: string;
  Lien?: string;
};

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

export async function getProjects(): Promise<Project[]> {
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

    const getRichText = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'rich_text' in prop) {
        const richTextProp = prop as RichTextPropertyItemObjectResponse;
        const richTextArray = richTextProp.rich_text;
        if (Array.isArray(richTextArray) && richTextArray.length > 0) {
          return richTextArray[0].plain_text;
        }
      }
      return '';
    };

    const getUrl = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'url' in prop) {
        const urlProp = prop as UrlPropertyItemObjectResponse;
        return urlProp.url || '';
      }
      return '';
    };

    return response.results.map((page: NotionPage) => {
      if (!('properties' in page)) return { titre: '', Description: '' };
      
      const properties = page.properties;
      const cover = getRichText(properties['Cover ']) || 
                   getUrl(properties.Cover) || 
                   getRichText(properties.Cover) || 
                   '';

      return {
        titre: getTitle(properties.titre),
        Description: getRichText(properties.Description),
        Cover: cover,
        Lien: getRichText(properties.Lien) || getUrl(properties.lien) || '',
      };
    });
  } catch (error) {
    console.error('Error fetching projects from Notion database:', error);
    return [];
  }
}
