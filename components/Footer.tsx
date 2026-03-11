
import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-12 border-t border-[#222] bg-[#121212] flex items-center justify-between px-6 mono-font text-[10px] tracking-widest text-gray-500 uppercase">
      <div>
        © Dione Raze Oro {currentYear}
      </div>
      <div className="flex items-center gap-6">
        <a href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          <Linkedin size={16} />
        </a>
        <a href="mailto:dioneoro11@gmail.com" className="hover:text-white transition-colors">
          <Mail size={16} />
        </a>
      </div>
    </footer>
  );
};
