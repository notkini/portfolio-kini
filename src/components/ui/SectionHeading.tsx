"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12 md:mb-16"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-sm md:text-base">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-px w-12 bg-accent" />
    </motion.div>
  );
}
