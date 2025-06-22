import React from 'react';
import { User, Award, Coffee, TrendingUp, Calendar, Heart } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`scroll-mt-20 md:scroll-mt-40 min-h-screen w-full flex items-center justify-center px-4 md:px-0 bg-transparent`}
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left: Circular Profile Image */}
        <div className="flex flex-col items-center lg:items-start justify-center flex-shrink-0 w-full lg:w-auto">
          <div className="relative">
            {/* Orange gradient border, glow, pop animation */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-2 shadow-[0_0_40px_#ff9800aa] flex items-center justify-center animate-pop-float relative">
              <div className={`w-full h-full rounded-full ${darkMode ? 'bg-[#181818]' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                <img src={`${import.meta.env.BASE_URL}pic 1.png`} alt="Jeevith" className="w-full h-full object-cover" style={{ objectPosition: 'center 5%' }} />
              </div>
              {/* Sparkle effects outside the circle */}
              <span className="absolute -left-4 md:-left-6 top-4 md:top-6 animate-sparkle1 animate-blink text-sm md:text-base">✨</span>
              <span className="absolute right-0 -bottom-4 md:-bottom-6 animate-sparkle2 animate-blink text-sm md:text-base">✨</span>
              <span className="absolute left-1/2 -top-5 md:-top-7 animate-sparkle3 animate-blink text-sm md:text-base">✨</span>
            </div>
          </div>
        </div>
        {/* Right: Floating Card with About Content */}
        <div className="flex-1 flex justify-center w-full lg:w-auto">
          <div className={`rounded-3xl shadow-2xl p-4 md:p-6 max-w-lg w-full relative text-center lg:text-left ${darkMode ? 'bg-[#232323]' : 'bg-white/90'}`}> 
            <div className="mb-4 flex items-center justify-center lg:justify-start gap-3">
              <span className={`inline-block rounded-full p-2 shadow bg-gradient-to-tr from-orange-500 to-red-500 text-white`}>
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              <span className="inline-flex items-center gap-2 font-semibold tracking-wide text-sm md:text-base bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                About Me
              </span>
            </div>
            <h2 className={`text-sm md:text-xs font-bold mb-3 font-sans ${darkMode ? 'text-white' : 'text-gray-800'}`}>Turning Ideas Into Reality</h2>
            <p className={`text-sm md:text-xs mb-5 font-sans leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>I'm Jeevith, a passionate App developer and a student with over 2 years of experience in creating digital solutions. I believe in writing clean, efficient code and designing user experiences that make a difference.</p>
            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5">
              <div className={`flex flex-col items-center rounded-2xl shadow p-2 md:p-3 ${darkMode ? 'bg-[#181818]' : 'bg-orange-50'}`}> 
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mb-1 text-orange-500" />
                <span className={`font-bold text-sm md:text-base bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>8.66</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>CGPA</span>
              </div>
              <div className={`flex flex-col items-center rounded-2xl shadow p-2 md:p-3 ${darkMode ? 'bg-[#181818]' : 'bg-orange-50'}`}> 
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mb-1 text-orange-500" />
                <span className={`font-bold text-sm md:text-base bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>3rd</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Year</span>
              </div>
              <div className={`flex flex-col items-center rounded-2xl shadow p-2 md:p-3 ${darkMode ? 'bg-[#181818]' : 'bg-orange-50'}`}> 
                <Heart className="w-4 h-4 md:w-5 md:h-5 mb-1 text-orange-500" />
                <span className={`font-bold text-sm md:text-base bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>100%</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dream Big</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
