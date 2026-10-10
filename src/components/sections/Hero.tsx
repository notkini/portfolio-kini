"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { personalInfo, socialLinks, interests } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";


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
          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            ariaLabel="Explore projects"
            sound="click"
          >
            Explore Projects
            <ArrowDown size={14} />
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            ariaLabel="Get in touch"
            sound="click"
          >
            Get in Touch
          </Button>
          <Button
            variant="ghost"
            size="md"
            href={personalInfo.resumePath}
            download
            ariaLabel="Download resume"
            sound="confirm"
          >
            <FileText size={14} />
            Resume
          </Button>
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
