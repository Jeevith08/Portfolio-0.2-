import React from 'react';
import { User, Award, Coffee, TrendingUp, Calendar, Heart } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`relative scroll-mt-20 md:scroll-mt-40 min-h-screen w-full flex items-center justify-center px-6 py-20 overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-white via-orange-50/10 to-white'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-orange-900'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          ABOUT ME • WHO I AM • PASSIONATE CREATOR • DEVELOPER • &nbsp; ABOUT ME • WHO I AM • PASSIONATE CREATOR • DEVELOPER • &nbsp;
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Left: Circular Profile Image with Tilt Floating */}
        <div className="flex flex-col items-center justify-center flex-shrink-0 w-full lg:w-auto animate-float-gentle">
          <div className="relative">
            {/* Orange gradient border, glow, shadow */}
            <div className={`w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-1.5 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500`}>
              <div className={`w-full h-full rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                <img 
                  src={`${import.meta.env.BASE_URL}about pic.jpg`} 
                  alt="Jeevith" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  style={{ objectPosition: 'center 30%' }} 
                />
              </div>
              {/* Decorative dots */}
              <span className="absolute -left-3 -top-3 text-xl animate-bounce">✨</span>
              <span className="absolute -right-3 -bottom-3 text-xl animate-bounce" style={{ animationDelay: '1s' }}>✨</span>
            </div>
          </div>
        </div>

        {/* Right: Floating Card with About Content */}
        <div className="flex-1 flex justify-center w-full lg:w-auto animate-float-gentle-reverse">
          <div className={`rounded-3xl shadow-2xl p-6 md:p-8 max-w-xl w-full relative text-left border transition-all duration-300 ${
            darkMode 
              ? 'bg-[#121212]/90 border-zinc-800 shadow-orange-950/20' 
              : 'bg-white/95 border-orange-100 shadow-orange-100/40'
          }`}> 
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block rounded-2xl p-2.5 bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              <h3 className="font-black tracking-widest text-xs uppercase bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                About Me
              </h3>
            </div>
            
            <h2 className={`text-xl md:text-2xl font-black tracking-tight mb-4 uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Turning Ideas Into Reality
            </h2>
            
            <p className={`text-xs md:text-sm mb-6 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              I am Jeevith, a passionate Mobile & Full-Stack Developer and Computer Science Engineering student at SNS College of Engineering. With experience in Flutter, Dart, React, Python, and Power BI, I enjoy building cross-platform mobile apps, AI-driven web platforms, and data dashboards.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`flex flex-col items-center justify-center rounded-2xl p-4 border transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-orange-50/50 border-orange-100'
              }`}> 
                <TrendingUp className="w-5 h-5 mb-2 text-orange-500" />
                <span className="font-black text-sm md:text-base text-orange-500 leading-none mb-1">8.31</span>
                <span className={`text-[9px] font-bold tracking-wider uppercase ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>CGPA</span>
              </div>
              <div className={`flex flex-col items-center justify-center rounded-2xl p-4 border transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-orange-50/50 border-orange-100'
              }`}> 
                <Calendar className="w-5 h-5 mb-2 text-orange-500" />
                <span className="font-black text-sm md:text-base text-orange-500 leading-none mb-1">4th</span>
                <span className={`text-[9px] font-bold tracking-wider uppercase ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Year</span>
              </div>
              <div className={`flex flex-col items-center justify-center rounded-2xl p-4 border transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-orange-50/50 border-orange-100'
              }`}> 
                <Heart className="w-5 h-5 mb-2 text-orange-500" />
                <span className="font-black text-sm md:text-base text-orange-500 leading-none mb-1">200+</span>
                <span className={`text-[9px] font-bold tracking-wider uppercase ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>LeetCode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
