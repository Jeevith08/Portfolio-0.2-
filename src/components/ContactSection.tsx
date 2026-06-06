import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ContactSectionProps {
  darkMode: boolean;
}

const CONTACT_ICONS = [
  {
    href: 'https://github.com/jeevith08',
    className: 'w-10 h-10 bg-zinc-900/80 border border-zinc-850 hover:border-[#E5B53B]/50 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 hover:text-[#E5B53B] transition-all duration-300 hover:scale-110',
    icon: <Github className="w-5 h-5" />,
    key: 'github',
  },
  {
    href: 'https://www.linkedin.com/in/jeevithpalani',
    className: 'w-10 h-10 bg-zinc-900/80 border border-zinc-850 hover:border-[#E5B53B]/50 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 hover:text-[#E5B53B] transition-all duration-300 hover:scale-110',
    icon: <Linkedin className="w-5 h-5" />,
    key: 'linkedin',
  },
  {
    href: 'https://www.instagram.com/',
    className: 'w-10 h-10 bg-zinc-900/80 border border-zinc-850 hover:border-[#E5B53B]/50 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 hover:text-[#E5B53B] transition-all duration-300 hover:scale-110',
    icon: <Instagram className="w-5 h-5" />,
    key: 'instagram',
  },
  {
    href: 'https://leetcode.com/u/Jeevi_17/',
    className: 'w-10 h-10 bg-zinc-900/80 border border-zinc-850 hover:border-[#E5B53B]/50 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 hover:text-[#E5B53B] transition-all duration-300 hover:scale-110',
    icon: (
      <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <path d="M35.5 36.5C32.5 39.5 27.5 39.5 24.5 36.5L13.5 25.5C10.5 22.5 10.5 17.5 13.5 14.5C16.5 11.5 21.5 11.5 24.5 14.5L27 17" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32.5 13.5C35.5 16.5 35.5 21.5 32.5 24.5L29 28" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="25" cy="25" r="23.5" strokeWidth="3"/>
      </svg>
    ),
    key: 'leetcode',
  },
  {
    href: 'mailto:jeevith1708@gmail.com',
    className: 'w-10 h-10 bg-zinc-900/80 border border-zinc-850 hover:border-[#E5B53B]/50 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 hover:text-[#E5B53B] transition-all duration-300 hover:scale-110',
    icon: <Mail className="w-5 h-5" />,
    key: 'mail',
  },
];

const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="contact"
      className={`relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden transition-all duration-1000 ${
        darkMode 
          ? 'bg-gradient-to-b from-[#0D2218] via-[#050D0A] to-black text-zinc-100' 
          : 'bg-gradient-to-b from-[#E6ECE8] via-[#FAFAF8] to-[#E6ECE8] text-gray-900'
      }`}
    >
      {/* Portfolio Grid Pattern Background */}
      <div 
        className={`absolute inset-0 opacity-10 pointer-events-none select-none ${
          darkMode 
            ? 'bg-[radial-gradient(#E5B53B_1px,transparent_1px)] [background-size:24px_24px]' 
            : 'bg-[radial-gradient(#0D2218_1px,transparent_1px)] [background-size:24px_24px]'
        }`} 
      />

      {/* Background Giant Marquee */}
      <div className={`absolute inset-0 flex flex-col justify-center gap-8 opacity-5 select-none pointer-events-none uppercase font-black text-6xl md:text-8xl tracking-widest ${
        darkMode ? 'text-white' : 'text-emerald-950'
      }`}>
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
        
        {/* Styled Frame for Video Player */}
        <div className="w-full flex justify-center mb-10">
          <ScrollReveal direction="up">
            <div className="relative rounded-[2.5rem] p-1.5 bg-[#E5B53B] shadow-[0_20px_50px_rgba(229,181,59,0.25)] transition-all duration-500 hover:scale-105">
              <video
                src={`${import.meta.env.BASE_URL}use_this_face_face_must_.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="h-80 md:h-[400px] lg:h-[440px] w-auto object-cover rounded-[2.2rem] opacity-85 hover:opacity-100 transition-opacity duration-300"
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
            className="bg-[#E5B53B] hover:bg-[#d09e2b] text-[#0D2218] font-black uppercase text-xs tracking-widest py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Follow
          </a>
          <a
            href="mailto:jeevith1708@gmail.com"
            className={`font-black uppercase text-xs tracking-widest py-3.5 px-10 rounded-2xl shadow-lg border transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
              darkMode 
                ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800' 
                : 'bg-white border-zinc-200 text-black hover:bg-zinc-50'
            }`}
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
              className={icon.className}
            >
              {icon.icon}
            </a>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="mb-8 flex justify-center w-full">
          <div className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border ${
            darkMode 
              ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500' 
              : 'bg-white border-zinc-200 text-gray-500'
          }`}>
            © 2026 Jeevith. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
