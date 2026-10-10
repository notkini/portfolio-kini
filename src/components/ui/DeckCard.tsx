"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { cn } from "@/lib/utils";

interface DeckCardProps {
  children: React.ReactNode;
  index: number;
  total?: number;
  className?: string;
  onPress?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  sound?: "card-flick" | "click" | "tick" | "confirm";
  disabled?: boolean;
  tabIndex?: number;
  role?: string;
}

const MAX_VISIBLE_DEPTH = 3;

export function DeckCard({
  children,
  index,
  className,
  onPress,
  onKeyDown,
  sound = "card-flick",
  disabled = false,
  tabIndex = 0,
  role = "button",
}: DeckCardProps) {
  const { play } = useSound();
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isTopCard = index < MAX_VISIBLE_DEPTH;
  const depth = Math.min(index, MAX_VISIBLE_DEPTH - 1);

  const baseZ = 50 - depth * 10;
  const pressedZ = 60;
  const baseRotate = depth > 0 ? (depth % 2 === 0 ? -0.5 : 0.5) : 0;
  const baseTranslateY = depth * 4;
  const baseScale = 1 - depth * 0.015;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      handlePress();
      onKeyDown?.(e);
    }
  };

  const handlePress = () => {
    if (disabled) return;
    play(sound);
    onPress?.();
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const pressedStyles = {
    zIndex: pressedZ,
    rotate: 0,
    translateY: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
    transition: "all 300ms ease-out",
  };

  const defaultStyles = {
    zIndex: baseZ,
    rotate: baseRotate,
    translateY: baseTranslateY,
    scale: baseScale,
    boxShadow: depth > 0 ? "0 4px 12px -4px rgba(0,0,0,0.08)" : "none",
    transition: "all 300ms ease-out",
  };

  const reducedMotionStyles = {
    zIndex: isPressed ? pressedZ : baseZ,
    scale: isPressed ? 1.02 : baseScale,
    boxShadow: isPressed ? "0 20px 40px -12px rgba(0,0,0,0.15)" : (depth > 0 ? "0 4px 12px -4px rgba(0,0,0,0.08)" : "none"),
    transition: "all 200ms ease-out",
  };

  return (
    <motion.div
      style={{
        zIndex: shouldReduceMotion
          ? reducedMotionStyles.zIndex
          : isPressed
          ? pressedStyles.zIndex
          : defaultStyles.zIndex,
      }}
      animate={{
        scale: shouldReduceMotion
          ? reducedMotionStyles.scale
          : isPressed
          ? pressedStyles.scale
          : defaultStyles.scale,
        rotate: shouldReduceMotion ? 0 : isPressed ? 0 : baseRotate,
        y: shouldReduceMotion ? 0 : isPressed ? -8 : baseTranslateY,
        boxShadow: shouldReduceMotion
          ? reducedMotionStyles.boxShadow
          : isPressed
          ? pressedStyles.boxShadow
          : defaultStyles.boxShadow,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={cn(
        "relative cursor-pointer",
        isTopCard && "z-10",
        className
      )}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={handlePress}
      tabIndex={disabled ? -1 : tabIndex}
      role={role}
      aria-pressed={isPressed}
      aria-disabled={disabled}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </motion.div>
  );
}