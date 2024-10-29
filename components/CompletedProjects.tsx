"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { allProjectImages } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

const project1Images = allProjectImages[1];
const project2Images = allProjectImages[2];
const project3Images = allProjectImages[3];

const projects = [
  {
    title: "Door Simplified E-commerce",
    description:
      "This e-commerce website design project for DOOR provides a streamlined platform for small entrepreneurs with limited products and no payment gateway access. It features a clean, modern layout with an intuitive user experience, a manual MFS form for payment, and area- and weight-based shipping calculations.",
    technologies: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "MFS",
      "Weight Based Shipping",
    ],
    images: project1Images,
    link: "https://door.kraito.com/",
  },
  {
    title: "Door Logo Design",
    description:
      "This project was completed for an eCommerce SME client who sells fashion and home décor products. The door symbolizes the entrance to explore the range of products in these segment products.",
    technologies: [
      "Inkscape",
      "Adobe Illustrator",
      "Gemini",
      "Kreadon",
      "Figma",
      "FREEP!K",
    ],
    images: project2Images,
    link: "https://door.kraito.com/",
  },
  {
    title: "Kraito Internal Portfolio Website",
    description:
      "This internal portfolio website was developed to showcase Kraito’s web development capabilities. With advanced animations, smooth scrolling, and a responsive design, the site highlights Kraito's project range and team skills, supporting light and dark themes for a customizable user experience.",
    technologies: [
      "NextJs",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "Tailwind",
    ],
    images: project3Images,
    link: "https://kraito.com/",
  },
];

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      if (currentImage < projects[currentProject].images.length - 1) {
        setCurrentImage((prev) => prev + 1);
      } else {
        setCurrentImage(0);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentImage, currentProject, autoplay]);

  const nextImage = () => {
    setAutoplay(false);
    setCurrentImage(
      (prev) => (prev + 1) % projects[currentProject].images.length
    );
  };

  const prevImage = () => {
    setAutoplay(false);
    setCurrentImage(
      (prev) =>
        (prev - 1 + projects[currentProject].images.length) %
        projects[currentProject].images.length
    );
  };

  const hasNextImage =
    currentImage < projects[currentProject].images.length - 1;
  const hasPrevImage = currentImage > 0;

  return (
    <section className="bg-background container mx-auto px-4 py-16 md:py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Our Completed Projects
      </h2>
      <div className="relative">
        <div
          key={`${currentProject}-${currentImage}`}
          className="relative overflow-hidden rounded-lg sm:h-[400px] md:h-[500px] lg:h-[625px] transition-opacity duration-500"
        >
          <Image
            src={projects[currentProject].images[currentImage].large}
            alt={`Project ${currentProject + 1} - Large`}
            width={1200}
            height={500}
            quality={100}
            className="hidden lg:block object-cover w-full h-full"
          />
          <Image
            src={projects[currentProject].images[currentImage].medium}
            alt={`Project ${currentProject + 1} - Medium`}
            width={800}
            height={500}
            quality={100}
            className="hidden md:block lg:hidden object-cover w-full h-full"
          />
          <Image
            src={projects[currentProject].images[currentImage].small}
            alt={`Project ${currentProject + 1} - Small`}
            width={600}
            height={400}
            quality={100}
            className="block md:hidden object-cover w-full h-full"
          />
          {currentImage === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-bold text-center">
                {projects[currentProject].title}
              </h3>
              <div className="mt-2 sm:mt-4 flex flex-wrap justify-center gap-1 sm:gap-2">
                {projects[currentProject].technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs sm:text-sm px-2 py-0.5"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              {projects[currentProject].link && (
                <Button
                  variant="outline"
                  className="mt-4 sm:mt-6 mb-8 sm:mb-12 transition-all duration-300 bg-transparent border-white hover:bg-white hover:text-black text-white hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base py-1 px-3 sm:py-2 sm:px-4"
                  onClick={() =>
                    window.open(projects[currentProject].link, "_blank")
                  }
                >
                  <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Visit
                  Project
                </Button>
              )}
            </div>
          )}
          {currentImage === 1 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-white">
              <p className="mt-2 text-sm sm:text-base lg:text-lg px-4 sm:px-10 md:px-20 text-center overflow-hidden">
                {projects[currentProject].description}
              </p>
            </div>
          )}
          {currentImage > 1 && <div className="absolute inset-0 bg-black/5" />}
        </div>
        {hasPrevImage && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-3 text-white transition-colors hover:bg-black/40"
            onClick={prevImage}
            onMouseEnter={() => setAutoplay(false)}
          >
            <ChevronLeft className="h-10 w-6" />
          </button>
        )}
        {hasNextImage && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-3 text-white transition-colors hover:bg-black/40"
            onClick={nextImage}
            onMouseEnter={() => setAutoplay(false)}
          >
            <ChevronRight className="h-10 w-6" />
          </button>
        )}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 px-4 py-2 bg-black/20 rounded-full">
            {projects[currentProject].images.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 sm:h-2 w-6 sm:w-8 rounded-full transition-all duration-300 ${
                  index === currentImage ? "bg-primary" : "bg-white/50"
                }`}
                onClick={() => {
                  setCurrentImage(index);
                  setAutoplay(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {projects.map((project, index) => (
          <Button
            key={index}
            variant={index === currentProject ? "default" : "outline"}
            className={`
    text-sm sm:text-base py-1 px-3 sm:py-2 sm:px-4
    transition-all duration-300 
    ${
      index === currentProject
        ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] shadow-md hover:shadow-lg"
        : "border-primary/20 hover:border-primary text-muted-foreground hover:text-primary hover:scale-[1.02]"
    }
    active:scale-[0.98]
  `}
            onClick={() => {
              setCurrentProject(index);
              setCurrentImage(0);
              setAutoplay(true);
            }}
          >
            {project.title}
          </Button>
        ))}
      </div>
    </section>
  );
}
