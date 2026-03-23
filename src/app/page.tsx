import CyberNav from "@/components/cyber-nav";
import Hero3D from "@/components/hero-3d";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import CyberFooter from "@/components/cyber-footer";
import SecretPuppy from "@/components/secret-puppy";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <CyberNav />
      <Hero3D />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <CyberFooter />
      {/* Secret Easter Egg: A tiny puppy appears after 30 seconds of cursor inactivity */}
      <SecretPuppy />
    </main>
  );
}
