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

function parseProjectsFromTS(content: string): Project[] {
  try {
    const match = content.match(/export const projectsData: Project\[\] = (\[[\s\S]*\]);/);
    if (!match) throw new Error('Format de fichier invalide');
    return new Function(`return ${match[1]}`)();
  } catch (error) {
    console.error('Erreur lors du parsing:', error);
    throw error;
  }
}

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
 * GET /api/admin/projects/[id]
 * Récupère un projet spécifique par son index
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectIndex = parseInt(id, 10);

    if (isNaN(projectIndex)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    const content = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = parseProjectsFromTS(content);

    if (projectIndex < 0 || projectIndex >= projects.length) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: projects[projectIndex],
      index: projectIndex
    });

  } catch (error) {
    console.error('Erreur GET /api/admin/projects/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du projet',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/projects/[id]
 * Met à jour un projet existant
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectIndex = parseInt(id, 10);

    if (isNaN(projectIndex)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    const updatedProject: Project = await request.json();

    // Validation
    if (!updatedProject.titre || !updatedProject.Description) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Backup automatique
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${PROJECTS_FILE}.backup-${timestamp}`;
    await fs.copyFile(PROJECTS_FILE, backupFile);

    // Lecture et modification
    const content = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = parseProjectsFromTS(content);

    if (projectIndex < 0 || projectIndex >= projects.length) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    projects[projectIndex] = updatedProject;

    // Écriture
    const newContent = generateTSContent(projects);
    await fs.writeFile(PROJECTS_FILE, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      project: updatedProject,
      index: projectIndex
    });

  } catch (error) {
    console.error('Erreur PUT /api/admin/projects/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du projet',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Supprime un projet
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectIndex = parseInt(id, 10);

    if (isNaN(projectIndex)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    // Backup automatique
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${PROJECTS_FILE}.backup-${timestamp}`;
    await fs.copyFile(PROJECTS_FILE, backupFile);

    // Lecture et suppression
    const content = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = parseProjectsFromTS(content);

    if (projectIndex < 0 || projectIndex >= projects.length) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);

    // Écriture
    const newContent = generateTSContent(projects);
    await fs.writeFile(PROJECTS_FILE, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Projet supprimé avec succès',
      deletedProject,
      remainingProjects: projects.length
    });

  } catch (error) {
    console.error('Erreur DELETE /api/admin/projects/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du projet',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
