"use client";

import { motion } from "framer-motion";
import { ArrowDown, Terminal, Code2, Cpu, Database } from "lucide-react";
import dynamic from "next/dynamic";

const CyberScene = dynamic(() => import("./cyber-scene"), { ssr: false });

// Terminal-style typing effect
function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.1 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * 0.03, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// System status indicator
function StatusIndicator({ label, status, delay }: { label: string; status: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 font-mono text-sm"
    >
      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground">{status}</span>
    </motion.div>
  );
}

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <CyberScene />
      
      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Terminal header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-border backdrop-blur-sm font-mono text-sm"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">~/portfolio</span>
              <span className="text-primary">$</span>
              <span className="text-foreground">init</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-4 bg-primary"
              />
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="block text-foreground">
                  <TerminalText text="Vanshil" delay={0.5} />
                </span>
                <span className="block text-gradient">
                  <TerminalText text="Soni" delay={0.9} />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="flex items-center gap-3 font-mono text-lg text-muted-foreground"
              >
                <Code2 className="w-5 h-5 text-primary" />
                <span>Creative Developer & Digital Architect</span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Engineering immersive digital experiences through code. Specializing in 
              interactive 3D environments, full-stack systems, and AI-powered applications 
              that push the boundaries of web technology.
            </motion.p>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm space-y-2"
            >
              <StatusIndicator label="status" status="Available for opportunities" delay={0.8} />
              <StatusIndicator label="location" status="Canada" delay={1} />
              <StatusIndicator label="focus" status="3D Web / AI / Full-Stack" delay={1.2} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25 hover:translate-y-[-2px]"
              >
                <Database className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium font-mono transition-all hover:border-primary hover:text-primary hover:translate-y-[-2px]"
              >
                {">"} contact.init()
              </a>
            </motion.div>
          </div>

          {/* Right - Tech Stack Panel - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block lg:col-span-2"
          >
            <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm">system.overview</span>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="text-3xl font-bold text-gradient mb-1">5+</div>
                  <div className="text-xs text-muted-foreground font-mono">years.exp</div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="text-3xl font-bold text-secondary mb-1">20+</div>
                  <div className="text-xs text-muted-foreground font-mono">projects.deployed</div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="text-3xl font-bold text-accent mb-1">3D</div>
                  <div className="text-xs text-muted-foreground font-mono">web.graphics</div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">AI</div>
                  <div className="text-xs text-muted-foreground font-mono">ml.integration</div>
                </div>
              </div>

              {/* Tech tags */}
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground font-mono">active_stack:</div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Three.js", "TypeScript", "Node.js", "Python", "PostgreSQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-muted/50 rounded border border-border/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono">scroll.explore()</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
