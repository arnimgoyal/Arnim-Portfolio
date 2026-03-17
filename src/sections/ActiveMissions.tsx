import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Mission {
  id: string;
  name: string;
  codename: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'MAINTENANCE';
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  simulation: React.ReactNode;
}

// Chatbot Simulation Component
const ChatbotSimulation = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'bot' }[]>([
    { text: 'Initializing neural network...', type: 'bot' },
  ]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { text: 'Data ingestion pipeline active', type: 'bot' as const, delay: 1500 },
      { text: 'Processing natural language...', type: 'bot' as const, delay: 2000 },
      { text: 'Query: "Analyze market trends"', type: 'user' as const, delay: 2500 },
      { text: 'Analyzing data patterns...', type: 'bot' as const, delay: 3500 },
      { text: 'Response generated in 0.3s', type: 'bot' as const, delay: 4500 },
    ];

    let timeout: ReturnType<typeof setTimeout>;
    sequence.forEach((msg, index) => {
      timeout = setTimeout(() => {
        setMessages((prev) => [...prev.slice(-4), msg]);
        setStep(index + 1);
      }, msg.delay);
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-full flex flex-col p-3 bg-black/50 rounded border border-cyan-500/20">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-cyan-500/20">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="terminal-text text-[10px] text-cyan-500/50">LIVE SESSION</span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`terminal-text text-[10px] p-2 rounded ${
              msg.type === 'user'
                ? 'bg-cyan-500/10 text-cyan-400 ml-4'
                : 'bg-green-500/10 text-green-400 mr-4'
            }`}
          >
            <span className="opacity-50">{msg.type === 'user' ? '> ' : '$ '}</span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-4 bg-cyan-900/20 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <span className="terminal-text text-[10px] text-cyan-500/50">
          {Math.round((step / 5) * 100)}%
        </span>
      </div>
    </div>
  );
};

// Analyst Bot Simulation
const AnalystSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let offset = 0;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < w; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let i = 0; i < h; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }

      // Data lines
      const drawLine = (color: string, amplitude: number, speed: number, phase: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin((x + offset * speed) * 0.02 + phase) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawLine('rgba(0, 240, 255, 0.6)', 30, 1, 0);
      drawLine('rgba(0, 255, 136, 0.6)', 20, 1.5, 1);
      drawLine('rgba(184, 41, 255, 0.6)', 25, 0.8, 2);

      // Data points
      for (let i = 0; i < 5; i++) {
        const x = ((offset * 2 + i * 50) % w);
        const y = h / 2 + Math.sin((x + offset) * 0.02) * 30;
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      offset += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="h-full flex flex-col p-3 bg-black/50 rounded border border-cyan-500/20">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-cyan-500/20">
        <span className="terminal-text text-[10px] text-cyan-500/50">REAL-TIME ANALYTICS</span>
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      <canvas
        ref={canvasRef}
        className="flex-1 w-full"
        style={{ minHeight: '120px' }}
      />
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="terminal-text text-[10px] text-cyan-500/50">DATA POINTS</div>
          <div className="terminal-text text-sm text-cyan-400">2.4M</div>
        </div>
        <div className="text-center">
          <div className="terminal-text text-[10px] text-cyan-500/50">INSIGHTS</div>
          <div className="terminal-text text-sm text-green-400">847</div>
        </div>
        <div className="text-center">
          <div className="terminal-text text-[10px] text-cyan-500/50">LATENCY</div>
          <div className="terminal-text text-sm text-purple-400">12ms</div>
        </div>
      </div>
    </div>
  );
};

