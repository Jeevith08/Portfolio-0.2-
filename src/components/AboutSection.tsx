import React from 'react';
import { ArrowRight, User } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

const floatingTags = [
  { text: 'Flutter Apps', position: 'top-[10%] -left-10 md:-left-12', delay: '0s' },
  { text: 'REST API', position: 'top-[40%] -right-12 md:-right-16', delay: '0.5s' },
  { text: 'Power BI', position: 'bottom-[12%] -left-8 md:-left-10', delay: '1s' },
  { text: 'Python', position: '-bottom-4 left-[20%]', delay: '1.5s' },
  { text: 'Firebase', position: 'top-[75%] -right-8 md:-right-10', delay: '2s' },
];

const stats = [
  { value: '15+', label: 'Projects Built' },
  { value: '4+', label: 'Core Tools' },
  { value: '2+', label: 'Internship Roles' },
];

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`relative scroll-mt-20 md:scroll-mt-40 min-h-screen w-full flex items-center justify-center px-6 py-24 overflow-hidden transition-all duration-1000 ${darkMode
        ? 'bg-[#0D2218] text-zinc-100'
        : 'bg-[#E6ECE8] text-gray-900'
        }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${darkMode ? 'text-white' : 'text-emerald-950'
        }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          ABOUT ME • WHO I AM • PASSIONATE CREATOR • DEVELOPER • &nbsp; ABOUT ME • WHO I AM • PASSIONATE CREATOR • DEVELOPER • &nbsp;
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 relative z-10">

        {/* Left Side: Circular Image with Floating Tags */}
        <div className="relative flex-shrink-0 w-80  h-80 md:w-[320px] md:h-[320px] rounded-full bg-[#E5B53B] flex items-center justify-center shadow-2xl animate-float-gentle">
          {/* Inner Image Frame */}
          <div className="w-[96%] h-[96%] rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-inner bg-zinc-200">
            <img
              src={`${import.meta.env.BASE_URL}about pic.png`}
              alt="Jeevith"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>

          {/* Floating Tag Bubbles */}
          {floatingTags.map((tag, idx) => (
            <span
              key={idx}
              className={`absolute ${tag.position} px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider shadow-2xl select-none hover:scale-110 active:scale-95 transition-transform duration-300 border-2 ${darkMode
                ? 'bg-[#0D2218] text-[#E5B53B] border-[#E5B53B]'
                : 'bg-white text-[#0D2218] border-[#E5B53B]'
                }`}
              style={{
                animation: `float-gentle 4s ease-in-out ${tag.delay} infinite`,
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>

        {/* Right Side: Content and Statistics */}
        <div className="flex-1 max-w-xl text-left">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#E5B53B] animate-pulse" />
            <span className="font-black text-xs uppercase tracking-widest text-[#E5B53B]">
              — About Me
            </span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-tight ${darkMode ? 'text-white' : 'text-[#0D2218]'
            }`}>
            Who is <span className="text-[#E5B53B]">Jeevith</span>?
          </h2>

          <p className={`text-sm md:text-base leading-relaxed mb-8 ${darkMode ? 'text-zinc-300' : 'text-gray-700'
            }`}>
            Engineering modern cross-platform mobile experiences and intelligent systems. I am Jeevith, a passionate Mobile Developer and Computer Science Engineering student at SNS College of Engineering. With expertise in Flutter, Dart, Python, REST API, and Power BI, I build cross-platform mobile apps, interactive web tools, and data-driven dashboards.
          </p>

          {/* Stats Grid */}
          <div className={`grid grid-cols-3 gap-4 border-y py-6 mb-8 ${darkMode ? 'border-zinc-800' : 'border-zinc-300'
            }`}>
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-[#E5B53B] mb-1">
                  {stat.value}
                </span>
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest leading-snug ${darkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="flex items-center mt-6">
            <span className="font-great-vibes text-4xl text-[#E5B53B] tracking-widest select-none rotate-[-3deg] inline-block font-bold">
              Jeevith Palani
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
