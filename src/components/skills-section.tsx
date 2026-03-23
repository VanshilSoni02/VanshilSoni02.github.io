"use client";

import { useRef, useState, useEffect } from "react";
import { Code2, Layers, Database, Cloud, Palette, Cpu, ChevronRight } from "lucide-react";

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: [
      { name: "TypeScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "SQL", level: 85 },
    ],
    color: "primary",
    description: "Strong foundation in typed and dynamic languages",
  },
  {
    category: "Frontend",
    icon: Layers,
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 95 },
      { name: "Three.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
    color: "secondary",
    description: "Modern UI frameworks and 3D graphics",
  },
  {
    category: "Backend",
    icon: Database,
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 85 },
    ],
    color: "primary",
    description: "Scalable server-side architecture",
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "AWS", level: 80 },
      { name: "Vercel", level: 95 },
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 85 },
    ],
    color: "secondary",
    description: "Infrastructure and deployment pipelines",
  },
  {
    category: "Design",
    icon: Palette,
    items: [
      { name: "Figma", level: 85 },
      { name: "Blender", level: 80 },
      { name: "UI/UX", level: 85 },
      { name: "3D Modeling", level: 80 },
    ],
    color: "primary",
    description: "Visual design and 3D asset creation",
  },
  {
    category: "Emerging Tech",
    icon: Cpu,
    items: [
      { name: "TensorFlow", level: 75 },
      { name: "WebGL", level: 85 },
      { name: "Machine Learning", level: 75 },
      { name: "IoT", level: 70 },
    ],
    color: "secondary",
    description: "Cutting-edge technologies and AI",
  },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
    <div
      ref={cardRef}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group p-6 rounded-2xl bg-[hsl(var(--card)/0.3)] border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
        isExpanded ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--card)/0.5)]" : "border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.3)]"
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          skill.color === "primary" 
            ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary)/0.2)]" 
            : "bg-[hsl(var(--secondary)/0.1)] text-[hsl(var(--secondary))] group-hover:bg-[hsl(var(--secondary)/0.2)]"
        }`}>
          <skill.icon className="w-6 h-6" />
        </div>
        <div 
          className={`text-[hsl(var(--muted-foreground))] transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
        {skill.category}
      </h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
        {skill.description}
      </p>

      {/* Skills */}
      <div className="space-y-3">
        {skill.items.map((item, i) => (
          <div
            key={item.name}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
              transition: `all 0.5s ${i * 0.05 + 0.2}s`
            }}
          >
            <div className="flex items-center justify-between text-sm mb-1">
              <span className={`font-mono transition-colors ${
                hoveredItem === item.name ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--foreground)/0.8)]"
              }`}>
                {item.name}
              </span>
              {isExpanded && (
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
                  {item.level}%
                </span>
              )}
            </div>
            <div className="h-1 bg-[hsl(var(--muted)/0.5)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  skill.color === "primary" ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--secondary))]"
                }`}
                style={{
                  width: isVisible ? `${item.level}%` : '0%',
                  opacity: hoveredItem === item.name ? 1 : 0.7,
                  transitionDelay: `${i * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsDisplay() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Technologies", value: "25+", suffix: "" },
    { label: "Years of Experience", value: "5", suffix: "+" },
    { label: "Projects Completed", value: "20", suffix: "+" },
    { label: "GitHub Contributions", value: "1.5K", suffix: "+" },
  ];

  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`p-6 rounded-xl bg-[hsl(var(--card)/0.3)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))] font-mono">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function TechStackVisualization() {
  const techStack = [
    "React", "TypeScript", "Next.js", "Three.js", "Node.js", 
    "Python", "PostgreSQL", "AWS", "Docker", "Figma", 
    "TensorFlow", "WebGL", "Rust", "MongoDB", "Redis"
  ];

  return (
    <div className="relative overflow-hidden py-12 mt-16">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10" />
      
      <div 
        className="flex gap-8"
        style={{
          animation: "scroll-left 30s linear infinite",
        }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-4xl md:text-5xl font-bold whitespace-nowrap"
            style={{
              color: `hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.15)`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function SkillsSection() {
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

  return (
    <section ref={sectionRef} id="skills" className="py-32 px-6 relative bg-[hsl(var(--card)/0.2)]">
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border))] mb-6 font-mono text-sm">
            <Cpu className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-[hsl(var(--muted-foreground))]">cat skills.json</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, performant, and visually stunning digital experiences.
          </p>
        </div>

        <StatsDisplay />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} />
          ))}
        </div>

        <TechStackVisualization />
      </div>
    </section>
  );
}
