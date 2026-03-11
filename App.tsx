
// Triggering a rebuild to fix sync issues.
import React, { useState, useEffect } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0e0e0e] text-gray-300">
      {/* Top Welcome Bar */}
      <div className="h-10 flex items-center px-4 border-b border-[#222] text-xs mono-font flex-shrink-0">
        <span className="opacity-60 uppercase tracking-widest">Welcome to my world!</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <SidebarLeft />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Navigation */}
          <Navbar currentTime={currentTime} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex">
            <MainContent />
            {/* Right Sidebar - visible on lg screens */}
            <div className="hidden lg:block h-full">
              <SidebarRight />
            </div>
          </div>

          {/* Bottom Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
