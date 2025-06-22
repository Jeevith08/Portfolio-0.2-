import React, { useState, useEffect } from 'react';
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
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF4500"
              strokeWidth="2"
              strokeDasharray={`${progress}, 100`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold text-[#FF4500] font-mono">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm animate-pulse">
          Loading portfolio...
        </div>
      </div>
    </div>
  );
};

function Model() {
  const { scene } = useGLTF('/robot_playground.glb');
  
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
