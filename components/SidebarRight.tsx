
import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

export const SidebarRight: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Frontend Dev', id: 'frontend-dev' },
    { label: 'About me', id: 'about-me' },
    { label: 'What I do', id: 'what-i-do' },
    { label: 'Tech stack', id: 'tech-stack' },
    { label: 'Awards', id: 'awards' },
    { label: 'Client\'s word', id: 'client-s-word' },
    { label: 'Contact me', id: 'contact-me' },
  ];

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    // We use IntersectionObserver because MainContent is the scrollable element, not the window.
    const observerOptions = {
      root: mainElement,
      rootMargin: '-10% 0px -45% 0px', // More balanced margin for better section detection
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => {
      links.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const mainElement = document.querySelector('main');
    
    if (element && mainElement) {
      const targetScrollTop = element.offsetTop;
      
      // Custom smooth scroll with easing using framer-motion
      animate(mainElement.scrollTop, targetScrollTop, {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9], // Custom cubic-bezier for a more "crafted" feel
        onUpdate: (latest) => {
          mainElement.scrollTop = latest;
        }
      });
      
      setActiveSection(id);
    }
  };

  return (
    <aside className="w-64 border-l border-[#222] bg-[#121212] flex flex-col p-8 pt-12 gap-8 sticky top-0 h-full select-none">
      <h3 className="text-xl font-bold text-white mb-4 mono-font">Index</h3>
      <nav className="flex flex-col gap-6 mono-font relative">
        {links.map((link) => (
          <div key={link.id} className="relative flex items-center">
            {/* Active Indicator Bar with Framer Motion */}
            {activeSection === link.id && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute -left-8 w-1 h-6 bg-white"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
            )}
            
            <a
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`text-[13px] transition-all duration-300 py-1 pl-2 uppercase tracking-tight relative z-10 ${
                activeSection === link.id 
                  ? 'text-white font-bold' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {link.label}
            </a>
          </div>
        ))}
      </nav>
    </aside>
  );
};
