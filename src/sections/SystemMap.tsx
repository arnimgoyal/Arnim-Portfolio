import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'core' | 'module' | 'external';
  status: 'online' | 'offline' | 'warning';
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

const nodes: Node[] = [
  { id: 'core', label: 'CORE SYSTEM', x: 50, y: 50, type: 'core', status: 'online' },
  { id: 'ai', label: 'AI ENGINE', x: 25, y: 25, type: 'module', status: 'online' },
  { id: 'api', label: 'API GATEWAY', x: 75, y: 25, type: 'module', status: 'online' },
  { id: 'db', label: 'DATABASE', x: 25, y: 75, type: 'module', status: 'online' },
  { id: 'ui', label: 'UI LAYER', x: 75, y: 75, type: 'module', status: 'online' },
  { id: 'ml', label: 'ML PIPELINE', x: 10, y: 50, type: 'module', status: 'warning' },
  { id: 'cache', label: 'CACHE', x: 90, y: 50, type: 'module', status: 'online' },
  { id: 'auth', label: 'AUTH', x: 50, y: 10, type: 'module', status: 'online' },
  { id: 'queue', label: 'QUEUE', x: 50, y: 90, type: 'module', status: 'online' },
  { id: 'cloud', label: 'CLOUD', x: 5, y: 5, type: 'external', status: 'online' },
  { id: 'cdn', label: 'CDN', x: 95, y: 5, type: 'external', status: 'online' },
  { id: 'monitor', label: 'MONITOR', x: 5, y: 95, type: 'external', status: 'online' },
  { id: 'backup', label: 'BACKUP', x: 95, y: 95, type: 'external', status: 'offline' },
];

const connections: Connection[] = [
  { from: 'core', to: 'ai', strength: 0.9 },
  { from: 'core', to: 'api', strength: 0.95 },
  { from: 'core', to: 'db', strength: 0.9 },
  { from: 'core', to: 'ui', strength: 0.85 },
  { from: 'core', to: 'ml', strength: 0.8 },
  { from: 'core', to: 'cache', strength: 0.75 },
  { from: 'core', to: 'auth', strength: 0.9 },
  { from: 'core', to: 'queue', strength: 0.7 },
  { from: 'api', to: 'cloud', strength: 0.6 },
  { from: 'ui', to: 'cdn', strength: 0.7 },
  { from: 'core', to: 'monitor', strength: 0.5 },
  { from: 'db', to: 'backup', strength: 0.4 },
  { from: 'ai', to: 'ml', strength: 0.85 },
  { from: 'api', to: 'cache', strength: 0.8 },
  { from: 'auth', to: 'db', strength: 0.75 },
];

const SystemMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const map = mapRef.current;
    if (!section || !title || !map) return;

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

    // Map animation
    gsap.fromTo(
      map,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
          onEnter: (self) => triggers.push(self),
        },
      }
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // Canvas animation for connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let offset = 0;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return;

        const x1 = (fromNode.x / 100) * w;
        const y1 = (fromNode.y / 100) * h;
        const x2 = (toNode.x / 100) * w;
        const y2 = (toNode.y / 100) * h;

        // Connection line
        ctx.strokeStyle = `rgba(0, 240, 255, ${conn.strength * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Data packet animation
        const packetPos = (offset * conn.strength) % 1;
        const px = x1 + (x2 - x1) * packetPos;
        const py = y1 + (y2 - y1) * packetPos;

        ctx.fillStyle = `rgba(0, 240, 255, ${conn.strength})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      offset += 0.005;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getNodeColor = (node: Node) => {
    if (node.status === 'offline') return '#ff0040';
    if (node.status === 'warning') return '#ff6b00';
    if (node.type === 'core') return '#00f0ff';
    if (node.type === 'external') return '#b829ff';
    return '#00ff88';
  };

  const getNodeSize = (node: Node) => {
    if (node.type === 'core') return 24;
    if (node.type === 'external') return 16;
    return 20;
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
        <div ref={titleRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="terminal-text text-xs text-cyan-500/70 tracking-widest">
              NETWORK TOPOLOGY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              SYSTEM MAP
            </span>
          </h2>
          <p className="text-cyan-500/60 max-w-2xl mx-auto">
            Real-time visualization of interconnected system components.
            Live data flow between modules and external services.
          </p>
        </div>
        
        {/* Network Map */}
        <div
          ref={mapRef}
          className="relative aspect-[16/9] max-w-5xl mx-auto"
        >
          {/* Map container */}
          <div className="absolute inset-0 bg-cyan-900/10 border border-cyan-500/20 rounded-lg overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 hud-grid opacity-30" />
            
            {/* Canvas for connections */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                data-cursor-hover
              >
                {/* Node glow */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    hoveredNode === node.id ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${getNodeColor(node)}40 0%, transparent 70%)`,
                    width: getNodeSize(node) * 3,
                    height: getNodeSize(node) * 3,
                    left: -getNodeSize(node),
                    top: -getNodeSize(node),
                  }}
                />
                
                {/* Node circle */}
                <div
                  className="relative rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    width: getNodeSize(node),
                    height: getNodeSize(node),
                    borderColor: getNodeColor(node),
                    backgroundColor: `${getNodeColor(node)}20`,
                    boxShadow: hoveredNode === node.id ? `0 0 20px ${getNodeColor(node)}` : 'none',
                  }}
                >
                  {node.type === 'core' && (
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getNodeColor(node) }}
                    />
                  )}
                </div>
                
                {/* Label */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap transition-all duration-300 ${
                    hoveredNode === node.id ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <span
                    className="terminal-text text-[10px] px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${getNodeColor(node)}20`,
                      color: getNodeColor(node),
                    }}
                  >
                    {node.label}
                  </span>
                </div>
                
                {/* Status indicator */}
                <div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: getNodeColor(node),
                    boxShadow: `0 0 5px ${getNodeColor(node)}`,
                  }}
                />
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 p-3 bg-black/50 border border-cyan-500/20 rounded">
              <div className="terminal-text text-[10px] text-cyan-500/50 mb-2">LEGEND</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-cyan-400 bg-cyan-400/20" />
                  <span className="terminal-text text-[10px] text-cyan-400/70">CORE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-green-400 bg-green-400/20" />
                  <span className="terminal-text text-[10px] text-green-400/70">MODULE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-purple-400 bg-purple-400/20" />
                  <span className="terminal-text text-[10px] text-purple-400/70">EXTERNAL</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute bottom-4 right-4 p-3 bg-black/50 border border-cyan-500/20 rounded">
              <div className="terminal-text text-[10px] text-cyan-500/50 mb-2">SYSTEM STATS</div>
              <div className="space-y-1 terminal-text text-[10px]">
                <div className="flex justify-between gap-4">
                  <span className="text-cyan-500/70">NODES:</span>
                  <span className="text-cyan-400">{nodes.length}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-cyan-500/70">CONNECTIONS:</span>
                  <span className="text-cyan-400">{connections.length}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-cyan-500/70">ONLINE:</span>
                  <span className="text-green-400">
                    {nodes.filter((n) => n.status === 'online').length}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-cyan-500/70">LATENCY:</span>
                  <span className="text-purple-400">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Node Detail Panel */}
        {selectedNode && (
          <div className="mt-8 max-w-2xl mx-auto p-6 module-card rounded-lg hud-corner">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: getNodeColor(selectedNode) }}
                >
                  {selectedNode.label}
                </h3>
                <span className="terminal-text text-xs text-cyan-500/50">
                  TYPE: {selectedNode.type.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
                data-cursor-hover
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="terminal-text text-[10px] text-cyan-500/50">STATUS</span>
                <div
                  className="flex items-center gap-2 mt-1"
                  style={{ color: getNodeColor(selectedNode) }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: getNodeColor(selectedNode) }}
                  />
                  <span className="terminal-text text-sm uppercase">{selectedNode.status}</span>
                </div>
              </div>
              <div>
                <span className="terminal-text text-[10px] text-cyan-500/50">UPTIME</span>
                <div className="text-cyan-400 terminal-text text-sm mt-1">
                  99.99%
                </div>
              </div>
              <div>
                <span className="terminal-text text-[10px] text-cyan-500/50">CONNECTIONS</span>
                <div className="text-cyan-400 terminal-text text-sm mt-1">
                  {connections.filter((c) => c.from === selectedNode.id || c.to === selectedNode.id).length}
                </div>
              </div>
              <div>
                <span className="terminal-text text-[10px] text-cyan-500/50">LOAD</span>
                <div className="text-cyan-400 terminal-text text-sm mt-1">
                  {(Math.random() * 30 + 20).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMap;
