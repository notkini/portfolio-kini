"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCardContent } from "@/components/ui/ExperienceCardContent";
import { experiences } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Experience"
          subtitle="Professional work & internships"
        />

        <div className="max-w-3xl space-y-10">
          {experiences.map((exp) => (
            <ExperienceCardContent key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
