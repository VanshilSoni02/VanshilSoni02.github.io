"use client";

import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Terminal, Folder, ChevronRight, Layers, Box, Hexagon } from "lucide-react";

const projects = [
  {
    title: "GitHub Field Day",
    category: "Web Development",
    description: "A dynamic website for GitHub Field Day event featuring interactive maps, server-side rendering, and real-time data visualization.",
    tags: ["Next.js", "Tailwind", "React Leaflet", "Vercel"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    liveUrl: "https://githubcampus.expert/field-days/",
    featured: true,
    metrics: { users: "2K+", performance: "98" },
    layout: "perspective-left"
  },
  {
    title: "WinterFind",
    category: "3D Game",
    description: "A 3D interactive web-based game where users search for gifts in a winter wonderland. Built with custom shaders and physics.",
    tags: ["Three.js", "React Fiber", "Blender", "Node.js"],
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=600&fit=crop",
    liveUrl: "https://findurgf-in-winter-io.vercel.app",
    githubUrl: "https://github.com/kartikpatel0170/Winter-Find",
    featured: true,
    metrics: { fps: "60", objects: "500+" },
    layout: "floating-stack"
  },
  {
    title: "SharkTanks",
    category: "Multiplayer Game",
    description: "A 3D multiplayer online battle game built from scratch with real-time socket connections and custom game engine.",
    tags: ["Three.js", "Socket.io", "Express", "WebGL"],
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=600&fit=crop",
    liveUrl: "https://sharktanks.tech/",
    githubUrl: "https://github.com/kpatel0170/SharkTanks",
    featured: true,
    metrics: { players: "8", latency: "<50ms" },
    layout: "hologram-card"
  },
  {
    title: "Settlout",
    category: "Full-Stack App",
    description: "MERN stack web application helping students adapt to new environments and facilitate settlement process.",
    tags: ["MERN", "Stripe", "SendGrid", "Twilio"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    liveUrl: "https://settleout.onrender.com/",
    githubUrl: "https://github.com/kpatel0170/settleout-frontend",
  },
  {
    title: "Electron",
    category: "Machine Learning",
    description: "ML model predicting energy consumption patterns to optimize and save additional energy usage for smart grids.",
    tags: ["Python", "Pandas", "Sklearn", "Flask"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/kartikpatel0170/Electron",
  },
  {
    title: "SpyPooch",
    category: "AI/IoT",
    description: "Smart pet monitoring system using TensorFlow to track and alert via SMS when pets cross boundaries.",
    tags: ["TensorFlow", "React", "Twilio", "Node.js"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/kartikpatel0170/SpyPooch",
  },
];

// 3D Layout 1: Perspective Left - Card tilted with depth
function PerspectiveLeftProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative grid lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ perspective: "1500px" }}
    >
      {/* 3D Image Container */}
      <div className="lg:col-span-7 relative" style={{ transformStyle: "preserve-3d" }}>
        <div 
          className="relative transition-all duration-700 ease-out"
          style={{
            transform: isHovered 
              ? "rotateY(-5deg) rotateX(5deg) translateZ(30px)" 
              : "rotateY(-15deg) rotateX(5deg) translateZ(0)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Main image */}
          <div className="relative rounded-xl overflow-hidden border border-[hsl(var(--secondary)/0.3)] glow-border-green">
            <div className="aspect-[16/10]">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-700"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--background)/0.8)] via-transparent to-transparent" />
            </div>
            
            {/* Floating metrics panel */}
            <div 
              className="absolute bottom-4 right-4 p-3 rounded-lg bg-[hsl(var(--card)/0.9)] backdrop-blur-sm border border-[hsl(var(--secondary)/0.3)] font-mono text-xs transition-all duration-500"
              style={{ 
                transform: isHovered ? "translateZ(40px)" : "translateZ(20px)",
                opacity: isHovered ? 1 : 0.8
              }}
            >
              <div className="flex items-center gap-2 text-[hsl(var(--secondary))] mb-1">
                <Layers className="w-3 h-3" />
                <span>metrics</span>
              </div>
              <div className="flex gap-3 text-[hsl(var(--foreground))]">
                {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
                  <span key={key}>
                    <span className="text-[hsl(var(--primary))]">{key}:</span> {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Depth shadow layers */}
          <div 
            className="absolute inset-0 rounded-xl bg-[hsl(var(--secondary)/0.1)] -z-10"
            style={{ transform: "translateZ(-20px) translateX(10px) translateY(10px)" }}
          />
          <div 
            className="absolute inset-0 rounded-xl bg-[hsl(var(--secondary)/0.05)] -z-20"
            style={{ transform: "translateZ(-40px) translateX(20px) translateY(20px)" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Box className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--primary))] font-mono">{project.category}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold transition-all duration-300" 
            style={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}>
            {project.title}
          </h3>
        </div>
        
        <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-mono bg-[hsl(var(--secondary)/0.1)] border border-[hsl(var(--secondary)/0.2)] rounded text-[hsl(var(--secondary))]">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-6 pt-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--secondary))] transition-colors">
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// 3D Layout 2: Floating Stack - Multiple layers stacked
function FloatingStackProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative grid lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      {/* Content - Left side */}
      <div className="lg:col-span-5 lg:order-1 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Hexagon className="w-4 h-4 text-[hsl(var(--secondary))]" />
            <span className="text-sm text-[hsl(var(--secondary))] font-mono">{project.category}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gradient-green">{project.title}</h3>
        </div>
        
        <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-mono bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] rounded text-[hsl(var(--primary))]">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-6 pt-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--secondary))] transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>

      {/* Floating Stack Image - Right side */}
      <div className="lg:col-span-7 lg:order-2 relative h-[400px]" style={{ perspective: "1200px" }}>
        {/* Back layer */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden border border-[hsl(var(--muted)/0.3)] transition-all duration-700"
          style={{
            transform: isHovered 
              ? "translateZ(-60px) translateY(30px) scale(0.9) rotateX(5deg)" 
              : "translateZ(-40px) translateY(20px) scale(0.95) rotateX(3deg)",
            opacity: 0.4
          }}
        >
          <img src={project.image} alt="" className="object-cover w-full h-full blur-sm" />
        </div>

        {/* Middle layer */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden border border-[hsl(var(--secondary)/0.3)] transition-all duration-700"
          style={{
            transform: isHovered 
              ? "translateZ(-30px) translateY(15px) scale(0.95) rotateX(3deg)" 
              : "translateZ(-20px) translateY(10px) scale(0.98) rotateX(2deg)",
            opacity: 0.7
          }}
        >
          <img src={project.image} alt="" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-[hsl(var(--secondary)/0.2)]" />
        </div>

        {/* Front layer - Main */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden border-2 border-[hsl(var(--secondary)/0.5)] transition-all duration-700 glow-border-green"
          style={{
            transform: isHovered 
              ? "translateZ(20px) rotateX(-2deg)" 
              : "translateZ(0) rotateX(0)",
          }}
        >
          <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.6)] via-transparent to-transparent" />
          
          {/* Floating stats */}
          <div 
            className="absolute top-4 left-4 p-3 rounded-lg bg-[hsl(var(--card)/0.9)] backdrop-blur border border-[hsl(var(--secondary)/0.3)] font-mono text-xs"
            style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(10px)" }}
          >
            <div className="flex gap-4">
              {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-[hsl(var(--secondary))]">{value}</div>
                  <div className="text-[hsl(var(--muted-foreground))] uppercase text-[10px]">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// 3D Layout 3: Hologram Card - Glowing edges, scan lines
function HologramCardProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ perspective: "1500px" }}
    >
      <div 
        className="relative bg-[hsl(var(--card)/0.3)] backdrop-blur-md rounded-2xl overflow-hidden border border-[hsl(var(--primary)/0.3)] transition-all duration-300"
        style={{
          transform: isHovered 
            ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateZ(20px)` 
            : "rotateY(0) rotateX(0) translateZ(0)",
          boxShadow: isHovered 
            ? "0 0 40px hsl(var(--primary) / 0.3), inset 0 0 40px hsl(var(--primary) / 0.05)" 
            : "0 0 20px hsl(var(--primary) / 0.1)"
        }}
      >
        {/* Hologram scan lines */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.03) 2px, hsl(var(--primary) / 0.03) 4px)',
        }} />
        
        {/* Moving scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[hsl(var(--primary)/0.4)] to-transparent animate-scan-line" />
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Image side */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--card)/0.8)]" />
            
            {/* Glowing corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[hsl(var(--primary))]" 
              style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.5)" }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[hsl(var(--primary))]" 
              style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.5)" }} />
          </div>

          {/* Content side */}
          <div className="p-8 space-y-6 relative">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--primary))]">
              <Terminal className="w-4 h-4" />
              <span>project://</span>
              <span className="text-[hsl(var(--muted-foreground))]">{project.category.toLowerCase().replace(' ', '-')}</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gradient">{project.title}</h3>
            
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{project.description}</p>
            
            {/* Metrics grid */}
            {project.metrics && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-lg bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--primary)/0.2)]">
                    <div className="text-2xl font-bold text-[hsl(var(--primary))]">{value}</div>
                    <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] uppercase">{key}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs font-mono text-[hsl(var(--primary)/0.8)] border border-[hsl(var(--primary)/0.2)] rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded font-medium text-sm transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.3)]">
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[hsl(var(--secondary)/0.5)] text-[hsl(var(--secondary))] rounded font-medium text-sm transition-all hover:bg-[hsl(var(--secondary)/0.1)]">
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Simple card for non-featured projects
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-6 rounded-2xl bg-[hsl(var(--card)/0.3)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transform: isHovered ? "translateY(-8px) rotateX(5deg)" : "translateY(0)",
        boxShadow: isHovered ? "0 20px 40px hsl(var(--secondary) / 0.1)" : "none"
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <Folder className="w-10 h-10 text-[hsl(var(--secondary)/0.6)] group-hover:text-[hsl(var(--secondary))] transition-colors" />
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--secondary))] transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <h4 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">{project.title}</h4>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{tag}</span>
        ))}
      </div>

      <div className="absolute top-6 right-6 text-xs font-mono text-[hsl(var(--primary)/0.6)]">{project.category}</div>
    </article>
  );
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const renderFeaturedProject = (project: typeof projects[0], index: number) => {
    switch (project.layout) {
      case "perspective-left":
        return <PerspectiveLeftProject key={project.title} project={project} index={index} />;
      case "floating-stack":
        return <FloatingStackProject key={project.title} project={project} index={index} />;
      case "hologram-card":
        return <HologramCardProject key={project.title} project={project} index={index} />;
      default:
        return <PerspectiveLeftProject key={project.title} project={project} index={index} />;
    }
  };

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 relative">
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none opacity-50" />
      
      {/* Section entrance gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[hsl(var(--background))] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`mb-24 text-center transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--secondary)/0.3)]">
            <Terminal className="w-4 h-4 text-[hsl(var(--secondary))]" />
            <span className="text-[hsl(var(--secondary))] font-mono text-sm">ls -la ./projects</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-balance mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-xl max-w-2xl mx-auto">
            A selection of projects showcasing expertise in 3D graphics, full-stack development, and AI integration.
          </p>
        </div>

        {/* Featured Projects with unique 3D layouts */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => renderFeaturedProject(project, index))}
        </div>

        {/* Other Projects Header */}
        <div className={`mb-12 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3">
            <Folder className="w-5 h-5 text-[hsl(var(--secondary))]" />
            <h3 className="text-2xl font-bold">Other Projects</h3>
            <span className="text-[hsl(var(--muted-foreground))] font-mono text-sm">({otherProjects.length})</span>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
