import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import EntryExperience from './components/EntryExperience';
import HUDOverlay from './components/HUDOverlay';
import Navigation from './components/Navigation';
import IdentityCore from './sections/IdentityCore';
import Capabilities from './sections/Capabilities';
import ActiveMissions from './sections/ActiveMissions';
import SystemMap from './sections/SystemMap';
import ContactProtocol from './sections/ContactProtocol';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (accessGranted) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Connect Lenis to GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      return () => {
        lenisRef.current?.destroy();
      };
    }
  }, [accessGranted]);

  // Handle access grant from entry experience
  const handleAccessGranted = () => {
    setAccessGranted(true);
  };

  // Navigate to module
  const navigateToModule = (index: number) => {
    setCurrentModule(index);
    const modules = ['identity', 'capabilities', 'missions', 'system', 'contact'];
    const element = document.getElementById(modules[index]);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0 });
    }
  };

  if (!accessGranted) {
    return (
      <>
        <CustomCursor />
        <EntryExperience onAccessGranted={handleAccessGranted} />
      </>
    );
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* HUD Overlay */}
      <HUDOverlay />
      
      {/* Navigation */}
      <Navigation 
        currentModule={currentModule} 
        onNavigate={navigateToModule} 
      />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Module 1: Identity Core */}
        <section id="identity" className="min-h-screen">
          <IdentityCore />
        </section>
        
        {/* Module 2: Capabilities */}
        <section id="capabilities" className="min-h-screen">
          <Capabilities />
        </section>
        
        {/* Module 3: Active Missions */}
        <section id="missions" className="min-h-screen">
          <ActiveMissions />
        </section>
        
        {/* Module 4: System Map */}
        <section id="system" className="min-h-screen">
          <SystemMap />
        </section>
        
        {/* Module 5: Contact Protocol */}
        <section id="contact" className="min-h-screen">
          <ContactProtocol />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="terminal-text text-xs text-cyan-500/50">
            <span className="status-online">●</span> SYSTEM ONLINE
          </div>
          <div className="terminal-text text-xs text-cyan-500/50">
            ARNIM GOYAL // MISSION CONTROL v2.0.26
          </div>
          <div className="terminal-text text-xs text-cyan-500/50">
            ENCRYPTED CONNECTION
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
