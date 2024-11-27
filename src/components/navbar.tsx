'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, User, LayoutDashboard, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">
              Project Management
            </span>
            
            {session && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive('/') 
                      ? 'border-b-2 border-indigo-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>

                <Link
                  href="/todos"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive('/todos')
                      ? 'border-b-2 border-indigo-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Todo List
                </Link>
              </div>
            )}
          </div>
          
          {session && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <User className="h-5 w-5 mr-2" />
                <span>{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 