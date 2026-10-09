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

function ProjectIllustration({
  category,
  accentColor,
}: {
  category: Project["category"];
  accentColor: string;
}) {
  return (
    <div className="relative w-full aspect-[16/9] bg-background rounded-t-lg overflow-hidden">
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${category}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${category})`} />
      </svg>

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: accentColor }}
      />

      {/* Circuit lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 400 225"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 112 L 150 112 L 170 80 L 250 80 L 270 112 L 350 112"
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
        />
        <path
          d="M 100 60 L 100 160"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
        />
        <path
          d="M 300 50 L 300 170"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
        />
        <circle cx="150" cy="112" r="3" fill={accentColor} opacity="0.4" />
        <circle cx="250" cy="80" r="3" fill={accentColor} opacity="0.4" />
        <circle cx="200" cy="140" r="2" fill={accentColor} opacity="0.3" />
      </svg>

      {/* Category icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="p-4 rounded-xl border opacity-20"
          style={{
            borderColor: accentColor,
            backgroundColor: `${accentColor}10`,
          }}
        >
          {(() => {
            const Icon = categoryIcons[category];
            return <Icon size={32} style={{ color: accentColor }} />;
          })()}
        </div>
      </div>
    </div>
  );
}

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
      <ProjectIllustration
        category={project.category}
        accentColor={project.accentColor}
      />

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
