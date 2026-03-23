"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Download, Terminal, User, Calendar, Briefcase } from "lucide-react";
import { useRef } from "react";

// Animated terminal display
function TerminalWindow() {
  const lines = [
    { prompt: "~", command: "whoami", output: "vanshil_soni" },
    { prompt: "~", command: "cat about.txt", output: null },
  ];

  const aboutText = [
    "Creative developer specializing in",
    "immersive digital experiences.",
    "",
    "Expertise: 3D Web | AI | Full-Stack",
    "Location: Canada",
    "Status: Open to opportunities",
  ];

  return (
    <div className="rounded-2xl overflow-hidden bg-card/80 border border-border backdrop-blur-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-secondary/60" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">about.terminal</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-secondary">{line.prompt}</span>
              <span className="text-primary">$</span>
              <span className="text-foreground">{line.command}</span>
            </div>
            {line.output && (
              <div className="text-muted-foreground pl-6 mt-1">{line.output}</div>
            )}
          </motion.div>
        ))}
        
        {/* Animated about text */}
        <div className="pl-0 mt-2 space-y-1">
          {aboutText.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`${text === "" ? "h-2" : ""} ${
                text.startsWith("Expertise") || text.startsWith("Location") || text.startsWith("Status")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {text}
            </motion.div>
          ))}
        </div>
        
        {/* Blinking cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block w-2 h-4 bg-primary mt-2"
        />
      </div>
    </div>
  );
}

// Stats card with animation
function StatCard({ icon: Icon, label, value, delay }: { 
  icon: typeof User; 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
    >
      <Icon className="w-5 h-5 text-primary mb-2" />
      <p className="font-medium text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        style={{ y }}
        className="absolute -right-40 top-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute -left-40 bottom-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Decorative code lines */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-8 -left-8 text-xs font-mono text-muted-foreground/30 hidden lg:block"
              >
                {"<Developer>"}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 text-xs font-mono text-muted-foreground/30 hidden lg:block"
              >
                {"</Developer>"}
              </motion.div>

              {/* Main terminal */}
              <TerminalWindow />

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 right-8 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg shadow-primary/25"
              >
                Open to Work
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-8 -left-4 px-4 py-2 bg-card border border-border rounded-full text-sm font-mono shadow-lg"
              >
                5+ Years Exp
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-primary font-mono text-sm">./about</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Crafting <span className="text-gradient">digital experiences</span> that matter
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I&apos;m a passionate developer specializing in creating immersive digital experiences. 
                With expertise in modern web technologies and 3D graphics, I bridge the gap between 
                creative vision and technical execution.
              </p>
              <p>
                My work focuses on building performant, accessible, and visually stunning applications 
                that push the boundaries of what&apos;s possible on the web. From interactive 3D games 
                to full-stack applications, I bring ideas to life with clean code and thoughtful design.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={MapPin} label="Based in" value="Canada" delay={0.2} />
              <StatCard icon={Mail} label="Contact" value="hello@vanshil.dev" delay={0.3} />
              <StatCard icon={Calendar} label="Experience" value="5+ Years" delay={0.4} />
              <StatCard icon={Briefcase} label="Projects" value="20+ Completed" delay={0.5} />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25 hover:translate-y-[-2px]"
              >
                Let&apos;s Connect
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium font-mono transition-all hover:border-primary hover:text-primary hover:translate-y-[-2px]"
              >
                <Download className="w-4 h-4" />
                resume.pdf
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
