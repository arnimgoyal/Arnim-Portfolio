import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
  icon: string;
  color: string;
  technologies: string[];
}

const skills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'AI PROCESSING UNIT',
    level: 95,
    description: 'Primary language for machine learning, data processing, and AI system development.',
    icon: '🐍',
    color: 'from-yellow-400 to-blue-500',
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'FastAPI'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'INTERFACE ENGINE',
    level: 88,
    description: 'Cross-platform UI framework for building beautiful, natively compiled applications.',
    icon: '📱',
    color: 'from-cyan-400 to-blue-400',
    technologies: ['Dart', 'Firebase', 'BLoC', 'Provider', 'GetX', 'Riverpod'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'DATA STORAGE CORE',
    level: 92,
    description: 'Database management and optimization for large-scale data operations.',
    icon: '🗄️',
    color: 'from-orange-400 to-red-500',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'ClickHouse'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'SYSTEM ORCHESTRATOR',
    level: 90,
    description: 'Server-side JavaScript runtime for scalable network applications.',
    icon: '🟢',
    color: 'from-green-400 to-emerald-500',
    technologies: ['Express', 'NestJS', 'Socket.io', 'GraphQL', 'Microservices', 'Docker'],
  },
  {
    id: 'react',
    name: 'React',
    category: 'VISUALIZATION MODULE',
    level: 93,
    description: 'Component-based library for building interactive user interfaces.',
    icon: '⚛️',
    color: 'from-cyan-400 to-purple-500',
    technologies: ['Next.js', 'TypeScript', 'Redux', 'Tailwind', 'Framer Motion', 'Three.js'],
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'CLOUD INFRASTRUCTURE',
    level: 85,
    description: 'Cloud computing services for deploying and managing scalable applications.',
    icon: '☁️',
    color: 'from-orange-400 to-yellow-500',
    technologies: ['EC2', 'Lambda', 'S3', 'RDS', 'EKS', 'CloudFormation'],
  },
];

const Capabilities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!section || !title || !grid) return;

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

    // Grid items animation
    const cards = grid.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: (self) => triggers.push(self),
          },
        }
      );
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    
    // Animate modal in
    gsap.fromTo(
      '.skill-modal',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
    );
  };

  const closeModal = () => {
    gsap.to('.skill-modal', {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: () => setSelectedSkill(null),
    });
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative px-4 py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="terminal-text text-xs text-cyan-500/70 tracking-widest">
              SYSTEM MODULES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              CAPABILITIES
            </span>
          </h2>
          <p className="text-cyan-500/60 max-w-2xl mx-auto">
            Core processing units and specialized modules that power intelligent systems.
            Each module represents a domain of expertise.
          </p>
        </div>
        
        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="skill-card module-card rounded-lg p-6 cursor-pointer hud-corner relative overflow-hidden group"
              onClick={() => handleSkillClick(skill)}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              data-cursor-hover
            >
              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="terminal-text text-[10px] text-cyan-500/50 tracking-widest mb-1">
                    {skill.category}
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400">{skill.name}</h3>
                </div>
                <span className="text-3xl">{skill.icon}</span>
              </div>
              
              {/* Description */}
              <p className="text-cyan-500/60 text-sm mb-4 line-clamp-2">
                {skill.description}
              </p>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="terminal-text text-[10px] text-cyan-500/50">
                    PROFICIENCY
                  </span>
                  <span className="terminal-text text-xs text-cyan-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500`}
                    style={{
                      width: hoveredSkill === skill.id ? `${skill.level}%` : '0%',
                    }}
                  />
                </div>
              </div>
              
              {/* Tech tags preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[10px] bg-cyan-500/10 text-cyan-400/70 rounded terminal-text"
                  >
                    {tech}
                  </span>
                ))}
                {skill.technologies.length > 3 && (
                  <span className="px-2 py-1 text-[10px] text-cyan-500/50 terminal-text">
                    +{skill.technologies.length - 3}
                  </span>
                )}
              </div>
              
              {/* Corner indicator */}
              <div className="absolute bottom-4 right-4 w-2 h-2 border border-cyan-500/30 rotate-45 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-all duration-300" />
            </div>
          ))}
        </div>
        
        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal content */}
            <div
              className="skill-modal relative bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-cyan-500/30 text-cyan-500/50 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300"
                data-cursor-hover
              >
                ×
              </button>
              
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">{selectedSkill.icon}</span>
                <div>
                  <div className="terminal-text text-xs text-cyan-500/50 tracking-widest mb-1">
                    {selectedSkill.category}
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-cyan-900/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${selectedSkill.color} rounded-full`}
                        style={{ width: `${selectedSkill.level}%` }}
                      />
                    </div>
                    <span className="terminal-text text-sm text-cyan-400">
                      {selectedSkill.level}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-cyan-500/70 mb-6 leading-relaxed">
                {selectedSkill.description}
              </p>
              
              {/* Technologies */}
              <div>
                <h4 className="terminal-text text-xs text-cyan-500/50 tracking-widest mb-3">
                  TECHNOLOGIES & FRAMEWORKS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded terminal-text text-sm hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Capabilities;
