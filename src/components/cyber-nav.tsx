"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(26, 23, 20, 0)", "rgba(26, 23, 20, 0.9)"]
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(201, 119, 90, 0)", "rgba(201, 119, 90, 0.1)"]
  );

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
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
    <motion.nav 
      style={{ 
        backgroundColor: navBackground,
        borderBottomColor: navBorder,
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <span className="text-lg font-bold text-gradient">VS</span>
                </div>
                {/* Pulse effect */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-lg border border-primary/30"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                  vanshil_soni
                </div>
                <div className="text-xs font-mono text-primary/60">
                  ~/portfolio
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center"
          >
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-sm font-mono transition-colors rounded-lg ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {/* Active indicator */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Command preview on hover */}
            <AnimatePresence>
              {hoveredLink && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="ml-4 flex items-center gap-2 text-xs font-mono text-muted-foreground"
                >
                  <Terminal className="w-3 h-3" />
                  <span>{navLinks.find(l => l.name === hoveredLink)?.cmd}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social Links + Status - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-4"
          >
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 rounded-full bg-secondary"
              />
              <span className="text-xs font-mono text-secondary">Available</span>
            </div>
            
            <div className="w-px h-6 bg-border" />
            
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-8 space-y-6">
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pb-4 border-b border-border/50">
                <Terminal className="w-4 h-4 text-primary" />
                <span>navigation.menu</span>
              </div>
              
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-2xl font-light text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/60 transition-colors">
                      {link.cmd}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-border/50 space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-secondary"
                  />
                  <span className="text-sm font-mono text-secondary">Available for work</span>
                </div>
                
                {/* Social links */}
                <div className="flex items-center gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
