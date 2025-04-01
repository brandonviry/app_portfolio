import { notion } from './client';
import type { 
  PageObjectResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Project = {
  titre: string;
  Description: string;
  Cover?: string | undefined;
  Lien?: string | undefined;
};

const isValidHttpUrl = (string: string) => {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

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

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => {
        const properties = page.properties;

        // Type guards pour vérifier le type de chaque propriété
        const isTitleProperty = (prop: unknown): prop is TitlePropertyItemObjectResponse =>
          Boolean(prop && typeof prop === 'object' && 'type' in prop && prop.type === 'title');

        const isRichTextProperty = (prop: unknown): prop is RichTextPropertyItemObjectResponse =>
          Boolean(prop && typeof prop === 'object' && 'type' in prop && prop.type === 'rich_text');

        const isUrlProperty = (prop: unknown): prop is UrlPropertyItemObjectResponse =>
          Boolean(prop && typeof prop === 'object' && 'type' in prop && prop.type === 'url');

        // Extraction des valeurs avec type checking
        const titre = isTitleProperty(properties.titre) ? properties.titre.title[0]?.plain_text : '';
        const description = isRichTextProperty(properties.Description) ? properties.Description.rich_text[0]?.plain_text : '';
        
        // Pour Cover, on essaie d'abord rich_text, puis url
        const coverRichText = isRichTextProperty(properties['Cover ']) ? properties['Cover '].rich_text[0]?.plain_text : '';
        const coverUrl = isUrlProperty(properties.Cover) ? properties.Cover.url : '';
        const cover = coverRichText || coverUrl;

        // Pour Lien, même logique
        const lienRichText = isRichTextProperty(properties.Lien) ? properties.Lien.rich_text[0]?.plain_text : '';
        const lienUrl = isUrlProperty(properties.lien) ? properties.lien.url : '';
        const lien = lienRichText || lienUrl;

        // Validation des URLs
        const validCover = cover && isValidHttpUrl(cover) ? cover : undefined;
        const validLien = lien && isValidHttpUrl(lien) ? lien : undefined;

        return {
          titre,
          Description: description,
          Cover: validCover,
          Lien: validLien,
        };
      });
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    throw error;
  }
}
