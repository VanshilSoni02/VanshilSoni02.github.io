"use client";

import { useEffect, useState, useRef } from "react";
import { MapPin, Mail, Download, Terminal, User, Calendar, Briefcase } from "lucide-react";

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setVisibleLines((prev) => {
              if (prev >= 8) {
                clearInterval(interval);
                return prev;
              }
              return prev + 1;
            });
          }, 200);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lines = [
    { type: "command", content: "$ whoami" },
    { type: "output", content: "vanshil_soni" },
    { type: "command", content: "$ cat about.txt" },
    { type: "text", content: "Creative developer specializing in" },
    { type: "text", content: "immersive digital experiences." },
    { type: "highlight", content: "Expertise: 3D Web | AI | Full-Stack" },
    { type: "highlight", content: "Location: Canada" },
    { type: "highlight", content: "Status: Open to opportunities" },
  ];

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--border))] backdrop-blur-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(var(--muted)/0.5)] border-b border-[hsl(var(--border))]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary)/0.8)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--secondary))]" />
        </div>
        <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] ml-2">about.terminal</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[200px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${
              line.type === "command" ? "text-[hsl(var(--foreground))]" :
              line.type === "output" ? "text-[hsl(var(--muted-foreground))] pl-4" :
              line.type === "highlight" ? "text-[hsl(var(--secondary))] glow-text-green" :
              "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {line.content}
          </div>
        ))}
        {visibleLines > 0 && (
          <span className="inline-block w-2 h-4 bg-[hsl(var(--primary))] animate-terminal-blink mt-2" />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { 
  icon: typeof User; 
  label: string; 
  value: string; 
}) {
  return (
    <div className="p-4 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.5)]">
      <Icon className="w-5 h-5 text-[hsl(var(--primary))] mb-2" />
      <p className="font-medium text-[hsl(var(--foreground))]">{value}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
    </div>
  );
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-40 top-1/4 w-80 h-80 rounded-full bg-[hsl(var(--primary)/0.05)] blur-3xl" />
      <div className="absolute -left-40 bottom-1/4 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.05)] blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Terminal Visual */}
          <div 
            className={`relative transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Decorative code lines */}
              <div className="absolute -top-8 -left-8 text-xs font-mono text-[hsl(var(--muted-foreground)/0.3)] hidden lg:block">
                {"<Developer>"}
              </div>
              <div className="absolute -bottom-8 -right-8 text-xs font-mono text-[hsl(var(--muted-foreground)/0.3)] hidden lg:block">
                {"</Developer>"}
              </div>

              <TerminalWindow />

              {/* Floating badges */}
              <div className="absolute -top-4 right-8 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full text-sm font-medium shadow-lg shadow-[hsl(var(--primary)/0.25)] animate-float">
                Open to Work
              </div>
              
              <div className="absolute bottom-8 -left-4 px-4 py-2 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-full text-sm font-mono shadow-lg animate-float-delay-1">
                5+ Years Exp
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div 
            className={`space-y-8 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span className="text-[hsl(var(--primary))] font-mono text-sm">./about</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Crafting <span className="text-gradient">digital experiences</span> that matter
              </h2>
            </div>

            <div className="space-y-6 text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
              <p>
                I&apos;m a passionate developer specializing in creating immersive digital experiences. 
                With expertise in modern web technologies and 3D graphics, I bridge the gap between 
                creative vision and technical execution.
              </p>
              <p>
                My work focuses on building performant, accessible, and visually stunning applications 
                that push the boundaries of what&apos;s possible on the web.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={MapPin} label="Based in" value="Canada" />
              <StatCard icon={Mail} label="Contact" value="hello@vanshil.dev" />
              <StatCard icon={Calendar} label="Experience" value="5+ Years" />
              <StatCard icon={Briefcase} label="Projects" value="20+ Completed" />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.25)] hover:-translate-y-0.5"
              >
                Let&apos;s Connect
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg font-medium font-mono transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                resume.pdf
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
