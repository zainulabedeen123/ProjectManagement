'use client';

import { CalendarDays, Users } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  teamSize: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export function ProjectCard({
  title,
  description,
  progress,
  dueDate,
  status,
  teamSize,
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Review':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-1" />
          <span>{formatDate(dueDate)}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{teamSize} members</span>
        </div>
      </div>
    </div>
  );
} 