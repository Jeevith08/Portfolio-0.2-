import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sun, Moon, Home, Zap, Rocket, Mail, ArrowLeft, Rotate3d, Rotate3D } from 'lucide-react';
import CustomCursor from './CustomCursor';
import PageLoader from './PageLoader';
import { createPortal } from 'react-dom';

// Linear interpolation for smooth motion
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

// Floating animation keyframes
const floatAnim = {
  animation: 'robot-float 3s ease-in-out infinite',
};

// Add keyframes to the document (if not already present)
if (typeof window !== 'undefined' && !document.getElementById('robot-float-keyframes')) {
  const style = document.createElement('style');
  style.id = 'robot-float-keyframes';
  style.innerHTML = `@keyframes robot-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }`;
  document.head.appendChild(style);
}

// Add keyframes for border blink
if (typeof window !== 'undefined' && !document.getElementById('border-blink-keyframes')) {
  const style = document.createElement('style');
  style.id = 'border-blink-keyframes';
  style.innerHTML = `@keyframes border-blink { 50% { border-color: transparent; } }`;
  document.head.appendChild(style);
}

interface RobotScreenProps {
  onNavigate: (section: string) => void;
  robotState: {
    currentStep: 'greeting' | 'name-input' | 'acknowledge' | 'navigation' | 'contact-form' | 'exploring';
    userName: string;
    isLoading: boolean;
  };
  setRobotState: React.Dispatch<React.SetStateAction<{
    currentStep: 'greeting' | 'name-input' | 'acknowledge' | 'navigation' | 'contact-form' | 'exploring';
    userName: string;
    isLoading: boolean;
  }>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function RobotModel({ targetRotation, floating = false }: { targetRotation?: React.RefObject<{ x: number, y: number }>, floating?: boolean }) {
  const gltf = useGLTF(`${import.meta.env.BASE_URL}robot_playground.glb`);
  const meshRef = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    if (actions && names.length > 0) {
      names.forEach(name => actions[name]?.play());
    }
  }, [actions, names]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    if (floating) {
      meshRef.current.rotation.y += 0.005; // Simple rotation for floating
    } else if (targetRotation?.current) {
      meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetRotation.current.x, 0.05);
      meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetRotation.current.y, 0.05);
    }
  });

  if (!gltf.scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#fb923c" />
      </mesh>
    );
  }

  return (
    <Center position={[0, 2, 0]}>
      <primitive
        object={gltf.scene}
        ref={meshRef}
        scale={[2, 2, 2]}
      />
    </Center>
  );
}

