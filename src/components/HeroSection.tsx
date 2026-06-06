import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Download, Mail, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  onBackToRobot?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const titles = ["Flutter Developer", "Python"];
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted to attempt playing audio on load
  const [hasAutoplayed, setHasAutoplayed] = useState(false);
  const lastTimeRef = useRef(0);
  const playCountRef = useRef(0);

  // Attempt autoplay with sound immediately on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play()
        .then(() => {
          setIsMuted(false);
          setHasAutoplayed(true);
        })
        .catch((err) => {
          console.log("Autoplay with audio blocked on load:", err);
          setIsMuted(true);
          video.muted = true;
          video.play().catch(e => console.log("Muted fallback autoplay blocked:", e));
        });
    }
  }, []);

  // Auto-play audio once on first user interaction if it was blocked initially
  useEffect(() => {
    const handleFirstInteraction = () => {
      const video = videoRef.current;
      if (video && !hasAutoplayed) {
        setIsMuted(false);
        setHasAutoplayed(true);
        playCountRef.current = 0;
        lastTimeRef.current = video.currentTime;
        video.muted = false;
        video.play().catch(err => console.log("Interaction audio play blocked:", err));

        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    if (!hasAutoplayed) {
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasAutoplayed]);

  // Handle video mute state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Monitor playback to mute audio after one full play with sound
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      // Loop detection: if currentTime drops below lastTime, it has looped
      if (video.currentTime < lastTimeRef.current) {
        if (!isMuted) {
          playCountRef.current += 1;
          if (playCountRef.current >= 1) {
            setIsMuted(true);
            video.muted = true;
          }
        }
      }
      lastTimeRef.current = video.currentTime;
    }
  };

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
    <section id="hero" className="min-h-screen flex items-center justify-start relative px-6 md:px-20 lg:px-22 bg-transparent overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src={`${import.meta.env.BASE_URL}create_video_in_ratio_Hi.mp4`} type="video/mp4" />
      </video>
      {/* Gradient Overlay for supreme readability */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent'
        : 'bg-gradient-to-r from-white/95 via-white/75 to-white/10'
        }`} />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-start text-left pt-16">
        {/* Top Tag */}
        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-orange-500 uppercase mb-3 block">
          PORTFOLIO 2026
        </span>

        {/* Big Bold Headline */}
        <h1 className="text-5xl md:text-7xl mb-4 font-great-vibes" style={{ color: '#fb923c' }}>
          Jeevith
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-6 md:h-8 mb-6 flex items-center">
          <span className={`text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase ${darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            {typedText}
          </span>
          <span className="w-[2px] h-4 bg-orange-500 ml-1 animate-pulse" />
        </div>

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
            className={`px-6 py-2.5 border-2 rounded-full font-bold tracking-wider uppercase text-[10px] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 ${darkMode
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
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>LeetCode</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-orange-500 leading-none mb-1">7+</span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-orange-500 leading-none mb-1">3+</span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Internships</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce md:bottom-8 z-10">
        <ArrowDown className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>

      <button
        onClick={() => {
          setIsMuted(!isMuted);
        }}
        className={`absolute bottom-4 right-13 md:bottom-8 md:right-20 z-20 w-12 h-12 md:w-14  md:h-14 flex items-center justify-center rounded-full border transition-all duration-300 shadow-lg ${isMuted
          ? 'bg-[#B35820] border-orange-700/40 text-white shadow-[0_0_10px_rgba(179,88,32,0.3)] hover:bg-[#C95918]'
          : 'bg-[#C95918] border-orange-800/40 text-white shadow-[0_0_12px_rgba(201,89,24,0.4)] hover:bg-[#A84710]'
          }`}
        title={isMuted ? "Enable Sound" : "Mute Sound"}
      >
        {isMuted ? <VolumeX className="w-7 h-7 md:w-8 md:h-8" /> : <Volume2 className="w-7 h-7 md:w-8 md:h-8 animate-pulse" />}
      </button>
    </section>
  );
};

export default HeroSection;
