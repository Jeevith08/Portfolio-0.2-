import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Briefcase } from 'lucide-react';

interface SkillsSectionProps {
  darkMode: boolean;
}

const skills = [
  {
    name: 'Flutter',
    subtitle: 'Mobile',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#02569B] fill-current">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6 15.7L2.3 19.4l3.692 3.692 3.692-3.692L6 15.7zM14.33 7.82l-4.63 4.63 4.63 4.63h7.37l-4.63-4.63 4.63-4.63h-7.37z"/>
      </svg>
    )
  },
  {
    name: 'Supabase',
    subtitle: 'Backend',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#3ECF8E] fill-current">
        <path d="M21.362 10.108L13.123.633a1.09 1.09 0 00-1.892.775v6.52H3.77a1.09 1.09 0 00-.819 1.808l8.239 9.475a1.09 1.09 0 001.892-.775V11.92h7.462a1.09 1.09 0 00.819-1.808z"/>
      </svg>
    )
  },
  {
    name: 'Python',
    subtitle: 'Languages',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#3776AB] fill-current">
        <path d="M12.001 0c-1.124.002-2.19.112-3.095.312-2.73.605-2.906 1.83-2.906 3.78v2.13h6.06V7.16h-8.73c-2.115 0-3.328 1.196-3.328 3.328v4.938c0 2.115 1.258 3.328 3.328 3.328h1.8v-2.52a2.49 2.49 0 012.49-2.49h5.12a2.49 2.49 0 002.49-2.49v-5.11a2.49 2.49 0 00-2.49-2.49h-1.83v2.52a2.49 2.49 0 01-2.49 2.49h-5.12a2.49 2.49 0 00-2.49 2.49v2.13c0 1.95.176 3.175 2.906 3.78a8.8 8.8 0 003.095.3c1.124-.002 2.19-.112 3.095-.312 2.73-.605 2.906-1.83 2.906-3.78v-2.13h-6.06v-.938h8.73c2.115 0 3.328-1.196 3.328-3.328v-4.938c0-2.115-1.258-3.328-3.328-3.328h-1.8v2.52a2.49 2.49 0 012.49-2.49h5.12a2.49 2.49 0 002.49-2.49v5.11a2.49 2.49 0 002.49 2.49h1.83v-2.52a2.49 2.49 0 012.49-2.49h5.12a2.49 2.49 0 002.49-2.49v-2.13c0-1.95-.176-3.175-2.906-3.78a8.8 8.8 0 00-3.095-.3z"/>
      </svg>
    )
  },
  {
    name: 'REST API',
    subtitle: 'Integration',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#0064a5] fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
        <path d="M20 6h-4M20 18h-4" />
      </svg>
    )
  },
  {
    name: 'UI/UX Design',
    subtitle: 'Figma',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#F24E1E] fill-current">
        <path d="M12 0C8.685 0 6 2.685 6 6c0 1.95 1 3.682 2.505 4.685C6.985 11.685 6 13.432 6 15.385 6 18.7 8.685 21.385 12 21.385c3.315 0 6-2.685 6-5.385v-10c0-3.315-2.685-6-6-6zm-3.5 6c0-1.925 1.575-3.5 3.5-3.5s3.5 1.575 3.5 3.5-1.575 3.5-3.5 3.5-3.5-1.575-3.5-3.5zm0 9.385c0-1.925 1.575-3.5 3.5-3.5s3.5 1.575 3.5 3.5-1.575 3.5-3.5 3.5-3.5-1.575-3.5-3.5zM12 10.7V7.185c1.925 0 3.5 1.575 3.5 3.5S13.925 10.7 12 10.7z"/>
      </svg>
    )
  },
  {
    name: 'Git',
    subtitle: 'DevOps',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#F05032] fill-current">
        <path d="M20.25 11.25l-7.5-7.5a1.058 1.058 0 00-1.5 0l-7.5 7.5a1.058 1.058 0 000 1.5l7.5 7.5a1.058 1.058 0 001.5 0l7.5-7.5a1.058 1.058 0 000-1.5zM9 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
      </svg>
    )
  }
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [revealSection, setRevealSection] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

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

  const parallaxY = (scrollY - sectionTop) * 0.15;
  const opacityDelta = Math.max(0, 0.08 - Math.abs(scrollY - sectionTop) / 2000);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        darkMode
          ? 'bg-gradient-to-b from-black via-zinc-950 to-black'
          : 'bg-gradient-to-r from-[#F5F1E8] via-[#FAFAF8] to-[#F5F1E8]'
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
        {/* Heading & Tagline */}
        <div className={`text-center mb-16 ${revealSection ? 'animate-reveal-text' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Wrench className="w-5 h-5 text-[#E5B53B] animate-spin-slow" />
            <h2 className="text-xs font-black tracking-widest uppercase text-[#E5B53B]">
              — My Skills
            </h2>
          </div>
          <h2 className={`text-xl md:text-3xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technologies & Tools
          </h2>
        </div>

        {/* Favorite Tools styled Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`flex flex-col items-center justify-center p-6 rounded-[2rem] shadow-xl border transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1.5 ${
                revealSection ? 'animate-card-entrance' : 'opacity-0 scale-85 translate-y-[20px]'
              } ${
                darkMode
                  ? 'bg-[#132E22]/40 border-zinc-800 shadow-[#081510]/30 hover:border-[#E5B53B]/30'
                  : 'bg-white border-zinc-200 shadow-zinc-200/30 hover:border-[#E5B53B]/30'
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Circular Logo Container */}
              <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-center shadow-inner mb-4 border border-zinc-100 dark:border-zinc-800/80">
                {skill.logo}
              </div>

              {/* Tool Name */}
              <span className="text-[10px] font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest">
                {skill.name}
              </span>

              {/* Subtitle */}
              <span className="text-[8px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">
                {skill.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Play Button Styled Internships Button -> Navigates to Milestone Page */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="button"
            onClick={() => {
              const journeySec = document.getElementById('journey');
              if (journeySec) {
                journeySec.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="opacity-85 scale-100 bg-black/40 border-2 border-[#E5B53B] text-[#E5B53B] px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest btn-play-style hover:scale-115 hover:opacity-100 hover:shadow-[0_0_20px_rgba(229,181,59,0.6)] hover:bg-black/50 active:scale-122 active:opacity-95 flex items-center gap-2"
            aria-label="View Internships on Milestone Page"
          >
            <Briefcase className="w-4 h-4" />
            Internships
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
