import React, { useState, useEffect, useMemo } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

interface PageLoaderProps {
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  { threshold: 15, text: 'Initializing 3D avatar...' },
  { threshold: 35, text: 'Configuring portfolio modules...' },
  { threshold: 55, text: 'Loading system assets...' },
  { threshold: 75, text: 'Optimizing neural engine...' },
  { threshold: 92, text: 'Securing connections...' },
  { threshold: 100, text: 'System online!' }
];

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.random() * 8;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return nextProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Determine current status message based on progress
  const currentStatus = useMemo(() => {
    const matched = STATUS_MESSAGES.find(msg => progress <= msg.threshold);
    return matched ? matched.text : 'System online!';
  }, [progress]);
  
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const colors = ['#F97316', '#F59E0B', '#EF4444'];
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1.5}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 1.5}s`,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#08130E] z-50 flex items-center justify-center overflow-hidden">
      {/* Giant low-contrast background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div 
          className="text-[25vw] font-black text-[#0c2016] tracking-widest leading-none uppercase select-none opacity-50"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          LOAD
        </div>
      </div>

      {/* Subtle warm orange glow behind the loader */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Sparkles / Ambient Particles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute rounded-full z-10"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            animation: `sparkle-fade ${sparkle.animationDuration} ${sparkle.animationDelay} infinite`,
            boxShadow: `0 0 8px ${sparkle.color}`,
          }}
        />
      ))}

      <div className="relative text-center flex flex-col items-center justify-center">
        {/* Holographic Concentric Circles */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Outer Dashed Rotating Ring */}
          <div className="absolute w-40 h-40 rounded-full border border-dashed border-orange-500/20 animate-[spin_16s_linear_infinite]" />
          
          {/* Middle Rotating Segment Ring */}
          <div className="absolute w-36 h-36 rounded-full border border-amber-500/25 border-t-transparent border-b-transparent animate-[spin_8s_linear_infinite_reverse]" />

          {/* SVG Progress Ring */}
          <svg className="absolute w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <filter id="hologram-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background circle track */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(249, 115, 22, 0.08)"
              strokeWidth="1.5"
            />
            {/* Active progress circle */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#cyber-gradient)"
              strokeWidth="2"
              strokeDasharray={`${progress}, 100`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
              style={{ filter: 'url(#hologram-glow)' }}
            />
          </svg>

          {/* Center Content: Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.35)] leading-none">
                {Math.floor(progress)}
              </span>
              <span className="text-xs font-black text-orange-400 ml-0.5 select-none">
                %
              </span>
            </div>
            <div className="text-[9px] text-orange-400/80 font-bold uppercase tracking-[0.2em] mt-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              Loading
            </div>
          </div>
        </div>
        
        {/* Dynamic Status Initialization Message */}
        <div className="min-h-[24px] mt-8 flex flex-col items-center" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
          <div className="text-zinc-300 text-xs tracking-widest font-semibold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
            {currentStatus}
          </div>
          <div className="w-24 h-[1.5px] bg-orange-500/10 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes sparkle-fade {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.6) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

function Model() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}robot_playground.glb`);
  
  // Create a custom material for the outline effect
  const outlineMaterial = new THREE.MeshBasicMaterial({ color: '#FF4500', side: THREE.BackSide });

  // Apply material to all meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const outlineMesh = (child as THREE.Mesh).clone();
      outlineMesh.material = outlineMaterial;
      outlineMesh.scale.multiplyScalar(1.05); // Adjust outline thickness
      child.parent?.add(outlineMesh);
    }
  });

  return (
    <Center>
      <primitive object={scene} scale={[2, 2, 2]} />
    </Center>
  );
}

export default PageLoader;
