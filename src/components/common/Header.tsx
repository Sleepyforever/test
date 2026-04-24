import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery = '' }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(localSearch);
    else navigate(`/?search=${encodeURIComponent(localSearch)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-dark-950/90 backdrop-blur-md border-b border-dark-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Predict<span className="text-blue-400">X</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search markets..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </form>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <Link to="/" className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Markets
            </Link>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors cursor-not-allowed opacity-50" title="Coming soon">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Portfolio
            </div>

            <div className="flex items-center gap-2 ml-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Live</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
