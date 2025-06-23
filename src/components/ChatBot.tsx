import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Center } from '@react-three/drei';

interface ChatBotProps {
  darkMode: boolean;
  onOpenContactForm: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ darkMode, onOpenContactForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Jeevith's AI assistant. How can I help you explore the portfolio?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'd be happy to help! ";
      
      if (inputText.toLowerCase().includes('projects')) {
        botResponse += "Let me show you Jeevith's projects section.";
        setTimeout(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } else if (inputText.toLowerCase().includes('resume') || inputText.toLowerCase().includes('cv')) {
        botResponse += "You can download Jeevith's resume from the hero section or contact section.";
      } else if (inputText.toLowerCase().includes('skills')) {
        botResponse += "Jeevith specializes in React, TypeScript, Node.js, and many other technologies. Check out the skills section!";
        setTimeout(() => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } else if (inputText.toLowerCase().includes('contact')) {
        botResponse += "You can reach Jeevith through the contact form or email at jeevithofficial08@gmail.com";
      } else {
        botResponse += "Feel free to ask about Jeevith's projects, skills, or how to get in touch!";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, isBot: true }]);
    }, 1000);

    setInputText('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4500] to-[#fb923c] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center animate-chatbot-glow ${
          isOpen ? 'hidden' : 'flex'
        }`}
        style={{ boxShadow: '0 0 0 0 #FF450055, 0 1.5px 0 #fff8 inset' }}
      >
        {/* Custom Robot SVG Icon (Orange) */}
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="bot" width="30" height="30"/>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Get in Touch Button near ChatBot */}
      <button
        onClick={onOpenContactForm}
        className="fixed bottom-6 right-20 z-50 px-3 py-1.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-black shadow-xl border-2 border-orange-500 flex items-center justify-center hover:scale-105 transition-all duration-300"
        aria-label="Get in Touch"
      >
        Get in Touch
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 max-w-xs h-[400px] border-2 border-orange-500 rounded-xl flex flex-col overflow-hidden animate-fade-in ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`} style={{ width: 320, height: 400, boxShadow: '0 0 32px 6px #fb923cbb' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF4500] to-[#fb923c] p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center mr-3 shadow-inner">
                {/* Custom Robot SVG Avatar (Orange) */}
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="bot" width="26" height="26"/>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-white/80 text-xs">Online now</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg ${
                    msg.isBot
                      ? 'bg-orange-100 dark:bg-gray-700 text-black dark:text-white'
                      : 'bg-orange-500 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-2 border-t border-orange-200 dark:border-gray-700 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 h-9 px-3 py-1 rounded-full text-sm border focus:outline-none focus:ring-2 text-black dark:text-white bg-white dark:bg-gray-800 transition-all duration-200 border-orange-400 focus:ring-orange-400"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-black text-white flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
