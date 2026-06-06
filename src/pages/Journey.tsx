import React, { useState, useEffect } from 'react';
import { Star, Book, GraduationCap, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

interface JourneyProps {
  darkMode: boolean;
}

const timeline = [
  { year: '2023', title: 'Higher Secondary Certificate', desc: 'Completed HSC at Vivekananda Matric Hr. Sec School, Namakkal (81%)', icon: <Book size={20} /> },
  { year: '2023 - 2027', title: 'B.E. Computer Science Engineering', desc: 'SNS College of Engineering, Coimbatore. Current GPA: 8.31/10.0', icon: <GraduationCap size={20} /> },
  { year: 'Dec 2025', title: 'Power BI Intern', desc: 'Microsoft Elevate & AICTE. Developed interactive dashboards & performed data visualization.', icon: <Star size={20} /> },
  { year: 'Apr 2026', title: 'ServiceNow Virtual Intern', desc: 'ServiceNow University & AICTE. Built automated workflows and system-based apps.', icon: <Star size={20} /> },
  { year: 'Apr 2026 - Present', title: 'App Development Intern', desc: 'DTrade. Developing a real-time trading mobile application using Flutter, Dart, REST API, and Supabase.', icon: <Rocket size={20} /> },
];

const achievements = [
  { title: 'All Rounder Performer', desc: 'ARP 2025 Nominee for excellence in academics, technical projects, and leadership.', icon: '🏆' },
  { title: 'Competitive Programming', desc: 'Active competitive programmer with 200+ LeetCode problems solved.', icon: '💻' },
  { title: 'Generative AI Foundations', desc: 'Certified by AWS & Databricks in Generative AI Foundations.', icon: '⚡' },
];

const Journey: React.FC<JourneyProps> = ({ darkMode }) => {
  const [blink, setBlink] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setBlink(false), 1000); // 1s blink
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="journey" 
      className={`relative py-20 px-6 flex flex-col items-center overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-white via-orange-50/10 to-white'
      }`}
    >
      {/* Background Giant Marquee */}
      <div className={`absolute top-1/4 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none tracking-widest ${
        darkMode ? 'text-white' : 'text-orange-900'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          MY JOURNEY • EDUCATION • EXPERIENCE • MILESTONES • &nbsp; MY JOURNEY • EDUCATION • EXPERIENCE • MILESTONES • &nbsp;
        </div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-orange-500 animate-bounce" />
          <h2 className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            My Journey
          </h2>
        </div>
        <h2 className={`text-xl md:text-2xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Milestones & Education
        </h2>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mb-20 z-10">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500 transform -translate-x-1/2" />

        <div className="space-y-12">
          {timeline.map((item, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="relative flex items-center group">
                {/* Content */}
                <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left ml-auto'}`}>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">{item.year}</span>
                  <h3 className={`text-sm md:text-base font-black uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
                
                {/* Circle and Icon */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-orange-500 ${
                    darkMode ? 'bg-zinc-950 text-orange-400' : 'bg-white text-orange-600'
                  } transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]`}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Achievements and Vision Section */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="left" className="animate-float-gentle">
            <div className={`h-full rounded-3xl shadow-2xl p-6 md:p-8 border flex flex-col ${
              darkMode 
                ? 'bg-[#121212]/90 border-zinc-800 shadow-orange-950/10' 
                : 'bg-white border-orange-100 shadow-orange-100/30'
            }`}>
              <h4 className="font-black text-xs uppercase tracking-widest mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Achievements & Goals
              </h4>
              <ul className="space-y-4 flex-grow">
                {achievements.map(a => (
                  <li key={a.title} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{a.icon}</span>
                    <div>
                      <span className={`font-black text-xs uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-950'}`}>{a.title}</span>
                      <div className={`text-xs leading-relaxed mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{a.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="animate-float-gentle-reverse">
            <div className={`h-full rounded-3xl shadow-2xl p-6 md:p-8 border flex flex-col justify-center ${
              darkMode 
                ? 'bg-[#121212]/90 border-zinc-800 shadow-orange-950/10' 
                : 'bg-white border-orange-100 shadow-orange-100/30'
            }`}>
              <h4 className="font-black text-xs uppercase tracking-widest mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                My Vision
              </h4>
              <blockquote className={`text-xs md:text-sm italic leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                "Every step in my educational journey is a building block towards becoming a skilled professional. I believe in continuous learning and growth, embracing challenges as opportunities to excel."
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Journey; 