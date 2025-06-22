import React, { useState } from 'react';
import { Github, Briefcase, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import p1 from '../../p1.png';
import p2 from '../../p2.png';
import p3 from '../../p3.png';

interface ProjectsSectionProps {
  darkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: `A clean, beginner-friendly portfolio showcasing my projects, skills, certifications, and achievements as an engineering student.`,
      image: p1,
      tech: ["HTML", "CSS", "JS"],
      category: "Web Application",
      github: "https://github.com/Jeevith08/jeevith_portfolio"
    },
    {
      id: 2,
      title: "Portfolio Craft",
      description: `A no-code platform to design personalized, stunning portfolios with real-time templates.Perfect for students, freelancers, and professionals to showcase their work.`,
      image: p2,
      tech: ["HTML", "CSS", "OpenAI", "JS"],
      category: "AI Portfolio craft",
      github: "https://github.com/Jeevith08/Porfolio-Craft"
    },
    {
      id: 3,
      title: "Personal Portfolio 0.2 ",
      description: `An interactive, AI-powered portfolio where a robot avatar welcomes you and guides you through out full web..`,
      image: p3,
      tech: ["React 18","Vite","Tailwind CSS","shadcn/ui","Three.js","React Router","GSAP"],
      category: "Portfolio 0.2",
      github: "https://github.com"
    },
    
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section id="projects" className={`py-14 px-4 -mt-12 mb-0 bg-transparent`}>
        <div className="max-w-2xl mx-auto relative min-h-[400px] flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h3 className="text-base font-semibold text-center mb-2 tracking-widest text-orange-500 flex items-center justify-center gap-2"><Briefcase className="w-5 h-5" /> My Work</h3>
            <h2 className={`text-base font-extrabold text-center mb-6 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-black'}`}><Star className="w-5 h-5" /> Featured Projects</h2>
            <p className={`text-sm max-w-lg mx-auto ${darkMode ? 'text-orange-200/80' : 'text-orange-700/80'}`}>Here are some of my recent projects that showcase my skills and passion for creating amazing digital experiences.</p>
          </div>
          <div className="relative w-full h-[280px] flex items-center justify-center">
            {projects.map((project, index) => {
              // Calculate offset for stacking
              const offset = index - current;
              const isActive = index === current;
              return (
                <div
                  key={project.id}
                  className={`absolute left-1/2 top-0 w-[92%] max-w-[340px] transition-all duration-500 ease-in-out ${
                    isActive
                      ? 'z-30 scale-100 opacity-100 shadow-2xl'
                      : offset === -1
                        ? 'z-20 scale-95 opacity-70 -translate-x-[60%] translate-y-5 blur-[1.2px]'
                        : offset === 1
                          ? 'z-20 scale-95 opacity-70 translate-x-[60%] translate-y-5 blur-[1.2px]'
                          : 'z-10 scale-90 opacity-0 pointer-events-none'
                  }`} 
                  style={{
                      height: 280,
                    background: '#000',
                    transform: `translate(-50%, 0) ${
                      offset === -1
                          ? 'scale(0.95) translateX(-60%) translateY(20px)'
                        : offset === 1
                          ? 'scale(0.95) translateX(60%) translateY(20px)'
                        : offset === 0
                        ? 'scale(1) translateX(0) translateY(0)'
                        : 'scale(0.9) translateY(0)'
                    }`,
                    transition: 'all 0.5s cubic-bezier(.23,1.12,.67,.99)',
                  }}
                >
                  <ScrollReveal direction="up">
                    <div className={`group rounded-2xl overflow-hidden transition-all duration-500 bg-black shadow-xl border ${darkMode ? 'border-orange-100/20' : 'border-orange-100/10'}`}>
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-orange-900/70 via-orange-200/10' : 'from-orange-100/60 via-orange-50/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white text-xs rounded-full shadow">{project.category}</span>
                        </div>
                      </div>
                      <div className="p-4 text-left">
                        <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent`}>{project.title}</h3>
                        <p className={`text-sm mb-3 leading-normal ${darkMode ? 'text-orange-100/90' : 'text-orange-900/90'}`}>{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              onClick={() => {
                                setActiveTech(tech);
                                setTimeout(() => setActiveTech(null), 300);
                              }}
                              onTouchStart={() => {
                                setActiveTech(tech);
                                setTimeout(() => setActiveTech(null), 300);
                              }}
                              className={`px-2.5 py-1 text-xs rounded-full shadow border-0 font-medium transition-colors duration-150 cursor-pointer
                              ${activeTech === tech
                                ? 'animate-pulse bg-orange-500 text-white'
                                : darkMode
                                  ? 'bg-white text-orange-900'
                                  : 'bg-white text-orange-700'}
                            `}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <div className="relative rounded-full p-0.5 bg-gradient-to-r from-orange-100 via-red-500 to-orange-500 animate-border-spin">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View on GitHub"
                              className="inline-flex items-center justify-center rounded-full bg-black p-3 text-white transition-all duration-300 animate"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-orange-500 transition-all"
              aria-label="Previous Project"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-orange-500 transition-all"
              aria-label="Next Project"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </section>
      {/* Themed gap to Contact section */}
      <div className={`w-full bg-transparent transition-colors duration-300`} style={{height: '8rem'}}></div>
    </>
  );
};

export default ProjectsSection;
