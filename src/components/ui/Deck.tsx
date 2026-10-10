"use client";

import React, { useState, useRef, useEffect, useCallback, KeyboardEvent, ReactNode, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { cn } from "@/lib/utils";

interface DeckCardItem {
  id: string;
  content: ReactNode;
  index: number;
}

interface DeckProps {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
  fanAngle?: number;
  fanSpread?: number;
  onCardSelect?: (index: number) => void;
}

const MAX_STACK_DEPTH = 5;
const STACK_OFFSET = 8;
const STACK_ROTATION = 2;

export function Deck({
  children,
  direction = "horizontal",
  className,
  fanAngle = 8,
  fanSpread = 120,
  onCardSelect,
}: DeckProps) {
  const { play } = useSound();
  const shouldReduceMotion = useReducedMotion();
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [drawnIndex, setDrawnIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const fanOutPlayedRef = useRef(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const childArray = Array.isArray(children) ? children : [children];
  const cards: DeckCardItem[] = childArray
    .filter((child): child is React.ReactElement => React.isValidElement(child))
    .map((child, index) => ({
      id: child.key as string || `card-${index}`,
      content: child,
      index,
    }));

  const totalCards = cards.length;
  const visibleDepth = Math.min(totalCards, MAX_STACK_DEPTH);

  const handleFanOut = useCallback(() => {
    if (!isFanned) {
      setIsFanned(true);
      if (!fanOutPlayedRef.current && !shouldReduceMotion) {
        play("shuffle");
        fanOutPlayedRef.current = true;
      }
    }
  }, [isFanned, play, shouldReduceMotion]);

  const handleFanIn = useCallback(() => {
    if (isFanned && !isTouchDevice) {
      setIsFanned(false);
      setHoveredIndex(null);
      fanOutPlayedRef.current = false;
    }
  }, [isFanned, isTouchDevice]);

  const handleCardHover = useCallback((index: number) => {
    if (isFanned) {
      setHoveredIndex(index);
      if (!shouldReduceMotion) {
        play("tick");
      }
    }
  }, [isFanned, play, shouldReduceMotion]);

  const handleCardLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleCardClick = useCallback((index: number) => {
    setDrawnIndex(index);
    play("card-flick");
    onCardSelect?.(index);
    setTimeout(() => setDrawnIndex(null), 600);
  }, [play, onCardSelect]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!isFanned) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleFanOut();
      }
      return;
    }

    const currentFocus = hoveredIndex ?? 0;
    let newFocus = currentFocus;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newFocus = (currentFocus + 1) % totalCards;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newFocus = (currentFocus - 1 + totalCards) % totalCards;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleCardClick(currentFocus);
        return;
      case "Escape":
        e.preventDefault();
        handleFanIn();
        return;
      case "Tab":
        if (e.shiftKey) {
          e.preventDefault();
          newFocus = (currentFocus - 1 + totalCards) % totalCards;
        } else {
          e.preventDefault();
          newFocus = (currentFocus + 1) % totalCards;
        }
        break;
      default:
        return;
    }

    setHoveredIndex(newFocus);
    if (!shouldReduceMotion) {
      play("tick");
    }
  }, [isFanned, hoveredIndex, totalCards, handleFanOut, handleFanIn, handleCardClick, play, shouldReduceMotion]);

  const getStackStyle = (index: number) => {
    if (index >= visibleDepth) {
      return { display: "none" as const };
    }

    const depth = visibleDepth - 1 - index;
    const isDrawn = drawnIndex === index;
    const isHovered = hoveredIndex === index && isFanned;

    const baseZ = 100 - depth * 10;
    const spread = direction === "horizontal" ? fanSpread : 0;
    const translateY = direction === "vertical" ? fanSpread : 0;
    const angle = direction === "horizontal"
      ? (index - (visibleDepth - 1) / 2) * (fanAngle / Math.max(1, visibleDepth - 1))
      : 0;

    if (shouldReduceMotion) {
      if (isDrawn) {
        return {
          zIndex: 200,
          y: -16,
          scale: 1.04,
          rotate: 0,
          boxShadow: "0 24px 48px -16px rgba(0,0,0,0.2)",
          transition: { duration: 0.4, ease: "easeOut" },
        };
      }
      if (isFanned) {
        return {
          zIndex: baseZ,
          x: index * (spread / Math.max(1, visibleDepth - 1)),
          y: index * (translateY / Math.max(1, visibleDepth - 1)),
          rotate: 0,
          scale: 1,
        };
      }
      return {
        zIndex: baseZ,
        y: depth * STACK_OFFSET,
        rotate: depth % 2 === 0 ? -STACK_ROTATION : STACK_ROTATION,
        scale: 1 - depth * 0.015,
      };
    }

    if (isDrawn) {
      return {
        zIndex: 200,
        y: -16,
        scale: 1.04,
        rotate: 0,
        boxShadow: "0 24px 48px -16px rgba(0,0,0,0.2)",
        transition: { duration: 0.4, ease: "easeOut" },
      };
    }

    if (isFanned) {
      const isActiveHover = isHovered;
      const hoverLift = isActiveHover ? -12 : 0;
      const hoverScale = isActiveHover ? 1.03 : 1;
      const hoverShadow = isActiveHover ? "0 20px 40px -12px rgba(0,0,0,0.18)" : undefined;

      return {
        zIndex: 100 + index,
        x: index * (spread / Math.max(1, visibleDepth - 1)),
        y: index * (translateY / Math.max(1, visibleDepth - 1)) + hoverLift,
        rotate: angle,
        scale: hoverScale,
        boxShadow: hoverShadow,
        transition: { duration: 0.35, ease: "easeOut", delay: index * 0.03 },
      };
    }

    return {
      zIndex: baseZ,
      y: depth * STACK_OFFSET,
      rotate: depth % 2 === 0 ? -STACK_ROTATION : STACK_ROTATION,
      scale: 1 - depth * 0.015,
      boxShadow: depth > 0 ? "0 4px 12px -4px rgba(0,0,0,0.08)" : "none",
      transition: { duration: 0.3, ease: "easeOut" },
    };
  };

  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isFanned) {
      handleFanOut();
    } else {
      handleCardClick(index);
    }
  }, [isFanned, handleFanOut, handleCardClick]);

  const handleDeckTouchStart = useCallback(() => {
    if (!isFanned) {
      handleFanOut();
    }
  }, [isFanned, handleFanOut]);

  return (
    <motion.div
      ref={deckRef}
      className={cn("relative", className)}
      onMouseEnter={handleFanOut}
      onMouseLeave={handleFanIn}
      onFocus={handleFanOut}
      onBlur={handleFanIn}
      onKeyDown={handleKeyDown}
      onTouchStart={handleDeckTouchStart}
      role="list"
      aria-label={`Card deck with ${totalCards} cards`}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            style={getStackStyle(index) as CSSProperties}
            className="relative cursor-pointer touch-none"
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
            onClick={() => handleCardClick(index)}
            onTouchStart={(e) => handleTouchStart(index, e)}
            role="listitem"
            tabIndex={isFanned ? 0 : -1}
            aria-label={`Card ${index + 1} of ${totalCards}`}
            data-selected={hoveredIndex === index}
            data-drawn={drawnIndex === index}
            data-fanned={isFanned}
          >
            {card.content}
          </motion.div>
        ))}
      </AnimatePresence>

      {!isFanned && totalCards > 1 && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-text-muted/50">
            Hover to fan out
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}