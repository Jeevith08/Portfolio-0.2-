import React, { useState, useEffect } from 'react';
import { Star, Book, GraduationCap, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

interface JourneyProps {
  darkMode: boolean;
}

const timeline = [
  { year: '2021', title: 'SSLC', desc: 'Completed SSLC at Vivekananda Matriculation School', icon: <Star size={20} /> },
  { year: '2023', title: 'HSLC', desc: 'Completed HSLC at Vivekananda Higher Secondary School', icon: <Book size={20} /> },
  { year: '2024', title: 'B.E', desc: 'Started Undergraduate degree at SNS College of Engineering ', icon: <GraduationCap size={20} /> },
  { year: 'Future', title: 'Upgrading', desc: 'Continuously learning and growing in the field of technology', icon: <Rocket size={20} /> },
];

const achievements = [
  { title: 'Academic Excellence', desc: 'ARP Nominee', icon: '🎓' },
  { title: 'Future Goals', desc: 'Aiming to become an APP Developer ', icon: '🎯' },
  { title: 'Learning Focus', desc: 'Passionate about technology and innovation', icon: '💡' },
];

const Journey: React.FC<JourneyProps> = ({ darkMode }) => {
  const [blink, setBlink] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setBlink(false), 1000); // 1s blink
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="journey" className={`py-20 px-4 flex flex-col items-center bg-transparent transition-colors duration-300`}>
      <div className="text-center mb-12">
        <h2 className={`text-base font-bold text-center mb-1 flex items-center justify-center gap-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
          <Rocket className="w-5 h-5" /> My Journey
        </h2>
        <p className={`text-xs text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          A timeline of my educational and professional milestones.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mb-16">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500 transform -translate-x-1/2"></div>

        <div className="space-y-8">
          {timeline.map((item, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="relative flex items-center group">
                {/* Content */}
                <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                  <p className={`text-xs font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>{item.year}</p>
                  <h3 className={`text-sm font-bold mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
                
                {/* Circle and Icon */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-orange-500 ${darkMode ? 'bg-black text-orange-400' : 'bg-white text-orange-600'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]`}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Achievements and Vision Section */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:items-start">
          <ScrollReveal direction="left" className="w-full md:w-1/2">
            <div className={`h-full rounded-xl shadow p-4 ${darkMode ? 'bg-[#181818] border border-orange-900' : 'bg-orange-50 border-orange-200'} relative flex flex-col`}>
              <h4 className={`text-xs font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>Achievements & Goals</h4>
              <ul className="space-y-2 flex-grow">
                {achievements.map(a => (
                  <li key={a.title} className="flex items-start gap-2">
                    <span className="text-xs">{a.icon}</span>
                    <div>
                      <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-black'}`}>{a.title}</span>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{a.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/certificate')}
                  className={`px-3 py-1 text-xs rounded-full border border-orange-500 bg-orange-500 text-white cursor-pointer transition-colors duration-300 ${blink ? 'animate-blink-once' : ''} hover:bg-orange-600 dark:hover:bg-orange-900/30`}
                >
                  Certifications
                </button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" className="w-full md:w-1/2">
            <div className={`rounded-xl shadow p-4 ${darkMode ? 'bg-[#181818] border border-orange-900' : 'bg-orange-50 border-orange-200'} relative`}>
              <h4 className={`text-xs font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>My Vision</h4>
              <blockquote className={` text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>'Every step in my educational journey is a building block towards becoming a skilled professional. I believe in continuous learning and growth, embracing challenges as opportunities to excel.'</blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Journey; 