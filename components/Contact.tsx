"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Mail, MapPin, Clock, Send } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ApiResponse {
  message: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the CAPTCHA verification");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setToken(null);
      turnstileRef.current?.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <motion.section
      className="bg-primary/5 py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <motion.div
          className="bg-card rounded-xl shadow-lg overflow-hidden border border-border"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1234-567890"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    className="min-h-[120px]"
                  />
                </motion.div>

                <motion.div className="flex w-full" variants={itemVariants}>
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={
                      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!
                    }
                    onSuccess={(token) => {
                      setToken(token);
                      setIsVerifying(false);
                    }}
                    onError={() => {
                      setToken(null);
                      setIsVerifying(false);
                      setStatus("error");
                      setErrorMessage("CAPTCHA verification failed");
                    }}
                    onExpire={() => {
                      setToken(null);
                      setIsVerifying(false);
                    }}
                    onBeforeInteractive={() => setIsVerifying(true)}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={status === "loading" || !token || isVerifying}
                    className="w-full transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {status === "loading" ? "Sending..." : "Submit"}
                  </Button>
                </motion.div>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center mt-2"
                  >
                    Thank you! We&apos;ll get back to you shortly.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center mt-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </form>
            </motion.div>

            <div className="hidden lg:flex items-center">
              <div className="h-4/5 w-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <motion.div
              className="w-full lg:w-1/2 space-y-8"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2" /> Service Hours (GMT+6)
                </h3>
                <p className="mb-2">Saturday-Thursday</p>
                <p className="mb-2">7:30 AM - 12:30 PM</p>
                <p className="mb-2">2:00 PM - 4:00 PM</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Available outside these hours for emergencies and with prior
                  notice (excluding prayer times).
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05, x: 10 }}
                    href="https://wa.me/8801313347660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <BsWhatsapp className="mr-2 h-6 w-6" />
                    <span>+880 1313-347660</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 10 }}
                    href="mailto:contact@kraito.com"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <Mail className="mr-2 h-6 w-6" />
                    <span>contact@kraito.com</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 10 }}
                    href="https://www.google.com/maps/place/Dhaka/@23.780753,90.2548775,11z/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <MapPin className="mr-2 h-6 w-6" />
                    <span>Dhaka, Bangladesh</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 10 }}
                    href="https://www.facebook.com/kraitoofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <Facebook className="mr-2 h-6 w-6" />
                    <span>kraitoofficial</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
