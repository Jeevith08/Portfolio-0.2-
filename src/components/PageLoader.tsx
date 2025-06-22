import React, { useState, useEffect, useMemo } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.random() * 10;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);
  
  const sparkles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      animationDuration: `${Math.random() * 2 + 1}s`,
      animationDelay: `${Math.random()}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-orange-500"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animation: `sparkle-fade ${sparkle.animationDuration} ${sparkle.animationDelay} infinite`,
            boxShadow: '0 0 6px #FF4500',
          }}
        />
      ))}

      <div className="relative text-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#374151"
              strokeWidth="1"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF4500"
              strokeWidth="1.2"
              strokeDasharray={`${progress}, 100`}
              className="transition-all duration-300 ease-linear"
              style={{ filter: 'url(#glow)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-semibold text-orange-400 font-mono">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm animate-pulse mt-6">
          Loading portfolio...
        </div>
      </div>
      <style>{`
        @keyframes sparkle-fade {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
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
