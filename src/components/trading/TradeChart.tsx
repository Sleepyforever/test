import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import type { ChartDataPoint } from '../../types';

interface TradeChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
  yesOdds: number;
}

const TIME_RANGES = ['1H', '1D', '1W', 'ALL'] as const;
type TimeRange = typeof TIME_RANGES[number];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-xs shadow-xl">
        <p className="text-dark-400 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-dark-300">{p.name}:</span>
            <span className="text-white font-semibold">{p.value}{p.name === 'Volume' ? '' : '%'}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TradeChart: React.FC<TradeChartProps> = ({ data, loading, yesOdds }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [chartType, setChartType] = useState<'price' | 'volume'>('price');

  if (loading) {
    return (
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-dark-700 rounded w-32 animate-pulse" />
          <div className="flex gap-1">
            {TIME_RANGES.map(r => <div key={r} className="h-7 w-10 bg-dark-700 rounded animate-pulse" />)}
          </div>
        </div>
        <div className="h-64 bg-dark-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  const sliceData = () => {
    if (timeRange === '1H') return data.slice(-60);
    if (timeRange === '1D') return data.slice(-24);
    if (timeRange === '1W') return data.slice(-168);
    return data;
  };

  const chartData = sliceData();
  const stride = Math.ceil(chartData.length / 12);
  const displayData = chartData.filter((_, i) => i % stride === 0 || i === chartData.length - 1);

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-2xl font-bold text-white">{yesOdds}%</div>
            <div className="text-xs text-dark-400">YES probability</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-dark-800 border border-dark-700 rounded-lg p-0.5">
            {(['price', 'volume'] as const).map(t => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`px-3 py-1 text-xs rounded-md capitalize transition-colors ${
                  chartType === t ? 'bg-blue-600 text-white' : 'text-dark-400 hover:text-dark-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex bg-dark-800 border border-dark-700 rounded-lg p-0.5">
            {TIME_RANGES.map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  timeRange === range ? 'bg-blue-600 text-white' : 'text-dark-400 hover:text-dark-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        {chartType === 'price' ? (
          <AreaChart data={displayData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="noGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="yes" name="YES" stroke="#22c55e" strokeWidth={2} fill="url(#yesGradient)" dot={false} />
            <Area type="monotone" dataKey="no" name="NO" stroke="#ef4444" strokeWidth={2} fill="url(#noGradient)" dot={false} />
          </AreaChart>
        ) : (
          <BarChart data={displayData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="volume" name="Volume" fill="#3b82f6" opacity={0.8} radius={[2, 2, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TradeChart;
