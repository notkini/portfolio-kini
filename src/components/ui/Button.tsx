import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  download?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external,
  download,
  className,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover active:scale-[0.98]",
    secondary:
      "bg-surface border border-border text-text-primary hover:bg-surface-hover hover:border-accent/30 active:scale-[0.98]",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-surface active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (external || download) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          download={download || undefined}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}
