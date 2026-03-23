"use client";

import { motion } from "framer-motion";
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

// Animated ASCII art
function AsciiArt() {
  const art = `
  ╔═══════════════════════════════╗
  ║   VANSHIL SONI | DEV 2026    ║
  ║   ░░░░░░░░░░░░░░░░░░░░░░░░   ║
  ║   Building the future, one   ║
  ║   line of code at a time.    ║
  ╚═══════════════════════════════╝
  `;

  return (
    <motion.pre
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-[8px] md:text-xs font-mono text-primary/30 leading-tight hidden md:block"
    >
      {art}
    </motion.pre>
  );
}

export default function CyberFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-6 border-t border-border/50 bg-card/20">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand + ASCII */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-xl font-bold text-gradient">VS</span>
              </div>
              <div>
                <div className="font-bold text-lg">Vanshil Soni</div>
                <div className="text-xs font-mono text-muted-foreground">Creative Developer</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Engineering immersive digital experiences through code. 
              Specializing in 3D graphics, AI integration, and full-stack development.
            </p>
            <AsciiArt />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Terminal className="w-4 h-4 text-primary" />
              <span>sitemap</span>
            </div>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="text-primary/50 group-hover:text-primary transition-colors">{">"}</span>
                  <span className="font-mono">{link.cmd}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Code2 className="w-4 h-4 text-primary" />
              <span>connect</span>
            </div>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              {">"} designed_and_built_by vanshil_soni
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Coffee className="w-3 h-3" />
              <span>Powered by caffeine</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <p className="text-sm text-muted-foreground font-mono">
              v{new Date().getFullYear()}.1.0
            </p>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        </div>

        {/* Easter egg hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-[10px] font-mono text-muted-foreground/30">
            // Try leaving your cursor still for 30 seconds...
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
