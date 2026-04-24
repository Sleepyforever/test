export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  volume: number;
  liquidity: number;
  endDate: string;
  createdAt: string;
  status: 'active' | 'resolved' | 'closed';
  resolution?: 'yes' | 'no';
  tags: string[];
  image?: string;
  trending: boolean;
  totalTrades: number;
  change24h: number;
}

export interface Trade {
  id: string;
  marketId: string;
  type: 'yes' | 'no';
  price: number;
  amount: number;
  timestamp: string;
  wallet: string;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface ChartDataPoint {
  time: string;
  yes: number;
  no: number;
  volume: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FilterState {
  category: string;
  status: string;
  sortBy: string;
  searchQuery: string;
}

export interface MarketStats {
  totalVolume: number;
  totalMarkets: number;
  activeMarkets: number;
  totalTrades: number;
}
