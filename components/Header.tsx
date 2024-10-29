"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Team", href: "#team" },
  { name: "Skills", href: "#skills" },
  { name: "Current Projects", href: "#current-proj" },
  { name: "Completed Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("");
  const [showLabel, setShowLabel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showLabel) {
      timeout = setTimeout(() => {
        setShowLabel(false);
        setHoveredItem("");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showLabel]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    let maxVisibleSection = null;
    let maxVisiblePercentage = 0;

    navItems.forEach((item) => {
      const section = document.querySelector(item.href) as HTMLElement;
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = rect.bottom + scrollPosition;

        const visibleTop = Math.max(scrollPosition, sectionTop);
        const visibleBottom = Math.min(
          scrollPosition + windowHeight,
          sectionBottom
        );
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        const visiblePercentage = (visibleHeight / rect.height) * 100;

        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage;
          maxVisibleSection = item.name;
        }
      }
    });

    if (scrollPosition + windowHeight >= documentHeight - 50) {
      maxVisibleSection = navItems[navItems.length - 1].name;
    }

    if (maxVisibleSection) {
      setActiveItem(maxVisibleSection);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);
    setShowLabel(true);
  };

  const handleNavClick = (href: string, name: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveItem(name);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm shadow-md transition-colors duration-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="relative h-12 w-auto">
            <Image
              src={theme === "dark" ? "/kraito-light.png" : "/kraito-dark.png"}
              alt="Kraito Logo"
              height={48}
              width={144}
              priority
              className="w-auto h-12"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <nav>
              <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.name);
                      }}
                      className={`text-sm font-bold transition-colors duration-200 hover:text-foreground ${
                        activeItem === item.name
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center space-x-2 pl-4 border-l border-border">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
                className="bg-muted"
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
                className="bg-muted"
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed lg:hidden top-[60px] left-0 right-0 max-h-[calc(100vh-60px)] overflow-y-auto bg-background/95 backdrop-blur-sm border-t border-border z-40">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`block py-2 text-sm font-bold transition-colors duration-200 hover:text-foreground ${
                        activeItem === item.name
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      <div className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-6">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="relative group cursor-pointer"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={() => setHoveredItem("")}
            onClick={() => handleNavClick(item.href, item.name)}
          >
            <div className="flex items-center gap-4 lg:gap-8 pr-2 lg:pr-5">
              {hoveredItem === item.name && showLabel && (
                <span className="absolute font-bold right-[150%] lg:right-[200%] top-1/2 -translate-y-1/2 bg-background/90 px-3 py-1.5 text-sm rounded-md shadow-lg whitespace-nowrap transition-opacity duration-200 border border-border">
                  {item.name}
                </span>
              )}
              <div
                className={`w-[2px] lg:w-[3px] transition-all duration-300 ${
                  activeItem === item.name
                    ? "h-8 lg:h-12 bg-foreground"
                    : "h-6 lg:h-8 bg-muted-foreground/30 group-hover:bg-muted-foreground group-hover:h-8 lg:group-hover:h-10"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
