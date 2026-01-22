'use client';

import { useEffect, useState } from 'react';
import { ProjectsSection } from "@/components/layout/sections/projets/projects-section";
import type { Project } from "@/lib/supabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.success) {
          setProjects(data.projects);
        } else {
          setError(data.error || 'Erreur lors du chargement des projets');
        }
      } catch (err) {
        setError('Erreur de connexion');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-500 font-semibold mb-2">Erreur</p>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return <ProjectsSection projects={projects} />;
}
