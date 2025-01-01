import React from 'react';
import { Outlet } from 'react-router-dom';
import { Accessibility } from 'lucide-react';
import { UserProfile } from './UserProfile';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Accessibility className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">AccessibleComm</span>
          </div>
          <UserProfile />
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};