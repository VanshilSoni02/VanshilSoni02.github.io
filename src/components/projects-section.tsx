"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Terminal, Folder, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

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

// Featured project card with 3D-like depth
function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative grid md:grid-cols-2 gap-8 items-center"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
          : "none",
        transition: "transform 0.1s ease-out",
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
          {/* Overlay with metrics */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Terminal overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-mono text-xs"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Terminal className="w-3 h-3" />
              <span>project.metrics</span>
            </div>
            <div className="flex gap-4 text-foreground">
              {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
                <span key={key}>
                  <span className="text-primary">{key}:</span> {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Info */}
      <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Folder className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-mono">{project.category}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
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
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
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
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Compact project card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Folder className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors" />
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h4>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-6 text-xs font-mono text-primary/60">
        {project.category}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 relative">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 cyber-grid-bg pointer-events-none"
        style={{ opacity }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-sm">ls ./projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            A selection of projects showcasing expertise in 3D graphics, full-stack development, 
            and AI integration.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <Folder className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-bold">Other Projects</h3>
          </div>
        </motion.div>

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
