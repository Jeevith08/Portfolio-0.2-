import React from 'react';
import { Star, Book, GraduationCap, Rocket, StarHalf } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface JourneyProps {
  darkMode: boolean;
}

const timeline = [
  { year: '2023', title: 'Higher Secondary Certificate', desc: 'Completed HSC at Vivekananda Matric Hr. Sec School, Namakkal (81%)', icon: <Book size={20} /> },
  { year: '2023 - 2027', title: 'B.E. Computer Science Engineering', desc: 'SNS College of Engineering, Coimbatore. Current GPA: 8.31/10.0', icon: <GraduationCap size={20} /> },
  { year: 'Dec 2025', title: 'Power BI Intern', desc: 'Microsoft Elevate & AICTE. Developed interactive dashboards & performed data visualization.', icon: <Star size={20} /> },
  { year: 'Apr 2026', title: 'ServiceNow Virtual Intern', desc: 'ServiceNow University & AICTE. Built automated workflows and system-based apps.', icon: <StarHalf size={20} /> },
  { year: 'Apr 2026 - Present', title: 'App Development Intern', desc: 'DTrade. Developing a real-time trading mobile application using Flutter, Dart, REST API, and Supabase.', icon: <Rocket size={20} /> },
];

const achievements = [
  { title: 'All Rounder Performer', desc: 'ARP 2025 Nominee for excellence in academics, technical projects, and leadership.', icon: '🏆' },
  { title: 'Competitive Programming', desc: 'Active competitive programmer with 200+ LeetCode problems solved.', icon: '💻' },
  { title: 'Generative AI Foundations', desc: 'Certified by AWS & Databricks in Generative AI Foundations.', icon: '⚡' },
];

const favoriteTools = [
  {
    name: 'Flutter',
    percentage: '92%',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#02569B] fill-current">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6 15.7L2.3 19.4l3.692 3.692 3.692-3.692L6 15.7zM14.33 7.82l-4.63 4.63 4.63 4.63h7.37l-4.63-4.63 4.63-4.63h-7.37z"/>
      </svg>
    )
  },
  {
    name: 'React',
    percentage: '88%',
    logo: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 text-[#61DAFB] fill-none stroke-current stroke-[1.5]">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        <circle r="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Python',
    percentage: '85%',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#3776AB] fill-current">
        <path d="M12.001 0c-1.124.002-2.19.112-3.095.312-2.73.605-2.906 1.83-2.906 3.78v2.13h6.06V7.16h-8.73c-2.115 0-3.328 1.196-3.328 3.328v4.938c0 2.115 1.258 3.328 3.328 3.328h1.8v-2.52a2.49 2.49 0 012.49-2.49h5.12a2.49 2.49 0 002.49-2.49v-5.11a2.49 2.49 0 00-2.49-2.49h-1.83v2.52a2.49 2.49 0 01-2.49 2.49h-5.12a2.49 2.49 0 00-2.49 2.49v2.13c0 1.95.176 3.175 2.906 3.78a8.8 8.8 0 003.095.3c1.124-.002 2.19-.112 3.095-.312 2.73-.605 2.906-1.83 2.906-3.78v-2.13h-6.06v-.938h8.73c2.115 0 3.328-1.196 3.328-3.328v-4.938c0-2.115-1.258-3.328-3.328-3.328h-1.8v2.52a2.49 2.49 0 01-2.49 2.49h-5.12a2.49 2.49 0 00-2.49 2.49v5.11a2.49 2.49 0 002.49 2.49h1.83v-2.52a2.49 2.49 0 012.49-2.49h5.12a2.49 2.49 0 002.49-2.49v-2.13c0-1.95-.176-3.175-2.906-3.78a8.8 8.8 0 00-3.095-.3z"/>
      </svg>
    )
  },
  {
    name: 'Power BI',
    percentage: '90%',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#F2C811] fill-current">
        <path d="M18 0h6v24h-6zM9 9h6v15H9zM0 16h6v8H0z"/>
      </svg>
    )
  },
  {
    name: 'SQL',
    percentage: '85%',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#0064a5] fill-none stroke-current stroke-[2]">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    )
  },
  {
    name: 'Git',
    percentage: '90%',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#F05032] fill-current">
        <path d="M20.25 11.25l-7.5-7.5a1.058 1.058 0 00-1.5 0l-7.5 7.5a1.058 1.058 0 000 1.5l7.5 7.5a1.058 1.058 0 001.5 0l7.5-7.5a1.058 1.058 0 000-1.5zM9 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
      </svg>
    )
  }
];

