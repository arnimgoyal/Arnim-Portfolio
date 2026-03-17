import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'YEARS EXPERIENCE', value: 5, suffix: '+' },
  { label: 'PROJECTS DEPLOYED', value: 50, suffix: '+' },
  { label: 'SYSTEMS BUILT', value: 25, suffix: '+' },
  { label: 'LINES OF CODE', value: 100, suffix: 'K+' },
];

const focusAreas = [
  { name: 'AI/ML SYSTEMS', level: 95, color: 'from-cyan-400 to-blue-500' },
  { name: 'FULL STACK DEV', level: 90, color: 'from-green-400 to-cyan-500' },
  { name: 'CLOUD ARCHITECTURE', level: 85, color: 'from-purple-400 to-pink-500' },
  { name: 'DATA ENGINEERING', level: 88, color: 'from-orange-400 to-red-500' },
];

const IdentityCore = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const statsContainer = statsRef.current;
    const focusContainer = focusRef.current;
    if (!section || !title || !subtitle || !statsContainer || !focusContainer) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: (self) => triggers.push(self),
        },
      }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: (self) => triggers.push(self),
        },
      }
    );

    // Stats animation with counter
    const statElements = statsContainer.querySelectorAll('.stat-item');
    statElements.forEach((stat, index) => {
      const valueEl = stat.querySelector('.stat-value');
      const targetValue = stats[index].value;

      gsap.fromTo(
        stat,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4 + index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsContainer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: (self) => {
              triggers.push(self);
              // Counter animation
              if (valueEl) {
                const counter = { value: 0 };
                gsap.to(counter, {
                  value: targetValue,
                  duration: 2,
                  delay: 0.4 + index * 0.1,
                  ease: 'power2.out',
                  onUpdate: () => {
                    valueEl.textContent = Math.floor(counter.value).toString();
                  },
                });
              }
            },
          },
        }
      );
    });

    // Focus areas animation
    const focusItems = focusContainer.querySelectorAll('.focus-item');
    focusItems.forEach((item, index) => {
      const progressBar = item.querySelector('.progress-fill');
      const targetLevel = focusAreas[index].level;

      gsap.fromTo(
        item,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.6 + index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: focusContainer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: (self) => {
              triggers.push(self);
              // Progress bar animation
              if (progressBar) {
                gsap.fromTo(
                  progressBar,
                  { width: '0%' },
                  {
                    width: `${targetLevel}%`,
                    duration: 1.5,
                    delay: 0.6 + index * 0.1,
                    ease: 'power3.out',
                  }
                );
              }
            },
          },
        }
      );
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative px-4 py-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Identity */}
        <div className="space-y-8">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="terminal-text text-xs text-cyan-500/70 tracking-widest">
              SYSTEM OPERATOR IDENTIFIED
            </span>
          </div>
          
          {/* Main title */}
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400">
                ARNIM GOYAL
              </span>
            </h1>
            <div ref={subtitleRef} className="space-y-2">
              <p className="terminal-text text-xl md:text-2xl text-cyan-400/80 tracking-widest">
                FULL STACK DEVELOPER
              </p>
              <p className="terminal-text text-sm text-cyan-500/50">
                SPECIALIZING IN INTELLIGENT SYSTEMS & AUTOMATION
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-cyan-500/60 leading-relaxed max-w-lg">
            Architecting the future through code. Building intelligent systems that learn, 
            adapt, and evolve. From AI-powered applications to scalable cloud infrastructure, 
            every line of code is a step toward technological transcendence.
          </p>
          
          {/* Quick actions */}
          <div className="flex gap-4">
            <button
              className="px-6 py-3 border border-cyan-500/50 text-cyan-400 terminal-text text-sm tracking-widest hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 hud-corner"
              data-cursor-hover
            >
              VIEW MISSIONS
            </button>
            <button
              className="px-6 py-3 border border-green-500/50 text-green-400 terminal-text text-sm tracking-widest hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 hud-corner"
              data-cursor-hover
            >
              INITIATE CONTACT
            </button>
          </div>
        </div>
        
        {/* Right column - Stats & Focus */}
        <div className="space-y-8">
          {/* Stats grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item module-card p-4 rounded hud-corner"
              >
                <div className="terminal-text text-3xl font-bold text-cyan-400 mb-1">
                  <span className="stat-value">0</span>
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <div className="terminal-text text-[10px] text-cyan-500/50 tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Focus areas */}
          <div ref={focusRef} className="space-y-4">
            <h3 className="terminal-text text-sm text-cyan-500/70 tracking-widest mb-4">
              SYSTEM CAPABILITIES
            </h3>
            {focusAreas.map((area) => (
              <div key={area.name} className="focus-item space-y-2">
                <div className="flex justify-between items-center">
                  <span className="terminal-text text-xs text-cyan-400/80">
                    {area.name}
                  </span>
                  <span className="terminal-text text-xs text-cyan-500/50">
                    {area.level}%
                  </span>
                </div>
                <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                  <div
                    className={`progress-fill h-full bg-gradient-to-r ${area.color} rounded-full`}
                    style={{ width: '0%', boxShadow: '0 0 10px currentColor' }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative element */}
          <div className="relative h-32 border border-cyan-500/20 rounded p-4">
            <div className="absolute top-2 left-2 text-[10px] text-cyan-500/30 terminal-text">
              SYSTEM DIAGNOSTIC
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-2 border-2 border-green-500/30 rounded-full animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
                <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '5s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl text-cyan-400">◈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCore;
