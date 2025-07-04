import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import StatusSection from '../components/StatusSection';
import Journey from './Journey';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ChatBot from '../components/ChatBot';
import CustomCursor from '../components/CustomCursor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface IndexProps {
  onBackToRobot?: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const colorSchemes = [
  { name: 'Default', primary: '#FFA552', secondary: '#FFD6B8', accent: '#FF8C00', gradient: 'from-red-500 to-orange-400' },
  { name: 'Forest', primary: '#228B22', secondary: '#90EE90', accent: '#32CD32', gradient: 'from-green-500 to-lime-400' },
  { name: 'Ocean', primary: '#1E90FF', secondary: '#ADD8E6', accent: '#4169E1', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Sunset', primary: '#FF4500', secondary: '#FFDAB9', accent: '#FF6347', gradient: 'from-red-500 to-yellow-400' },
  { name: 'Lavender', primary: '#9370DB', secondary: '#E6E6FA', accent: '#8A2BE2', gradient: 'from-purple-500 to-indigo-400' },
];

const Index = ({ onBackToRobot, darkMode, toggleDarkMode }: IndexProps) => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });
  const [currentColorScheme, setCurrentColorScheme] = useState(0);
  const [autoColorSwitch, setAutoColorSwitch] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoColorSwitch) {
      interval = setInterval(() => {
        cycleColorScheme();
      }, 5000); // Switch every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoColorSwitch]);

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Section tracking for navbar with smooth scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Throttle function for better performance
  const throttle = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(null, args);
          timeout = null;
        }, wait);
      }
    };
  };

  const toggleAutoColorSwitch = () => setAutoColorSwitch(prev => !prev);

  const cycleColorScheme = () => {
    setCurrentColorScheme(prev => (prev + 1) % colorSchemes.length);
  };

  const toggleLanguage = () => {
    const languages = ['EN', 'ES', 'FR', 'DE'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  // Glowing dots: generate once per mount for stable background
  const glowingDots = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 32 + Math.random() * 48; // 32px to 80px
      const delay = Math.random() * 2; // 0s to 2s
      return { top, left, size, delay, key: `dot-${i}` };
    });
  }, []);

  const bubbles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 40 + Math.random() * 80;
      const delay = Math.random() * 10;
      return { left, size, delay, key: `bubble-${i}` };
    });
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 18 + Math.random() * 32;
      const delay = Math.random() * 2.5;
      return { top, left, size, delay, key: `sparkle-${i}` };
    });
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-300">
        <CustomCursor />
        
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          currentSection={currentSection}
          language={language}
          toggleLanguage={toggleLanguage}
          onBackToRobot={onBackToRobot}
          currentColorScheme={currentColorScheme}
          autoColorSwitch={autoColorSwitch}
          toggleAutoColorSwitch={toggleAutoColorSwitch}
          cycleColorScheme={cycleColorScheme}
          colorSchemes={colorSchemes}
        />
        
        <main className="scroll-smooth">
          <ScrollReveal>
            <HeroSection darkMode={darkMode} />
          </ScrollReveal>
          <ScrollReveal>
            <AboutSection darkMode={darkMode} />
          </ScrollReveal>
          <ScrollReveal>
            <StatusSection darkMode={darkMode} />
          </ScrollReveal>
          <Journey darkMode={darkMode} />
          <SkillsSection darkMode={darkMode} />
          <ProjectsSection darkMode={darkMode} />
          <ContactSection darkMode={darkMode} />
        </main>

        <ChatBot darkMode={darkMode} onOpenContactForm={() => {}} />
      </div>
    </div>
  );
};

export default Index;
