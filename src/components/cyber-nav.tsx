"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Twitter, Terminal } from "lucide-react";

const navLinks = [
  { name: "Work", href: "#work", cmd: "ls ./projects" },
  { name: "About", href: "#about", cmd: "cat about.txt" },
  { name: "Skills", href: "#skills", cmd: "skills --list" },
  { name: "Contact", href: "#contact", cmd: "./contact.sh" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function CyberNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["work", "about", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled 
          ? "bg-[hsl(var(--background)/0.9)] border-[hsl(var(--primary)/0.1)]" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className={`transition-all duration-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center group-hover:border-[hsl(var(--primary)/0.5)] transition-colors">
                  <span className="text-lg font-bold text-gradient">VS</span>
                </div>
                <div className="absolute inset-0 rounded-lg border border-[hsl(var(--primary)/0.3)] animate-pulse opacity-50" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-mono text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors">
                  vanshil_soni
                </div>
                <div className="text-xs font-mono text-[hsl(var(--primary)/0.6)]">
                  ~/portfolio
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center transition-all duration-500 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-sm font-mono transition-colors rounded-lg ${
                    activeSection === link.href.slice(1)
                      ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Command preview on hover */}
            <div className={`ml-4 flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))] transition-all duration-200 ${hoveredLink ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
              <Terminal className="w-3 h-3" />
              <span>{navLinks.find(l => l.name === hoveredLink)?.cmd}</span>
            </div>
          </div>

          {/* Social Links + Status - Desktop */}
          <div className={`hidden md:flex items-center gap-4 transition-all duration-500 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--secondary)/0.1)] border border-[hsl(var(--secondary)/0.2)]">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary))] animate-pulse" />
              <span className="text-xs font-mono text-[hsl(var(--secondary))]">Available</span>
            </div>
            
            <div className="w-px h-6 bg-[hsl(var(--border))]" />
            
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[hsl(var(--foreground))] p-2 rounded-lg border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.5)] transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[hsl(var(--background)/0.98)] backdrop-blur-xl border-b border-[hsl(var(--border))] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))] pb-4 border-b border-[hsl(var(--border)/0.5)]">
            <Terminal className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span>navigation.menu</span>
          </div>
          
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between group"
              >
                <span className="text-2xl font-light text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                  {link.name}
                </span>
                <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary)/0.6)] transition-colors">
                  {link.cmd}
                </span>
              </Link>
            </div>
          ))}
          
          <div className="pt-4 border-t border-[hsl(var(--border)/0.5)] space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary))] animate-pulse" />
              <span className="text-sm font-mono text-[hsl(var(--secondary))]">Available for work</span>
            </div>
            
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
