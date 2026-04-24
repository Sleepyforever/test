import React from 'react';
import type { Market } from '../../types';

const formatVolume = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

interface MarketDetailProps {
  market: Market;
}

const MarketDetail: React.FC<MarketDetailProps> = ({ market }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4 flex-wrap">
          <span className="text-xs px-2 py-1 bg-dark-800 text-dark-400 rounded-full capitalize">{market.category}</span>
          {market.trending && (
            <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
              🔥 Trending
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            market.status === 'active'
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-dark-800 text-dark-400'
          }`}>
            {market.status === 'active' ? '● Active' : market.status}
          </span>
        </div>

        <h1 className="text-xl font-bold text-white mb-3">{market.title}</h1>
        <p className="text-dark-400 text-sm leading-relaxed">{market.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {market.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-dark-800 text-dark-500 rounded-full">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Current Odds */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-4">Current Odds</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{market.yesOdds}%</div>
            <div className="text-sm text-dark-400">YES</div>
            <div className="text-xs text-dark-500 mt-1">{market.yesOdds}¢ per share</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{market.noOdds}%</div>
            <div className="text-sm text-dark-400">NO</div>
            <div className="text-xs text-dark-500 mt-1">{market.noOdds}¢ per share</div>
          </div>
        </div>

        {/* Combined probability bar */}
        <div className="h-3 bg-dark-800 rounded-full overflow-hidden flex">
          <div className="bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500" style={{ width: `${market.yesOdds}%` }} />
          <div className="bg-gradient-to-r from-red-400 to-red-600 flex-1" />
        </div>
        <div className="flex justify-between text-xs text-dark-500 mt-1">
          <span>YES {market.yesOdds}%</span>
          <span>NO {market.noOdds}%</span>
        </div>
      </div>

      {/* Market Stats */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-4">Market Stats</h2>
        <div className="space-y-3">
          {[
            { label: '24h Change', value: `${market.change24h >= 0 ? '+' : ''}${market.change24h}%`, color: market.change24h >= 0 ? 'text-green-400' : 'text-red-400' },
            { label: 'Volume', value: formatVolume(market.volume) },
            { label: 'Liquidity', value: formatVolume(market.liquidity) },
            { label: 'Total Trades', value: market.totalTrades.toLocaleString() },
            { label: 'Ends', value: new Date(market.endDate).toLocaleDateString() },
            { label: 'Created', value: new Date(market.createdAt).toLocaleDateString() },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-dark-800 last:border-0">
              <span className="text-sm text-dark-400">{label}</span>
              <span className={`text-sm font-semibold ${color || 'text-dark-100'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
