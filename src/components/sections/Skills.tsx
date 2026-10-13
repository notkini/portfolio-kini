"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { skillCategories } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I work with"
        />

        <Deck direction="horizontal" fanSpread={80} fanAngle={6} cardHeight={250} className="max-w-5xl min-h-[300px]">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: catIndex * 0.05,
                ease: "easeOut",
              }}
              className="h-full rounded-xl bg-surface border border-border p-5 shadow-[0_12px_32px_-20px_rgba(0,0,0,.32)]"
            >
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </Deck>
      </div>
    </section>
  );
}
