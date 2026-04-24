import React from 'react';
import type { OrderBook as OrderBookType } from '../../types';

interface OrderBookProps {
  orderBook: OrderBookType | null;
  loading?: boolean;
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook, loading }) => {
  if (loading || !orderBook) {
    return (
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-dark-300 mb-4">Order Book</h3>
        <div className="space-y-1">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-5 bg-dark-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(
    ...orderBook.bids.map(b => b.total),
    ...orderBook.asks.map(a => a.total),
  );

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-dark-300 mb-3">Order Book</h3>

      <div className="grid grid-cols-3 text-xs text-dark-500 mb-2 px-1">
        <span>Price</span>
        <span className="text-center">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (NO / sell) */}
      <div className="space-y-0.5 mb-2">
        {[...orderBook.asks].reverse().slice(0, 8).map((ask, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs py-0.5 px-1">
            <div
              className="absolute inset-0 bg-red-500/10 rounded"
              style={{ width: `${(ask.total / maxTotal) * 100}%`, right: 0, left: 'auto' }}
            />
            <span className="relative text-red-400 font-mono">{ask.price.toFixed(2)}</span>
            <span className="relative text-dark-300 text-center font-mono">{ask.size.toLocaleString()}</span>
            <span className="relative text-dark-400 text-right font-mono">{ask.total.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="text-center text-xs text-dark-500 py-1 border-y border-dark-800 mb-2">
        Spread: {orderBook.asks[0] && orderBook.bids[0]
          ? ((orderBook.asks[0].price - orderBook.bids[0].price) * 100).toFixed(1) + '%'
          : '--'}
      </div>

      {/* Bids (YES / buy) */}
      <div className="space-y-0.5">
        {orderBook.bids.slice(0, 8).map((bid, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs py-0.5 px-1">
            <div
              className="absolute inset-0 bg-green-500/10 rounded"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-green-400 font-mono">{bid.price.toFixed(2)}</span>
            <span className="relative text-dark-300 text-center font-mono">{bid.size.toLocaleString()}</span>
            <span className="relative text-dark-400 text-right font-mono">{bid.total.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
