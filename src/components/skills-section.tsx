"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Layers, Database, Cloud, Palette, Cpu, ChevronRight } from "lucide-react";

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: [
      { name: "TypeScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Rust", level: 70 },
      { name: "C++", level: 75 },
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
      { name: "Framer Motion", level: 85 },
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
      { name: "Django", level: 75 },
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
      { name: "Firebase", level: 80 },
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
      { name: "Adobe Suite", level: 75 },
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
      { name: "WebXR", level: 70 },
      { name: "Machine Learning", level: 75 },
      { name: "IoT", level: 70 },
    ],
    color: "secondary",
    description: "Cutting-edge technologies and AI",
  },
];

// Interactive skill card with progress visualization
function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group p-6 rounded-2xl bg-card/30 border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
        isExpanded ? "border-primary/50 bg-card/50" : "border-border/50 hover:border-primary/30"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          skill.color === "primary" 
            ? "bg-primary/10 text-primary group-hover:bg-primary/20" 
            : "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
        }`}>
          <skill.icon className="w-6 h-6" />
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="text-muted-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Title and Description */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {skill.category}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {skill.description}
      </p>

      {/* Skills Preview / Expanded View */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : "auto" }}
        className="space-y-3"
      >
        {skill.items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <div className="flex items-center justify-between text-sm mb-1">
              <span className={`font-mono transition-colors ${
                hoveredItem === item.name ? "text-primary" : "text-foreground/80"
              }`}>
                {item.name}
              </span>
              {isExpanded && (
                <span className="text-xs text-muted-foreground font-mono">
                  {item.level}%
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full rounded-full ${
                  skill.color === "primary" ? "bg-primary" : "bg-secondary"
                }`}
                style={{
                  opacity: hoveredItem === item.name ? 1 : 0.7,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Animated tech stack visualization
function TechStackVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const techStack = [
    "React", "TypeScript", "Next.js", "Three.js", "Node.js", 
    "Python", "PostgreSQL", "AWS", "Docker", "Figma", 
    "TensorFlow", "WebGL", "Rust", "MongoDB", "Redis"
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden py-12 mt-16">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div 
        style={{ x }}
        className="flex gap-8"
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <motion.span
            key={`${tech}-${i}`}
            className="text-4xl md:text-5xl font-bold whitespace-nowrap"
            style={{
              color: `hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.15)`,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// Stats display
function StatsDisplay() {
  const stats = [
    { label: "Technologies", value: "25+", suffix: "" },
    { label: "Years of Experience", value: "5", suffix: "+" },
    { label: "Projects Completed", value: "20", suffix: "+" },
    { label: "GitHub Contributions", value: "1.5K", suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 relative bg-card/20">
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border mb-6 font-mono text-sm">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">cat skills.json</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, performant, and visually stunning digital experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <StatsDisplay />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} />
          ))}
        </div>

        {/* Tech Stack Visualization */}
        <TechStackVisualization />
      </div>
    </section>
  );
}
