"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Database, Cloud, Palette, Cpu } from "lucide-react";

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: ["TypeScript", "Python", "Rust", "C++", "JavaScript", "SQL"],
    color: "primary",
  },
  {
    category: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    color: "secondary",
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB"],
    color: "primary",
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "Vercel", "Docker", "CI/CD", "Firebase"],
    color: "secondary",
  },
  {
    category: "Design",
    icon: Palette,
    items: ["Figma", "Blender", "Adobe Suite", "UI/UX", "3D Modeling"],
    color: "primary",
  },
  {
    category: "Emerging Tech",
    icon: Cpu,
    items: ["TensorFlow", "WebGL", "WebXR", "Machine Learning", "IoT"],
    color: "secondary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 relative bg-card/30">
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-balance">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, performant, and visually stunning digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm card-hover"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                skill.color === "primary" 
                  ? "bg-primary/10 text-primary" 
                  : "bg-secondary/10 text-secondary"
              }`}>
                <skill.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {skill.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 overflow-hidden"
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  {["React", "TypeScript", "Next.js", "Three.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Figma", "TensorFlow", "WebGL"].map((tech) => (
                    <span
                      key={`${tech}-${i}`}
                      className="text-2xl font-bold text-muted-foreground/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
