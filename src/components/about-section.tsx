"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-lg animate-pulse-glow" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-secondary/30 rounded-lg animate-pulse-glow" style={{ animationDelay: "1s" }} />
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-secondary/20 p-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-card flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary-foreground">VS</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gradient">Vanshil Soni</h3>
                      <p className="text-muted-foreground font-mono text-sm">Creative Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-2 right-8 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg"
              >
                Open to Work
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
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
              <span className="text-primary font-mono text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
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
              <div className="p-4 rounded-xl bg-card border border-border">
                <MapPin className="w-5 h-5 text-primary mb-2" />
                <p className="font-medium">Based in</p>
                <p className="text-sm text-muted-foreground">Canada</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <Mail className="w-5 h-5 text-primary mb-2" />
                <p className="font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">hello@example.com</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Let&apos;s Talk
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-medium transition-all hover:border-primary hover:text-primary"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
