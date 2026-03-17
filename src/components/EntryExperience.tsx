import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface EntryExperienceProps {
  onAccessGranted: () => void;
}

const EntryExperience = ({ onAccessGranted }: EntryExperienceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scanLine = scanLineRef.current;
    const textContainer = textContainerRef.current;
    const progress = progressRef.current;
    if (!container || !scanLine || !textContainer || !progress) return;

    const tl = gsap.timeline();

    // Phase 1: Initial scan line sweep
    tl.fromTo(
      scanLine,
      { top: '0%' },
      {
        top: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
      }
    );

    // Phase 2: Show scanning text
    tl.fromTo(
      '.scan-text-1',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '+=0.3'
    );

    tl.to('.scan-text-1', {
      opacity: 0,
      delay: 1.5,
      duration: 0.3,
    });

    // Phase 3: Access level
    tl.fromTo(
      '.scan-text-2',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    tl.to('.scan-text-2', {
      opacity: 0,
      delay: 1.5,
      duration: 0.3,
    });

    // Phase 4: Granting access
    tl.fromTo(
      '.scan-text-3',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Progress bar animation
    tl.fromTo(
      progress,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power2.inOut' },
      '<'
    );

    tl.to('.scan-text-3', {
      opacity: 0,
      delay: 0.5,
      duration: 0.3,
    });

    // Phase 5: ACCESS GRANTED
    tl.fromTo(
      '.access-granted',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    tl.to('.access-granted', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    // Flash effect
    tl.to('.flash-overlay', {
      opacity: 1,
      duration: 0.1,
    });

    tl.to('.flash-overlay', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        onAccessGranted();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onAccessGranted]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 hud-grid opacity-30" />
      
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30" />
      
      {/* Scanning line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{
          boxShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff',
        }}
      />
      
      {/* Text container */}
      <div ref={textContainerRef} className="relative text-center">
        {/* Phase 1: Scanning User */}
        <div className="scan-text-1 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="terminal-text text-cyan-400 text-xl md:text-3xl tracking-widest mb-4">
            SCANNING USER...
          </div>
          <div className="flex items-center gap-2 text-cyan-500/50 text-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            BIOMETRIC ANALYSIS IN PROGRESS
          </div>
        </div>
        
        {/* Phase 2: Access Level */}
        <div className="scan-text-2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="terminal-text text-cyan-400 text-xl md:text-3xl tracking-widest mb-4">
            ACCESS LEVEL: <span className="text-green-400">VISITOR</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-500/50 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            CLEARANCE VERIFIED
          </div>
        </div>
        
        {/* Phase 3: Granting Access */}
        <div className="scan-text-3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="terminal-text text-cyan-400 text-xl md:text-3xl tracking-widest mb-4">
            GRANTING LIMITED ACCESS...
          </div>
          <div className="w-64 h-1 bg-cyan-900/50 rounded overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-cyan-500 to-green-400"
              style={{ width: '0%' }}
            />
          </div>
          <div className="mt-2 text-cyan-500/50 text-xs">ESTABLISHING SECURE CONNECTION</div>
        </div>
        
        {/* Phase 4: ACCESS GRANTED */}
        <div className="access-granted opacity-0">
          <div className="terminal-text text-4xl md:text-6xl font-bold tracking-widest mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400">
              ACCESS GRANTED
            </span>
          </div>
          <div className="text-cyan-500/50 text-sm tracking-widest">
            WELCOME TO MISSION CONTROL
          </div>
        </div>
      </div>
      
      {/* Flash overlay */}
      <div className="flash-overlay absolute inset-0 bg-cyan-400 opacity-0 pointer-events-none" />
      
      {/* Bottom status */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-xs text-cyan-500/30 terminal-text">
        <span>SECURE CONNECTION</span>
        <span>•</span>
        <span>ENCRYPTED</span>
        <span>•</span>
        <span>PROTOCOL v2.0.26</span>
      </div>
      
      {/* Side data streams */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 text-[10px] text-cyan-500/20 terminal-text">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="opacity-30">
            {Math.random().toString(16).substr(2, 8).toUpperCase()}
          </span>
        ))}
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 text-[10px] text-cyan-500/20 terminal-text text-right">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="opacity-30">
            {Math.random().toString(16).substr(2, 8).toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EntryExperience;
