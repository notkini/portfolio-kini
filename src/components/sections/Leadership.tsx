"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadershipRoles } from "@/data/portfolio";

export function Leadership() {
  return (
    <section id="leadership" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Leadership & Teaching"
          subtitle="Roles, workshops, and community contributions"
        />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl">
          {leadershipRoles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="p-5 md:p-6 rounded-lg bg-surface border border-border"
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
          ))}
        </div>
      </div>
    </section>
  );
}
