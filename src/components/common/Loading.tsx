import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <svg className={`animate-spin text-blue-500 ${sizeClasses[size]}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

export const MarketCardSkeleton: React.FC = () => (
  <div className="bg-dark-900 border border-dark-700 rounded-xl p-5 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="h-5 bg-dark-700 rounded w-16" />
      <div className="h-5 bg-dark-700 rounded w-20" />
    </div>
    <div className="h-6 bg-dark-700 rounded w-full mb-2" />
    <div className="h-4 bg-dark-700 rounded w-3/4 mb-4" />
    <div className="flex gap-3 mb-4">
      <div className="flex-1 h-12 bg-dark-700 rounded-lg" />
      <div className="flex-1 h-12 bg-dark-700 rounded-lg" />
    </div>
    <div className="flex justify-between">
      <div className="h-4 bg-dark-700 rounded w-24" />
      <div className="h-4 bg-dark-700 rounded w-20" />
    </div>
  </div>
);

export const FullPageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-dark-400">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
