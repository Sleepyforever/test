import React from 'react';
import type { Category } from '../../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  const stats = [
    { label: 'Total Volume', value: '$45.8M', color: 'text-blue-400' },
    { label: 'Active Markets', value: '186', color: 'text-green-400' },
    { label: 'Total Trades', value: '892K', color: 'text-purple-400' },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-4">
        {/* Stats */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Platform Stats</h3>
          <div className="space-y-3">
            {stats.map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm text-dark-400">{s.label}</span>
                <span className={`text-sm font-semibold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Categories</h3>
          <div className="space-y-1">
            {loading
              ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-9 bg-dark-800 rounded-lg animate-pulse" />
                ))
              : categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-blue-500/20 text-blue-300' : 'bg-dark-700 text-dark-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-dark-200 mb-2">About PredictX</h3>
          <p className="text-xs text-dark-400 leading-relaxed">
            A prediction market platform where you can view market sentiment and trade history on real-world events.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
