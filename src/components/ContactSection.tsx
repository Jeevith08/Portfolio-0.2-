import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ContactSectionProps {
  darkMode: boolean;
}

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
    href: 'https://www.instagram.com/',
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
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#F2C12E]"
    >
      {/* Background Giant Marquee */}
      <div className="absolute inset-0 flex flex-col justify-center gap-8 opacity-10 select-none pointer-events-none uppercase font-black text-6xl md:text-8xl tracking-widest text-black">
        <div className="animate-marquee whitespace-nowrap">
          JEEVITH PALANI • FLUTTER DEVELOPER • FULL-STACK DEVELOPER • DATA ANALYST • &nbsp; JEEVITH PALANI • FLUTTER DEVELOPER • FULL-STACK DEVELOPER • DATA ANALYST • &nbsp;
        </div>
        <div className="animate-marquee whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
          FOLLOW ON INSTAGRAM • GET IN TOUCH • LET'S COLLABORATE • &nbsp; FOLLOW ON INSTAGRAM • GET IN TOUCH • LET'S COLLABORATE • &nbsp;
        </div>
        <div className="animate-marquee whitespace-nowrap">
          COIMBATORE • TAMIL NADU • INDIA • 2026 • &nbsp; COIMBATORE • TAMIL NADU • INDIA • 2026 • &nbsp;
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto relative z-10 flex flex-col items-center justify-center px-6 pt-12">
        {/* Cartoon Standing Developer with float animation container */}
        <div className="w-full flex justify-center mb-8">
          <ScrollReveal direction="up">
            <div className="animate-float-gentle">
              <img 
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jun 6, 2026, 06_35_07 PM.png`} 
                alt="Developer Standing" 
                className="h-80 md:h-[400px] lg:h-[440px] object-contain animate-scale-fade-in mix-blend-multiply transition-transform duration-500 hover:scale-[1.1]"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 mb-8">
          <a
            href="https://www.linkedin.com/in/jeevithpalani"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0066ff] hover:bg-[#0055dd] text-white font-black uppercase text-xs tracking-widest py-3.5 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Follow
          </a>
          <a
            href="mailto:jeevith1708@gmail.com"
            className="bg-white hover:bg-zinc-50 text-black font-black uppercase text-xs tracking-widest py-3.5 px-8 rounded-2xl shadow-lg border border-zinc-200 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Message
          </a>
        </div>

        {/* Small Social Icon Bar */}
        <div className="flex gap-3 mb-12">
          {CONTACT_ICONS.map((icon) => (
            <a
              key={icon.key}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-black transition-all duration-300 hover:scale-110"
            >
              {icon.icon}
            </a>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="mb-8 flex justify-center w-full">
          <div className="px-6 py-2 rounded-full bg-black/10 text-black text-[10px] font-black tracking-widest uppercase">
            © 2026 Jeevith. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
