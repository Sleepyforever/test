import type { Market, Trade, OrderBook, ChartDataPoint, Category, MarketStats } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 11);

const formatWallet = (seed: number) => {
  const hex = seed.toString(16).padStart(4, '0');
  return `0x${hex}...${(seed * 7).toString(16).padStart(4, '0')}`;
};

export const categories: Category[] = [
  { id: 'all', name: 'All Markets', icon: '🌐', count: 48 },
  { id: 'politics', name: 'Politics', icon: '🏛️', count: 15 },
  { id: 'crypto', name: 'Crypto', icon: '₿', count: 12 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 8 },
  { id: 'tech', name: 'Technology', icon: '💻', count: 6 },
  { id: 'economics', name: 'Economics', icon: '📈', count: 4 },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', count: 3 },
];

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by end of 2025?',
    description: 'This market resolves YES if Bitcoin (BTC) trades at or above $100,000 USD on any major exchange before December 31, 2025 at 11:59 PM UTC.',
    category: 'crypto',
    yesOdds: 68,
    noOdds: 32,
    volume: 2450000,
    liquidity: 890000,
    endDate: '2025-12-31',
    createdAt: '2025-01-15',
    status: 'active',
    tags: ['bitcoin', 'crypto', 'price'],
    trending: true,
    totalTrades: 4521,
    change24h: 3.2,
  },
  {
    id: '2',
    title: 'Will the US Federal Reserve cut rates in Q1 2025?',
    description: 'Resolves YES if the Federal Reserve announces an interest rate cut at their Q1 2025 meeting (January or March 2025).',
    category: 'economics',
    yesOdds: 45,
    noOdds: 55,
    volume: 1890000,
    liquidity: 670000,
    endDate: '2025-03-31',
    createdAt: '2025-01-10',
    status: 'active',
    tags: ['federal reserve', 'interest rates', 'economics'],
    trending: true,
    totalTrades: 3201,
    change24h: -1.5,
  },
  {
    id: '3',
    title: 'Will Apple release AR glasses in 2025?',
    description: 'Resolves YES if Apple officially announces and begins shipping a standalone AR glasses product (not Vision Pro) in calendar year 2025.',
    category: 'tech',
    yesOdds: 22,
    noOdds: 78,
    volume: 980000,
    liquidity: 420000,
    endDate: '2025-12-31',
    createdAt: '2025-01-20',
    status: 'active',
    tags: ['apple', 'ar', 'technology', 'wearables'],
    trending: false,
    totalTrades: 1850,
    change24h: 0.8,
  },
  {
    id: '4',
    title: 'Will Ethereum flip Bitcoin in market cap by 2026?',
    description: 'Resolves YES if Ethereum\'s total market capitalization exceeds Bitcoin\'s total market capitalization at any point before January 1, 2026.',
    category: 'crypto',
    yesOdds: 18,
    noOdds: 82,
    volume: 3120000,
    liquidity: 1200000,
    endDate: '2025-12-31',
    createdAt: '2025-01-05',
    status: 'active',
    tags: ['ethereum', 'bitcoin', 'flippening', 'crypto'],
    trending: true,
    totalTrades: 5670,
    change24h: 2.1,
  },
  {
    id: '5',
    title: 'Will SpaceX Starship complete an orbital mission in 2025?',
    description: 'Resolves YES if SpaceX\'s Starship completes a full orbital mission (reaching orbital altitude and completing at least one orbit) in 2025.',
    category: 'tech',
    yesOdds: 76,
    noOdds: 24,
    volume: 1560000,
    liquidity: 580000,
    endDate: '2025-12-31',
    createdAt: '2025-01-18',
    status: 'active',
    tags: ['spacex', 'starship', 'space', 'rocket'],
    trending: false,
    totalTrades: 2890,
    change24h: -0.5,
  },
  {
    id: '6',
    title: 'Premier League: Will Manchester City win the title?',
    description: 'Resolves YES if Manchester City Football Club wins the 2024-25 Premier League title.',
    category: 'sports',
    yesOdds: 35,
    noOdds: 65,
    volume: 2100000,
    liquidity: 760000,
    endDate: '2025-05-25',
    createdAt: '2025-01-01',
    status: 'active',
    tags: ['manchester city', 'premier league', 'football', 'sports'],
    trending: true,
    totalTrades: 6720,
    change24h: 1.3,
  },
  {
    id: '7',
    title: 'Will AI achieve AGI by 2030?',
    description: 'Resolves YES if a credible scientific consensus (e.g., majority of AI safety researchers) agrees that Artificial General Intelligence has been achieved before January 1, 2030.',
    category: 'tech',
    yesOdds: 28,
    noOdds: 72,
    volume: 4500000,
    liquidity: 1800000,
    endDate: '2029-12-31',
    createdAt: '2025-01-01',
    status: 'active',
    tags: ['ai', 'agi', 'artificial intelligence', 'technology'],
    trending: true,
    totalTrades: 9876,
    change24h: 0.5,
  },
  {
    id: '8',
    title: 'Will Solana surpass $500 in 2025?',
    description: 'Resolves YES if Solana (SOL) trades at or above $500 USD on any major exchange before December 31, 2025.',
    category: 'crypto',
    yesOdds: 52,
    noOdds: 48,
    volume: 1750000,
    liquidity: 620000,
    endDate: '2025-12-31',
    createdAt: '2025-01-22',
    status: 'active',
    tags: ['solana', 'sol', 'crypto', 'price'],
    trending: false,
    totalTrades: 3450,
    change24h: 4.8,
  },
  {
    id: '9',
    title: 'Will there be a US recession in 2025?',
    description: 'Resolves YES if the National Bureau of Economic Research (NBER) officially declares a US recession that begins in calendar year 2025.',
    category: 'economics',
    yesOdds: 30,
    noOdds: 70,
    volume: 2890000,
    liquidity: 1100000,
    endDate: '2025-12-31',
    createdAt: '2025-01-03',
    status: 'active',
    tags: ['recession', 'economics', 'us economy'],
    trending: false,
    totalTrades: 4320,
    change24h: -2.1,
  },
  {
    id: '10',
    title: 'Will Netflix release a live sports subscription in 2025?',
    description: 'Resolves YES if Netflix announces and launches a dedicated live sports subscription tier in the US market before December 31, 2025.',
    category: 'entertainment',
    yesOdds: 40,
    noOdds: 60,
    volume: 670000,
    liquidity: 280000,
    endDate: '2025-12-31',
    createdAt: '2025-01-25',
    status: 'active',
    tags: ['netflix', 'streaming', 'sports', 'entertainment'],
    trending: false,
    totalTrades: 1230,
    change24h: 1.9,
  },
  {
    id: '11',
    title: 'US Presidential Election 2028: Democrat wins?',
    description: 'Resolves YES if the Democratic Party candidate wins the 2028 US Presidential Election.',
    category: 'politics',
    yesOdds: 55,
    noOdds: 45,
    volume: 8900000,
    liquidity: 3200000,
    endDate: '2028-11-07',
    createdAt: '2025-01-01',
    status: 'active',
    tags: ['us election', 'politics', 'democrat', 'president'],
    trending: true,
    totalTrades: 18500,
    change24h: 0.3,
  },
  {
    id: '12',
    title: 'Will the Super Bowl 2026 be won by the Chiefs?',
    description: 'Resolves YES if the Kansas City Chiefs win Super Bowl LX in February 2026.',
    category: 'sports',
    yesOdds: 25,
    noOdds: 75,
    volume: 1200000,
    liquidity: 450000,
    endDate: '2026-02-08',
    createdAt: '2025-01-15',
    status: 'active',
    tags: ['nfl', 'super bowl', 'chiefs', 'football'],
    trending: false,
    totalTrades: 2100,
    change24h: -0.8,
  },
];

