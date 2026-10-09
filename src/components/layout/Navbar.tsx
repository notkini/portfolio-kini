"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(
    navItems.map((item) => item.href.replace("#", "")),
    80
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-text-primary font-semibold text-sm tracking-wide hover:text-accent transition-colors"
            >
              {personalInfo.name.split(" ")[0].toLowerCase()}
              <span className="text-accent">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-accent bg-accent-subtle"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              {/* 
              <a
                href={personalInfo.resumePath}
                download
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
                aria-label="Download resume"
              >
                <FileText size={14} />
                Resume
              </a>
              */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-border md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-text-primary font-semibold text-sm">
                  {personalInfo.name.split(" ")[0].toLowerCase()}
                  <span className="text-accent">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "text-accent bg-accent-subtle"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/*
              <div className="p-4 border-t border-border">
                <a
                  href={personalInfo.resumePath}
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
                  aria-label="Download resume"
                >
                  <FileText size={14} />
                  Download Resume
                </a>
              </div>
              */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
