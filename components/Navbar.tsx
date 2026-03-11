
import React from 'react';

interface NavbarProps {
  currentTime: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTime }) => {
  return (
    <nav className="h-14 border-b border-[#222] bg-[#121212] flex items-center justify-between px-0 sticky top-0 z-20 select-none">
      <div className="flex h-full">
        {/* Active Tab */}
        <div className="h-full flex items-center px-10 border-r border-[#222] relative bg-[#0e0e0e]">
          <span className="mono-font text-white text-xs font-semibold tracking-wider">dione.resume</span>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-400"></div>
        </div>
        {/* Inactive Tab */}
        <div className="h-full flex items-center px-10 border-r border-[#222] opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
          <span className="mono-font text-xs font-semibold tracking-wider group-hover:text-white">portfolio.v1</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 mono-font text-[11px] pr-6">
        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1a2e1a] border border-[#225522] rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-500 font-medium">Open to new projects</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 font-medium">
          <span>Davao City, Philippines</span>
          <span className="mx-2 opacity-30">•</span>
          <span>Time: {currentTime}</span>
        </div>
      </div>
    </nav>
  );
};
