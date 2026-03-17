import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorDot || !cursorTrail) return;

    // Initial position off-screen
    gsap.set([cursor, cursorDot, cursorTrail], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Main cursor - follows with slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Center dot - instant follow
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.01,
        ease: 'none',
      });

      // Trail - more delay for effect
      gsap.to(cursorTrail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorDot, cursorTrail], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorDot, cursorTrail], {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Hover effects for interactive elements
    const onElementHover = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: '#00f0ff',
        boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
        duration: 0.3,
      });
    };

    const onElementLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(0, 240, 255, 0.5)',
        boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
        duration: 0.3,
      });
    };

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onElementHover);
      el.addEventListener('mouseleave', onElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onElementHover);
        el.removeEventListener('mouseleave', onElementLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          border: '2px solid rgba(0, 240, 255, 0.5)',
          borderRadius: '50%',
          opacity: 0,
        }}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9999]"
        style={{
          background: '#00f0ff',
          borderRadius: '50%',
          boxShadow: '0 0 10px #00f0ff',
          opacity: 0,
        }}
      />
      
      {/* Trail effect */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9998]"
        style={{
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '50%',
          opacity: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
