"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ContactMethod {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
  description: string;
}

interface ContactCardProps {
  method: ContactMethod;
  index: number;
}

export function ContactCard({ method, index }: ContactCardProps) {
  return (
    <motion.a
      href={method.href}
      target={method.href.startsWith("http") ? "_blank" : undefined}
      rel={
        method.href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border hover:border-accent/30 hover:bg-surface-hover transition-colors group"
      aria-label={method.description}
    >
      <div className="p-2 rounded-md bg-accent-subtle">
        <method.icon size={18} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">
          {method.label}
        </p>
        <p className="text-xs text-text-muted truncate">
          {method.value}
        </p>
      </div>
      <ArrowUpRight
        size={14}
        className="text-text-muted group-hover:text-accent transition-colors shrink-0"
      />
    </motion.a>
  );
}