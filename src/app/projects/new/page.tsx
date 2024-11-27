'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormData {
  title: string;
  description: string;
  dueDate: string;
  teamSize: number;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
}

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    dueDate: '',
    teamSize: 1,
    status: 'Planning',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real application, this would be an API call to save the project
      // For now, we'll simulate saving by storing in localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const newProject = {
        ...formData,
        id: Date.now().toString(),
        progress: 0,
      };
      
      localStorage.setItem('projects', JSON.stringify([...existingProjects, newProject]));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              required
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              id="teamSize"
              required
              min="1"
              max="20"
              value={formData.teamSize}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              id="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Project
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 