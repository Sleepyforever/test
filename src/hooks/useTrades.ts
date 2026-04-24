import { useState, useEffect } from 'react';
import type { Trade, OrderBook, ChartDataPoint } from '../types';
import api from '../services/api';

export const useTrades = (marketId: string) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marketId) return;
    setLoading(true);
    api.getTrades(marketId)
      .then(data => {
        setTrades(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load trades');
        setLoading(false);
      });

    const interval = setInterval(() => {
      api.getTrades(marketId).then(setTrades);
    }, 10000);

    return () => clearInterval(interval);
  }, [marketId]);

  return { trades, loading, error };
};

export const useOrderBook = (marketId: string, yesOdds: number) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!marketId) return;
    api.getOrderBook(marketId, yesOdds)
      .then(data => {
        setOrderBook(data);
        setLoading(false);
      });

    const interval = setInterval(() => {
      api.getOrderBook(marketId, yesOdds).then(setOrderBook);
    }, 5000);

    return () => clearInterval(interval);
  }, [marketId, yesOdds]);

  return { orderBook, loading };
};

export const useChartData = (marketId: string, yesOdds: number, timeRange: string) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!marketId) return;
    setLoading(true);
    api.getChartData(marketId, yesOdds, timeRange)
      .then(data => {
        setChartData(data);
        setLoading(false);
      });
  }, [marketId, yesOdds, timeRange]);

  return { chartData, loading };
};
