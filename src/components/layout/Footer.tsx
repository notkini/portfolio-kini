import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { personalInfo, socialLinks, navItems } from "@/data/portfolio";

export function Footer() {
  const currentYear = 2026;

  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  } as const;

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Name + Nav */}
          <div>
            <span className="text-text-primary font-semibold text-sm">
              {personalInfo.name.split(" ")[0].toLowerCase()}
              <span className="text-accent">.</span>
            </span>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 mt-3" aria-label="Footer navigation">
              {navItems.slice(0, 5).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="p-2 text-text-muted hover:text-text-secondary transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-text-muted">
            © {currentYear} {personalInfo.name}. Built with Next.js &
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
