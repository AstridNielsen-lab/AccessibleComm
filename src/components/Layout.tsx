import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Accessibility } from 'lucide-react';
import { UserProfile } from './UserProfile';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Accessibility className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">AccessibleComm</span>
          </Link>
          <UserProfile />
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Like Look Solutions</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvido por Julio Campos Machado
              </p>
              <a 
                href="https://likelook.wixsite.com/solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Visite nosso site
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <a 
                href="https://wa.me/5511970603441" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                <span>WhatsApp: (11) 97060-3441</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Like Look Solutions. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};