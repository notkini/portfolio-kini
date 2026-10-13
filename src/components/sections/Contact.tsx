"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deck } from "@/components/ui/Deck";
import { ContactCard } from "@/components/ui/ContactCard";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

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
            I&apos;m open to software engineering internships, research
            collaborations, and interesting technical projects. If you&apos;d like to
            discuss an opportunity or just say hello, feel free to reach out.
          </motion.p>

          <Deck direction="vertical" fanSpread={80} fanAngle={3} cardHeight={88} className="min-h-[200px]">
            {contactMethods.map((method, i) => (
              <ContactCard key={method.label} method={method} index={i} />
            ))}
          </Deck>
        </div>
      </div>
    </section>
  );
}
