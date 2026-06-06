import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import Index from "./pages/Index";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import ChatBot from "./components/ChatBot";
import PageLoader from "./components/PageLoader";

const queryClient = new QueryClient();

// Add RobotState type
interface RobotState {
  currentStep: 'greeting' | 'name-input' | 'acknowledge' | 'navigation' | 'contact-form' | 'exploring';
  userName: string;
  isLoading: boolean;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [robotState, setRobotState] = useState<RobotState>({
    currentStep: 'greeting',
    userName: '',
    isLoading: true,
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const darkMode = true;

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Show loading page on first mount
  useEffect(() => {
    setLoading(true);
  }, []);

  const toggleDarkMode = () => {};

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToRobot = () => {
    setCurrentSection(null);
  };

  // Global Sparkle Background
  const sparkles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 1 + Math.random() * 2;
      const delay = Math.random() * 4;
      return { top, left, size, delay, key: `sparkle-${i}` };
    });
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Index onBackToRobot={handleBackToRobot} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'skills':
        return <Skills onBackToRobot={handleBackToRobot} />;
      case 'projects':
        return <Projects onBackToRobot={handleBackToRobot} />;
      case 'contact':
        return <Index onBackToRobot={handleBackToRobot} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <Index onBackToRobot={handleBackToRobot} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    loading ? (
      <PageLoader onComplete={() => setLoading(false)} />
    ) : (
      <QueryClientProvider client={queryClient}>
        <div className="overflow-x-hidden">
          <BrowserRouter basename="/Portfolio-0.2-/">
          {/* Global Sparkle Background */}
          <div className="sparkle-bg" aria-hidden="true">
            {sparkles.map(sparkle => (
              <span
                key={sparkle.key}
                className="sparkle-dot"
                style={{
                  top: `${sparkle.top}%`,
                  left: `${sparkle.left}%`,
                  width: `${sparkle.size}px`,
                  height: `${sparkle.size}px`,
                  animationDelay: `${sparkle.delay}s`,
                }}
              />
            ))}
          </div>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" toastOptions={{ style: { marginTop: '1.5rem' } }}/>
              <Routes>
                <Route path="/*" element={renderSection()} />
              </Routes>
            <ChatBot darkMode={darkMode} onOpenContactForm={() => setShowContactForm(true)} />
            {showContactForm && <ContactForm darkMode={darkMode} onClose={() => setShowContactForm(false)} />}
          </TooltipProvider>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    )
  );
};

export default App;
