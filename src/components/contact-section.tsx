"use client";

import { Send, Mail, MapPin, Github, Linkedin, Twitter, ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", username: "@vanshilsoni" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", username: "Vanshil Soni" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", username: "@vanshilsoni" },
];

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

  return (
    <div className="relative">
      <label className="block text-sm font-mono text-[hsl(var(--muted-foreground))] mb-2">
        <span className="text-[hsl(var(--primary))]">{">"}</span> {label}
      </label>
      <div className={`relative rounded-xl transition-all duration-300 ${isFocused ? "ring-2 ring-[hsl(var(--primary)/0.5)]" : ""}`}>
        {rows ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-all font-mono text-sm resize-none"
            placeholder={placeholder}
            required
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-all font-mono text-sm"
            placeholder={placeholder}
            required
          />
        )}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--primary))] origin-left transition-transform duration-300 ${isFocused ? 'scale-x-100' : 'scale-x-0'}`}
        />
      </div>
    </div>
  );
}

function ConnectionStatus() {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))]">
      <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary))] animate-pulse" />
      <span>connection.secure</span>
      <span className="text-[hsl(var(--secondary))]">| encrypted</span>
    </div>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[hsl(var(--primary)/0.05)] blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.05)] blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Content */}
          <div 
            className={`space-y-8 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span className="text-[hsl(var(--primary))] font-mono text-sm">./contact</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-balance">
                Let&apos;s create something <span className="text-gradient">amazing</span>
              </h2>
            </div>

            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              Have a project in mind or just want to chat? I&apos;m always open to discussing 
              new opportunities, creative ideas, or ways to bring your vision to life.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">email</p>
                  <a href="mailto:hello@vanshil.dev" className="font-medium hover:text-[hsl(var(--primary))] transition-colors">
                    hello@vanshil.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">location</p>
                  <p className="font-medium">Canada</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-8 border-t border-[hsl(var(--border)/0.5)]">
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">find_me_on:</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--card)/0.5)] transition-all backdrop-blur-sm ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-[hsl(var(--primary))] transition-colors">{link.label}</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">{link.username}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="p-8 rounded-3xl bg-[hsl(var(--card)/0.3)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
              {/* Form header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[hsl(var(--border)/0.5)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] ml-2">message.compose</span>
                </div>
                <ConnectionStatus />
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[hsl(var(--secondary))] mx-auto" />
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">Message Sent!</h3>
                  <p className="text-[hsl(var(--muted-foreground))] font-mono text-sm">
                    response.eta: 24-48 hours
                  </p>
                </div>
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
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl font-medium font-mono transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.25)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[hsl(var(--primary-foreground)/0.3)] border-t-[hsl(var(--primary-foreground))] rounded-full animate-spin" />
                        sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        send.message()
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-[hsl(var(--muted-foreground))] font-mono">
                    response_time: typically 24-48h
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
