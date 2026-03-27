"use client";

import { useEffect, useState, useRef } from "react";

interface DataNode {
  id: number;
  label: string;
  value: string;
  x: number;
  y: number;
  delay: number;
  color: "primary" | "secondary";
}

const dataNodes: DataNode[] = [
  { id: 1, label: "PROJECTS", value: "20+", x: 15, y: 20, delay: 0, color: "primary" },
  { id: 2, label: "EXPERIENCE", value: "5 YRS", x: 75, y: 25, delay: 0.5, color: "secondary" },
  { id: 3, label: "TECH STACK", value: "15+", x: 20, y: 70, delay: 1, color: "secondary" },
  { id: 4, label: "COMMITS", value: "2K+", x: 80, y: 65, delay: 1.5, color: "primary" },
];

function FloatingCube({ className, size = 60, delay = 0, color = "secondary" }: { className?: string; size?: number; delay?: number; color?: "primary" | "secondary" }) {
  const borderColor = color === "primary" ? "hsl(var(--primary)/0.3)" : "hsl(var(--secondary)/0.3)";
  const bgColor = color === "primary" ? "hsl(var(--primary)/0.05)" : "hsl(var(--secondary)/0.05)";
  
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
        {[
          { transform: `translateZ(${size/2}px)` },
          { transform: `rotateY(180deg) translateZ(${size/2}px)` },
          { transform: `rotateY(-90deg) translateZ(${size/2}px)` },
          { transform: `rotateY(90deg) translateZ(${size/2}px)` },
          { transform: `rotateX(90deg) translateZ(${size/2}px)` },
          { transform: `rotateX(-90deg) translateZ(${size/2}px)` },
        ].map((style, i) => (
          <div 
            key={i}
            className="absolute inset-0"
            style={{ 
              ...style, 
              border: `1px solid ${borderColor}`,
              background: bgColor,
            }} 
          />
        ))}
      </div>
    </div>
  );
}

function DataNodeCard({ node }: { node: DataNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = node.color === "primary" ? "primary" : "secondary";
  
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
          className={`absolute -inset-4 bg-[hsl(var(--${colorClass})/0.2)] blur-xl rounded-lg transition-opacity duration-500`}
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        
        <div className={`relative bg-[hsl(var(--card)/0.8)] backdrop-blur-sm border rounded-lg p-4 min-w-[120px]
                        transition-all duration-500 ${isHovered ? `border-[hsl(var(--${colorClass})/0.6)] bg-[hsl(var(--card))]` : `border-[hsl(var(--${colorClass})/0.3)]`}`}>
          <div className={`absolute -top-1 -right-1 w-2 h-2 bg-[hsl(var(--${colorClass}))] rounded-full animate-pulse-glow`} />
          
          <p className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] tracking-wider">{node.label}</p>
          <p className={`text-2xl font-bold mt-1 ${node.color === "primary" ? "text-gradient" : "text-gradient-green"}`}>{node.value}</p>
          
          <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--${colorClass})/0.5)] to-transparent`} />
        </div>
        
        <div className={`absolute top-1/2 -left-8 w-8 h-[1px] bg-gradient-to-l from-[hsl(var(--${colorClass})/0.5)] to-transparent`} />
      </div>
    </div>
  );
}

function CentralOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="relative w-40 h-40">
        {/* Outer glow - orange */}
        <div className="absolute inset-0 rounded-full bg-[hsl(var(--primary)/0.1)] blur-3xl animate-pulse-glow" />
        
        {/* Secondary glow - green */}
        <div className="absolute inset-4 rounded-full bg-[hsl(var(--secondary)/0.1)] blur-2xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        {/* Main orb */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[hsl(var(--secondary)/0.3)] to-[hsl(var(--primary)/0.2)] 
                        border border-[hsl(var(--secondary)/0.4)] animate-pulse-glow backdrop-blur-sm">
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.3)] to-transparent" />
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-orbit">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary)/0.8)]" style={{ boxShadow: "0 0 10px hsl(var(--primary))" }} />
        </div>
        
        <div className="absolute inset-0 animate-orbit-reverse">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary)/0.8)]" style={{ boxShadow: "0 0 10px hsl(var(--secondary))" }} />
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
      {/* Radial gradient following mouse - green tinted */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsl(var(--secondary) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Data nodes */}
      {dataNodes.map((node) => (
        <DataNodeCard key={node.id} node={node} />
      ))}

      {/* Floating 3D cubes */}
      <FloatingCube className="top-[30%] left-[40%]" size={40} delay={0} color="secondary" />
      <FloatingCube className="top-[60%] right-[30%]" size={30} delay={2} color="primary" />
      <FloatingCube className="bottom-[20%] left-[60%]" size={50} delay={4} color="secondary" />

      {/* Central orb */}
      <CentralOrb />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div 
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--secondary)/0.5)] to-transparent"
          style={{ animation: "data-stream 4s linear infinite" }}
        />
      </div>

      {/* Corner decorations - mixed colors */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[hsl(var(--secondary)/0.3)]" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[hsl(var(--secondary)/0.3)]" />
    </div>
  );
}
