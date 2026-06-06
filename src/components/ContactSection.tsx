import React, { useState, useRef, useEffect } from 'react';
import { Phone, Github, Linkedin, Mail, Instagram, Code } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ContactSectionProps {
  darkMode: boolean;
}

const CONTACT_DETAILS = [
  { label: 'Email', value: 'jeevith1708@gmail.com' },
  { label: 'Phone', value: '+91 9384736809' },
  { label: 'Location', value: 'Coimbatore' },
];

const CONTACT_ICONS = [
  {
    href: 'https://github.com/jeevith08',
    className: 'w-10 h-10 bg-[#FF4500] rounded-full flex items-center justify-center text-white hover:bg-[#E63E00] transition-colors duration-300',
    icon: <Github className="w-5 h-5" />,
    key: 'github',
  },
  {
    href: 'https://www.linkedin.com/in/jeevithpalani',
    className: 'w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300',
    icon: <Linkedin className="w-5 h-5" />,
    key: 'linkedin',
  },
  {
    href: '#',
    className: 'w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors duration-300',
    icon: <Instagram className="w-5 h-5" />,
    key: 'instagram',
  },
  {
    href: 'https://leetcode.com/u/Jeevi_17/',
    className: 'w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 transition-colors duration-300',
    icon: (
      <svg width="22" height="22" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.5 36.5C32.5 39.5 27.5 39.5 24.5 36.5L13.5 25.5C10.5 22.5 10.5 17.5 13.5 14.5C16.5 11.5 21.5 11.5 24.5 14.5L27 17" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32.5 13.5C35.5 16.5 35.5 21.5 32.5 24.5L29 28" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="25" cy="25" r="23.5" stroke="#000" strokeWidth="3"/>
      </svg>
    ),
    key: 'leetcode',
  },
  {
    href: 'mailto:jeevith1708@gmail.com',
    className: 'w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors duration-300',
    icon: <Mail className="w-5 h-5" />,
    key: 'mail',
  },
];

const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState(0);

  useEffect(() => {
    if (showDetails) {
      setVisibleIcons(0);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleIcons(i);
        if (i >= CONTACT_ICONS.length) clearInterval(interval);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setVisibleIcons(0);
    }
  }, [showDetails]);

  return (
    <section
      id="contact"
      className={`relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-white via-orange-50/10 to-white'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-orange-900'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          GET IN TOUCH • CONTACT ME • HIRE ME • COLLABORATE • &nbsp; GET IN TOUCH • CONTACT ME • HIRE ME • COLLABORATE • &nbsp;
        </div>
      </div>

      <div className="max-w-xl w-full mx-auto relative z-10 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-orange-500" />
            <h2 className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Contact
            </h2>
          </div>
          <h2 className={`text-xl md:text-2xl font-black tracking-tight uppercase mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Let's Collaborate
          </h2>
        </div>

        <div
          className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-b from-[#FF4500] to-[#fb923c] border-4 border-orange-500 relative transition-transform duration-300 animate-float-gentle cursor-pointer hover:scale-105"
          style={{ boxShadow: '0 10px 40px rgba(251, 146, 60, 0.3)' }}
          aria-label="Call"
          onClick={() => setShowDetails((v) => !v)}
        >
          <Phone className="w-8 h-8 text-white" />
        </div>

        {showDetails && (
          <div className="w-full mt-10 space-y-4 animate-scale-in text-center">
            <div className={`rounded-2xl p-6 border shadow-xl ${
              darkMode 
                ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300' 
                : 'bg-white border-orange-100 text-gray-700'
            }`}>
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="text-xs md:text-sm py-1"> 
                  <span className="font-black uppercase tracking-wider text-[10px] text-orange-500 mr-2">{item.label}:</span> 
                  {item.value} 
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              {CONTACT_ICONS.map((icon, idx) => (
                <a
                  key={icon.key}
                  href={icon.href}
                  target={icon.href.startsWith('http') ? '_blank' : undefined}
                  rel={icon.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={icon.className + ` transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${visibleIcons > idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{ transitionDelay: `${idx * 80}ms`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Copyright Bar */}
        <div className="mt-20 mb-8 flex justify-center w-full">
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF4500] to-[#fb923c] text-orange-100 text-xs font-bold tracking-wider uppercase shadow-lg shadow-orange-500/10">
            <span className="text-orange-100">© 2026 Jeevith. All rights reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
