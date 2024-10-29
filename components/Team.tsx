"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    facebook?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Nasim",
    role: "Founder & Partner",
    image: "/team/nasim.png",
    bio: "Nasim has managed development of multi-vendor, classified and drop shipping e-commerce platforms, LMS, media servers, portfolio and blogs. Developed React, NextJs, and WordPress projects.",
    skills: ["React", "NextJs", "WordPress", "Portainer", "Figma", "Inkscape"],
    social: {
      facebook: "https://www.facebook.com/iNasim4Kraito",
      linkedin: "https://www.linkedin.com/in/inasim",
      github: "https://github.com/inasim4",
    },
  },
  {
    name: "Fahim",
    role: "Founder & Partner",
    image: "/team/fahim.png",
    bio: "Fahim is a MERN stack developer with WordPress experience. He have experience with PHP, JavaScript, React, NextJs, Tailwind CSS and Git to develop user-focused web applications. ",
    skills: ["NodeJs", "Express", "MongDB", "React", "NextJs", "WordPress"],
    social: {
      facebook: "https://www.facebook.com/FAHIMX007",
      linkedin: "https://www.linkedin.com/in/fahimx",
      github: "https://github.com/FAHIMXGG",
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TeamMembers() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        >
          Our Team
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="relative h-64 w-full lg:h-auto lg:w-1/3 bg-primary/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 lg:w-2/3">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {member.name}
                        </h3>
                        <p className="text-muted-foreground">{member.role}</p>
                        <p className="mt-4 text-justify">{member.bio}</p>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-4">
                          {member.social.facebook && (
                            <motion.a
                              whileHover={{ scale: 1.2 }}
                              href={member.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Facebook className="h-5 w-5" />
                            </motion.a>
                          )}
                          {member.social.linkedin && (
                            <motion.a
                              whileHover={{ scale: 1.2 }}
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Linkedin className="h-5 w-5" />
                            </motion.a>
                          )}
                          {member.social.github && (
                            <motion.a
                              whileHover={{ scale: 1.2 }}
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Github className="h-5 w-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
