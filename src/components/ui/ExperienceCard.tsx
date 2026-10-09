"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/data/portfolio";

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-6 md:pl-8 border-l border-border"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-2.5 h-2.5 -translate-x-[5.5px] rounded-full bg-accent border-2 border-background" />

      <div className="mb-1">
        <h3 className="text-base md:text-lg font-semibold text-text-primary">
          {experience.role}
        </h3>
        <p className="text-sm text-text-secondary">
          {experience.company}
          {experience.location && (
            <span className="text-text-muted"> · {experience.location}</span>
          )}
        </p>
        {experience.period && (
          <p className="text-xs text-text-muted mt-0.5">{experience.period}</p>
        )}
      </div>

      <div className="mt-4 space-y-5">
        {experience.projects.map((project) => (
          <div key={project.name}>
            <h4 className="text-sm font-medium text-text-primary mb-2">
              {project.name}
            </h4>
            <ul className="space-y-1.5">
              {project.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm text-text-secondary leading-relaxed flex gap-2"
                >
                  <span className="text-accent mt-0.5 shrink-0">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-accent-subtle text-text-secondary border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
