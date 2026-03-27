"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowDown, Terminal, Monitor, Cpu, ChevronRight } from "lucide-react";

// Binary rain column component
function BinaryColumn({ index, totalColumns }: { index: number; totalColumns: number }) {
  const [chars, setChars] = useState<string[]>([]);
  const speed = useRef(Math.random() * 2 + 1);
  const delay = useRef(Math.random() * 5);
  
  useEffect(() => {
    const length = Math.floor(Math.random() * 15) + 8;
    const newChars = Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0');
    setChars(newChars);
  }, []);

  return (
    <div 
      className="absolute top-0 font-mono text-xs leading-tight select-none pointer-events-none"
      style={{
        left: `${(index / totalColumns) * 100}%`,
        animation: `binary-fall ${speed.current}s linear infinite`,
        animationDelay: `${delay.current}s`,
        color: index % 3 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
        opacity: 0.6,
        textShadow: index % 3 === 0 
          ? '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)' 
          : '0 0 10px hsl(var(--secondary)), 0 0 20px hsl(var(--secondary) / 0.5)',
      }}
    >
      {chars.map((char, i) => (
        <div key={i} style={{ opacity: 1 - (i / chars.length) * 0.5 }}>{char}</div>
      ))}
    </div>
  );
}

// Holographic monitor component
function HolographicMonitor() {
  const codeLines = [
    'const portfolio = {',
    '  name: "Vanshil Soni",',
    '  role: "Creative Developer",',
    '  skills: ["3D", "AI", "Full-Stack"],',
    '  status: "OPERATIONAL",',
    '};',
    '',
    'function init() {',
    '  loadProjects();',
    '  connectNeural();',
    '  renderEnvironment();',
    '  return portfolio;',
    '}',
    '',
    '// System check passed',
    '> Initializing modules...',
    '> Loading assets: 100%',
    '> Neural link: ACTIVE',
    '> Status: READY',
    '',
    'export default portfolio;',
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Monitor frame */}
      <div className="relative bg-[hsl(var(--card)/0.3)] backdrop-blur-md border-2 border-[hsl(var(--secondary)/0.4)] rounded-xl overflow-hidden animate-hologram-flicker">
        {/* Monitor top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--muted)/0.5)] border-b border-[hsl(var(--secondary)/0.3)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--secondary))]" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--secondary))]">
            <Monitor className="w-3 h-3" />
            <span>system://portfolio.tsx</span>
          </div>
          <Cpu className="w-4 h-4 text-[hsl(var(--primary))] animate-pulse" />
        </div>

        {/* Code display area */}
        <div className="relative h-[320px] overflow-hidden">
          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute left-0 right-0 h-[2px] bg-[hsl(var(--secondary)/0.3)] animate-scan-line" />
          </div>
          
          {/* Hologram overlay lines */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--secondary) / 0.03) 2px, hsl(var(--secondary) / 0.03) 4px)',
          }} />

          {/* Scrolling code */}
          <div className="p-4 font-mono text-sm animate-code-scroll">
            <div className="space-y-1">
              {[...codeLines, ...codeLines].map((line, i) => (
                <div 
                  key={i} 
                  className="flex"
                  style={{ 
                    color: line.startsWith('//') || line.startsWith('>') 
                      ? 'hsl(var(--muted-foreground))' 
                      : line.includes(':') 
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--secondary))',
                  }}
                >
                  <span className="w-8 text-[hsl(var(--muted-foreground)/0.5)] select-none">{String(i % codeLines.length + 1).padStart(2, '0')}</span>
                  <span className={line.includes('"') ? 'text-[hsl(var(--primary))]' : ''}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monitor bottom status */}
        <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--muted)/0.5)] border-t border-[hsl(var(--secondary)/0.3)]">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--secondary))] animate-pulse" />
              <span className="text-[hsl(var(--secondary))]">CONNECTED</span>
            </span>
            <span className="text-[hsl(var(--muted-foreground))]">CPU: 23%</span>
            <span className="text-[hsl(var(--muted-foreground))]">MEM: 512MB</span>
          </div>
          <span className="text-xs font-mono text-[hsl(var(--primary))]">v2.0.26</span>
        </div>
      </div>

      {/* Monitor reflection/glow */}
      <div className="absolute -inset-4 bg-gradient-to-b from-[hsl(var(--secondary)/0.1)] to-transparent rounded-xl blur-xl pointer-events-none" />
      
      {/* Holographic projection lines */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--secondary)/0.2)] to-transparent" 
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
      </div>
    </div>
  );
}

