import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Brain, Settings, Briefcase, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  darkMode: boolean;
}

const proficiencies = [
  { name: 'Flutter', value: 85 },
  { name: 'React.js', value: 75 },
  { name: 'Python', value: 80 },
  { name: 'Power BI', value: 80 },
];

const tools = [
  'Python', 'Dart', 'Flutter', 'Supabase', 'GitHub', 'Git', 'Excel', 'REST API', 'SQL'
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  // SVG line chart points
  const chartWidth = 320;
  const chartHeight = 120;
  const maxVal = 100;
  const step = chartWidth / (proficiencies.length - 1);
  const points = proficiencies.map((p, i) => `${i * step},${chartHeight - (p.value / maxVal) * chartHeight}`).join(' ');

  // Axis lines and grid
  const gridLines = [0, 20, 40, 60, 80, 100];

  const [showInternship, setShowInternship] = useState(false);
  const [revealSection, setRevealSection] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const proficiencyChartRef = useRef<HTMLDivElement>(null);

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

  // GSAP animation for SVG line dots
  useEffect(() => {
    if (!revealSection) return;
    const chart = proficiencyChartRef.current;
    if (!chart) return;

    const dots = chart.querySelectorAll('.dot');
    gsap.set(dots, { transformOrigin: 'center center', scale: 0, opacity: 0 });

    const tl = gsap.timeline();

    tl.to(dots, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      stagger: 0.2,
      ease: 'power1.inOut',
      attr: { filter: 'url(#glow)' },
    }).to(dots, {
      duration: 0.5,
      attr: { filter: 'none' },
    });

    return () => {
      tl.kill();
    };
  }, [revealSection]);

  // Parallax calculations
  const parallaxY = (scrollY - sectionTop) * 0.15;
  const opacityDelta = Math.max(0, 0.08 - Math.abs(scrollY - sectionTop) / 2000);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative min-h-screen py-20 px-6 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
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
          <h2 className={`text-xl md:text-2xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technologies & Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Card 1: Proficiency Line Chart - Entrance & Hover Animation */}
          <div
            ref={proficiencyChartRef}
            className={`rounded-[2.5rem] p-8 shadow-2xl border flex flex-col justify-between transition-all duration-500 ease-out md:hover:translate-y-[-8px] md:hover:shadow-[0_20px_50px_rgba(251,146,60,0.25)] active:scale-[1.02] ${
              revealSection ? 'animate-card-entrance' : 'opacity-0 scale-85 translate-y-[20px]'
            } ${
              darkMode
                ? 'bg-[#121212]/90 hover:bg-[#1a1a1a]/95 border-zinc-800'
                : 'bg-white hover:bg-amber-50/20 border-orange-100'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-orange-500" />
                <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-950'}`}>Proficiency</h3>
              </div>
              <svg width={chartWidth} height={chartHeight} className="w-full max-w-xs mx-auto block overflow-visible">
                {/* Grid lines */}
                {gridLines.map((y) => (
                  <line
                    key={y}
                    x1={0}
                    x2={chartWidth}
                    y1={chartHeight - (y / maxVal) * chartHeight}
                    y2={chartHeight - (y / maxVal) * chartHeight}
                    stroke={darkMode ? '#FF980033' : '#FF980022'}
                    strokeWidth={1}
                  />
                ))}
                {/* Vertical grid lines */}
                {proficiencies.map((_, i) => (
                  <line
                    key={i}
                    x1={i * step}
                    x2={i * step}
                    y1={0}
                    y2={chartHeight}
                    stroke={darkMode ? '#FF980033' : '#FF980022'}
                    strokeWidth={1}
                  />
                ))}
                {/* Line */}
                <polyline
                  id="skill-graph-line"
                  fill="none"
                  stroke="#FF4500"
                  strokeWidth="4"
                  points={points}
                  className="drop-shadow-[0_2px_12px_#FF450088]"
                  style={{ strokeDasharray: 400, strokeDashoffset: 400, animation: 'dash 2s ease-out forwards' }}
                />
                {/* Running light effect */}
                <circle r="7" fill="orange" filter="url(#glow)">
                  <animateMotion
                    dur="5s"
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                    begin="1.5s"
                  >
                    <mpath xlinkHref="#skill-graph-line" />
                  </animateMotion>
                </circle>
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Dots */}
                {proficiencies.map((p, i) => (
                  <circle
                    key={p.name}
                    cx={i * step}
                    cy={chartHeight - (p.value / maxVal) * chartHeight}
                    r="7"
                    fill="#FF9800"
                    stroke="#FF4500"
                    strokeWidth="3"
                    className="dot hover:scale-125 transition-transform duration-200 cursor-pointer"
                  />
                ))}
              </svg>

              <div className="flex justify-between mt-4 text-xs font-bold text-gray-500 dark:text-zinc-400">
                {proficiencies.map((p) => (
                  <span key={p.name}>{p.name}</span>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-orange-500 font-black">
                {proficiencies.map((p) => (
                  <span key={p.name}>{p.value}%</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Languages & Tools Card - Entrance & Hover Animation */}
          <div
            className={`rounded-[2.5rem] p-8 shadow-2xl border flex flex-col justify-between transition-all duration-500 ease-out md:hover:translate-y-[-8px] md:hover:shadow-[0_20px_50px_rgba(251,146,60,0.25)] active:scale-[1.02] ${
              revealSection ? 'animate-card-entrance' : 'opacity-0 scale-85 translate-y-[20px]'
            } ${
              darkMode
                ? 'bg-[#121212]/90 hover:bg-[#1a1a1a]/95 border-zinc-800'
                : 'bg-white hover:bg-amber-50/20 border-orange-100'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-orange-500" />
                <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-950'}`}>Languages & Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className={`px-4 py-2 rounded-full font-bold text-xs shadow transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
                      darkMode
                        ? 'bg-zinc-900 text-orange-200 hover:bg-zinc-800 border border-zinc-800'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100/70 border border-orange-100/50'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Play Button Styled Internships Button */}
            <div className="w-full mt-8 flex justify-center md:justify-start">
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