const Journey: React.FC<JourneyProps> = ({ darkMode }) => {
  return (
    <section 
      id="journey" 
      className={`relative py-24 px-6 flex flex-col items-center overflow-hidden transition-all duration-1000 ${
        darkMode 
          ? 'bg-[#0D2218] text-zinc-100' 
          : 'bg-[#E6ECE8] text-gray-900'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-[#E5B53B]'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          MY JOURNEY • EDUCATION • EXPERIENCE • MILESTONES • &nbsp; MY JOURNEY • EDUCATION • EXPERIENCE • MILESTONES • &nbsp;
        </div>
      </div>

      <div className="text-center mb-20 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-[#E5B53B] animate-bounce" />
          <h2 className="text-xs font-black tracking-widest uppercase text-[#E5B53B]">
            — My Journey
          </h2>
        </div>
        <h2 className={`text-2xl md:text-4xl font-black tracking-tight uppercase ${
          darkMode ? 'text-white' : 'text-[#0D2218]'
        }`}>
          Milestones & Education
        </h2>
      </div>

      {/* Timeline Section */}
      <div className="relative w-full max-w-4xl mx-auto mb-28 z-10">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#E5B53B]/35 transform -translate-x-1/2" />

        <div className="space-y-16">
          {timeline.map((item, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="relative flex items-center group">
                {/* Content Card */}
                <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left ml-auto'}`}>
                  <span className="text-[10px] font-black text-[#E5B53B] uppercase tracking-widest block mb-2">{item.year}</span>
                  <h3 className={`text-sm md:text-base font-black uppercase ${
                    darkMode ? 'text-white' : 'text-[#0D2218]'
                  }`}>{item.title}</h3>
                  <p className={`text-xs mt-2 leading-relaxed font-medium ${
                    darkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>{item.desc}</p>
                </div>
                
                {/* Center Circle and Icon */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#E5B53B] ${
                    darkMode ? 'bg-[#0D2218] text-[#E5B53B]' : 'bg-white text-[#0D2218]'
                  } shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(229,181,59,0.5)]`}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Achievements and Vision Section */}
      <div className="w-full max-w-4xl mx-auto mb-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="left">
            <div className={`h-full rounded-[2rem] shadow-2xl p-8 border flex flex-col transition-all duration-300 hover:scale-102 ${
              darkMode 
                ? 'bg-[#132E22]/50 border-zinc-800 shadow-[#081510]/50' 
                : 'bg-white border-zinc-200 shadow-zinc-200/50'
            }`}>
              <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-[#E5B53B]">
                Achievements & Goals
              </h4>
              <ul className="space-y-4 flex-grow">
                {achievements.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-xl leading-none mt-0.5">{a.icon}</span>
                    <div>
                      <span className={`font-black text-xs uppercase tracking-wider ${
                        darkMode ? 'text-white' : 'text-[#0D2218]'
                      }`}>{a.title}</span>
                      <div className={`text-xs leading-relaxed mt-1 font-medium ${
                        darkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>{a.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className={`h-full rounded-[2rem] shadow-2xl p-8 border flex flex-col justify-center transition-all duration-300 hover:scale-102 ${
              darkMode 
                ? 'bg-[#132E22]/50 border-zinc-800 shadow-[#081510]/50' 
                : 'bg-white border-zinc-200 shadow-zinc-200/50'
            }`}>
              <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-[#E5B53B]">
                My Vision
              </h4>
              <blockquote className={`text-sm md:text-base italic leading-relaxed font-medium ${
                darkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                "Every step in my educational journey is a building block towards becoming a skilled professional. I believe in continuous learning and growth, embracing challenges as opportunities to excel."
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Favorite Tools Section (Inspired by screenshot bottom) */}
      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        <span className="font-black text-xs uppercase tracking-widest text-[#E5B53B] mb-2 block">
          — My Favorite Tools
        </span>
        <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tight mb-4 ${
          darkMode ? 'text-white' : 'text-[#0D2218]'
        }`}>
          Exploring the Tools Behind My Designs
        </h3>
        <p className={`text-xs md:text-sm font-semibold max-w-lg mx-auto mb-12 uppercase tracking-wider ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Hands-on proficiency levels with core modern web & app engineering technologies
        </p>

        {/* Tools row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {favoriteTools.map((tool, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-6 rounded-[2rem] shadow-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 ${
                darkMode
                  ? 'bg-[#132E22]/50 border-zinc-800 shadow-[#081510]/30 hover:border-[#E5B53B]/30'
                  : 'bg-white border-zinc-200 shadow-zinc-200/30 hover:border-[#E5B53B]/30'
              }`}
            >
              {/* Circular Logo Container */}
              <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center shadow-inner mb-4 border border-zinc-100 dark:border-zinc-800/80">
                {tool.logo}
              </div>

              {/* Percentage Indicator */}
              <span className="text-xl font-black text-[#E5B53B] mb-1">
                {tool.percentage}
              </span>

              {/* Tool Name */}
              <span className="text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;