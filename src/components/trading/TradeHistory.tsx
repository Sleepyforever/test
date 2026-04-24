import React from 'react';
import type { Trade } from '../../types';

interface TradeHistoryProps {
  trades: Trade[];
  loading?: boolean;
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
};

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades, loading }) => {
  if (loading) {
    return (
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-dark-300 mb-4">Recent Trades</h3>
        <div className="space-y-2">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-8 bg-dark-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-dark-300">Recent Trades</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-dark-500">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-xs text-dark-500 mb-2 px-1">
        <span>Type</span>
        <span className="text-center">Price</span>
        <span className="text-center">Amount</span>
        <span className="text-right">Time</span>
      </div>

      <div className="space-y-0.5 max-h-80 overflow-y-auto">
        {trades.map(trade => (
          <div key={trade.id} className="grid grid-cols-4 text-xs py-1 px-1 hover:bg-dark-800 rounded transition-colors">
            <span className={`font-semibold ${trade.type === 'yes' ? 'text-green-400' : 'text-red-400'}`}>
              {trade.type.toUpperCase()}
            </span>
            <span className="text-center text-dark-200 font-mono">{(trade.price * 100).toFixed(0)}¢</span>
            <span className="text-center text-dark-300">${trade.amount.toLocaleString()}</span>
            <span className="text-right text-dark-500">{formatTime(trade.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
