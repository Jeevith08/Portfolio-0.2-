import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 px-6 border-t w-full flex items-center justify-center ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex space-x-4 items-center">
        <a href="https://github.com/jeevith08" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FF4500] rounded-lg flex items-center justify-center text-white hover:bg-[#E63E00] transition-colors duration-300">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/jeevithpalani" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:jeevith1708@gmail.com" className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300">
          <Mail className="w-5 h-5" />
        </a>
        <p className="text-sm text-gray-400">Automations powered by <a href="https://n8n.io" target="_blank" rel="noopener" className="underline hover:text-orange-500">n8n</a></p>
      </div>
    </footer>
  );
};

export default Footer;
