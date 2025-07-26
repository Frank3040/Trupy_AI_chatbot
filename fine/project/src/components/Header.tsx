import React from 'react';
import { Info } from 'lucide-react';
import logo from '../img/Trupy_1_preview_rev_1.png';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
      {/* Logo dentro del círculo */}
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <img
          src={logo}
          alt="Trupy Logo"
          className="w-15 h-15 object-contain"
        />
      </div>

      {/* Texto central */}
      <div className="flex-1 flex justify-center px-2">
        <span className="text-sm font-medium text-gray-600 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          A Listening Ear, Always There
        </span>
      </div>

      {/* Botón de información */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200">
        <Info className="w-5 h-5 text-gray-600" />
      </button>
    </header>
  );
};

export default Header;
