import { generateMetadata } from "./page-metadata";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TeamMembers from "@/components/Team";
import Projects from "@/components/CompletedProjects";
import Footer from "@/components/Footer";
import ProjectShowcase from "@/components/CurrentProjects";
import OurSkills from "@/components/TeamSkills";
import ContactSection from "@/components/Contact";
import FloatingButtons from "@/components/FloatingButtons";
import { Suspense } from "react";
export { generateMetadata };

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Suspense fallback={<div>Loading...</div>}>
        <Background />
        <Header />
        <section id="home">
          <Hero />
        </section>
        <section id="team">
          <TeamMembers />
        </section>
        <section id="skills">
          <OurSkills />
        </section>
        <section id="current-proj">
          <ProjectShowcase />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
        <Footer />
        <FloatingButtons />
      </Suspense>
    </main>
  );
}
