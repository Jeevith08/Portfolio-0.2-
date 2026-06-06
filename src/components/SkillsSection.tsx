import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Brain, Settings, Briefcase, Building2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
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
  'Python', 'Dart', 'Flutter', 'Supabase', 'GitHub', 'Git', 'Excel', 'REST API', 'SQL'];

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
  const internshipBtnRef = useRef<HTMLButtonElement>(null);
  const proficiencyChartRef = useRef<HTMLDivElement>(null);

  // Hide internship info on scroll
  useEffect(() => {
    const handleScroll = () => setShowInternship(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const chart = proficiencyChartRef.current;
    if (!chart) return;

    const dots = chart.querySelectorAll('.dot');
    gsap.set(dots, { transformOrigin: 'center center', scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chart,
        start: 'top 80%',
        end: 'bottom 20%',
        once: true,
      },
    });

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
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      className={`relative min-h-screen py-20 px-6 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-white via-orange-50/10 to-white'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/3 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-orange-900'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          TECH STACK • SKILLS • LANGUAGES • TOOLS • INTERNSHIPS • &nbsp; TECH STACK • SKILLS • LANGUAGES • TOOLS • INTERNSHIPS • &nbsp;
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Heading & Tagline */}
        <div className="text-center mb-16">
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
          {/* Proficiency Line Chart with Float Gentle */}
          <div 
            ref={proficiencyChartRef} 
            className={`rounded-3xl p-6 shadow-2xl border flex flex-col justify-between animate-float-gentle ${
              darkMode 
                ? 'bg-[#121212]/90 border-zinc-800 shadow-orange-950/10' 
                : 'bg-white border-orange-100 shadow-orange-100/30'
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

          {/* Tools & Problem Solving with Float Reverse */}
          <div 
            className={`rounded-3xl p-6 shadow-2xl border flex flex-col justify-between animate-float-gentle-reverse ${
              darkMode 
                ? 'bg-[#121212]/90 border-zinc-800 shadow-orange-950/10' 
                : 'bg-white border-orange-100 shadow-orange-100/30'
            }`}
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

            {/* Internship Section */}
            <div className="w-full mt-6 relative flex flex-col items-start">
              <button
                ref={internshipBtnRef}
                type="button"
                className={`relative px-4 py-2 rounded-full font-bold text-[10px] tracking-wider uppercase border-2 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 ${
                  showInternship 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' 
                    : darkMode 
                      ? 'border-orange-500/50 text-orange-400 bg-transparent hover:border-orange-500' 
                      : 'border-orange-500 text-orange-600 bg-transparent hover:bg-orange-50'
                }`}
                onClick={() => setShowInternship((v) => !v)}
                onBlur={() => setShowInternship(false)}
                tabIndex={0}
                aria-label="Show Internships"
              >
                <Briefcase className="w-3.5 h-3.5" /> 
                Internships
              </button>

              {showInternship && (
                <div
                  className={`absolute bottom-full left-0 mb-3 z-30 min-w-[280px] max-w-[320px] rounded-2xl shadow-2xl border p-4 flex flex-col gap-3 transition-all duration-300 animate-scale-in ${
                    darkMode ? 'bg-[#181818] text-zinc-100 border-zinc-800' : 'bg-white text-gray-800 border-orange-100'
                  }`}
                  style={{ boxShadow: '0 10px 30px rgba(251, 146, 60, 0.15)' }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col w-full border-b border-orange-500/10 pb-2">
                    <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">Apr 2026 - Present</span>
                    <span className="text-xs font-bold"><span className="text-orange-500">DTrade</span>: App Development Intern</span>
                  </div>
                  <div className="flex flex-col w-full border-b border-orange-500/10 pb-2">
                    <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">Dec 2025 - Jan 2026</span>
                    <span className="text-xs font-bold"><span className="text-orange-500">Microsoft Elevate</span>: Power BI Intern</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">Apr 2026</span>
                    <span className="text-xs font-bold"><span className="text-orange-500">ServiceNow University</span>: Virtual Intern</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
