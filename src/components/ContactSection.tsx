import React, { useState, useRef, useEffect } from 'react';
import { Phone, Github, Linkedin, Mail, Instagram, Code } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ContactSectionProps {
  darkMode: boolean;
}

const CONTACT_DETAILS = [
  { label: 'Email', value: 'jeevithofficial08@gmail.com' },
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
    href: 'https://www.linkedin.com/in/jeevith-p--/',
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
    href: 'mailto:jeevithofficial08@gmail.com',
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
      className={`flex flex-col items-center justify-center min-h-screen w-full flex-grow transition-colors duration-300 bg-transparent`}
      onMouseMove={undefined}
      onMouseLeave={undefined}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className={`text-base font-bold text-center flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-black'}`}> <Mail className="w-5 h-5" /> Get in <span className="text-orange-500">Touch</span></h2>
        <p className={`text-lg text-center max-w-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Let's create something amazing together</p>
      </div>
      <div
        className="mt-16 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-b from-[#FF4500] to-[#fb923c] border-4 border-orange-500 relative transition-transform duration-1000 animate-blink"
        style={{ boxShadow: '0 0 32px 6px #fb923cbb' }}
        aria-label="Call"
        onClick={() => setShowDetails((v) => !v)}
      >
        <ScrollReveal direction="up">
          <Phone className="w-8 h-8 text-white" />
        </ScrollReveal>
      </div>

      {showDetails && (
        <>
          <div className="mt-8 space-y-2 text-center animate-fade-out">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className={`text-base ${darkMode ? 'text-white' : 'text-black'}`}> <span className="font-semibold">{item.label}:</span> {item.value} </div>
            ))}
          </div>
          <ScrollReveal direction="up">
            <div className="mt-6 flex justify-center space-x-4">
              {CONTACT_ICONS.map((icon, idx) => (
                <a
                  key={icon.key}
                  href={icon.href}
                  target={icon.href.startsWith('http') ? '_blank' : undefined}
                  rel={icon.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={icon.className + ` transition-all duration-500 ${visibleIcons > idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </>
      )}

      {/* Copyright Bar */}
      <div className="mt-24 mb-16 flex justify-center w-full">
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF4500] to-[#fb923c] text-orange-100 text-base font-medium shadow-lg" style={{maxWidth: 380}}>
          <span className="text-orange-200">© 2025 Jeevith. All rights reserved.</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
