import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const links = {
    Product: ['Markets', 'How it Works', 'API Docs', 'Status'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    Social: ['Twitter/X', 'Discord', 'Telegram', 'GitHub'],
  };

  return (
    <footer className="bg-dark-950 border-t border-dark-800 mt-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-white">Predict<span className="text-blue-400">X</span></span>
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed">
              Prediction markets powered by collective intelligence.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-dark-200 mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <span className="text-sm text-dark-400 hover:text-dark-200 cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-dark-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">© 2025 PredictX. All rights reserved.</p>
          <p className="text-xs text-dark-600">For demonstration purposes only. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
