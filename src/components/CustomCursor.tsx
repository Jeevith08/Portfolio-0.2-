import React, { useEffect, useRef } from 'react';

// Linear interpolation for smooth motion
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Store the target and current positions of the cursor
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Update target position on mouse move
    const updateTargetPosition = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', updateTargetPosition);

    // Animation loop using requestAnimationFrame
    let animationFrameId: number;
    const animate = () => {
      // Interpolate current position towards the target position
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.7);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.7);

      // Apply the transform to the cursor element
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateTargetPosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
};

export default CustomCursor;
