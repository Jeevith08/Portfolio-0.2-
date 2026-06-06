import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Briefcase, X } from 'lucide-react';

interface SkillsSectionProps {
  darkMode: boolean;
}

const skills = [
  {
    name: 'Flutter',
    subtitle: 'Mobile Development',
    accentColor: 'hover:border-[#02569B]/40 hover:shadow-[0_20px_40px_rgba(2,86,155,0.18)] dark:hover:bg-[#02569b]/5',
    logo: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#02569B] fill-current">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6 15.7L2.3 19.4l3.692 3.692 3.692-3.692L6 15.7zM14.33 7.82l-4.63 4.63 4.63 4.63h7.37l-4.63-4.63 4.63-4.63h-7.37z"/>
      </svg>
    )
  },
  {
    name: 'Supabase',
    subtitle: 'Backend & Database',
    accentColor: 'hover:border-[#3ECF8E]/40 hover:shadow-[0_20px_40px_rgba(62,207,142,0.18)] dark:hover:bg-[#3ecf8e]/5',
    logo: (
      <svg viewBox="0 0 24 24" className="w-11 h-11 text-[#3ECF8E] fill-current">
        <path d="M21.362 10.108L13.123.633a1.09 1.09 0 00-1.892.775v6.52H3.77a1.09 1.09 0 00-.819 1.808l8.239 9.475a1.09 1.09 0 001.892-.775V11.92h7.462a1.09 1.09 0 00.819-1.808z"/>
      </svg>
    )
  },
  {
    name: 'React',
    subtitle: 'Frontend Development',
    accentColor: 'hover:border-[#61DAFB]/40 hover:shadow-[0_20px_40px_rgba(97,218,251,0.18)] dark:hover:bg-[#61dafb]/5',
    logo: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 text-[#61DAFB] fill-none stroke-current stroke-[1.5]">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        <circle r="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'UI/UX Design',
    subtitle: 'Figma, Lovable.dev',
    accentColor: 'hover:border-[#F24E1E]/40 hover:shadow-[0_20px_40px_rgba(242,78,30,0.18)] dark:hover:bg-[#f24e1e]/5',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#F24E1E] fill-current">
        <path d="M12 0C8.685 0 6 2.685 6 6c0 1.95 1 3.682 2.505 4.685C6.985 11.685 6 13.432 6 15.385 6 18.7 8.685 21.385 12 21.385c3.315 0 6-2.685 6-5.385v-10c0-3.315-2.685-6-6-6zm-3.5 6c0-1.925 1.575-3.5 3.5-3.5s3.5 1.575 3.5 3.5-1.575 3.5-3.5 3.5-3.5-1.575-3.5-3.5zm0 9.385c0-1.925 1.575-3.5 3.5-3.5s3.5 1.575 3.5 3.5-1.575 3.5-3.5 3.5-3.5-1.575-3.5-3.5zM12 10.7V7.185c1.925 0 3.5 1.575 3.5 3.5S13.925 10.7 12 10.7z"/>
      </svg>
    )
  },
  {
    name: 'Git & DevOps',
    subtitle: 'Netlify, GitHub',
    accentColor: 'hover:border-[#F05032]/40 hover:shadow-[0_20px_40px_rgba(240,80,50,0.18)] dark:hover:bg-[#f05032]/5',
    logo: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#F05032] fill-current">
        <path d="M20.25 11.25l-7.5-7.5a1.058 1.058 0 00-1.5 0l-7.5 7.5a1.058 1.058 0 000 1.5l7.5 7.5a1.058 1.058 0 001.5 0l7.5-7.5a1.058 1.058 0 000-1.5zM9 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
      </svg>
    )
  },
  {
    name: 'Full Stack',
    subtitle: 'End-to-end Development',
    accentColor: 'hover:border-[#10B981]/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)] dark:hover:bg-[#10b981]/5',
    logo: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#10B981] fill-none stroke-current stroke-[2]">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 4l-3 16"/>
      </svg>
    )
  }
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [showInternship, setShowInternship] = useState(false);
  const [revealSection, setRevealSection] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for viewport triggers (80% / 20% visibility)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealSection(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll Parallax logic
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (sectionRef.current) {
      setSectionTop(sectionRef.current.offsetTop);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const parallaxY = (scrollY - sectionTop) * 0.15;
  const opacityDelta = Math.max(0, 0.08 - Math.abs(scrollY - sectionTop) / 2000);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        darkMode
          ? 'bg-gradient-to-b from-black via-zinc-950 to-black'
          : 'bg-gradient-to-r from-[#F5F1E8] via-[#FAFAF8] to-[#F5F1E8] animate-gradient-shift'
      }`}
    >
      {/* Background Giant Marquee with Scroll Parallax & Fade */}
      <div
        className={`absolute top-1/3 left-0 w-full overflow-hidden select-none pointer-events-none tracking-widest transition-all duration-300 ${
          darkMode ? 'text-white' : 'text-orange-950'
        }`}
        style={{
          transform: `translateY(${parallaxY}px)`,
          opacity: opacityDelta,
        }}
      >
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          TECH STACK • SKILLS • LANGUAGES • TOOLS • INTERNSHIPS • &nbsp; TECH STACK • SKILLS • LANGUAGES • TOOLS • INTERNSHIPS • &nbsp;
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Heading & Tagline - Entrance Animation with Clip Path */}
        <div className={`text-center mb-16 ${revealSection ? 'animate-reveal-text' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Wrench className="w-5 h-5 text-orange-500 animate-spin-slow" />
            <h2 className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              My Skills
            </h2>
          </div>
          <h2 className={`text-xl md:text-3xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technologies & Tools
          </h2>
        </div>

        {/* Polished Interactive Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group rounded-3xl p-8 border flex flex-col items-center justify-center text-center transition-all duration-500 ease-out md:hover:translate-y-[-8px] active:scale-[1.02] ${
                revealSection ? 'animate-card-entrance' : 'opacity-0 scale-85 translate-y-[20px]'
              } ${skill.accentColor} ${
                darkMode
                  ? 'bg-[#141414]/70 backdrop-blur-md border-zinc-800/80 text-white'
                  : 'bg-white border-zinc-200/80 shadow-md text-gray-900'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Logo Box */}
              <div className="mb-6 w-20 h-20 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/60 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40 shadow-inner group-hover:scale-110 transition-transform duration-500">
                {skill.logo}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-black uppercase tracking-tight mb-1">
                {skill.name}
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                {skill.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Play Button Styled Internships Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setShowInternship(true)}
            className="opacity-85 scale-100 bg-black/40 border-2 border-orange-500 text-orange-400 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest btn-play-style hover:scale-115 hover:opacity-100 hover:shadow-[0_0_20px_rgba(251,146,60,0.6)] hover:bg-black/50 active:scale-122 active:opacity-95 flex items-center gap-2"
            aria-label="View Internships"
          >
            <Briefcase className="w-4 h-4 animate-pulse" />
            Internships
          </button>
        </div>
      </div>

      {/* Lightbox Modal Video Player style Internship Modal */}
      {showInternship && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-modal-backdrop"
          onClick={() => setShowInternship(false)}
        >
          <div
            className={`border-[6px] border-orange-500 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-modal-entrance ${
              darkMode ? 'bg-[#121212] text-zinc-100' : 'bg-white text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Fades in after 0.4s */}
            <button
              onClick={() => setShowInternship(false)}
              className="absolute top-4 right-4 text-orange-500 hover:text-orange-400 hover:scale-110 hover:rotate-90 hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Work Internships
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full border-b border-orange-500/10 pb-3">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Apr 2026 - Present</span>
                <span className="text-sm font-black"><span className="text-orange-500">DTrade</span>: App Development Intern</span>
              </div>
              <div className="flex flex-col w-full border-b border-orange-500/10 pb-3">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Dec 2025 - Jan 2026</span>
                <span className="text-sm font-black"><span className="text-orange-500">Microsoft Elevate</span>: Power BI Intern</span>
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Apr 2026</span>
                <span className="text-sm font-black"><span className="text-orange-500">ServiceNow University</span>: Virtual Intern</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
