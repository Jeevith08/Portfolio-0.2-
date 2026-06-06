import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  onBackToRobot?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const titles = ["Flutter Developer", "Full-Stack Developer", "Data Analyst"];
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const currentTitle = titles[titleIndex];

    if (!isDeleting && charIndex < currentTitle.length) {
      typingTimeout = setTimeout(() => {
        setTypedText(currentTitle.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    } else if (isDeleting && charIndex > 0) {
      typingTimeout = setTimeout(() => {
        setTypedText(currentTitle.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      typingTimeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((titleIndex + 1) % titles.length);
      }, 400);
    }
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, titleIndex, titles]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-start relative px-6 md:px-20 lg:px-32 bg-transparent overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src={`${import.meta.env.BASE_URL}create_video_in_ratio_Hi.mp4`} type="video/mp4" />
      </video>
      {/* Gradient Overlay for supreme readability */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent' 
          : 'bg-gradient-to-r from-white/95 via-white/75 to-white/10'
      }`} />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-start text-left pt-16">
        {/* Top Tag */}
        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-orange-500 uppercase mb-3 block">
          PORTFOLIO 2026
        </span>

        {/* Big Bold Headline */}
        <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-2 uppercase leading-none transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-950'
        }`}>
          JEEVITH
        </h1>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          PALANI
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-6 md:h-8 mb-6 flex items-center">
          <span className={`text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {typedText}
          </span>
          <span className="w-[2px] h-4 bg-orange-500 ml-1 animate-pulse" />
        </div>

        {/* Bio description */}
        <p className={`text-xs md:text-sm max-w-md leading-relaxed mb-8 transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Engineering modern cross-platform mobile experiences and intelligent web systems. Specialized in Flutter, React, Python, and data dashboards.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 mb-12">
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full font-bold tracking-wider uppercase text-[10px] transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 flex items-center gap-2"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </button>
          <a 
            href={`${import.meta.env.BASE_URL}JEEVI resume.pdf.pdf`} 
            download 
            className={`px-6 py-2.5 border-2 rounded-full font-bold tracking-wider uppercase text-[10px] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 ${
              darkMode 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          > 
            <Download className="w-3.5 h-3.5" /> 
            Download CV 
          </a>
        </div>

        {/* HUD Stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-10 max-w-sm">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-orange-500 leading-none mb-1">200+</span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>LeetCode</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-orange-500 leading-none mb-1">7+</span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-orange-500 leading-none mb-1">3+</span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Internships</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce md:bottom-8 z-10">
        <ArrowDown className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
    </section>
  );
};

export default HeroSection;
