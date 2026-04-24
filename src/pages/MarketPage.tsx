import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarket } from '../hooks/useMarkets';
import { useTrades, useOrderBook, useChartData } from '../hooks/useTrades';
import MarketDetail from '../components/markets/MarketDetail';
import TradeChart from '../components/trading/TradeChart';
import OrderBook from '../components/trading/OrderBook';
import TradeHistory from '../components/trading/TradeHistory';
import { FullPageLoader } from '../components/common/Loading';

const MarketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { market, loading, error } = useMarket(id || '');
  const { trades, loading: tradesLoading } = useTrades(id || '');
  const { orderBook, loading: obLoading } = useOrderBook(id || '', market?.yesOdds || 50);
  const { chartData, loading: chartLoading } = useChartData(id || '', market?.yesOdds || 50, '1D');

  if (loading) return <FullPageLoader />;

  if (error || !market) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-dark-200 mb-2">Market Not Found</h2>
        <p className="text-dark-400 mb-6">The market you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          Back to Markets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-6">
        <Link to="/" className="hover:text-dark-300 transition-colors">Markets</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-400 truncate">{market.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Market details */}
        <div className="lg:col-span-1">
          <MarketDetail market={market} />
        </div>

        {/* Right: Chart + Order Book + Trades */}
        <div className="lg:col-span-2 space-y-4">
          <TradeChart data={chartData} loading={chartLoading} yesOdds={market.yesOdds} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderBook orderBook={orderBook} loading={obLoading} />
            <TradeHistory trades={trades} loading={tradesLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
