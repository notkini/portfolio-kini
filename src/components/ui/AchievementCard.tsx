"use client";

import { Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import type { Achievement } from "@/data/portfolio";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="p-4 md:p-5 rounded-lg bg-surface border border-border text-center h-full"
    >
      <div className="inline-flex p-2 rounded-md bg-accent-subtle mb-3">
        {index === 0 ? (
          <Trophy size={18} className="text-accent" />
        ) : (
          <Award size={18} className="text-accent" />
        )}
      </div>
      <p className="text-sm font-semibold text-text-primary">
        {achievement.title}
      </p>
      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
        {achievement.event}
      </p>
    </motion.div>
  );
}