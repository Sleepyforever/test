import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarkets } from '../hooks/useMarkets';
import MarketGrid from '../components/markets/MarketGrid';
import Sidebar from '../components/common/Sidebar';
import type { Category } from '../types';
import api from '../services/api';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { markets, loading, error, filters, updateFilter, stats } = useMarkets();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(cats => {
      setCategories(cats);
      setCategoriesLoading(false);
    });
  }, []);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) updateFilter('searchQuery', search);
  }, [searchParams]);

  const formatStat = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return `${n}`;
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Volume', value: `$${formatStat(stats.totalVolume)}`, icon: '💰', color: 'text-blue-400' },
            { label: 'Total Markets', value: stats.totalMarkets.toString(), icon: '📊', color: 'text-purple-400' },
            { label: 'Active Markets', value: stats.activeMarkets.toString(), icon: '🟢', color: 'text-green-400' },
            { label: 'Total Trades', value: formatStat(stats.totalTrades), icon: '⚡', color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="bg-dark-900 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className="text-xs text-dark-400">{s.label}</span>
              </div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={cat => updateFilter('category', cat)}
          loading={categoriesLoading}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {error ? (
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <MarketGrid
              markets={markets}
              loading={loading}
              filters={filters}
              onFilterChange={updateFilter}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
