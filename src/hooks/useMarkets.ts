import { useState, useEffect, useCallback } from 'react';
import type { Market, FilterState, MarketStats } from '../types';
import api from '../services/api';

const defaultFilters: FilterState = {
  category: 'all',
  status: 'all',
  sortBy: 'trending',
  searchQuery: '',
};

export const useMarkets = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [stats, setStats] = useState<MarketStats | null>(null);

  const fetchMarkets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        api.getMarkets(filters),
        api.getMarketStats(),
      ]);
      setMarkets(data);
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch markets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return { markets, loading, error, filters, updateFilter, resetFilters, stats, refetch: fetchMarkets };
};

export const useMarket = (id: string) => {
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getMarket(id)
      .then(data => {
        setMarket(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Market not found');
        setLoading(false);
      });
  }, [id]);

  return { market, loading, error };
};
