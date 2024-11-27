'use client';

import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { Navbar } from '@/components/navbar';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  teamSize: number;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and track your projects</p>
          </div>
          <Link
            href="/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
            <div className="mt-6">
              <Link
                href="/projects/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                progress={project.progress}
                dueDate={project.dueDate}
                status={project.status}
                teamSize={project.teamSize}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
