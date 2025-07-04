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
    'certificate/A1.jpg', 'certificate/A2.jpg','certificate/c1.jpg', 'certificate/c2.jpg', 'certificate/c3.jpg', 'certificate/c4.png', 'certificate/c5.png',
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
    <section id="status" className="py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <h2 className={`text-xl font-bold mb-8 text-center md:text-left text-orange-500`}>
            Current Status
          </h2>
        </ScrollReveal>
        <div className="relative">
          <div className="flex gap-4 pb-4 overflow-x-auto">
            {stories.map((story, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div 
                  className="flex-shrink-0 w-32 h-48 rounded-2xl relative group cursor-pointer"
                  onClick={() => story.action && story.action()}
                >
                  <div className="w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-105 story-animated-border">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent`} />
                  
                  {story.type === 'add' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center border-2 border-white mb-2">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-semibold text-sm">{story.title}</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-orange-500 p-0.5 animate-border-pulse">
                        <img src={story.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">{story.title}</p>
                    </>
                  )}
                </div>
              </ScrollReveal>
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