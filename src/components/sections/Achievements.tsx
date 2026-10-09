"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/data/portfolio";

export function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Achievements"
          subtitle="Competitions and recognition"
        />

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="p-4 md:p-5 rounded-lg bg-surface border border-border text-center"
            >
              <div className="inline-flex p-2 rounded-md bg-accent-subtle mb-3">
                {i === 0 ? (
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
          ))}
        </div>
      </div>
    </section>
  );
}
