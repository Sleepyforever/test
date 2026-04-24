import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-8xl font-bold text-dark-800 mb-4">404</div>
      <h1 className="text-3xl font-bold text-dark-200 mb-3">Page Not Found</h1>
      <p className="text-dark-400 max-w-md mb-8">
        The page you're looking for doesn't exist. It may have been moved, deleted, or never existed.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Go to Markets
      </Link>
    </div>
  );
};

export default NotFound;
