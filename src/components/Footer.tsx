import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 px-6 border-t w-full flex items-center justify-center ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex space-x-4">
        <a href="#" className="w-10 h-10 bg-[#FF4500] rounded-lg flex items-center justify-center text-white hover:bg-[#E63E00] transition-colors duration-300">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="mailto:jeevithofficial08@gmail.com" className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
