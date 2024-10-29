"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "./ui/badge";

const skills = [
  {
    category: "Front-End",
    tools: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  },
  { category: "Back-End", tools: ["NodeJs", "Express", "NextJs"] },
  { category: "Databases", tools: ["MySQL", "PostgreSQL", "MongoDB"] },
  {
    category: "Tools & Platforms",
    tools: ["Git", "Docker", "Portainer", "PM2", "WordPress"],
  },
  {
    category: "Others",
    tools: ["Figma", "Inkscape", "CasaOS"],
  },
];

const logos = [
  "/logos/html5.svg",
  "/logos/css.svg",
  "/logos/javascript.svg",
  "/logos/react.svg",
  "/logos/tailwind.svg",
  "/logos/nodejs.svg",
  "/logos/portainer.svg",
  "/logos/inkscape.svg",
  "/logos/mysql.svg",
  "/logos/figma.svg",
  "/logos/mongodb.svg",
  "/logos/git.svg",
  "/logos/docker.svg",
  "/logos/cloudflare.svg",
  "/logos/nextjs.svg",
  "/logos/typescript.svg",
  "/logos/vscode.svg",
];

export default function OurSkills() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        >
          Our Skills
        </motion.h2>
        <div className="grid gap-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl shadow-lg overflow-hidden border border-border"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
              <div className="w-full lg:w-1/2 overflow-hidden flex items-center justify-center">
                <LogoScroll />
              </div>
              <div className="hidden lg:block w-px bg-border self-stretch mx-4"></div>
              <div className="w-full lg:w-1/2">
                <SkillsList />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function LogoScroll() {
  const logoWidth = 96;
  const gap = 24;

  const firstRowLogos = logos.slice(0, 9);
  const secondRowLogos = [...logos.slice(9), ...logos.slice(0, 3)];

  const firstRowWidth = firstRowLogos.length * (logoWidth + gap);
  const secondRowWidth = secondRowLogos.length * (logoWidth + gap);

  return (
    <div className="relative h-64 w-full overflow-hidden">
      <motion.div
        className="absolute flex gap-6"
        initial={{ x: 0 }}
        animate={{ x: -firstRowWidth }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={{ top: "0px" }}
      >
        {[...Array(2)].map((_, dupIndex) => (
          <div key={dupIndex} className="flex gap-6">
            {firstRowLogos.map((logo, logoIndex) => (
              <motion.div
                key={logoIndex}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-24 h-24 flex items-center justify-center bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-md shadow-sm hover:shadow-md border border-border"
              >
                <Image
                  src={logo}
                  alt="Skill logo"
                  width={60}
                  height={60}
                  className="dark:invert-[.85] transition-all duration-200"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute flex gap-6"
        initial={{ x: -secondRowWidth }}
        animate={{ x: 0 }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{ top: "120px" }}
      >
        {[...Array(2)].map((_, dupIndex) => (
          <div key={dupIndex} className="flex gap-6">
            {secondRowLogos.map((logo, logoIndex) => (
              <motion.div
                key={logoIndex}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-24 h-24 flex items-center justify-center bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-md shadow-sm hover:shadow-md border border-border"
              >
                <Image
                  src={logo}
                  alt="Skill logo"
                  width={60}
                  height={60}
                  className="dark:invert-[.85] transition-all duration-200"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SkillsList() {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="mr-2 font-medium">{skill.category}:</span>
            {skill.tools.map((tool, toolIndex) => (
              <motion.div
                key={toolIndex}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                >
                  {tool}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
