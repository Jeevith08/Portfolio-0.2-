import React, { useState, useCallback, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface Story {
  type?: 'story';
  title: string;
  subtitle: string;
  image: string;
  avatar: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface AddStory {
  type: 'add';
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  action?: () => void;
}

type StoryItem = Story | AddStory;

interface StatusSectionProps {
  darkMode: boolean;
}

// Reusable Story Modal Component
const StoryModal = ({ onClose, images, darkMode }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const handleScroll = () => onClose();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onClose]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/80' : 'bg-white/80'}`} onClick={onClose}>
      <button
        className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-[#E5B53B] hover:text-[#0D2218]' : 'bg-black/10 text-black hover:bg-[#E5B53B] hover:text-white'}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((imgSrc, index) => (
              <div key={index} className="flex-shrink-0 w-full flex items-center justify-center p-4" style={{ flexBasis: '100%' }}>
                <div className="animated-gradient-border relative">
                  <img
                    src={`${import.meta.env.BASE_URL}${imgSrc}`}
                    alt={`Story content ${index + 1}`}
                    className="max-h-[80vh] w-auto block rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-[#E5B53B] hover:text-[#0D2218]' : 'bg-black/10 text-black hover:bg-[#E5B53B] hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            scrollPrev();
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-[#E5B53B] hover:text-[#0D2218]' : 'bg-black/10 text-black hover:bg-[#E5B53B] hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            scrollNext();
          }}
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

const StatusSection: React.FC<StatusSectionProps> = ({ darkMode }) => {
  const [modalImages, setModalImages] = useState<string[] | null>(null);
  const [hiddenCertificates, setHiddenCertificates] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const beCseImages = ['SNS1.jpg', 'SNS2.jpeg'];
  const eventImages = ['Events/E1.jpeg', 'Events/E2.jpeg', 'Events/E3.jpeg', 'Events/E4.jpeg', 'Events/E5.jpeg', 'Events/E6.jpeg', 'Events/E7.jpeg', 'Events/E8.jpeg'];
  const arpImages = ['ARP.jpeg'];
  const certificateImages = [
    'certificate/A1.jpg', 'certificate/c1.jpg', 'certificate/c2.jpg', 'certificate/c3.jpg', 'certificate/c4.png', 'certificate/c5.png',
    'certificate/c6.jpg', 'certificate/c7.jpg', 'certificate/c7.png', 'certificate/c8.png', 'certificate/c9.png', 
    'certificate/c10.png', 'certificate/c11.png'
  ];

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
      type: 'add',
      title: 'Post Story',
      subtitle: 'Share moments',
      image: `${import.meta.env.BASE_URL}pic p.png`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#E5B53B] fill-current">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      )
    },
    {
      title: 'Education',
      subtitle: 'CSE B.E',
      image: `${import.meta.env.BASE_URL}SNS1.jpg`,
      avatar: `${import.meta.env.BASE_URL}SNS2.jpeg`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#9370DB] fill-current">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13c-2.3 0-4.36-.88-6-2.28V18c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.28c-1.64 1.4-3.7 2.28-6 2.28z" />
        </svg>
      ),
      action: () => setModalImages(beCseImages)
    },
    {
      title: 'Events',
      subtitle: 'Community',
      image: `${import.meta.env.BASE_URL}Events/E1.jpeg`,
      avatar: `${import.meta.env.BASE_URL}Events/E2.jpeg`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#FF6347] fill-current animate-bounce">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
        </svg>
      ),
      action: () => setModalImages(eventImages)
    },
    {
      title: 'ARP',
      subtitle: 'Performer',
      image: `${import.meta.env.BASE_URL}ARP.jpeg`,
      avatar: `${import.meta.env.BASE_URL}certificate/c4.png`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#FFD700] fill-current">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v3c0 2.44 1.72 4.48 4 4.9V19H5v2h14v-2h-2v-4.1c2.28-.42 4-2.46 4-4.9V7c0-1.1-.9-2-2-2zm-12 5V7h2v3c0 .55-.45 1-1 1s-1-.45-1-1zm10 0c0 .55-.45 1-1 1s-1-.45-1-1V7h2v3z" />
        </svg>
      ),
      action: () => setModalImages(arpImages)
    },
    {
      title: 'Certificates',
      subtitle: 'Achievements',
      image: `${import.meta.env.BASE_URL}certificate/c5.png`,
      avatar: `${import.meta.env.BASE_URL}certificate/c6.jpg`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#1E90FF] fill-none stroke-current stroke-[2]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      ),
      action: () => setModalImages(certificateImages.filter(img => !hiddenCertificates.includes(img)))
    },
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
            className="flex gap-6 pb-8 overflow-x-auto snap-x scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {stories.map((story, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 w-44 h-60 rounded-3xl relative group cursor-pointer snap-start transition-all duration-500 hover:scale-105 active:scale-95 ${
                  darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-[#E5B53B]/40 shadow-xl'
                    : 'bg-white border border-zinc-200 shadow-lg hover:border-[#E5B53B]/40'
                }`}
                onClick={() => story.action && story.action()}
              >
                {/* Content Layout */}
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  
                  {/* Floating Icon Box */}
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {story.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`font-black text-sm uppercase tracking-tight mb-1 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {story.title}
                  </h3>
                  
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Progress Bar (Inspired by design template) */}
          <div className="w-48 h-1.5 bg-zinc-200 dark:bg-zinc-800/80 rounded-full mx-auto mt-4 relative overflow-hidden">
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

      {modalImages && (
        <StoryModal 
          onClose={() => setModalImages(null)} 
          images={modalImages} 
          darkMode={darkMode}
        />
      )}

      <style>{`
        @keyframes running-border {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .animated-gradient-border {
          padding: 4px;
          position: relative;
          background: conic-gradient(from var(--angle), #fbbf24, #f59e0b, #E5B53B, #fbbf24);
          animation: running-border 5s linear infinite;
          border-radius: 1rem;
          box-shadow: 0 0 20px #E5B53B;
        }
      `}</style>
    </section>
  );
};

export default StatusSection;