
import React from 'react';
import { Briefcase, MapPin, Globe, Mail } from 'lucide-react';

export const SidebarLeft: React.FC = () => {
  return (
    <aside className="w-80 hidden md:flex flex-col border-r border-[#222] bg-[#0e0e0e] overflow-y-auto">
      <div className="p-8 flex flex-col gap-8">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded border border-[#333] flex items-center justify-center bg-[#1a1a1a] overflow-hidden group cursor-pointer">
            <img 
              src="https://i.imgur.com/nd8aQcp.jpeg" 
              alt="Dione Raze Oro" 
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none mb-1">DIONE RAZE ORO</h1>
            <p className="text-[10px] mono-font text-gray-500 font-medium uppercase">AI AUTOMATION & FRONTEND DEV</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <p className="text-xl leading-snug mono-font font-medium text-gray-400">
            AI Automation & Frontend Developer building efficient, data-driven systems.
          </p>
        </div>

        {/* Info Items */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="flex items-center gap-4 text-sm mono-font text-gray-500">
            <Briefcase size={18} className="text-gray-600" />
            <span className="leading-tight">Workflow Automation & Modern Web Apps</span>
          </div>
          <div className="flex items-center gap-4 text-sm mono-font text-gray-500">
            <MapPin size={18} className="text-gray-600" />
            <span>Davao City, Philippines</span>
          </div>
          <div className="flex items-center gap-4 text-sm mono-font text-gray-500">
            <Mail size={18} className="text-gray-600" />
            <a href="mailto:dioneoro11@gmail.com" className="hover:text-white transition-colors">dioneoro11@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <a 
          href="https://calendly.com/dioneoro11/30min" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors text-center"
        >
          Schedule a call
        </a>
        <a 
          href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-4 bg-transparent border border-[#333] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors text-center"
        >
          View LinkedIn
        </a>
      </div>
    </aside>
  );
};
