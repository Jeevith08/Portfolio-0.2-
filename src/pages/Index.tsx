import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
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

const Index = ({ onBackToRobot, darkMode, toggleDarkMode }: IndexProps) => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
        />
        
        <main className="scroll-smooth">
          <ScrollReveal>
            <HeroSection darkMode={darkMode} />
          </ScrollReveal>
          <ScrollReveal>
            <AboutSection darkMode={darkMode} />
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
