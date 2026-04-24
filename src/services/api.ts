import { mockMarkets, getMockTrades, getMockOrderBook, generateChartData, categories, marketStats } from './mockData';
import type { Market, Trade, OrderBook, ChartDataPoint, Category, FilterState, MarketStats } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getMarkets(filters?: Partial<FilterState>): Promise<Market[]> {
    await delay(300 + Math.random() * 200);
    let markets = [...mockMarkets];

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      markets = markets.filter(
        m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || m.tags.some(t => t.includes(q))
      );
    }

    if (filters?.category && filters.category !== 'all') {
      markets = markets.filter(m => m.category === filters.category);
    }

    if (filters?.status && filters.status !== 'all') {
      markets = markets.filter(m => m.status === filters.status);
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'trending':
          markets = markets.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
          break;
        case 'volume':
          markets = markets.sort((a, b) => b.volume - a.volume);
          break;
        case 'liquidity':
          markets = markets.sort((a, b) => b.liquidity - a.liquidity);
          break;
        case 'endsSoon':
          markets = markets.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
          break;
        case 'newest':
          markets = markets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return markets;
  },

  async getMarket(id: string): Promise<Market | null> {
    await delay(200);
    return mockMarkets.find(m => m.id === id) || null;
  },

  async getTrades(marketId: string): Promise<Trade[]> {
    await delay(200);
    return getMockTrades(marketId);
  },

  async getOrderBook(_marketId: string, yesOdds: number): Promise<OrderBook> {
    await delay(150);
    return getMockOrderBook(yesOdds);
  },

  async getChartData(_marketId: string, yesOdds: number, timeRange: string): Promise<ChartDataPoint[]> {
    await delay(250);
    return generateChartData(yesOdds, timeRange);
  },

  async getCategories(): Promise<Category[]> {
    await delay(100);
    return categories;
  },

  async getMarketStats(): Promise<MarketStats> {
    await delay(100);
    return marketStats;
  },
};

export default api;
