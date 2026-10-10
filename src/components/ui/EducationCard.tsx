"use client";

import type { Education } from "@/data/portfolio";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="p-4 rounded-lg bg-surface border border-border h-full">
      <p className="text-sm font-medium text-text-primary">
        {education.degree}
      </p>
      <p className="text-xs text-text-secondary mt-1">
        {education.institution}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs font-medium text-accent">
          {education.score}
        </span>
        {education.period && (
          <span className="text-xs text-text-muted">
            · {education.period}
          </span>
        )}
      </div>
      {education.focus && (
        <p className="text-xs text-text-muted mt-2">
          Focus: {education.focus}
        </p>
      )}
    </div>
  );
}