"use client";

import { useEffect, useState, useRef } from "react";

interface DataNode {
  id: number;
  label: string;
  value: string;
  x: number;
  y: number;
  delay: number;
}

const dataNodes: DataNode[] = [
  { id: 1, label: "PROJECTS", value: "20+", x: 15, y: 20, delay: 0 },
  { id: 2, label: "EXPERIENCE", value: "5 YRS", x: 75, y: 25, delay: 0.5 },
  { id: 3, label: "TECH STACK", value: "15+", x: 20, y: 70, delay: 1 },
  { id: 4, label: "COMMITS", value: "2K+", x: 80, y: 65, delay: 1.5 },
];

function FloatingCube({ className, size = 60, delay = 0 }: { className?: string; size?: number; delay?: number }) {
  return (
    <div 
      className={`absolute pointer-events-none ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        perspective: "500px"
      }}
    >
      <div 
        className="animate-rotate-3d"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          position: "relative"
        }}
      >
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `translateZ(${size/2}px)` }} />
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `rotateY(180deg) translateZ(${size/2}px)` }} />
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `rotateY(-90deg) translateZ(${size/2}px)` }} />
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `rotateY(90deg) translateZ(${size/2}px)` }} />
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `rotateX(90deg) translateZ(${size/2}px)` }} />
        <div className="absolute inset-0 border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]" 
          style={{ transform: `rotateX(-90deg) translateZ(${size/2}px)` }} />
      </div>
    </div>
  );
}

function DataNodeCard({ node }: { node: DataNode }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute animate-float group cursor-pointer"
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`,
        animationDelay: `${node.delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
        <div 
          className="absolute -inset-4 bg-[hsl(var(--primary)/0.2)] blur-xl rounded-lg transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        
        <div className={`relative bg-[hsl(var(--card)/0.8)] backdrop-blur-sm border rounded-lg p-4 min-w-[120px]
                        transition-all duration-500 ${isHovered ? 'border-[hsl(var(--primary)/0.6)] bg-[hsl(var(--card))]' : 'border-[hsl(var(--primary)/0.3)]'}`}>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[hsl(var(--secondary))] rounded-full animate-pulse-glow" />
          
          <p className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] tracking-wider">{node.label}</p>
          <p className="text-2xl font-bold text-gradient mt-1">{node.value}</p>
          
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.5)] to-transparent" />
        </div>
        
        <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-gradient-to-l from-[hsl(var(--primary)/0.5)] to-transparent" />
      </div>
    </div>
  );
}

function HolographicTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const lines = [
    "$ initializing system...",
    "$ loading portfolio data...",
    "$ connecting to neural network...",
    "$ rendering 3D environment...",
    "$ status: OPERATIONAL",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 left-10 max-w-xs z-10">
      <div className="bg-[hsl(var(--card)/0.6)] backdrop-blur-md border border-[hsl(var(--primary)/0.2)] rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--muted)/0.5)]">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
          <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] ml-2">system.terminal</span>
        </div>
        
        <div className="p-3 font-mono text-xs space-y-1">
          {lines.slice(0, lineIndex + 1).map((line, i) => (
            <div key={i} className={i === lineIndex ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}>
              {line}
              {i === lineIndex && <span className="animate-terminal-blink ml-1">_</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CentralOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="relative w-40 h-40">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-[hsl(var(--primary)/0.1)] blur-3xl animate-pulse-glow" />
        
        {/* Main orb */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.3)] to-[hsl(var(--secondary)/0.2)] 
                        border border-[hsl(var(--primary)/0.4)] animate-pulse-glow backdrop-blur-sm">
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.4)] to-transparent" />
        </div>
        
        {/* Orbiting ring 1 */}
        <div className="absolute inset-0 animate-orbit">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary)/0.8)]" />
        </div>
        
        {/* Orbiting ring 2 */}
        <div className="absolute inset-0 animate-orbit-reverse">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary)/0.8)]" />
        </div>
      </div>
    </div>
  );
}

export default function CyberScene() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cyber-grid-bg"
    >
      {/* Radial gradient following mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Data nodes */}
      {dataNodes.map((node) => (
        <DataNodeCard key={node.id} node={node} />
      ))}

      {/* Floating 3D cubes */}
      <FloatingCube className="top-[30%] left-[40%]" size={40} delay={0} />
      <FloatingCube className="top-[60%] right-[30%]" size={30} delay={2} />
      <FloatingCube className="bottom-[20%] left-[60%]" size={50} delay={4} />

      {/* Central orb */}
      <CentralOrb />

      {/* Holographic terminal */}
      <HolographicTerminal />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div 
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.5)] to-transparent"
          style={{ animation: "data-stream 4s linear infinite" }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[hsl(var(--primary)/0.3)]" />
    </div>
  );
}
