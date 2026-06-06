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
        darkMode ? 'text-white' : 'text-emerald-950'
      }`}>
        <div className="animate-marquee whitespace-nowrap text-[8vw] font-black uppercase">
          EDUCATION • MILESTONES • TIMELINE • EXPERIENCE &nbsp; EDUCATION • MILESTONES • TIMELINE • EXPERIENCE &nbsp;
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E5B53B] animate-ping" />
            <h2 className="text-xs font-black tracking-widest uppercase text-[#E5B53B]">
              — My Milestone
            </h2>
          </div>
          <h2 className={`text-2xl md:text-4xl font-black tracking-tight uppercase ${
            darkMode ? 'text-white' : 'text-[#0D2218]'
          }`}>
            Journey & Education
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-dashed border-[#E5B53B]/30 ml-4 md:ml-32 space-y-12 mb-24">
          {timeline.map((item, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="relative pl-8 md:pl-12 group">
                
                {/* Timeline Icon Node */}
                <span className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0D2218] border-2 border-[#E5B53B] text-[#E5B53B] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#E5B53B] group-hover:text-[#0D2218] transition-all duration-500 z-10">
                  {item.icon}
                </span>

                {/* Left floating Year tag for desktop */}
                <span className={`hidden md:block absolute -left-36 top-2.5 w-24 text-right text-xs font-black uppercase tracking-wider text-[#E5B53B]`}>
                  {item.year}
                </span>

                {/* Content Box */}
                <div className={`p-6 rounded-[2rem] border transition-all duration-500 hover:scale-[1.01] ${
                  darkMode 
                    ? 'bg-[#132E22]/30 border-zinc-800/80 shadow-[#081510]/50 hover:border-[#E5B53B]/30' 
                    : 'bg-white border-zinc-200/85 shadow-zinc-200/50 hover:border-[#E5B53B]/30'
                }`}>
                  <div className="flex flex-col">
                    <span className="md:hidden text-[10px] font-black uppercase tracking-wider text-[#E5B53B] mb-1">
                      {item.year}
                    </span>
                    <h3 className={`text-sm md:text-base font-black uppercase tracking-tight ${
                      darkMode ? 'text-white' : 'text-[#0D2218]'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs md:text-sm mt-1 leading-relaxed font-semibold ${
                      darkMode ? 'text-zinc-200' : 'text-gray-800'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Vision Section - Stretched Horizontally with beautiful font styling */}
      <div className="w-full max-w-4xl mx-auto mb-28 relative z-10 px-4">
        <ScrollReveal direction="up">
          <div className={`w-full rounded-[2.5rem] p-10 md:p-12 border flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(229,181,59,0.15)] ${
            darkMode 
              ? 'bg-[#0B1B13]/85 border-zinc-800/80 shadow-[#050B08]/80 hover:border-[#E5B53B]/50' 
              : 'bg-white border-zinc-200/80 shadow-zinc-200/50 hover:border-[#E5B53B]/50'
          }`}>
            {/* Left side: Header or large Quote Mark */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-8xl text-[#E5B53B] font-serif leading-none select-none">“</span>
              <h4 className="font-black text-xs uppercase tracking-widest text-[#E5B53B] mt-2">
                My Vision
              </h4>
            </div>
            
            {/* Right side: Quote Content */}
            <div className="flex-grow text-center md:text-left mt-2 md:mt-0">
              <blockquote 
                className={`text-lg md:text-2xl leading-relaxed italic font-medium relative z-10 ${
                  darkMode ? 'text-zinc-200' : 'text-gray-800'
                }`}
                style={{ 
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'serif'",
                  letterSpacing: '0.01em'
                }}
              >
                "Every step in my educational journey is a building block towards becoming a skilled professional. I believe in continuous learning and growth, embracing challenges as opportunities to excel."
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
};

export default Journey;