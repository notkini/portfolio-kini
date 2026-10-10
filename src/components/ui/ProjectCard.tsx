"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Brain, Server, Cog } from "lucide-react";
import type { Project } from "@/data/portfolio";

const categoryIcons = {
  "edge-ai": Cpu,
  ml: Brain,
  backend: Server,
  automation: Cog,
};


export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group rounded-lg border border-border bg-surface overflow-hidden hover:border-accent/20 transition-colors duration-300"
    >

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-lg font-semibold text-text-primary">
            {project.title}
          </h3>
          <span className="text-xs text-text-muted whitespace-nowrap mt-1">
            {project.subtitle}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mt-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-accent-subtle text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 mt-4 text-sm text-accent hover:text-accent-hover transition-colors"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Hide" : "View"} details for ${project.title}`}
        >
          <span>{isExpanded ? "Hide details" : "View case study"}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2 border-t border-border pt-3">
                {project.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary leading-relaxed flex gap-2"
                  >
                    <span className="text-accent mt-1 shrink-0">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
