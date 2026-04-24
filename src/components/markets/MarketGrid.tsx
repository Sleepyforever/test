import React from 'react';
import type { Market, FilterState } from '../../types';
import MarketCard from './MarketCard';
import { MarketCardSkeleton } from '../common/Loading';
import MarketFilters from './MarketFilters';

interface MarketGridProps {
  markets: Market[];
  loading: boolean;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

const MarketGrid: React.FC<MarketGridProps> = ({ markets, loading, filters, onFilterChange }) => {
  return (
    <div>
      <MarketFilters filters={filters} onFilterChange={onFilterChange} totalCount={markets.length} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(9).fill(0).map((_, i) => <MarketCardSkeleton key={i} />)}
        </div>
      ) : markets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-dark-200 mb-2">No markets found</h3>
          <p className="text-dark-400 max-w-sm">
            Try adjusting your search query or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {markets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketGrid;
