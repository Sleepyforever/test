import React from 'react';
import { Link } from 'react-router-dom';
import type { Market } from '../../types';

const formatVolume = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

const formatDate = (d: string) => {
  const date = new Date(d);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Ended';
  if (diffDays === 0) return 'Ends today';
  if (diffDays === 1) return 'Ends tomorrow';
  if (diffDays < 30) return `${diffDays}d left`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo left`;
  return `${Math.ceil(diffDays / 365)}yr left`;
};

interface MarketCardProps {
  market: Market;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <Link to={`/market/${market.id}`} className="block group">
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-5 hover:border-dark-500 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 bg-dark-800 text-dark-400 rounded-full capitalize">{market.category}</span>
            {market.trending && (
              <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full flex items-center gap-1">
                🔥 Trending
              </span>
            )}
          </div>
          <span className={`text-xs font-medium shrink-0 ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {market.change24h >= 0 ? '+' : ''}{market.change24h}%
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-dark-100 mb-2 line-clamp-2 group-hover:text-white transition-colors">
          {market.title}
        </h3>

        {/* Odds Bars */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${market.yesOdds}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-green-400 w-8 text-right">{market.yesOdds}%</span>
            <span className="text-xs text-dark-500 w-6">YES</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${market.noOdds}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-red-400 w-8 text-right">{market.noOdds}%</span>
            <span className="text-xs text-dark-500 w-6">NO</span>
          </div>
        </div>

        {/* Outcome Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-green-400">{market.yesOdds}¢</div>
            <div className="text-xs text-dark-400">YES</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-red-400">{market.noOdds}¢</div>
            <div className="text-xs text-dark-400">NO</div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-xs text-dark-500 border-t border-dark-800 pt-3">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatVolume(market.volume)} vol</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDate(market.endDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{market.totalTrades.toLocaleString()} trades</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MarketCard;
