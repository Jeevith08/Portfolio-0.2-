import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import ChatBot from '../components/ChatBot';
import CustomCursor from '../components/CustomCursor';

const About = () => {
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

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-300">
        <CustomCursor />
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          currentSection={"about"}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main className="scroll-smooth">
          <AboutSection darkMode={darkMode} />
        </main>
        <ChatBot darkMode={darkMode} />
      </div>
    </div>
  );
};

export default About; 