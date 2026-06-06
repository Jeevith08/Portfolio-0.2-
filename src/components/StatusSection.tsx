import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface Story {
  type?: 'story';
  title: string;
  image: string;
  avatar: string;
  link?: string;
  action?: () => void;
}

interface AddStory {
  type: 'add';
  title: string;
  image: string;
  link?: string;
  action?: () => void;
}

type StoryItem = Story | AddStory;

interface StatusSectionProps {
  darkMode: boolean;
}

// Reusable Story Modal Component
const StoryModal = ({ onClose, images, darkMode, onHideA2 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
        className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-orange-500' : 'bg-black/10 text-black hover:bg-orange-500 hover:text-white'}`}
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
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-orange-500' : 'bg-black/10 text-black hover:bg-orange-500 hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            scrollPrev();
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-orange-500' : 'bg-black/10 text-black hover:bg-orange-500 hover:text-white'}`}
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
  
  const beCseImages = ['SNS1.jpg', 'SNS2.jpeg'];
  const eventImages = ['Events/E1.jpeg', 'Events/E2.jpeg', 'Events/E3.jpeg', 'Events/E4.jpeg', 'Events/E5.jpeg', 'Events/E6.jpeg', 'Events/E7.jpeg', 'Events/E8.jpeg'];
  const arpImages = ['ARP.jpeg'];
  const certificateImages = [
    'certificate/A1.jpg', 'certificate/c1.jpg', 'certificate/c2.jpg', 'certificate/c3.jpg', 'certificate/c4.png', 'certificate/c5.png',
    'certificate/c6.jpg', 'certificate/c7.jpg', 'certificate/c7.png', 'certificate/c8.png', 'certificate/c9.png', 
    'certificate/c10.png', 'certificate/c11.png'
  ];

  const stories: StoryItem[] = [
    { type: 'add', title: 'Post Story', image: `${import.meta.env.BASE_URL}pic p.png` },
    { title: 'B.E (CSE)', image: `${import.meta.env.BASE_URL}SNS1.jpg`, avatar: `${import.meta.env.BASE_URL}SNS2.jpeg`, action: () => setModalImages(beCseImages) },
    { title: 'Events', image: `${import.meta.env.BASE_URL}Events/E1.jpeg`, avatar: `${import.meta.env.BASE_URL}Events/E2.jpeg`, action: () => setModalImages(eventImages) },
    { title: 'ARP', image: `${import.meta.env.BASE_URL}ARP.jpeg`, avatar: `${import.meta.env.BASE_URL}certificate/c4.png`, action: () => setModalImages(arpImages) },
    { title: 'Certificates', image: `${import.meta.env.BASE_URL}certificate/c5.png`, avatar: `${import.meta.env.BASE_URL}certificate/c6.jpg`, action: () => setModalImages(certificateImages.filter(img => !hiddenCertificates.includes(img))) },
  ];

  return (
    <section 
      id="status" 
      className={`relative py-20 px-6 overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-white via-orange-50/10 to-white'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-orange-900'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          CURRENT STATUS • MY STORIES • LATEST HIGHLIGHTS • EDUCATION &nbsp; CURRENT STATUS • MY STORIES • LATEST HIGHLIGHTS • EDUCATION &nbsp;
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        {/* Heading & Tagline */}
        <div className="text-center md:text-left mb-12">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <h2 className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Current Status
            </h2>
          </div>
          <h2 className={`text-xl md:text-2xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Latest Highlights
          </h2>
        </div>

        <div className="relative">
          <div className="flex gap-6 pb-6 overflow-x-auto snap-x scrollbar-thin">
            {stories.map((story, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 w-36 h-56 rounded-2xl relative group cursor-pointer snap-start transition-all duration-300 hover:-translate-y-2 hover:rotate-1 ${
                  index % 2 === 0 ? 'animate-float-gentle' : 'animate-float-gentle-reverse'
                }`}
                onClick={() => story.action && story.action()}
              >
                <div className="w-full h-full rounded-2xl p-0.5 transition-transform duration-300 story-animated-border overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-115"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {story.type === 'add' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center border-2 border-white mb-3 shadow-lg shadow-orange-500/30">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-black text-xs uppercase tracking-wider">{story.title}</p>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full border-2 border-orange-500 p-0.5 animate-border-pulse shadow-lg">
                      <img src={story.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <p className="absolute bottom-4 left-4 text-white font-black text-xs uppercase tracking-wider">{story.title}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalImages && (
        <StoryModal 
          onClose={() => setModalImages(null)} 
          images={modalImages} 
          darkMode={darkMode}
          onHideA2={() => {
            setHiddenCertificates(prev => [...prev, 'certificate/A2.png']);
            setModalImages((prev) => prev ? prev.filter(img => img !== 'certificate/A2.png') : prev);
          }}
        />
      )}
      <style>{`
        @keyframes border-pulse {
          0%, 100% { border-color: #f97316; }
          50% { border-color: #ea580c; }
        }
        .animate-border-pulse {
          animation: border-pulse 2s infinite;
        }

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
          padding: 4px; /* Border thickness */
          position: relative;
          background: conic-gradient(from var(--angle), #fbbf24, #f59e0b, #ea580c, #f97316, #ea580c, #f59e0b, #fbbf24);
          animation: running-border 5s linear infinite;
          border-radius: 1rem;
          box-shadow: 0 0 20px #f97316;
        }

        .story-animated-border {
          padding: 2px; /* Border thickness */
          background: conic-gradient(from var(--angle), #fbbf24, #f59e0b, #ea580c, #f97316, #ea580c, #f59e0b, #fbbf24);
          animation: running-border 5s linear infinite;
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: ${darkMode ? '#232323' : '#f1f1f1'};
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </section>
  );
};

export default StatusSection; 