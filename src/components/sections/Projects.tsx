"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { ProjectCardContent } from "@/components/ui/ProjectCardContent";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Projects"
          subtitle="Selected work across AI, backend, and embedded systems"
        />

        <Deck direction="horizontal" fanSpread={140} fanAngle={10} cardHeight={280} className="min-h-[320px]">
          {projects.map((project) => (
            <ProjectCardContent key={project.id} project={project} />
          ))}
        </Deck>
      </div>
    </section>
  );
}
