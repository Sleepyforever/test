import React from 'react';
import type { FilterState } from '../../types';

interface MarketFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  totalCount: number;
}

const sortOptions = [
  { value: 'trending', label: '🔥 Trending' },
  { value: 'volume', label: '💰 Volume' },
  { value: 'liquidity', label: '💧 Liquidity' },
  { value: 'endsSoon', label: '⏰ Ends Soon' },
  { value: 'newest', label: '✨ Newest' },
];

const MarketFilters: React.FC<MarketFiltersProps> = ({ filters, onFilterChange, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2 text-sm text-dark-400">
        <span className="font-semibold text-dark-200">{totalCount}</span>
        <span>markets</span>
        {filters.category !== 'all' && (
          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 capitalize">
            {filters.category}
          </span>
        )}
        {filters.searchQuery && (
          <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
            "{filters.searchQuery}"
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Sort */}
        <div className="flex items-center gap-1 bg-dark-800 border border-dark-700 rounded-lg p-1">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onFilterChange('sortBy', opt.value)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                filters.sortBy === opt.value
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
