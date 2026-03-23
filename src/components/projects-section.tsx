"use client";

import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Terminal, Folder, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "GitHub Field Day",
    category: "Web Development",
    description: "A dynamic website for GitHub Field Day event featuring interactive maps, server-side rendering, and real-time data visualization.",
    tags: ["Next.js", "Tailwind", "React Leaflet", "Vercel"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    liveUrl: "https://githubcampus.expert/field-days/",
    featured: true,
    metrics: { users: "2K+", performance: "98" }
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
    metrics: { fps: "60", objects: "500+" }
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
    metrics: { players: "8", latency: "<50ms" }
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

function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative grid md:grid-cols-2 gap-8 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
          : "none",
      }}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <div className="aspect-[16/10] relative">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.2)] to-transparent" />
          
          {/* Terminal overlay */}
          <div 
            className={`absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[hsl(var(--card)/0.9)] backdrop-blur-sm border border-[hsl(var(--border))] font-mono text-xs transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] mb-2">
              <Terminal className="w-3 h-3" />
              <span>project.metrics</span>
            </div>
            <div className="flex gap-4 text-[hsl(var(--foreground))]">
              {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
                <span key={key}>
                  <span className="text-[hsl(var(--primary))]">{key}:</span> {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Folder className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--primary))] font-mono">{project.category}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
        </div>
        
        <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border)/0.5)] rounded text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-6 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`group relative p-6 rounded-2xl bg-[hsl(var(--card)/0.3)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:border-[hsl(var(--primary)/0.3)] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Folder className="w-10 h-10 text-[hsl(var(--primary)/0.6)] group-hover:text-[hsl(var(--primary))] transition-colors" />
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h4 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
        {project.title}
      </h4>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-[hsl(var(--muted-foreground))]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-6 text-xs font-mono text-[hsl(var(--primary)/0.6)]">
        {project.category}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 relative">
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-[hsl(var(--primary))]" />
            <span className="text-[hsl(var(--primary))] font-mono text-sm">ls ./projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-lg mt-4 max-w-2xl">
            A selection of projects showcasing expertise in 3D graphics, full-stack development, 
            and AI integration.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects Header */}
        <div className={`mb-8 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3">
            <Folder className="w-5 h-5 text-[hsl(var(--primary))]" />
            <h3 className="text-2xl font-bold">Other Projects</h3>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
