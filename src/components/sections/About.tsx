"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { EducationCard } from "@/components/ui/EducationCard";
import { aboutText, education } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="About"
          subtitle="Background & education"
        />

        <div className="grid md:grid-cols-5 gap-10 md:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-3 space-y-4"
          >
            {aboutText.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-2"
          >
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Education
            </h3>
            <Deck direction="vertical" fanSpread={80} fanAngle={3} className="min-h-[240px]">
              {education.map((edu, i) => (
                <EducationCard key={i} education={edu} />
              ))}
            </Deck>
          </motion.div>
        </div>
      </div>
    </section>
  );
}