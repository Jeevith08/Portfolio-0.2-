import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import CustomCursor from '../components/CustomCursor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ContactProps {
  onBackToRobot?: () => void;
}

const Contact = ({ onBackToRobot }: ContactProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    const languages = ['EN', 'ES', 'FR', 'DE'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

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
        
        {/* Back to Robot Button */}
        {onBackToRobot && (
          <div className="fixed top-4 left-4 z-50">
            <Button
              onClick={onBackToRobot}
              variant="outline"
              size="sm"
              className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-purple-400 hover:bg-purple-600/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Robot
            </Button>
          </div>
        )}
        
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          currentSection={"contact"}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main className="scroll-smooth">
          {/* Sparkle Background */}
          <div className="sparkle-bg" aria-hidden="true">
            {sparkles.map(sparkle => (
              <span
                key={sparkle.key}
                className="sparkle-dot"
                style={{
                  top: `${sparkle.top}%`,
                  left: `${sparkle.left}%`,
                  width: `${sparkle.size}px`,
                  height: `${sparkle.size}px`,
                  animationDelay: `${sparkle.delay}s`,
                }}
              />
            ))}
          </div>
          <ContactSection darkMode={darkMode} />
        </main>
        <ChatBot darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Contact; 