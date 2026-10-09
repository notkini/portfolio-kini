"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo, socialLinks } from "@/data/portfolio";

export function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: "Send me an email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Aditya Kinikar",
      href: socialLinks.find((l) => l.icon === "linkedin")!.href,
      description: "Connect on LinkedIn",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "notkini",
      href: socialLinks.find((l) => l.icon === "github")!.href,
      description: "View my GitHub profile",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Get in Touch"
          subtitle="Let's connect"
        />

        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm md:text-base text-text-secondary leading-relaxed mb-8"
          >
            I'm open to software engineering internships, research
            collaborations, and interesting technical projects. If you'd like to
            discuss an opportunity or just say hello, feel free to reach out.
          </motion.p>

          <div className="space-y-3">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
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
            ))}
          </div>

          {/* Resume download
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="mt-6 pt-6 border-t border-border"
          >
            <a
              href={personalInfo.resumePath}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover active:scale-[0.98] transition-all"
              aria-label="Download resume PDF"
            >
              Download Resume
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
          */}
        </div>
      </div>
    </section>
  );
}
