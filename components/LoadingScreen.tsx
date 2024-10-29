"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  { language: "English", text: "Hello!" },
  { language: "Chinese", text: "你好!" },
  { language: "Bangla", text: "স্বাগতম!" },
  { language: "German", text: "Hallo!" },
  { language: "Arabic", text: "مرحبا!" },
  { language: "Spanish", text: "¡Hola!" },
  { language: "French", text: "Bonjour!" },
  { language: "Japanese", text: "こんにちは!" },
  { language: "Russian", text: "Привет!" },
];

export default function LoadingScreen() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 200);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold text-gray-900"
          >
            {greetings[currentGreeting].text}
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
          className="h-1 mt-4 bg-gray-900"
        />
      </div>
    </motion.div>
  );
}
