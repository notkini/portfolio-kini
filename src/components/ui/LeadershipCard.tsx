"use client";

import { Users } from "lucide-react";
import { motion } from "framer-motion";
import type { LeadershipRole } from "@/data/portfolio";

interface LeadershipCardProps {
  role: LeadershipRole;
  index: number;
}

export function LeadershipCard({ role, index }: LeadershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="p-5 md:p-6 rounded-lg bg-surface border border-border h-full"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-md bg-accent-subtle">
          <Users size={16} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            {role.title}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {role.organization}
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {role.bullets.map((bullet, j) => (
          <li
            key={j}
            className="text-sm text-text-secondary leading-relaxed flex gap-2"
          >
            <span className="text-accent mt-0.5 shrink-0">›</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}