"use client";

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeckProps {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
  fanAngle?: number;
  fanSpread?: number;
  onCardSelect?: (index: number) => void;
  layout?: "fan" | "list";
  cardHeight?: number;
}

export function Deck({
  children,
  direction = "horizontal",
  className,
  fanAngle = 8,
  fanSpread = 120,
  onCardSelect,
  layout = "fan",
  cardHeight = 260,
}: DeckProps) {
  const shouldReduceMotion = useReducedMotion();
  const cards = useMemo(() => React.Children.toArray(children), [children]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const deckRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight") setSelectedIndex((current) => current === null ? null : (current + 1) % cards.length);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => current === null ? null : (current - 1 + cards.length) % cards.length);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      requestAnimationFrame(() => lastFocusRef.current?.focus());
    };
  }, [selectedIndex, close, cards.length]);

  const selectCard = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const link = target.closest("a");
    if (link) event.preventDefault();
    else if (target.closest("button, input, select, textarea, [data-card-interactive]")) return;
    lastFocusRef.current = event.currentTarget;
    setSelectedIndex(index);
    onCardSelect?.(index);
  };

  const keySelect = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if ((event.target as HTMLElement).closest("a, button, input, select, textarea, [data-card-interactive]")) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      lastFocusRef.current = event.currentTarget;
      setSelectedIndex(index);
      onCardSelect?.(index);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      deckRef.current?.querySelector<HTMLElement>(`[data-card-index="${(index + 1) % cards.length}"]`)?.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      deckRef.current?.querySelector<HTMLElement>(`[data-card-index="${(index - 1 + cards.length) % cards.length}"]`)?.focus();
    }
  };

  const isList = layout === "list";
  const styleForCard = (index: number): React.CSSProperties => {
    if (isList) return {};
    const count = cards.length;
    const centered = index - (count - 1) / 2;
    const maxSpread = Math.min(fanSpread, Math.max(30, (typeof window !== "undefined" ? window.innerWidth : 900) * 0.55));
    const spread = isFanned ? maxSpread : Math.min(26, maxSpread / Math.max(1, count - 1));
    if (direction === "vertical") {
      const verticalSpread = isFanned ? Math.min(76, spread * 0.55) : Math.min(18, spread * 0.14);
      return {
        zIndex: hoveredIndex === index ? cards.length + 2 : index + 1,
        left: "50%",
        top: `calc(50% + ${centered * verticalSpread}px)`,
        marginLeft: "calc(-1 * min(41vw, 170px))",
        marginTop: `-${cardHeight / 2}px`,
      };
    }
    return {
      zIndex: hoveredIndex === index ? cards.length + 2 : index + 1,
      left: "50%",
      top: "50%",
      marginLeft: `calc(-1 * min(41vw, 170px) + ${centered * spread}px)`,
      marginTop: `calc(-${cardHeight / 2}px + ${Math.abs(centered) * (isFanned ? 5 : 2)}px)`,
    };
  };

  return (
    <>
      <div
        ref={deckRef}
        className={cn("relative mx-auto", isList ? "space-y-5" : "deck-fan h-[300px] sm:h-[340px]", className)}
        onMouseEnter={() => !isList && setIsFanned(true)}
        onMouseLeave={() => !isList && setIsFanned(false)}
        onFocusCapture={() => !isList && setIsFanned(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsFanned(false);
        }}
        onTouchStart={() => !isList && setIsFanned(true)}
        role="list"
      >
        {cards.map((card, index) => (
          <motion.div
            key={(card as React.ReactElement).key ?? index}
            data-card-index={index}
            role="listitem"
            tabIndex={selectedIndex === null ? 0 : -1}
            aria-label={`Open card ${index + 1} of ${cards.length}`}
            onClick={(event) => selectCard(index, event)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex((current) => current === index ? null : current)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex((current) => current === index ? null : current)}
            onKeyDown={(event) => keySelect(event, index)}
            animate={isList ? {
              y: hoveredIndex === index && !shouldReduceMotion ? -5 : 0,
              scale: hoveredIndex === index && !shouldReduceMotion ? 1.01 : 1,
            } : {
              scale: hoveredIndex === index ? 1 : isFanned ? 0.99 : 0.96,
              rotate: ((index - (cards.length - 1) / 2) / Math.max(1, (cards.length - 1) / 2)) * (isFanned ? fanAngle / 2 : Math.min(1.5, fanAngle / 6)),
              y: shouldReduceMotion ? 0 : hoveredIndex === index ? -12 : isFanned ? -2 : 0,
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-shadow",
              isList ? "relative w-full" : "absolute h-[var(--deck-card-height)] w-[min(82vw,340px)] overflow-hidden sm:w-[340px]",
              selectedIndex === index && "invisible"
            )}
            style={{ ...styleForCard(index), "--deck-card-height": `${cardHeight}px` } as React.CSSProperties}
          >
            <div className={cn("h-full rounded-xl bg-surface ring-1 ring-border transition-shadow duration-300", hoveredIndex === index ? "shadow-[0_22px_44px_-22px_rgba(0,0,0,.34)]" : "shadow-[0_12px_32px_-20px_rgba(0,0,0,.32)]")}>
              {card}
            </div>
          </motion.div>
        ))}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-3 backdrop-blur-[2px] sm:p-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
              onTouchStart={(event) => { if (event.target === event.currentTarget) close(); }}
              aria-modal="true" role="dialog" aria-label="Selected card"
            >
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                onMouseDown={(event) => event.stopPropagation()}
                className="relative max-h-[min(88dvh,900px)] w-full max-w-[min(92vw,620px)] overflow-y-auto rounded-2xl bg-white p-5 shadow-[0_32px_100px_-28px_rgba(0,0,0,.35)] ring-1 ring-border sm:p-8"
              >
                <button type="button" onClick={close} aria-label="Close card" className="absolute right-3 top-3 z-10 rounded-full border border-border bg-white p-2 text-text-secondary hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                  <X size={16} />
                </button>
                <div className="pt-5">{cards[selectedIndex]}</div>
                <div className="mt-6 flex justify-between border-t border-border pt-4">
                  <button type="button" onClick={() => setSelectedIndex((selectedIndex - 1 + cards.length) % cards.length)} className="text-sm text-text-secondary hover:text-text-primary">Previous</button>
                  <button type="button" onClick={() => setSelectedIndex((selectedIndex + 1) % cards.length)} className="text-sm text-text-secondary hover:text-text-primary">Next</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>, document.body
      )}
    </>
  );
}
