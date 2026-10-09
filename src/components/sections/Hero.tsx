"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { personalInfo, socialLinks, interests } from "@/data/portfolio";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      {/* Corner accents */}
      <svg
        className="absolute top-8 right-8 opacity-[0.04] hidden md:block"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <rect
          x="10"
          y="10"
          width="100"
          height="100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <rect
          x="20"
          y="20"
          width="80"
          height="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line x1="10" y1="10" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="110" y1="10" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="10" y1="110" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <line x1="110" y1="110" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <GridBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-accent-subtle border border-border text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {personalInfo.location}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-lg md:text-xl text-accent font-medium"
        >
          {personalInfo.headline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-xl text-text-secondary text-sm md:text-base leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Interest tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mt-6"
        >
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 text-xs rounded-md bg-surface border border-border text-text-muted"
            >
              {interest}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 mt-8"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover active:scale-[0.98] transition-all"
          >
            Explore Projects
            <ArrowDown size={14} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-surface border border-border text-text-primary hover:bg-surface-hover hover:border-accent/30 active:scale-[0.98] transition-all"
          >
            Get in Touch
          </a>
          {/*
          <a
            href={personalInfo.resumePath}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface active:scale-[0.98] transition-all"
            aria-label="Download resume"
          >
            <FileText size={14} />
            Resume
          </a>
          */}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mt-8"
        >
          <span className="text-xs text-text-muted mr-1">Find me on</span>
          {socialLinks
            .filter((l) => l.icon !== "mail")
            .map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                  aria-label={`Visit ${link.label} profile`}
                >
                  <Icon size={16} />
                </a>
              );
            })}
        </motion.div>
      </motion.div>
    </section>
  );
}
