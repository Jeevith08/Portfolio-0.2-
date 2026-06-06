import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe, Home, User, Code2, Gift, Mail, Rocket, ArrowLeft, Palette, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentSection: string;
  language: string;
  toggleLanguage: () => void;
  onBackToRobot?: () => void;
  currentColorScheme: number;
  autoColorSwitch: boolean;
  toggleAutoColorSwitch: () => void;
  cycleColorScheme: () => void;
  colorSchemes: Array<{
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  }>;
}

const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  currentSection, 
  language, 
  toggleLanguage,
  onBackToRobot,
  currentColorScheme,
  autoColorSwitch,
  toggleAutoColorSwitch,
  cycleColorScheme,
  colorSchemes
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="relative flex items-center justify-between px-4 py-2 md:px-6">
        {/* Logo/Name Left */}
        <div className="flex items-center">
          <div className="text-2xl font-bold pointer-events-auto">
            <span className={darkMode ? 'text-gray-200 font-great-vibes tracking-widest' : 'text-gray-700 font-great-vibes tracking-widest'}>Jeevi</span>
            <span className="font-great-vibes tracking-widest" style={{ color: '#FFA552' }}>.</span>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center rounded-full shadow-lg px-4 py-1.5 space-x-3 max-w-md pointer-events-auto transition-colors duration-300 ${darkMode ? 'bg-[#232323]/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'}`}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-full focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'focus:ring-orange-900'
                    : 'focus:ring-orange-200'
                } ${
                  currentSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text'
                    : darkMode
                      ? 'text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 hover:text-transparent hover:bg-clip-text active:bg-gradient-to-r active:from-red-500 active:to-orange-400 active:text-transparent active:bg-clip-text focus:bg-gradient-to-r focus:from-red-500 focus:to-orange-400 focus:text-transparent focus:bg-clip-text'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 hover:text-transparent hover:bg-clip-text active:bg-gradient-to-r active:from-red-500 active:to-orange-400 active:text-transparent active:bg-clip-text focus:bg-gradient-to-r focus:from-red-500 focus:to-orange-400 focus:text-transparent focus:bg-clip-text'
                } ${item.name === 'Home' ? '' : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden ml-2 p-2 rounded-full border flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Menu"
            style={{ background: isOpen ? 'rgba(0,0,0,0.1)' : undefined }}
          >
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#fff' : '#232323'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#fff' : '#232323'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-64 p-4 z-50 flex flex-col gap-2">
            {/* Top Row: Logo, Dark Mode, Close */}
            <div className="flex items-center justify-between mb-4">
              <span className={`flex items-center gap-1 font-bold text-lg text-white`}><span className="text-xl">♥</span> Jeevi</span>
              <button onClick={() => setIsOpen(false)} className={`rounded-full p-2 shadow ${darkMode ? 'bg-gray-700' : 'bg-white/80'}`}>
                <X className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
              </button>
            </div>
            {/* Nav Items */}
            <div className="flex flex-col gap-3 mt-1">
              {[
                { href: '#hero', icon: Home, label: 'Home' },
                { href: '#about', icon: User, label: 'About' },
                { href: '#journey', icon: Rocket, label: 'Journey' },
                { href: '#skills', icon: Code2, label: 'Skills' },
                { href: '#projects', icon: Gift, label: 'Projects' },
                { href: '#contact', icon: Mail, label: 'Contact' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button 
                    key={item.href}
                    onClick={() => scrollToSection(item.href)} 
                    className="group flex items-center gap-3 rounded-lg p-2 font-medium text-base transition-all duration-300 text-gray-200 hover:bg-black/50"
                  >
                    <Icon className="w-5 h-5 text-orange-500 transition-all duration-300 group-hover:text-white" style={{ animation: `color-pulse 2s infinite ${Math.random() * 2}s` }} /> 
                    <span className="transition-colors duration-300 group-hover:text-white">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
      <style>{`
        @keyframes color-pulse {
          0%, 100% { color: #f97316; } /* orange-500 */
          50% { color: #ffedd5; }      /* orange-100 */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;