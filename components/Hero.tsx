"use client";

import dynamic from "next/dynamic";
import { Facebook, Github, Youtube } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const MotionA = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.a),
  {
    ssr: false,
  }
);

export default function Hero() {
  const socialLinks = [
    {
      icon: <Facebook className="h-6 w-6" />,
      href: "https://www.facebook.com/kraitoofficial/",
    },
    {
      icon: <BsWhatsapp className="h-6 w-6" />,
      href: "https://wa.me/8801313347660",
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      href: "https://www.youtube.com/@kraitoofficial",
    },
    {
      icon: <Github className="h-6 w-6" />,
      href: "https://github.com/kraitoofficial/",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <p className="mb-4 text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Peace be upon the believers and the mercy and blessings from our one
          and only creator.
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Kraito
        </h1>

        <p className="mt-10 max-w-[900px] text-muted-foreground sm:text-xl">
          We offer web development services, mainly focusing on Next.js and
          WordPress. Connect with us via the social media links below.
        </p>

        <div className="mt-8 flex space-x-4">
          {socialLinks.map((social, index) => (
            <MotionA
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
                delay: 0.05 * index,
                duration: 0.2,
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.1 },
              }}
            >
              {social.icon}
            </MotionA>
          ))}
        </div>
      </div>
    </section>
  );
}
