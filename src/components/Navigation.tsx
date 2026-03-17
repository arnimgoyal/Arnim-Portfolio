import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  currentModule: number;
  onNavigate: (index: number) => void;
}

const modules = [
  { id: 'identity', label: 'IDENTITY CORE', icon: '◈' },
  { id: 'capabilities', label: 'CAPABILITIES', icon: '◉' },
  { id: 'missions', label: 'ACTIVE MISSIONS', icon: '◆' },
  { id: 'system', label: 'SYSTEM MAP', icon: '◎' },
  { id: 'contact', label: 'CONTACT', icon: '◊' },
];

const Navigation = ({ currentModule, onNavigate }: NavigationProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate indicator to current module
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        y: currentModule * 48,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [currentModule]);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleModuleClick = (index: number) => {
    onNavigate(index);
    
    // Click feedback animation
    gsap.fromTo(
      `.nav-item-${index}`,
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
    );
  };

  return (
    <div
      ref={navRef}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[60]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative flex flex-col gap-2">
        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="absolute left-0 w-1 h-10 bg-gradient-to-b from-cyan-400 to-green-400 rounded-r"
          style={{ top: 0, boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
        />
        
        {modules.map((module, index) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(index)}
            className={`nav-item-${index} group relative flex items-center gap-3 px-3 py-2 rounded transition-all duration-300 ${
              currentModule === index
                ? 'bg-cyan-500/10'
                : 'hover:bg-cyan-500/5'
            }`}
            data-cursor-hover
          >
            {/* Icon */}
            <span
              className={`text-lg transition-all duration-300 ${
                currentModule === index
                  ? 'text-cyan-400'
                  : 'text-cyan-500/40 group-hover:text-cyan-400'
              }`}
            >
              {module.icon}
            </span>
            
            {/* Label */}
            <span
              className={`terminal-text text-xs tracking-widest whitespace-nowrap transition-all duration-300 ${
                isExpanded
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4 pointer-events-none'
              } ${
                currentModule === index
                  ? 'text-cyan-400'
                  : 'text-cyan-500/50 group-hover:text-cyan-400'
              }`}
            >
              {module.label}
            </span>
            
            {/* Status dot */}
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentModule === index
                  ? 'bg-green-400 animate-pulse'
                  : 'bg-cyan-500/20'
              }`}
            />
          </button>
        ))}
        
        {/* Module count indicator */}
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <div className="terminal-text text-[10px] text-cyan-500/30">
            MODULE {currentModule + 1}/{modules.length}
          </div>
        </div>
      </div>
      
      {/* Decorative line */}
      <div className="absolute -right-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
};

export default Navigation;
