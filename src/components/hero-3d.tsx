"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const CyberScene = dynamic(() => import("./cyber-scene"), { ssr: false });

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <CyberScene />
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-mono mb-6">
                Creative Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
            >
              <span className="block text-foreground">Building</span>
              <span className="block text-gradient">Digital</span>
              <span className="block text-foreground">Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              I craft immersive web experiences that blend cutting-edge technology 
              with thoughtful design. Specializing in interactive 3D and modern web development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                View Work
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-medium transition-all hover:border-primary hover:text-primary"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right - Stats/Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:grid grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border glow-border">
                <div className="text-4xl font-bold text-gradient mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                <div className="text-4xl font-bold text-secondary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                <div className="text-4xl font-bold text-accent mb-2">3D</div>
                <div className="text-sm text-muted-foreground">Interactive Experiences</div>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border glow-border">
                <div className="text-4xl font-bold text-gradient mb-2">AI</div>
                <div className="text-sm text-muted-foreground">ML Integration</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
