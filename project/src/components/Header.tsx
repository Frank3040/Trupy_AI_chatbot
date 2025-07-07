import React from 'react';
import { Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
      <div className="w-10 h-10 flex items-center justify-center">
        {/* Placeholder for SVG logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <img src="project\src\img\Trupy_1_preview_rev_1.png" alt="Trupy Logo" className="w-5 h-5 object-contain" />
</div>

      </div>
      
      <div className="flex-1 flex justify-center px-2">
        <span className="text-xs font-medium text-gray-600 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          A listen ear, Always There
        </span>
      </div>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200">
        <Info className="w-4 h-4 text-gray-600" />
      </button>
    </header>
  );
};

export default Header;