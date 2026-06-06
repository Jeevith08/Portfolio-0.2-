import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

interface StoryItem {
  title: string;
  subtitle: string;
  value: string;
  icon: React.ReactNode;
  isInteractive?: boolean;
  action?: () => void;
}

interface StatusSectionProps {
  darkMode: boolean;
}

const StatusSection: React.FC<StatusSectionProps> = ({ darkMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  const stories: StoryItem[] = [
    {
      title: 'Post Story',
      subtitle: 'Share moments',
      value: 'GET IN TOUCH',
      isInteractive: true,
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#E5B53B] fill-current">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      ),
      action: () => {
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      title: 'Education',
      subtitle: 'CSE B.E',
      value: 'OKAY',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#9370DB] fill-current">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13c-2.3 0-4.36-.88-6-2.28V18c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.28c-1.64 1.4-3.7 2.28-6 2.28z" />
        </svg>
      )
    },
    {
      title: 'Events',
      subtitle: 'Community',
      value: '10+',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#FF6347] fill-current animate-pulse">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
        </svg>
      )
    },
    {
      title: 'ARP',
      subtitle: 'Performer',
      value: 'NOMINEE 2025',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#FFD700] fill-current">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v3c0 2.44 1.72 4.48 4 4.9V19H5v2h14v-2h-2v-4.1c2.28-.42 4-2.46 4-4.9V7c0-1.1-.9-2-2-2zm-12 5V7h2v3c0 .55-.45 1-1 1s-1-.45-1-1zm10 0c0 .55-.45 1-1 1s-1-.45-1-1V7h2v3z" />
        </svg>
      )
    },
    {
      title: 'Certificates',
      subtitle: 'Achievements',
      value: '5+',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#1E90FF] fill-none stroke-current stroke-[2]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="status" 
      className={`relative py-24 px-6 overflow-hidden transition-all duration-1000 ${
        darkMode 
          ? 'bg-gradient-to-b from-[#0D2218] via-zinc-950 to-[#0D2218] text-zinc-100' 
          : 'bg-gradient-to-b from-[#E6ECE8] via-[#FAFAF8] to-[#E6ECE8] text-gray-900'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-emerald-950'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          CURRENT STATUS • MY STORIES • LATEST HIGHLIGHTS • EDUCATION &nbsp; CURRENT STATUS • MY STORIES • LATEST HIGHLIGHTS • EDUCATION &nbsp;
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        {/* Heading & Tagline */}
        <div className="text-center md:text-left mb-16">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E5B53B] animate-ping" />
            <h2 className="text-xs font-black tracking-widest uppercase text-[#E5B53B]">
              — Current Status
            </h2>
          </div>
          <h2 className={`text-2xl md:text-4xl font-black tracking-tight uppercase ${
            darkMode ? 'text-white' : 'text-[#0D2218]'
          }`}>
            Latest Highlights
          </h2>
        </div>

        {/* Outer Slider Container */}
        <div className="relative">
          {/* Scrollable Row */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 pb-8 overflow-x-auto snap-x scrollbar-none scroll-smooth justify-start md:justify-center"
            style={{ scrollbarWidth: 'none' }}
          >
            {stories.map((story, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 w-44 h-64 rounded-3xl relative group snap-start transition-all duration-500 hover:scale-105 active:scale-95 flex flex-col items-center justify-between p-6 text-center ${
                  story.isInteractive ? 'cursor-pointer' : 'cursor-default'
                } ${
                  darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-[#E5B53B]/40 shadow-xl'
                    : 'bg-white border border-zinc-200 shadow-lg hover:border-[#E5B53B]/40'
                }`}
                onClick={() => story.action && story.action()}
              >
                {/* Floating Icon Box */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {story.icon}
                </div>

                {/* Main Stat / Value */}
                <div className="my-2 flex flex-col items-center justify-center">
                  {story.title === 'ARP' ? (
                    <span className="text-[10px] leading-tight font-black text-[#E5B53B] uppercase tracking-wider max-w-[120px]">
                      ALL ROUNDER PERFORMANCE nominee 2025
                    </span>
                  ) : story.title === 'Education' ? (
                    <span className="text-sm font-black text-[#E5B53B] uppercase tracking-wider">
                      CSE B.E
                    </span>
                  ) : (
                    <span className={`font-black uppercase tracking-wider ${
                      story.title === 'Post Story' ? 'text-xs text-[#E5B53B]' : 'text-3xl text-[#E5B53B]'
                    }`}>
                      {story.value}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className={`font-black text-xs uppercase tracking-wider mb-0.5 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {story.title}
                  </h3>
                  <p className="text-[8px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Progress Bar */}
          <div className="w-48 h-1.5 bg-zinc-200 dark:bg-zinc-800/80 rounded-full mx-auto mt-4 relative overflow-hidden md:hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#E5B53B] rounded-full transition-all duration-200"
              style={{ 
                width: `${Math.max(15, scrollProgress * 100)}%`,
                left: `${scrollProgress * (100 - 15)}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusSection;