"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { LeadershipCard } from "@/components/ui/LeadershipCard";
import { leadershipRoles } from "@/data/portfolio";

export function Leadership() {
  return (
    <section id="leadership" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Leadership & Teaching"
          subtitle="Roles, workshops, and community contributions"
        />

        <Deck direction="horizontal" fanSpread={160} fanAngle={8} cardHeight={260} className="max-w-4xl min-h-[280px]">
          {leadershipRoles.map((role, i) => (
            <LeadershipCard key={role.id} role={role} index={i} />
          ))}
        </Deck>
      </div>
    </section>
  );
}
