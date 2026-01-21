import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PROJECTS_FILE = path.join(process.cwd(), 'src/store/projects_data.ts');

type Project = {
  titre: string;
  Description: string;
  Cover?: string | undefined;
  Lien?: string | undefined;
  categories: string[];
  technologies: string[];
  year?: number;
};

/**
 * Parse le fichier TypeScript pour extraire le tableau de projets
 */
function parseProjectsFromTS(content: string): Project[] {
  try {
    // Extraction du tableau entre "export const projectsData: Project[] = [" et le dernier "];"
    const match = content.match(/export const projectsData: Project\[\] = (\[[\s\S]*\]);/);

    if (!match) {
      throw new Error('Format de fichier invalide');
    }

    // Utiliser une évaluation sécurisée via Function constructor
    // Plus sûr que eval() car limité au scope
    const projectsArrayStr = match[1];
    const projects = new Function(`return ${projectsArrayStr}`)();

    return projects;
  } catch (error) {
    console.error('Erreur lors du parsing du fichier TS:', error);
    throw error;
  }
}

/**
 * Génère le contenu TypeScript du fichier projects_data.ts
 */
function generateTSContent(projects: Project[]): string {
  return `/**
 * Store local pour les données de projets
 */

export type Project = {
  titre: string;
  Description: string;
  Cover?: string | undefined;
  Lien?: string | undefined;
  categories: string[];      // Catégories principales (Web, WordPress, Jeux, etc.)
  technologies: string[];    // Technologies utilisées (React, Python, etc.)
  year?: number;            // Année du projet (optionnel)
};

export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

/**
 * GET /api/admin/projects
 * Retourne la liste de tous les projets
 */
export async function GET() {
  try {
    const content = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = parseProjectsFromTS(content);

    return NextResponse.json({
      success: true,
      projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la lecture des projets',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/projects
 * Crée un nouveau projet
 */
export async function POST(request: NextRequest) {
  try {
    const newProject: Project = await request.json();

    // Validation des champs requis
    if (!newProject.titre || !newProject.Description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Les champs "titre" et "Description" sont requis'
        },
        { status: 400 }
      );
    }

    // Validation des tableaux
    if (!Array.isArray(newProject.categories) || !Array.isArray(newProject.technologies)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Les champs "categories" et "technologies" doivent être des tableaux'
        },
        { status: 400 }
      );
    }

    // Backup automatique avant modification
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${PROJECTS_FILE}.backup-${timestamp}`;
    await fs.copyFile(PROJECTS_FILE, backupFile);

    // Lecture du fichier actuel
    const content = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = parseProjectsFromTS(content);

    // Ajout du nouveau projet
    projects.push(newProject);

    // Génération du nouveau contenu TS
    const newContent = generateTSContent(projects);

    // Écriture du fichier
    await fs.writeFile(PROJECTS_FILE, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Projet créé avec succès',
      project: newProject,
      totalProjects: projects.length
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur POST /api/admin/projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création du projet',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
