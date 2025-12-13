import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome, onNavigateAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-6 border-x border-gray-100 bg-white shadow-sm">
      <header className="py-12 flex justify-between items-baseline border-b border-gray-100 mb-12">
        <h1 
            onClick={onNavigateHome}
            className="text-2xl font-bold tracking-tighter cursor-pointer hover:text-gray-600 transition-colors"
        >
          DevNotebook<span className="text-gray-400">.mdx</span>
        </h1>
        <nav>
          <button 
            onClick={onNavigateAdmin}
            className="text-sm font-mono text-gray-400 hover:text-gray-900 transition-colors"
          >
            /admin
          </button>
        </nav>
      </header>

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