// Roster IQ Simulation
const RosterSimulation = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 20, y: 30, active: true },
    { id: 2, x: 70, y: 20, active: false },
    { id: 3, x: 50, y: 60, active: true },
    { id: 4, x: 80, y: 70, active: false },
    { id: 5, x: 30, y: 80, active: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          active: Math.random() > 0.3,
        }))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col p-3 bg-black/50 rounded border border-cyan-500/20">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-cyan-500/20">
        <span className="terminal-text text-[10px] text-cyan-500/50">PIPELINE VISUALIZATION</span>
        <span className="terminal-text text-[10px] text-green-400">ACTIVE</span>
      </div>
      <div className="flex-1 relative" style={{ minHeight: '120px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((target, j) => (
              <line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={node.active && target.active ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 240, 255, 0.05)'}
                strokeWidth="1"
              />
            ))
          )}
          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="8"
                fill={node.active ? '#00f0ff' : '#1a2332'}
                stroke={node.active ? '#00f0ff' : 'rgba(0, 240, 255, 0.2)'}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              {node.active && (
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="12"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1"
                  opacity="0.5"
                  className="animate-ping"
                />
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="terminal-text text-[10px] text-cyan-500/50">
          NODES: {nodes.filter((n) => n.active).length}/{nodes.length}
        </span>
        <div className="flex gap-1">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                node.active ? 'bg-cyan-400' : 'bg-cyan-900'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Web3 Agent Simulation
const Web3Simulation = () => {
  const [transactions, setTransactions] = useState<
    { id: number; from: string; to: string; amount: string; status: 'pending' | 'confirmed' }[]
  >([]);

  useEffect(() => {
    const generateTx = () => {
      const newTx = {
        id: Date.now(),
        from: `0x${Math.random().toString(16).substr(2, 6)}...`,
        to: `0x${Math.random().toString(16).substr(2, 6)}...`,
        amount: `${(Math.random() * 10).toFixed(3)} ETH`,
        status: 'pending' as const,
      };
      setTransactions((prev) => [newTx, ...prev.slice(0, 4)]);

      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((tx) => (tx.id === newTx.id ? { ...tx, status: 'confirmed' } : tx))
        );
      }, 1500);
    };

    generateTx();
    const interval = setInterval(generateTx, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col p-3 bg-black/50 rounded border border-cyan-500/20">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-cyan-500/20">
        <span className="terminal-text text-[10px] text-cyan-500/50">AGENT NETWORK</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          <span className="terminal-text text-[10px] text-purple-400">LIVE</span>
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-2 bg-cyan-500/5 rounded terminal-text text-[10px]"
          >
            <div className="flex items-center gap-2">
              <span className="text-cyan-500/50">{tx.from}</span>
              <span className="text-cyan-500/30">→</span>
              <span className="text-cyan-500/50">{tx.to}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">{tx.amount}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  tx.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="terminal-text text-[10px] text-cyan-500/50">
          AGENTS: 12 ACTIVE
        </span>
        <span className="terminal-text text-[10px] text-green-400">
          TPS: 45.2
        </span>
      </div>
    </div>
  );
};

const missions: Mission[] = [
  {
    id: 'chatbot',
    name: 'Intelligent Chatbot',
    codename: 'PROJECT: CONVERSAI',
    status: 'ACTIVE',
    description: 'AI-powered conversational agent with natural language understanding, sentiment analysis, and context-aware responses.',
    tech: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
    metrics: [
      { label: 'RESPONSE TIME', value: '< 300ms' },
      { label: 'ACCURACY', value: '94.7%' },
      { label: 'USERS', value: '50K+' },
    ],
    simulation: <ChatbotSimulation />,
  },
  {
    id: 'analyst',
    name: 'Analyst BOT',
    codename: 'PROJECT: DATAVISION',
    status: 'DEPLOYED',
    description: 'Real-time data analytics platform with predictive modeling, automated reporting, and interactive dashboards.',
    tech: ['Node.js', 'React', 'D3.js', 'PostgreSQL'],
    metrics: [
      { label: 'DATA POINTS', value: '2.4M' },
      { label: 'INSIGHTS', value: '847' },
      { label: 'UPTIME', value: '99.9%' },
    ],
    simulation: <AnalystSimulation />,
  },
  {
    id: 'roster',
    name: 'Roster IQ',
    codename: 'PROJECT: SMARTSCHEDULE',
    status: 'ACTIVE',
    description: 'Intelligent workforce management system with automated scheduling, shift optimization, and resource allocation.',
    tech: ['Flutter', 'Firebase', 'ML Kit', 'Cloud Functions'],
    metrics: [
      { label: 'EFFICIENCY', value: '+35%' },
      { label: 'SCHEDULES', value: '10K+' },
      { label: 'SATISFACTION', value: '4.8/5' },
    ],
    simulation: <RosterSimulation />,
  },
  {
    id: 'web3',
    name: 'Web3 Agentic AI',
    codename: 'PROJECT: CHAINMIND',
    status: 'ACTIVE',
    description: 'Autonomous blockchain agents for DeFi operations, smart contract interactions, and crypto portfolio management.',
    tech: ['Solidity', 'Web3.js', 'Python', 'IPFS'],
    metrics: [
      { label: 'TRANSACTIONS', value: '100K+' },
      { label: 'VOLUME', value: '$2.5M' },
      { label: 'AGENTS', value: '12' },
    ],
    simulation: <Web3Simulation />,
  },
];

const ActiveMissions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

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

    // Mission cards animation
    const cards = grid.querySelectorAll('.mission-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
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

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    gsap.fromTo(
      '.mission-modal',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
    );
  };

  const closeModal = () => {
    gsap.to('.mission-modal', {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: () => setSelectedMission(null),
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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="terminal-text text-xs text-cyan-500/70 tracking-widest">
              OPERATIONAL STATUS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              ACTIVE MISSIONS
            </span>
          </h2>
          <p className="text-cyan-500/60 max-w-2xl mx-auto">
            Live monitoring of deployed systems. Each mission represents a fully operational
            platform with real-time telemetry.
          </p>
        </div>
        
        {/* Missions Grid */}
        <div ref={gridRef} className="grid lg:grid-cols-2 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="mission-card module-card rounded-lg overflow-hidden hud-corner group"
              data-cursor-hover
            >
              {/* Card Header */}
              <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between">
                <div>
                  <div className="terminal-text text-[10px] text-cyan-500/50 tracking-widest mb-1">
                    {mission.codename}
                  </div>
                  <h3 className="text-lg font-bold text-cyan-400">{mission.name}</h3>
                </div>
                <span
                  className={`px-2 py-1 text-[10px] terminal-text rounded ${
                    mission.status === 'ACTIVE'
                      ? 'bg-green-500/20 text-green-400'
                      : mission.status === 'DEPLOYED'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {mission.status}
                </span>
              </div>
              
              {/* Simulation */}
              <div className="h-48 p-4">
                {mission.simulation}
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-cyan-500/20">
                <p className="text-cyan-500/60 text-sm mb-3 line-clamp-2">
                  {mission.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {mission.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-[10px] bg-cyan-500/10 text-cyan-400/70 rounded terminal-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleMissionClick(mission)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 terminal-text flex items-center gap-1 transition-colors"
                  >
                    DETAILS →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mission Detail Modal */}
        {selectedMission && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <div
              className="mission-modal relative bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
              <div className="mb-6">
                <div className="terminal-text text-xs text-cyan-500/50 tracking-widest mb-2">
                  {selectedMission.codename}
                </div>
                <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                  {selectedMission.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 text-xs terminal-text rounded ${
                    selectedMission.status === 'ACTIVE'
                      ? 'bg-green-500/20 text-green-400'
                      : selectedMission.status === 'DEPLOYED'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {selectedMission.status}
                </span>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {selectedMission.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded text-center"
                  >
                    <div className="terminal-text text-[10px] text-cyan-500/50 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xl font-bold text-cyan-400">{metric.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Description */}
              <p className="text-cyan-500/70 mb-6 leading-relaxed">
                {selectedMission.description}
              </p>
              
              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="terminal-text text-xs text-cyan-500/50 tracking-widest mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMission.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded terminal-text text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Live preview */}
              <div>
                <h4 className="terminal-text text-xs text-cyan-500/50 tracking-widest mb-3">
                  LIVE SYSTEM PREVIEW
                </h4>
                <div className="h-64 border border-cyan-500/20 rounded overflow-hidden">
                  {selectedMission.simulation}
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

export default ActiveMissions;
