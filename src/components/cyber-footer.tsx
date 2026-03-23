"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, ArrowUp, Terminal, Code2, Coffee } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const navLinks = [
  { name: "Work", href: "#work", cmd: "projects" },
  { name: "About", href: "#about", cmd: "about" },
  { name: "Skills", href: "#skills", cmd: "skills" },
  { name: "Contact", href: "#contact", cmd: "contact" },
];

function AsciiArt() {
  const [isVisible, setIsVisible] = useState(false);
  const artRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (artRef.current) {
      observer.observe(artRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const art = `
  ╔═══════════════════════════════╗
  ║   VANSHIL SONI | DEV 2026    ║
  ║   ░░░░░░░░░░░░░░░░░░░░░░░░   ║
  ║   Building the future, one   ║
  ║   line of code at a time.    ║
  ╚═══════════════════════════════╝
  `;

  return (
    <pre
      ref={artRef}
      className={`text-[8px] md:text-xs font-mono text-[hsl(var(--primary)/0.3)] leading-tight hidden md:block transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {art}
    </pre>
  );
}

export default function CyberFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative py-16 px-6 border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.2)]">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand + ASCII */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center">
                <span className="text-xl font-bold text-gradient">VS</span>
              </div>
              <div>
                <div className="font-bold text-lg">Vanshil Soni</div>
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Creative Developer</div>
              </div>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed max-w-md">
              Engineering immersive digital experiences through code. 
              Specializing in 3D graphics, AI integration, and full-stack development.
            </p>
            <AsciiArt />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-[hsl(var(--muted-foreground))]">
              <Terminal className="w-4 h-4 text-[hsl(var(--primary))]" />
              <span>sitemap</span>
            </div>
            <div className="space-y-3">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-300 group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="text-[hsl(var(--primary)/0.5)] group-hover:text-[hsl(var(--primary))] transition-colors">{">"}</span>
                  <span className="font-mono">{link.cmd}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-[hsl(var(--muted-foreground))]">
              <Code2 className="w-4 h-4 text-[hsl(var(--primary))]" />
              <span>connect</span>
            </div>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-300 group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                  style={{ transitionDelay: `${(i + 4) * 50}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--muted)/0.5)] flex items-center justify-center group-hover:bg-[hsl(var(--primary)/0.1)] transition-colors">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[hsl(var(--border)/0.5)] gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">
              {">"} designed_and_built_by vanshil_soni
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] font-mono">
              <Coffee className="w-3 h-3" />
              <span>Powered by caffeine</span>
            </div>
            <div className="w-px h-4 bg-[hsl(var(--border))]" />
            <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">
              v{new Date().getFullYear()}.1.0
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border)/0.5)] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all hover:-translate-y-0.5 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Easter egg hint */}
        <div className={`mt-8 text-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] font-mono text-[hsl(var(--muted-foreground)/0.3)]">
            // Try leaving your cursor still for 30 seconds...
          </p>
        </div>
      </div>
    </footer>
  );
}
