"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "GitHub Field Day",
    category: "Web Development",
    description: "A dynamic website for GitHub Field Day event featuring interactive maps and SSR rendering.",
    tags: ["Next.js", "Tailwind", "React Leaflet", "Vercel"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    liveUrl: "https://githubcampus.expert/field-days/",
    featured: true,
  },
  {
    title: "WinterFind",
    category: "3D Game",
    description: "A 3D interactive web-based game where users search for gifts in a winter wonderland.",
    tags: ["Three.js", "React Fiber", "Blender", "Node.js"],
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=600&fit=crop",
    liveUrl: "https://findurgf-in-winter-io.vercel.app",
    githubUrl: "https://github.com/kartikpatel0170/Winter-Find",
    featured: true,
  },
  {
    title: "SharkTanks",
    category: "Multiplayer Game",
    description: "A 3D multiplayer online battle game built from scratch with real-time socket connections.",
    tags: ["Three.js", "Socket.io", "Express", "WebGL"],
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=600&fit=crop",
    liveUrl: "https://sharktanks.tech/",
    githubUrl: "https://github.com/kpatel0170/SharkTanks",
    featured: true,
  },
  {
    title: "Settlout",
    category: "Web App",
    description: "MERN stack web app helping students adapt to new environments and facilitate settlement.",
    tags: ["MERN", "Stripe", "SendGrid", "Twilio"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    liveUrl: "https://settleout.onrender.com/",
    githubUrl: "https://github.com/kpatel0170/settleout-frontend",
  },
  {
    title: "Electron",
    category: "Machine Learning",
    description: "ML model predicting energy consumption to optimize and save additional energy usage.",
    tags: ["Python", "Pandas", "Sklearn", "Flask"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/kartikpatel0170/Electron",
  },
  {
    title: "SpyPooch",
    category: "AI/IoT",
    description: "Smart pet monitoring using TensorFlow to track and alert via SMS when pets cross boundaries.",
    tags: ["TensorFlow", "React", "Twilio", "Node.js"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/kartikpatel0170/SpyPooch",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-32 px-6 relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-balance">
            Projects that <span className="text-gradient">showcase</span> my craft
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 mb-20"
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className={`group grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div>
                  <span className="text-sm text-primary font-mono">{project.category}</span>
                  <h3 className="text-3xl md:text-4xl font-bold mt-2 group-hover:text-primary transition-colors">
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
                      className="px-3 py-1 text-xs font-mono bg-card border border-border rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
              
              <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="aspect-[4/3] relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold">More Projects</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherProjects.map((project) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm card-hover"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-xs text-primary font-mono">{project.category}</span>
              <h4 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono bg-muted rounded text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
