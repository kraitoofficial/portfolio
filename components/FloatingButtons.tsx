"use client";

import React from "react";
import { motion } from "framer-motion";
import { BsWhatsapp, BsMessenger } from "react-icons/bs";

export default function FloatingButtons() {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.a
        href="https://wa.me/8801313347660"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl md:h-14 md:w-14"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Contact on WhatsApp"
      >
        <BsWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
      </motion.a>

      <motion.a
        href="https://m.me/kraitoofficial"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A7CFF] text-white shadow-lg transition-shadow hover:shadow-xl md:h-14 md:w-14"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Contact on Messenger"
      >
        <BsMessenger className="h-6 w-6 md:h-7 md:w-7" />
      </motion.a>
    </motion.div>
  );
}
