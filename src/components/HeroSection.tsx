import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ArrowLeft } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  onBackToRobot?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode, onBackToRobot }) => {
  const titles = ["App Developer", "Java"];
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
      typingTimeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((titleIndex + 1) % titles.length);
      }, 400);
    }
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, titleIndex, titles]);

  return (
    <section id="hero" className={`min-h-screen flex items-center justify-center relative px-4 pt-20 pb-10 md:px-6 md:pt-0 md:pb-0 bg-transparent`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        {/* Left: Main Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 mt-4 md:mt-0 md:pl-32">
          <p className={`text-base mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hello, I'm</p>
          <h1 className="text-4xl md:text-6xl mb-2 font-great-vibes" style={{ color: '#fb923c' }}>
            Jeevith
          </h1>
          {/* Back Button below and near Jeevith name, left-aligned */}
          {onBackToRobot && (
            <div className="flex items-center mb-4">
              <button
                onClick={onBackToRobot}
                aria-label="Back to Robot"
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 shadow hover:shadow-orange-400 transition-all duration-300"
                style={{ marginLeft: 0 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="h-10 md:h-12 mb-4 md:mb-8">
            <h2 className={`text-xl md:text-3xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> 
              {typedText}
              <span className="animate-pulse text-red-500">|</span>
            </h2>
          </div>
          <p className={`text-sm md:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>I'm a passionate developer who creates beautiful, functional, and user-centered digital experiences. I specialize in modern web technologies and love bringing ideas to life.</p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8 md:mb-16">
            <button
              className="group px-3 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 text-xs"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Mail className="w-4 h-4" />
              Contact
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <a href={`${import.meta.env.BASE_URL}JEEVI resume.pdf.pdf`} download className={`px-3 py-2 border-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}> <Download className="w-4 h-4" /> CV </a>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xs md:max-w-md mx-auto md:mx-0">
            <div className="text-center">
              <div className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>2+</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp</div>
            </div>
            <div className="text-center">
              <div className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>2+</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
            </div>
            <div className="text-center">
              <div className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>2+</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Intern</div>
            </div>
          </div>
        </div>
        {/* Right: Profile Photo */}
        <div className="flex-1 flex justify-center order-1 md:order-2 mt-8 md:mt-0 md:justify-end">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-orange-400 p-1 sparkle-container">
              <div className={`w-full h-full rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center`}>
                <div className="w-full h-full rounded-full border-4 border-orange-400 shadow-[0_0_24px_8px_#fb923c99] flex items-center justify-center transition-all duration-300 animate-blink-border">
                  <img
                    src={`${import.meta.env.BASE_URL}pic p.png`}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full select-none animate-pop-float animate-float-shake"
                    draggable="false"
                    style={{ objectPosition: 'center 5%' }}
                  />
                </div>
              </div>
            </div>
            {/* Sparkle elements */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
            <div className="absolute -top-1 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-ping"></div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce md:bottom-8">
          <ArrowDown className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
