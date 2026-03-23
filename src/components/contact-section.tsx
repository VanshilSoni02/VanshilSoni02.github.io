"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", username: "@vanshilsoni" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", username: "Vanshil Soni" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", username: "@vanshilsoni" },
];

// Animated input field with cyber styling
function CyberInput({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder,
  rows,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const InputComponent = rows ? "textarea" : "input";

  return (
    <div className="relative">
      <label className="block text-sm font-mono text-muted-foreground mb-2">
        <span className="text-primary">{">"}</span> {label}
      </label>
      <div className={`relative rounded-xl transition-all duration-300 ${
        isFocused ? "ring-2 ring-primary/50" : ""
      }`}>
        <InputComponent
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all font-mono text-sm resize-none"
          placeholder={placeholder}
          required
        />
        {/* Animated border */}
        <motion.div
          initial={false}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary origin-left"
        />
      </div>
    </div>
  );
}

// Connection status indicator
function ConnectionStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-xs font-mono text-muted-foreground"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-2 h-2 rounded-full bg-secondary"
      />
      <span>connection.secure</span>
      <span className="text-secondary">| encrypted</span>
    </motion.div>
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-primary font-mono text-sm">./contact</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-balance">
                Let&apos;s create something <span className="text-gradient">amazing</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind or just want to chat? I&apos;m always open to discussing 
              new opportunities, creative ideas, or ways to bring your vision to life.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">email</p>
                  <a href="mailto:hello@vanshil.dev" className="font-medium hover:text-primary transition-colors">
                    hello@vanshil.dev
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">location</p>
                  <p className="font-medium">Canada</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground font-mono">find_me_on:</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{link.label}</p>
                        <p className="text-sm text-muted-foreground font-mono">{link.username}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 rounded-3xl bg-card/30 border border-border/50 backdrop-blur-sm">
              {/* Form header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-secondary/60" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">message.compose</span>
                </div>
                <ConnectionStatus />
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-secondary mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground font-mono text-sm">
                    response.eta: 24-48 hours
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CyberInput
                    label="name"
                    value={formState.name}
                    onChange={(value) => setFormState({ ...formState, name: value })}
                    placeholder="John Doe"
                  />
                  
                  <CyberInput
                    label="email"
                    type="email"
                    value={formState.email}
                    onChange={(value) => setFormState({ ...formState, email: value })}
                    placeholder="john@example.com"
                  />
                  
                  <CyberInput
                    label="message"
                    value={formState.message}
                    onChange={(value) => setFormState({ ...formState, message: value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium font-mono transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        send.message()
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-muted-foreground font-mono">
                    response_time: typically 24-48h
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
