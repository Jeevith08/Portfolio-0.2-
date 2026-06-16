import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Download, Mail, Volume2, VolumeX, X } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  onBackToRobot?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const titles = ["Software Developer", "Flutter Developer", "Python"];
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownloadResume = (type: 'app' | 'software') => {
    const link = document.createElement('a');
    if (type === 'app') {
      link.href = `${import.meta.env.BASE_URL}JEEVITH RESUME APP -UD.pdf`;
      link.download = 'JEEVITH RESUME APP -UD.pdf';
    } else {
      link.href = `${import.meta.env.BASE_URL}JEEVITH RESUME UD.pdf`;
      link.download = 'JEEVITH RESUME UD.pdf';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

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
          <button
            onClick={() => setShowDownloadModal(true)}
            className={`px-6 py-2.5 border-2 rounded-full font-bold tracking-wider uppercase text-[10px] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 ${darkMode
              ? 'border-white text-white hover:bg-white hover:text-black'
              : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
              }`}
          >
            <Download className="w-3.5 h-3.5" />
            Download CV
          </button>
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
      {/* Resume Selection Modal with custom water effects */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setShowDownloadModal(false)}
          />
          
          {/* Dialog Card */}
          <div className={`relative w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 overflow-hidden border transition-all duration-300 transform scale-100 ${
            darkMode 
              ? 'bg-[#0d1c15]/95 border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
              : 'bg-white/95 border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
          }`}>
            <style>{`
              @keyframes wave-move-left {
                0% { transform: translateX(0); }
                50% { transform: translateX(-25%); }
                100% { transform: translateX(-50%); }
              }
              @keyframes wave-move-right {
                0% { transform: translateX(-50%); }
                50% { transform: translateX(-25%); }
                100% { transform: translateX(0); }
              }
              .animate-wave-slow {
                animation: wave-move-left 14s linear infinite;
              }
              .animate-wave-fast {
                animation: wave-move-right 8s linear infinite;
              }
              .wave-card {
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .wave-card .wave-bg {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 200%;
                height: 35%;
                transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 0;
                pointer-events: none;
              }
              .wave-card:hover .wave-bg {
                height: 75%;
              }
              .wave-card .wave-content {
                position: relative;
                z-index: 10;
              }
            `}</style>

            {/* Background soft glow */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button 
              onClick={() => setShowDownloadModal(false)}
              className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 z-[100] ${
                darkMode 
                  ? 'border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white bg-zinc-900/50' 
                  : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-black bg-zinc-100/50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-8 relative z-10">
              <h3 className={`text-xl md:text-2xl font-black uppercase tracking-wider mb-2 ${
                darkMode ? 'text-white' : 'text-zinc-900'
              }`}>
                Choose Resume Version
              </h3>
              <p className={`text-xs md:text-sm font-semibold leading-relaxed px-4 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Select the version that matches the job requirements.
              </p>
            </div>

            {/* Options Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10">
              
              {/* App Developer Option */}
              <div 
                onClick={() => handleDownloadResume('app')}
                className={`wave-card group rounded-3xl p-6 h-36 flex flex-col justify-between border ${
                  darkMode 
                    ? 'bg-[#102920]/80 border-teal-500/30 hover:border-teal-400 shadow-lg shadow-teal-500/5' 
                    : 'bg-teal-50/20 border-teal-500/30 hover:border-teal-400 shadow-lg shadow-teal-500/5'
                }`}
              >
                <div className="wave-content text-left">
                  <span className="text-[10px] font-black tracking-widest uppercase text-teal-400 mb-1 block">
                    Mobile Focus
                  </span>
                  <h4 className={`text-base font-black uppercase tracking-wide group-hover:text-teal-300 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-zinc-900'
                  }`}>
                    App Developer
                  </h4>
                </div>
                
                <div className="wave-content flex justify-between items-center mt-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${
                    darkMode ? 'text-zinc-500 group-hover:text-teal-300' : 'text-zinc-400 group-hover:text-teal-700'
                  }`}>
                    PDF • 43 KB
                  </span>
                  <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-4 h-4" />
                  </div>
                </div>

                {/* Teal Waves */}
                <div className="wave-bg">
                  <svg className="absolute bottom-0 left-0 w-[200%] h-14 text-teal-500/15 fill-current animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 L1500,120 L0,120 Z" />
                  </svg>
                  <svg className="absolute bottom-0 left-0 w-[200%] h-10 text-teal-400/25 fill-current animate-wave-fast" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,20 300,100 500,60 C700,20 900,100 1000,60 C1100,20 1300,100 1500,60 L1500,120 L0,120 Z" />
                  </svg>
                </div>
              </div>

              {/* Software Developer Option */}
              <div 
                onClick={() => handleDownloadResume('software')}
                className={`wave-card group rounded-3xl p-6 h-36 flex flex-col justify-between border ${
                  darkMode 
                    ? 'bg-[#1b2210]/80 border-orange-500/30 hover:border-orange-400 shadow-lg shadow-orange-500/5' 
                    : 'bg-orange-50/20 border-orange-500/30 hover:border-orange-400 shadow-lg shadow-orange-500/5'
                }`}
              >
                <div className="wave-content text-left">
                  <span className="text-[10px] font-black tracking-widest uppercase text-orange-400 mb-1 block">
                    General Focus
                  </span>
                  <h4 className={`text-base font-black uppercase tracking-wide group-hover:text-orange-300 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-zinc-900'
                  }`}>
                    Software Dev
                  </h4>
                </div>
                
                <div className="wave-content flex justify-between items-center mt-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${
                    darkMode ? 'text-zinc-500 group-hover:text-orange-300' : 'text-zinc-400 group-hover:text-orange-700'
                  }`}>
                    PDF • 45 KB
                  </span>
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-4 h-4" />
                  </div>
                </div>

                {/* Orange Waves */}
                <div className="wave-bg">
                  <svg className="absolute bottom-0 left-0 w-[200%] h-14 text-orange-500/15 fill-current animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 L1500,120 L0,120 Z" />
                  </svg>
                  <svg className="absolute bottom-0 left-0 w-[200%] h-10 text-orange-400/25 fill-current animate-wave-fast" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,20 300,100 500,60 C700,20 900,100 1000,60 C1100,20 1300,100 1500,60 L1500,120 L0,120 Z" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Cancel Button */}
            <button 
              onClick={() => setShowDownloadModal(false)}
              className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border relative z-10 ${
                darkMode 
                  ? 'border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white bg-zinc-900/20' 
                  : 'border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-900 bg-zinc-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