export default function RobotScreen({ onNavigate, robotState, setRobotState, darkMode, toggleDarkMode }: RobotScreenProps) {
  const { currentStep, userName, isLoading } = robotState;
  const setCurrentStep = (step: 'greeting' | 'name-input' | 'acknowledge' | 'navigation' | 'contact-form' | 'exploring') => setRobotState(s => ({ ...s, currentStep: step }));
  const setUserName = (name: string) => setRobotState(s => ({ ...s, userName: name }));
  const setIsLoading = (loading: boolean) => setRobotState(s => ({ ...s, isLoading: loading }));
  const [greetingText, setGreetingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showError, setShowError] = useState(false);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Detect if mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  const greetingMessages = [
    "Welcome to my digital playground!",
    "I'm your AI companion for this journey.",
    "Hii, Let's Goo...",
  ];

  useEffect(() => {
    if (currentStep !== 'greeting') return;
    let currentIndex = 0;
    const typeWriter = () => {
      if (currentIndex < greetingMessages.length) {
        setIsTyping(true);
        setGreetingText(greetingMessages[currentIndex]);
        setTimeout(() => {
          setIsTyping(false);
          currentIndex++;
          if (currentIndex < greetingMessages.length) {
            setTimeout(typeWriter, 1000);
          } else {
            setTimeout(() => setCurrentStep('name-input'), 1500);
          }
        }, 2000);
      }
    };
    typeWriter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setCurrentStep('acknowledge');
  };

  const navigationOptions = [
    { id: 'home', icon: <Home className="w-7 h-7" />, description: 'Welcome to my portfolio' },
    { id: 'skills', icon: <Zap className="w-7 h-7" />, description: 'My technical expertise' },
    { id: 'projects', icon: <Rocket className="w-7 h-7" />, description: 'Things I\'ve built' },
    { id: 'contact', icon: <Mail className="w-7 h-7" />, description: 'Get in touch with me' }
  ];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    targetRotation.current.y = ((x / rect.width) - 0.5) * Math.PI * 0.5;
    targetRotation.current.x = ((y / rect.height) - 0.5) * Math.PI * 0.2;
  };

  const handlePointerOut = () => {
    if (isMobile) return;
    targetRotation.current.x = 0;
    targetRotation.current.y = 0;
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: '', // 'college' or 'job'
    collegeYear: '',
    collegeName: '',
    jobDomain: '',
    jobCompany: '',
  });
  const [contactError, setContactError] = useState<Partial<typeof contactForm>>({});
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm(f => {
      const newForm = { ...f, [name]: value };
      if (name === 'type') {
        // Reset conditional fields when type changes
        newForm.collegeYear = '';
        newForm.collegeName = '';
        newForm.jobDomain = '';
        newForm.jobCompany = '';
      }
      return newForm;
    });
  };

  useEffect(() => {
    const validateContact = () => {
      const errors: Partial<typeof contactForm> = {};
      if (!contactForm.name.trim()) errors.name = 'Name is required';
      if (!/^\d{10}$/.test(contactForm.phone)) errors.phone = 'A valid 10-digit phone number is required';
      if (!/^\S+@\S+\.\S+$/.test(contactForm.email)) errors.email = 'A valid email is required';
      if (!contactForm.type) errors.type = 'Please select an option';
  
      if (contactForm.type === 'college') {
        if (!contactForm.collegeYear.trim()) errors.collegeYear = 'Year is required';
        if (!contactForm.collegeName.trim()) errors.collegeName = 'College name is required';
      } else if (contactForm.type === 'job') {
        if (!contactForm.jobDomain.trim()) errors.jobDomain = 'Domain is required';
        if (!contactForm.jobCompany.trim()) errors.jobCompany = 'Company name is required';
      }
  
      setContactError(errors);
      return Object.keys(errors).length === 0;
    };
    setIsContactFormValid(validateContact());
  }, [contactForm]);
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isContactFormValid) {
      console.log('Contact form submitted:', contactForm);
      setCurrentStep('greeting');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return <PageLoader onComplete={() => setIsLoading(false)} />;
  }

  // Portal for floating nav on desktop
  const portalRoot = typeof window !== 'undefined' ? document.getElementById('portal-root') : null;

  return (
    <>
      <div className={`relative w-screen h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
        <CustomCursor />
        {/* Dark/Light mode toggle */}
        <button
          className="fixed top-6 right-8 z-50 bg-black/20 dark:bg-white/10 p-2 rounded-full shadow hover:bg-orange-500 hover:text-white transition-colors"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6 text-orange-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>
        {/* Jeevi. name in top-left */}
        <div className="fixed top-6 left-8 z-40 select-none">
          <span className="text-4xl md:text-6xl font-great-vibes tracking-widest text-orange-500">Jeevi<span className="text-red-500">.</span></span>
        </div>
        {/* Layout container */}
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* Robot canvas takes full screen on mobile, half on desktop */}
          <div
            id="robot-canvas-area"
            className="relative w-full h-full md:w-1/2"
            onPointerMove={!isMobile ? handlePointerMove : undefined}
            onPointerOut={!isMobile ? handlePointerOut : undefined}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <pointLight position={[-10, -10, -10]} intensity={0.7} color="#fb923c" />
              <Suspense fallback={null}>
                <RobotModel targetRotation={targetRotation} floating={isMobile} />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>
          {/* UI elements container */}
          <div className="absolute inset-0 md:relative md:w-1/2 md:h-full flex flex-col items-center justify-end md:justify-center text-center p-4">
            <div className="relative">
              {/* Animated question/greeting */}
              {currentStep === 'greeting' && (
                <div className="mb-4 text-sm md:text-base font-semibold text-orange-500 drop-shadow-lg animate-fade-in" style={{textShadow:'0 2px 16px #0008'}}>
                  {isTyping ? (
                    <span className="animate-pulse">{greetingText}</span>
                  ) : (
                    <span>{greetingText}</span>
                  )}
                </div>
              )}
              {currentStep === 'name-input' && (
                <form onSubmit={handleNameSubmit} className="flex flex-col gap-3 animate-fade-in" noValidate>
                  <div className="mb-1 text-sm md:text-base font-semibold text-orange-500 drop-shadow-lg" style={{textShadow:'0 2px 16px #0008'}}>
                    "What should I call you?"
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value); setShowError(false); }}
                    className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900' } placeholder:text-gray-400 w-[220px] md:w-[260px] rounded-full`}
                    autoFocus
                    required
                  />
                  {showError && (
                    <span className="text-red-500 text-xs mt-1">Name is required</span>
                  )}
                  <Button type="submit" className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white w-[120px] self-end">Submit</Button>
                </form>
              )}
              {currentStep === 'acknowledge' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <div className="mb-2 text-sm md:text-base font-medium text-orange-500 drop-shadow-lg" style={{ textShadow: '0 2px 45px #0008' }}>
                     Nice to meet you, <span style={{ fontFamily: 'Pacifico' }}>{userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}</span>!<br />
                     I can show you my creator's work or you can contact him directly.
                  </div>

                  <div className="flex gap-4">
                    <Button className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white w-[140px]" onClick={() => onNavigate('home')}>Show me more</Button>
                    <Button className="rounded-full bg-gray-300 text-gray-800 w-[140px] dark:bg-gray-700 dark:text-white" onClick={() => setCurrentStep('contact-form')}>Contact</Button>
                  </div>
                </div>
              )}
              {currentStep === 'contact-form' && (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 animate-fade-in w-[320px]">
                  <div className="mb-2 text-sm md:text-base font-semibold text-orange-500 drop-shadow-lg" style={{textShadow:'0 2px 16px #0008'}}>
                   If you'd like, you can connect directly with my creator...
                  </div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900' } placeholder:text-gray-400 rounded-full`}
                    required
                  />
                  {contactError.name && <span className="text-red-500 text-xs mt-1">{contactError.name}</span>}
                  
                  <div className="flex gap-4 px-2 py-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input type="radio" name="type" value="college" checked={contactForm.type === 'college'} onChange={handleContactChange} className="form-radio text-orange-500" />
                      <span className={`${darkMode ? 'text-white' : 'text-black'}`}>College Student</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input type="radio" name="type" value="job" checked={contactForm.type === 'job'} onChange={handleContactChange} className="form-radio text-orange-500" />
                      <span className={`${darkMode ? 'text-white' : 'text-black'}`}>Professional</span>
                    </label>
                  </div>
                  {contactError.type && <p className="text-red-500 text-xs px-2 -mt-1">{contactError.type}</p>}

                  {contactForm.type === 'college' && (
                    <div className="flex flex-col gap-3 animate-fade-in">
                      <Input name="collegeYear" value={contactForm.collegeYear} onChange={handleContactChange} placeholder="Which year?" className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`} />
                      {contactError.collegeYear && <span className="text-red-500 text-xs px-2 -mt-3">{contactError.collegeYear}</span>}
                      <Input name="collegeName" value={contactForm.collegeName} onChange={handleContactChange} placeholder="College Name" className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`} />
                      {contactError.collegeName && <span className="text-red-500 text-xs px-2 -mt-3">{contactError.collegeName}</span>}
                    </div>
                  )}

                  {contactForm.type === 'job' && (
                    <div className="flex flex-col gap-3 animate-fade-in">
                      <Input name="jobDomain" value={contactForm.jobDomain} onChange={handleContactChange} placeholder="Your Domain" className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`} />
                      {contactError.jobDomain && <span className="text-red-500 text-xs px-2 -mt-3">{contactError.jobDomain}</span>}
                      <Input name="jobCompany" value={contactForm.jobCompany} onChange={handleContactChange} placeholder="Company Name" className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`} />
                      {contactError.jobCompany && <span className="text-red-500 text-xs px-2 -mt-3">{contactError.jobCompany}</span>}
                    </div>
                  )}
                  
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`}
                    required
                  />
                  {contactError.phone && <span className="text-red-500 text-xs mt-1">{contactError.phone}</span>}
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className={`border-orange-400 ${darkMode ? 'bg-black/30 text-white' : 'bg-white/60 text-gray-900'} placeholder:text-gray-400 rounded-full`}
                    required
                  />
                  {contactError.email && <span className="text-red-500 text-xs mt-1">{contactError.email}</span>}
                  <div className="flex justify-end items-center gap-4 mt-2">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep('acknowledge')}
                      className="rounded-full bg-gray-500/50 text-white p-3 hover:bg-gray-600/60"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button type="submit" disabled={!isContactFormValid} className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white w-[120px] disabled:from-gray-400 disabled:to-gray-500">Submit</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}