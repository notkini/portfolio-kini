"use client";

import { motion } from "framer-motion";

export function SkillBadge({
  skill,
  index,
}: {
  skill: string;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
      className="px-3 py-1.5 text-sm rounded-md bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-text-primary transition-colors duration-200"
    >
      {skill}
    </motion.span>
  );
}
