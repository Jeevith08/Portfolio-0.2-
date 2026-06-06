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
      const colors = ['#E5B53B', '#FF4500', '#22c55e'];
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
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0D2218] via-[#020805] to-black z-50 flex items-center justify-center overflow-hidden">
      {/* Background Grid Lines to enhance the sci-fi look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,181,59,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(229,181,59,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Sparkles / Ambient Particles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
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
          <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#E5B53B]/25 animate-[spin_12s_linear_infinite]" />
          
          {/* Middle Rotating Segment Ring */}
          <div className="absolute w-36 h-36 rounded-full border border-[#22c55e]/20 border-t-transparent border-b-transparent animate-[spin_6s_linear_infinite_reverse]" />

          {/* SVG Progress Ring */}
          <svg className="absolute w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="100%" stopColor="#E5B53B" />
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
              stroke="rgba(229, 181, 59, 0.08)"
              strokeWidth="1.5"
            />
            {/* Active progress circle */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
              strokeDasharray={`${progress}, 100`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
              style={{ filter: 'url(#hologram-glow)' }}
            />
          </svg>

          {/* Center Content: Percentage */}
          <div className="absolute flex flex-col items-center justify-center">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#E5B53B] font-sans tracking-tight drop-shadow-[0_0_12px_rgba(229,181,59,0.3)]">
              {Math.floor(progress)}%
            </div>
            <div className="text-[10px] text-[#22c55e]/70 font-sans font-bold uppercase tracking-widest mt-1">
              Loading
            </div>
          </div>
        </div>
        
        {/* Dynamic Status Initialization Message */}
        <div className="min-h-[24px] mt-8 flex flex-col items-center">
          <div className="text-zinc-200 font-sans text-sm tracking-wide font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
            {currentStatus}
          </div>
          <div className="w-24 h-[2px] bg-[#E5B53B]/20 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-[#E5B53B] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
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
