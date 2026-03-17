import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactProtocol = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionComplete, setTransmissionComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    if (!section || !title || !form) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: (self) => triggers.push(self),
        },
      }
    );

    // Form animation
    gsap.fromTo(
      form,
      { opacity: 0, y: 50 },
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

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);

    // Transmission animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setTransmissionComplete(true);
        setTimeout(() => {
          setIsTransmitting(false);
          setTransmissionComplete(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      },
    });

    // Signal waves animation
    tl.fromTo(
      '.signal-wave',
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.out',
      }
    );

    // Data encryption effect
    tl.fromTo(
      '.encryption-text',
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=1'
    );

    tl.to('.encryption-text', { opacity: 0, duration: 0.3 }, '+=0.5');

    // Success indicator
    tl.fromTo(
      '.transmission-success',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative px-4 py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="terminal-text text-xs text-cyan-500/70 tracking-widest">
              SECURE CHANNEL
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              INITIATE TRANSMISSION
            </span>
          </h2>
          <p className="text-cyan-500/60 max-w-2xl mx-auto">
            Establish encrypted communication channel. All transmissions are secured
            and routed through secure protocols.
          </p>
        </div>
        
        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative module-card rounded-lg p-8 hud-corner"
        >
          {/* Transmission overlay */}
          {isTransmitting && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
              {!transmissionComplete ? (
                <div className="text-center">
                  {/* Signal waves */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="signal-wave absolute inset-0 border-2 border-cyan-400 rounded-full"
                      />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl text-cyan-400">📡</span>
                    </div>
                  </div>
                  
                  {/* Encryption text */}
                  <div className="encryption-text terminal-text text-sm text-cyan-400 mb-2">
                    ENCRYPTING TRANSMISSION...
                  </div>
                  <div className="terminal-text text-xs text-cyan-500/50">
                    {Math.random().toString(16).substr(2, 32).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="transmission-success text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    TRANSMISSION COMPLETE
                  </h3>
                  <p className="terminal-text text-sm text-cyan-500/50">
                    Message received. Response expected within 24 hours.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name field */}
            <div className="space-y-2">
              <label className="terminal-text text-xs text-cyan-500/50 tracking-widest">
                OPERATIVE DESIGNATION
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ENTER NAME"
                  className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-4 py-3 text-cyan-400 placeholder-cyan-500/30 terminal-text focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  required
                  data-cursor-hover
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/30">
                  👤
                </div>
              </div>
            </div>
            
            {/* Email field */}
            <div className="space-y-2">
              <label className="terminal-text text-xs text-cyan-500/50 tracking-widest">
                COMMUNICATION FREQUENCY
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ENTER EMAIL"
                  className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-4 py-3 text-cyan-400 placeholder-cyan-500/30 terminal-text focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  required
                  data-cursor-hover
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/30">
                  ✉️
                </div>
              </div>
            </div>
          </div>
          
          {/* Message field */}
          <div className="space-y-2 mb-6">
            <label className="terminal-text text-xs text-cyan-500/50 tracking-widest">
              TRANSMISSION CONTENT
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ENTER MESSAGE..."
              rows={5}
              className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-4 py-3 text-cyan-400 placeholder-cyan-500/30 terminal-text focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none"
              required
              data-cursor-hover
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/50 text-cyan-400 terminal-text tracking-widest hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden group"
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-lg">📡</span>
              INITIATE TRANSMISSION
              <span className="text-lg">📡</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          {/* Security notice */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-cyan-500/30 terminal-text">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-400 rounded-full" />
              256-BIT ENCRYPTION
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-400 rounded-full" />
              SECURE CONNECTION
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-400 rounded-full" />
              NO DATA LOGGING
            </span>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-2 h-2 border border-cyan-500/30" />
          <div className="absolute top-4 right-4 w-2 h-2 border border-cyan-500/30" />
          <div className="absolute bottom-4 left-4 w-2 h-2 border border-cyan-500/30" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border border-cyan-500/30" />
        </form>
        
        {/* Alternative contact methods */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/arnimgoyal', color: 'cyan' },
            { icon: '💻', label: 'GITHUB', value: 'github.com/arnimgoyal', color: 'green' },
            { icon: '🐦', label: 'TWITTER', value: '@arnimgoyal', color: 'purple' },
          ].map((contact) => (
            <a
              key={contact.label}
              href="#"
              className="module-card rounded p-4 text-center hover:border-cyan-400 transition-all duration-300 group"
              data-cursor-hover
            >
              <div className="text-2xl mb-2">{contact.icon}</div>
              <div className="terminal-text text-[10px] text-cyan-500/50 mb-1">
                {contact.label}
              </div>
              <div className={`terminal-text text-sm text-${contact.color}-400 group-hover:text-${contact.color}-300`}>
                {contact.value}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactProtocol;
