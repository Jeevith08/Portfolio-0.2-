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
  { name: 'Python', value: 40 },
  { name: 'Web Dev', value: 50 },
  { name: 'Java', value: 70 },
  { name: 'Logical', value: 80 },
];

const tools = [
  'HTML', 'CSS', 'Figma', 'MS Word', 'Excel', 'Java', 'Python', 'MySQL'
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
    <section id="skills" className={`min-h-screen py-20 px-4 flex items-center justify-center bg-transparent`}>
      <div className="max-w-5xl w-full mx-auto">
        {/* Heading & Tagline */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-orange-500" />
            <h2 className="text-base font-bold text-orange-500 flex items-center">My Skills</h2>
          </div>
          <p className={`text-xs max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Technologies and abilities I'm passionate about</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Proficiency Line Chart */}
          <div ref={proficiencyChartRef} className="bg-gradient-to-br from-orange-50/60 to-orange-100/40 dark:from-[#181818] dark:to-[#232323] rounded-3xl p-6 shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-orange-500" />
                <h3 className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Proficiency Overview</h3>
              </div>
              <svg width={chartWidth} height={chartHeight} className="w-full max-w-xs mx-auto block">
                {/* Grid lines */}
                {gridLines.map((y, idx) => (
                  <line
                    key={y}
                    x1={0}
                    x2={chartWidth}
                    y1={chartHeight - (y / maxVal) * chartHeight}
                    y2={chartHeight - (y / maxVal) * chartHeight}
                    stroke={darkMode ? '#FF980055' : '#FF980033'}
                    strokeWidth={1}
                  />
                ))}
                {/* Vertical grid lines */}
                {proficiencies.map((_, i) => (
                  
                  <line
                    key={i}
                    dur="5s"
                    x1={i * step}
                    x2={i * step}
                    y1={0}
                    y2={chartHeight}
                    stroke={darkMode ? '#FF980055' : '#FF980033'}
                    strokeWidth={1}
                  />
                ))}
                {/* Line */}
                <polyline
                
                  id="skill-graph-line"
                  dur="10s"
                  fill="none"
                  stroke="#FF4500"
                  strokeWidth="4"
                  points={points}
                  className="drop-shadow-[0_2px_12px_#FF450088] animate-dash svg-dash-animate"
                  style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
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
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
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
                    className="dot hover:scale-125 transition-transform duration-200 shadow-lg"
                  />
                ))}
              </svg>
              <div className="flex justify-between mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                {proficiencies.map((p) => (
                  <span key={p.name}>{p.name}</span>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-orange-500 font-bold">
                {proficiencies.map((p) => (
                  <span key={p.name}>{p.value}%</span>
                ))}
              </div>
            </div>
          </div>
          {/* Tools & Problem Solving */}
          <div className="flex flex-col gap-6">
            <div>
              <ScrollReveal direction="up">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-orange-500" />
                    <h3 className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Languages & Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center relative">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className={`px-4 py-2 rounded-full font-medium text-sm shadow transition-all duration-200 cursor-pointer hover:scale-105 hover:bg-orange-100 dark:hover:bg-orange-900/40 ${darkMode ? 'bg-[#232323] text-orange-200' : 'bg-orange-50 text-orange-700'}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
            {/* Internship Button below chips, left-aligned with gap */}
            <div className="w-full flex flex-col items-start mt-8 relative">
              <ScrollReveal direction="up">
                <button
                  ref={internshipBtnRef}
                  type="button"
                  className={`relative px-3 py-1 rounded-full font-semibold text-xs border-2 border-orange-500 transition-all duration-200 focus:outline-none
                    ${showInternship ? 'bg-orange-500 text-white' : darkMode ? 'bg-[#232323] text-orange-200' : 'bg-orange-50 text-orange-700'}
                    hover:scale-110 focus:scale-110
                  `}
                  style={{
                    boxShadow: showInternship ? '0 0 8px 2px #fb923c88' : '0 0 0 0 #fb923c00',
                    animation: showInternship ? '' : 'blinker 1s linear infinite',
                  }}
                  onClick={() => setShowInternship((v) => !v)}
                  onBlur={() => setShowInternship(false)}
                  tabIndex={0}
                  aria-label="Show Internships"
                >
                  <Briefcase className="inline w-4 h-4 mr-1 align-text-bottom" /> Internship
                </button>
              </ScrollReveal>
              {showInternship && (
                <div
                  className={`absolute top-full left-0 mt-2 z-30 min-w-[200px] max-w-[260px] rounded-xl shadow-lg border-2 border-orange-500 flex flex-col items-start justify-center
                    ${darkMode ? 'bg-[#181818] text-orange-100 border-orange-500' : 'bg-white text-orange-700 border-orange-500'}
                  `}
                  style={{
                    boxShadow: '0 0 12px 2px #fb923c88',
                    padding: '7px 14px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    whiteSpace: 'nowrap',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <span><span className="font-extrabold">FALCONX</span> : <span className="font-extrabold">Web Development</span></span>
                  <span><span className="font-extrabold">CODTECH</span> : <span className="font-extrabold">Android Development</span></span>
                </div>
              )}
              {/* Blinker keyframes */}
              <style>{`
                @keyframes blinker { 50% { border-color: #fb923c00; } }
              `}</style>
            </div>
          </div>
        </div>
        {/* Optional: Animated heart/dot background can be added here if desired */}
      </div>
      {/* Add this to your global CSS for the line animation: */}
      {/*
      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }
      .animate-\[dash_1.2s_ease-out_forwards\] {
        animation: dash 1.2s ease-out forwards;
      }
      */}
    </section>
  );
};

export default SkillsSection;
