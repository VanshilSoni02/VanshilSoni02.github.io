"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Terminal, Code2, Cpu, Database } from "lucide-react";
import dynamic from "next/dynamic";

const CyberScene = dynamic(() => import("./cyber-scene"), { ssr: false });

function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
}

function StatusIndicator({ label, status, delay }: { label: string; status: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`flex items-center gap-3 font-mono text-sm transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
    >
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--secondary))] animate-pulse" />
      <span className="text-[hsl(var(--muted-foreground))]">{label}:</span>
      <span className="text-[hsl(var(--foreground))]">{status}</span>
    </div>
  );
}

export default function Hero3D() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CyberScene />
      
      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.3)] to-transparent"
          style={{ animation: "data-stream 8s linear infinite" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Terminal header */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--border))] backdrop-blur-sm font-mono text-sm transition-all duration-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Terminal className="w-4 h-4 text-[hsl(var(--primary))]" />
              <span className="text-[hsl(var(--muted-foreground))]">~/portfolio</span>
              <span className="text-[hsl(var(--primary))]">$</span>
              <span className="text-[hsl(var(--foreground))]">init</span>
              <span className="w-2 h-4 bg-[hsl(var(--primary))] animate-terminal-blink" />
            </div>

            <div className="space-y-4">
              <h1 
                className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight transition-all duration-800 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <span className="block text-[hsl(var(--foreground))]">
                  <TerminalText text="Vanshil" delay={0.5} />
                </span>
                <span className="block text-gradient">
                  <TerminalText text="Soni" delay={0.9} />
                </span>
              </h1>

              <div 
                className={`flex items-center gap-3 font-mono text-lg text-[hsl(var(--muted-foreground))] transition-all duration-500 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              >
                <Code2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span>Creative Developer & Digital Architect</span>
              </div>
            </div>

            <p 
              className={`text-lg text-[hsl(var(--muted-foreground))] max-w-xl leading-relaxed transition-all duration-800 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Engineering immersive digital experiences through code. Specializing in 
              interactive 3D environments, full-stack systems, and AI-powered applications 
              that push the boundaries of web technology.
            </p>

            {/* System Status */}
            <div 
              className={`p-4 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border))] backdrop-blur-sm space-y-2 transition-all duration-500 delay-600 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <StatusIndicator label="status" status="Available for opportunities" delay={0.8} />
              <StatusIndicator label="location" status="Canada" delay={1} />
              <StatusIndicator label="focus" status="3D Web / AI / Full-Stack" delay={1.2} />
            </div>

            <div 
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-800 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.25)] hover:-translate-y-0.5"
              >
                <Database className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg font-medium font-mono transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:-translate-y-0.5"
              >
                {">"} contact.init()
              </a>
            </div>
          </div>

          {/* Right - Tech Stack Panel */}
          <div 
            className={`hidden lg:block lg:col-span-2 transition-all duration-800 delay-400 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div className="p-6 rounded-2xl bg-[hsl(var(--card)/0.3)] backdrop-blur-md border border-[hsl(var(--border)/0.5)] space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--border))]">
                <Cpu className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span className="font-mono text-sm">system.overview</span>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5+", label: "years.exp", color: "text-gradient" },
                  { value: "20+", label: "projects.deployed", color: "text-[hsl(var(--secondary))]" },
                  { value: "3D", label: "web.graphics", color: "text-[hsl(var(--accent))]" },
                  { value: "AI", label: "ml.integration", color: "text-[hsl(var(--primary))]" },
                ].map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[hsl(var(--background)/0.5)] border border-[hsl(var(--border)/0.5)]">
                    <div className={`text-3xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="space-y-3">
                <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono">active_stack:</div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Three.js", "TypeScript", "Node.js", "Python", "PostgreSQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-[hsl(var(--muted)/0.5)] rounded border border-[hsl(var(--border)/0.5)] text-[hsl(var(--muted-foreground))]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-2 text-[hsl(var(--muted-foreground))] animate-float">
            <span className="text-xs font-mono">scroll.explore()</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
