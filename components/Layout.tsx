import React from 'react';
import { Navbar1 } from '@/components/ui/navbar-1';

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome, onNavigateAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-6 border-x border-gray-100 bg-white shadow-sm">
      <Navbar1 onNavigateHome={onNavigateHome} onNavigateAdmin={onNavigateAdmin} />

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-12 mt-12 border-t border-gray-100 text-center">
        <p className="text-xs font-mono text-gray-400">
          © {new Date().getFullYear()} • Pure MDX & Git Workflow
        </p>
      </footer>
    </div>
  );
};