function StatusIndicator({ label, status, delay, color = "secondary" }: { label: string; status: string; delay: number; color?: "primary" | "secondary" }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`flex items-center gap-3 font-mono text-sm transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
    >
      <span className={`w-2 h-2 rounded-full animate-pulse ${color === "primary" ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--secondary))]"}`} />
      <span className="text-[hsl(var(--muted-foreground))]">{label}:</span>
      <span className={color === "primary" ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--secondary))]"}>{status}</span>
    </div>
  );
}

export default function Hero3D() {
  const [loaded, setLoaded] = useState(false);
  const [showBinary, setShowBinary] = useState(true);
  const binaryColumns = 60;
  
  useEffect(() => {
    setLoaded(true);
    // Hide binary rain after initial animation
    const timer = setTimeout(() => setShowBinary(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById('work');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid-bg" />
      
      {/* Binary rain overlay */}
      {showBinary && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {Array.from({ length: binaryColumns }).map((_, i) => (
            <BinaryColumn key={i} index={i} totalColumns={binaryColumns} />
          ))}
          {/* Fade out gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]" />
        </div>
      )}

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--secondary)/0.1)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(var(--primary)/0.08)] rounded-full blur-[80px] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Terminal header */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--secondary)/0.3)] backdrop-blur-sm font-mono text-sm transition-all duration-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Terminal className="w-4 h-4 text-[hsl(var(--secondary))]" />
              <span className="text-[hsl(var(--muted-foreground))]">~/portfolio</span>
              <span className="text-[hsl(var(--secondary))]">$</span>
              <span className="text-[hsl(var(--foreground))]">./init.sh</span>
              <span className="w-2 h-4 bg-[hsl(var(--secondary))] animate-terminal-blink" />
            </div>

            <div className="space-y-4">
              <h1 
                className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight transition-all duration-800 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <span className="block text-[hsl(var(--foreground))]">Vanshil</span>
                <span className="block text-gradient">Soni</span>
              </h1>

              <div 
                className={`flex items-center gap-3 font-mono text-lg transition-all duration-500 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="text-[hsl(var(--secondary))] glow-text-green">{`>`}</span>
                <span className="text-[hsl(var(--muted-foreground))]">Creative Developer</span>
                <span className="text-[hsl(var(--primary))]">&</span>
                <span className="text-[hsl(var(--muted-foreground))]">Digital Architect</span>
              </div>
            </div>

            <p 
              className={`text-lg text-[hsl(var(--muted-foreground))] max-w-xl leading-relaxed transition-all duration-800 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Engineering immersive digital experiences through code. Specializing in 
              interactive environments, full-stack systems, and AI-powered applications 
              that push boundaries.
            </p>

            {/* System Status */}
            <div 
              className={`p-4 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--secondary)/0.2)] backdrop-blur-sm space-y-2 transition-all duration-500 delay-600 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <StatusIndicator label="status" status="Available for hire" delay={0.8} color="secondary" />
              <StatusIndicator label="location" status="Canada" delay={1} color="secondary" />
              <StatusIndicator label="focus" status="Web / AI / Full-Stack" delay={1.2} color="primary" />
            </div>

            <div 
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-800 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.3)] hover:-translate-y-0.5"
              >
                View Projects
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--secondary)/0.5)] text-[hsl(var(--secondary))] rounded-lg font-medium font-mono transition-all hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.1)] hover:-translate-y-0.5"
              >
                {">"} contact.init()
              </a>
            </div>
          </div>

          {/* Right - Holographic Monitor */}
          <div 
            className={`hidden lg:block transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}
          >
            <HolographicMonitor />
          </div>
        </div>

        {/* Scroll Indicator - drops to projects */}
        <button
          onClick={scrollToProjects}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 cursor-pointer group ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-2 text-[hsl(var(--secondary))] animate-float">
            <span className="text-xs font-mono group-hover:text-[hsl(var(--primary))] transition-colors">scroll.toProjects()</span>
            <ArrowDown className="w-4 h-4 group-hover:text-[hsl(var(--primary))] transition-colors" />
          </div>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[hsl(var(--secondary)/0.3)]" />
      <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-[hsl(var(--secondary)/0.3)]" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-[hsl(var(--primary)/0.3)]" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-[hsl(var(--primary)/0.3)]" />
    </section>
  );
}
