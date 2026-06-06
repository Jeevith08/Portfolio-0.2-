import React, { useState } from 'react';
import { Github, Briefcase, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ProjectsSectionProps {
  darkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  const projects = [
    {
      id: 1,
      title: "DTrade App",
      description: `A cross-platform trading mobile application featuring real-time market data integration, secure user authentication, stock portfolio tracking, and transaction modules.`,
      image: `${import.meta.env.BASE_URL}dtrade_app_mockup.png`,
      tech: ["Flutter", "Dart", "REST API", "Supabase"],
      category: "Mobile Application",
      github: "https://github.com/jeevith08"
    },
    {
      id: 2,
      title: "Portfolio Craft",
      description: `An AI-powered portfolio creation platform featuring a drag-and-drop layout editor, responsive templates, real-time preview, and code export functionality.`,
      image: `${import.meta.env.BASE_URL}p2.png`,
      tech: ["React", "JavaScript", "AI APIs"],
      category: "Web Application",
      github: "https://github.com/Jeevith08/Porfolio-Craft"
    },
    {
      id: 3,
      title: "ZenBox",
      description: `An AI-driven email classification tool automating categorization of emails into Important, Internships, Spam, and Updates segments.`,
      image: `${import.meta.env.BASE_URL}zenbox_email_mockup.png`,
      tech: ["React", "Tailwind CSS", "Python", "API Integration"],
      category: "Web Application",
      github: "https://github.com/jeevith08"
    },
    {
      id: 4,
      title: "SEO Insight Hub",
      description: `An AI-driven SEO optimization platform that analyzes website HTML, detects issues, and automatically generates optimized meta tags and structure changes.`,
      image: `${import.meta.env.BASE_URL}seo_insight_mockup.png`,
      tech: ["Python", "AI APIs", "HTML/CSS"],
      category: "Web Application",
      github: "https://github.com/jeevith08"
    },
    {
      id: 5,
      title: "Personal Portfolio 2.0",
      description: `An interactive, AI-optimized personal portfolio featuring a 3D robot avatar assistant, custom micro-animations, and dynamic language/theme controls.`,
      image: `${import.meta.env.BASE_URL}p3.png`,
      tech: ["React 18", "Vite", "Tailwind CSS", "shadcn/ui", "Three.js", "GSAP"],
      category: "Portfolio 0.2",
      github: "https://github.com/Jeevith08/Portfolio-0.2-"
    },
    {
      id: 6,
      title: "Tap Game",
      description: `An interactive tap-based mobile game utilizing StatefulWidgets and state management for efficient UI rendering and smooth real-time scoring.`,
      image: `${import.meta.env.BASE_URL}tap_game_mockup.png`,
      tech: ["Flutter", "Dart"],
      category: "Mobile Application",
      github: "https://github.com/jeevith08"
    },
    {
      id: 7,
      title: "Calculator App",
      description: `A responsive mobile calculator with clean layout design, dynamic input handling, full arithmetic operations, and efficient StatefulWidget rendering.`,
      image: `${import.meta.env.BASE_URL}calculator_app_mockup.png`,
      tech: ["Flutter", "Dart"],
      category: "Mobile Application",
      github: "https://github.com/jeevith08"
    }
  ];

  return (
    <>
      <section
        id="projects"
        className={`relative py-24 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-gradient-to-b from-[#14080B] via-[#2A0E15] to-[#14080B]' : 'bg-[#A34251]'
        }`}
      >
        {/* Background Giant Marquee */}
        <div className="absolute inset-0 flex flex-col justify-center gap-12 opacity-10 select-none pointer-events-none uppercase font-black text-6xl md:text-8xl tracking-widest text-black">
          <div className="animate-marquee whitespace-nowrap">
            MY WORK • FEATURED PROJECTS • APPS • PORTFOLIOS • &nbsp; MY WORK • FEATURED PROJECTS • APPS • PORTFOLIOS • &nbsp;
          </div>
          <div className="animate-marquee whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
            MOBILE DEVELOPMENT • DESIGN • WEB APPS • INTERNSHIPS • &nbsp; MOBILE DEVELOPMENT • DESIGN • WEB APPS • INTERNSHIPS • &nbsp;
          </div>
        </div>

        <div className="w-full relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-16 px-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-white animate-bounce" />
              <h2 className="text-xs font-black tracking-widest uppercase text-white/80">
                My Portfolio
              </h2>
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-white">
              Featured Projects
            </h2>
          </div>

          <div className="w-full overflow-hidden py-4">
            <div className="flex gap-10 hover:[animation-play-state:paused] animate-marquee whitespace-nowrap">
              {[...projects, ...projects, ...projects].map((project, index) => {
                const cardColors = [
                  'bg-[#FF5A1F]', // Orange
                  'bg-[#8233C5]', // Purple
                  'bg-[#00A896]', // Emerald
                  'bg-[#0096C7]', // Blue
                  'bg-[#E0115F]', // Ruby Red
                  'bg-[#F2A600]', // Amber Yellow
                  'bg-[#0077B6]', // Deep Blue
                ];
                const rotationClass = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
                const cardColor = cardColors[index % cardColors.length];

                return (
                  <div
                    key={`${project.id}-${index}`}
                    className={`flex-shrink-0 w-80 group relative ${cardColor} border-[8px] border-white rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out hover:rotate-0 hover:scale-105 hover:z-20 ${rotationClass} p-5 flex flex-col justify-between min-h-[380px] whitespace-normal`}
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="w-full h-40 overflow-hidden rounded-xl border-2 border-white mb-4 bg-white flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/95 text-[11px] font-semibold leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/20 text-white border border-white/30 text-[8px] uppercase font-black py-0.5 px-2 rounded-full tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* GitHub Button */}
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase text-white/70 tracking-wider">
                          {project.category}
                        </span>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white hover:bg-zinc-100 text-black rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Spacer to align Contact Section */}
      <div className="w-full h-16 bg-transparent" />
    </>
  );
};

export default ProjectsSection;
