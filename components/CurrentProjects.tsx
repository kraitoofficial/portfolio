"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  client: string;
  startDate: string;
  liveDemo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Simplified E-commerce",
    description:
      "This e-commerce website design project for DOOR provides a streamlined platform for small entrepreneurs with limited products and no payment gateway access. It features a clean, modern layout with an intuitive user experience, a manual MFS form for payment, area- and weight-based shipping calculations, and mobile responsiveness for an optimized multi-device experience.",
    image: "/projects/current-projects/c3.png",
    category: "Web Development / E-commerce",
    client: "DOOR",
    startDate: "September 22, 2024",
    liveDemo: "https://door.kraito.com/",
  },
  {
    title: "E-commerce Website Design",
    description:
      "This e-commerce website design project aims to create a visually appealing and user-friendly online store for KRAITO. The design incorporates a clean and modern layout with a focus on showcasing products effectively. Key features include a prominent hero section, product categories, featured products, and a responsive design to ensure optimal viewing across different devices.",
    image: "/projects/current-projects/c2.png",
    category: "Web Development / E-commerce",
    client: "Kraito (Internal Project)",
    startDate: "September 7, 2024",
    liveDemo: "https://kraito.com/",
    github: "https://github.com/kraitoofficial/",
  },
  {
    title: "Web Developer Team Portfolio",
    description:
      "A modern, responsive portfolio for showcasing projects and team capabilities in web development. This site includes advanced UX/UI features like team member cards, an infinite loop skills showcase, a smooth-scrolling current project section, a project gallery, and a contact form. It supports both light and dark themes, features floating social media icons, and has a line navigation system for easy access across sections.",
    image: "/projects/current-projects/c1.png",
    category: "Web Development / Portfolio",
    client: "Kraito (Internal Project)",
    startDate: "October 13, 2024",
    liveDemo: "https://kraito.com/",
    github: "https://github.com/kraitoofficial/",
  },
];

export default function ProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0);
  const isLargeDevice = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Our Current Projects
        </h2>
        {isLargeDevice ? (
          <LargeDeviceLayout
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
        ) : (
          <SmallDeviceLayout />
        )}
      </div>
    </section>
  );
}

function LargeDeviceLayout({
  currentProject,
  setCurrentProject,
}: {
  currentProject: number;
  setCurrentProject: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const safeCurrentProject = Math.max(
    0,
    Math.min(currentProject, projects.length - 1)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const scrollProgress = -top / (height - window.innerHeight);
        const newIndex = Math.min(
          projects.length - 1,
          Math.max(0, Math.floor(scrollProgress * projects.length))
        );
        setCurrentProject(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setCurrentProject]);

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-24 flex gap-0">
        <div className="w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeCurrentProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full relative shadow-xl rounded-l-xl overflow-hidden"
              style={{ paddingTop: "66.67%" }}
            >
              <Image
                src={projects[safeCurrentProject].image}
                alt={projects[safeCurrentProject].title}
                fill
                style={{ objectFit: "cover" }}
                className="absolute top-0 left-0 w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeCurrentProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-r-xl shadow-lg h-full border border-border"
              style={{ aspectRatio: "3/2" }}
            >
              <div className="h-full p-8 flex flex-col justify-between">
                <ProjectInfo project={projects[safeCurrentProject]} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {projects.map((_, index) => (
        <div key={index} className="h-screen" />
      ))}
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
      <div className="space-y-3">
        <h3 className="text-2xl md:text-2xl font-bold">{project.title}</h3>
        <p className="text-muted-foreground text-justify text-sm">
          {project.description}
        </p>
        <div className="border-t border-b border-border divide-y divide-border text-sm">
          <div className="flex justify-between py-1.5">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium">{project.category}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-muted-foreground">Client</span>
            <span className="font-medium">{project.client}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-muted-foreground">Start Date</span>
            <span className="font-medium">{project.startDate}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-3">
        {project.liveDemo && (
          <Button
            variant="default"
            size="sm"
            className="flex-1 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm"
            onClick={() => window.open(project.liveDemo, "_blank")}
          >
            <ExternalLink className="mr-2 h-3 w-3" /> Live Demo
          </Button>
        )}
        {project.github && (
          <Button
            variant="default"
            size="sm"
            className="flex-1 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm"
            onClick={() => window.open(project.github, "_blank")}
          >
            <Github className="mr-2 h-3 w-3" /> View on GitHub
          </Button>
        )}
      </div>
    </>
  );
}

function SmallDeviceLayout() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden border border-border"
        >
          <div className="relative" style={{ paddingTop: "66.67%" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <div className="p-6">
            <ProjectInfo project={project} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
