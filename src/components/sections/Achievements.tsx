"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { achievements } from "@/data/portfolio";

export function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Achievements"
          subtitle="Competitions and recognition"
        />

        <Deck direction="horizontal" fanSpread={140} fanAngle={8} cardHeight={190} className="max-w-3xl min-h-[200px]">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </Deck>
      </div>
    </section>
  );
}