export const marketStats: MarketStats = {
  totalVolume: 45800000,
  totalMarkets: 248,
  activeMarkets: 186,
  totalTrades: 892340,
};

const generateTrades = (marketId: string, count: number): Trade[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: generateId(),
    marketId,
    type: Math.random() > 0.5 ? 'yes' : 'no',
    price: Math.round((0.3 + Math.random() * 0.65) * 100) / 100,
    amount: Math.round(100 + Math.random() * 9900),
    timestamp: new Date(Date.now() - i * 1000 * 60 * Math.ceil(Math.random() * 30)).toISOString(),
    wallet: formatWallet(Math.floor(Math.random() * 65535)),
  }));
};

export const getMockTrades = (marketId: string): Trade[] => generateTrades(marketId, 50);

export const getMockOrderBook = (yesOdds: number): OrderBook => {
  const midPrice = yesOdds / 100;
  const bids: { price: number; size: number; total: number }[] = [];
  const asks: { price: number; size: number; total: number }[] = [];

  let bidTotal = 0;
  for (let i = 0; i < 12; i++) {
    const price = Math.round((midPrice - 0.01 * (i + 1)) * 100) / 100;
    const size = Math.round(1000 + Math.random() * 9000);
    bidTotal += size;
    bids.push({ price, size, total: bidTotal });
  }

  let askTotal = 0;
  for (let i = 0; i < 12; i++) {
    const price = Math.round((midPrice + 0.01 * (i + 1)) * 100) / 100;
    const size = Math.round(1000 + Math.random() * 9000);
    askTotal += size;
    asks.push({ price, size, total: askTotal });
  }

  return { bids, asks };
};

export const generateChartData = (yesOdds: number, timeRange: string): ChartDataPoint[] => {
  const points = timeRange === '1H' ? 60 : timeRange === '1D' ? 24 : timeRange === '1W' ? 7 * 24 : 90 * 24;
  const interval = timeRange === '1H' ? 60 * 1000 : timeRange === '1D' ? 60 * 60 * 1000 : 60 * 60 * 1000;
  const data: ChartDataPoint[] = [];
  let currentYes = yesOdds / 100;

  for (let i = points; i >= 0; i--) {
    const time = new Date(Date.now() - i * interval);
    const change = (Math.random() - 0.5) * 0.03;
    currentYes = Math.max(0.05, Math.min(0.95, currentYes + change));
    const open = currentYes;
    const high = Math.min(0.99, currentYes + Math.random() * 0.02);
    const low = Math.max(0.01, currentYes - Math.random() * 0.02);
    const close = Math.max(0.01, Math.min(0.99, currentYes + (Math.random() - 0.5) * 0.01));
    const volume = Math.round(5000 + Math.random() * 45000);

    const label =
      timeRange === '1H'
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : timeRange === '1D'
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : time.toLocaleDateString([], { month: 'short', day: 'numeric' });

    data.push({
      time: label,
      yes: Math.round(close * 100),
      no: Math.round((1 - close) * 100),
      volume,
      open: Math.round(open * 100),
      close: Math.round(close * 100),
      high: Math.round(high * 100),
      low: Math.round(low * 100),
    });
  }

  return data;
};
