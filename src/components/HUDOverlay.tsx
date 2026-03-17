import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HUDOverlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate data streams
    gsap.to('.data-stream-left', {
      y: '100vh',
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.data-stream-right', {
      y: '-100vh',
      duration: 12,
      repeat: -1,
      ease: 'none',
    });

    // Pulse animation for corner indicators
    gsap.to('.corner-pulse', {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Rotating radar elements
    gsap.to('.radar-rotate', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[50]">
      {/* Base grid */}
      <div className="absolute inset-0 hud-grid opacity-20" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      {/* Scanning line */}
      <div className="scanning-line" />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <div className="corner-pulse absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full" />
      </div>
      
      <div className="absolute top-4 right-4 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <div className="corner-pulse absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full" />
      </div>
      
      <div className="absolute bottom-4 left-4 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-500/50 to-transparent" />
        <div className="corner-pulse absolute bottom-0 left-0 w-2 h-2 bg-cyan-400 rounded-full" />
      </div>
      
      <div className="absolute bottom-4 right-4 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-cyan-500/50 to-transparent" />
        <div className="corner-pulse absolute bottom-0 right-0 w-2 h-2 bg-cyan-400 rounded-full" />
      </div>
      
      {/* Top status bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-8">
        <div className="flex items-center gap-2 text-xs text-cyan-500/50 terminal-text">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          SYSTEM ONLINE
        </div>
        <div className="text-xs text-cyan-500/30 terminal-text">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
        <div className="flex items-center gap-2 text-xs text-cyan-500/50 terminal-text">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          CONNECTED
        </div>
      </div>
      
      {/* Bottom info bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-8 text-xs text-cyan-500/30 terminal-text">
        <span>LAT: 28.6139° N</span>
        <span>LON: 77.2090° E</span>
        <span>UPTIME: 99.99%</span>
      </div>
      
      {/* Left side data stream */}
      <div className="absolute left-2 top-0 overflow-hidden h-screen w-16 opacity-20">
        <div className="data-stream-left flex flex-col gap-1 text-[8px] text-cyan-500 terminal-text">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i}>{Math.random().toString(16).substr(2, 12).toUpperCase()}</span>
          ))}
        </div>
      </div>
      
      {/* Right side data stream */}
      <div className="absolute right-2 top-0 overflow-hidden h-screen w-16 opacity-20">
        <div className="data-stream-right flex flex-col gap-1 text-[8px] text-cyan-500 terminal-text text-right">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i}>{Math.random().toString(16).substr(2, 12).toUpperCase()}</span>
          ))}
        </div>
      </div>
      
      {/* Radar circles */}
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-20">
        <div className="radar-rotate absolute inset-0 border border-cyan-500/30 rounded-full" />
        <div className="absolute inset-4 border border-cyan-500/20 rounded-full" />
        <div className="absolute inset-8 border border-cyan-500/10 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
        </div>
      </div>
      
      {/* Crosshair center (subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-cyan-500" />
      </div>
      
      {/* Hexagon pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

export default HUDOverlay;
