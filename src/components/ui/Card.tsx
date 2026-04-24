import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false, onClick }) => {
  return (
    <div
      className={`bg-dark-900 border border-dark-700 rounded-xl ${hoverable ? 'hover:border-dark-500 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/20' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
