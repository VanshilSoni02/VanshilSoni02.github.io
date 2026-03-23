"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Tiny pixel art puppy SVG (approximately 1cm x 1cm at standard screen DPI)
const PuppySVG = ({ facing }: { facing: "left" | "right" }) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 16 16"
    style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
  >
    {/* Body */}
    <rect x="4" y="8" width="8" height="5" fill="#8B7355" />
    {/* Head */}
    <rect x="9" y="4" width="5" height="5" fill="#8B7355" />
    {/* Ear */}
    <rect x="12" y="2" width="2" height="3" fill="#6B5344" />
    <rect x="9" y="3" width="2" height="2" fill="#6B5344" />
    {/* Snout */}
    <rect x="13" y="6" width="2" height="2" fill="#D4B896" />
    {/* Nose */}
    <rect x="14" y="6" width="1" height="1" fill="#2D2D2D" />
    {/* Eye */}
    <rect x="11" y="5" width="1" height="1" fill="#2D2D2D" />
    {/* Legs */}
    <rect x="5" y="13" width="2" height="3" fill="#8B7355" />
    <rect x="9" y="13" width="2" height="3" fill="#8B7355" />
    {/* Tail */}
    <rect x="2" y="7" width="3" height="2" fill="#8B7355" />
    <rect x="1" y="6" width="2" height="2" fill="#8B7355" />
    {/* Spots */}
    <rect x="6" y="9" width="2" height="2" fill="#6B5344" />
    <rect x="10" y="5" width="1" height="1" fill="#D4B896" />
  </svg>
);

// Walking animation frames
const WalkingPuppy = ({ facing, isWalking }: { facing: "left" | "right"; isWalking: boolean }) => (
  <motion.div
    animate={isWalking ? { y: [0, -2, 0] } : {}}
    transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
  >
    <PuppySVG facing={facing} />
  </motion.div>
);

// Sitting puppy variant
const SittingPuppySVG = () => (
  <svg width="38" height="38" viewBox="0 0 16 16">
    {/* Body (sitting) */}
    <rect x="4" y="9" width="7" height="4" fill="#8B7355" />
    {/* Back curve */}
    <rect x="3" y="8" width="2" height="3" fill="#8B7355" />
    {/* Head */}
    <rect x="8" y="4" width="5" height="5" fill="#8B7355" />
    {/* Ear */}
    <rect x="11" y="2" width="2" height="3" fill="#6B5344" />
    <rect x="8" y="3" width="2" height="2" fill="#6B5344" />
    {/* Snout */}
    <rect x="12" y="6" width="2" height="2" fill="#D4B896" />
    {/* Nose */}
    <rect x="13" y="6" width="1" height="1" fill="#2D2D2D" />
    {/* Eye */}
    <rect x="10" y="5" width="1" height="1" fill="#2D2D2D" />
    {/* Front paws */}
    <rect x="9" y="13" width="2" height="2" fill="#8B7355" />
    {/* Back leg */}
    <rect x="4" y="12" width="3" height="3" fill="#8B7355" />
    {/* Tail up */}
    <rect x="2" y="6" width="2" height="3" fill="#8B7355" />
    <rect x="1" y="4" width="2" height="3" fill="#8B7355" />
    {/* Spots */}
    <rect x="5" y="10" width="2" height="2" fill="#6B5344" />
  </svg>
);

// Sleeping puppy with Zzz
const SleepingPuppy = () => (
  <div className="relative">
    <svg width="38" height="38" viewBox="0 0 16 16">
      {/* Body (lying) */}
      <rect x="2" y="10" width="10" height="4" fill="#8B7355" />
      {/* Head on paws */}
      <rect x="10" y="8" width="4" height="4" fill="#8B7355" />
      {/* Ear flopped */}
      <rect x="12" y="7" width="2" height="2" fill="#6B5344" />
      {/* Closed eye */}
      <rect x="12" y="10" width="2" height="1" fill="#2D2D2D" />
      {/* Snout */}
      <rect x="14" y="10" width="1" height="2" fill="#D4B896" />
      {/* Paws stretched */}
      <rect x="1" y="13" width="3" height="2" fill="#8B7355" />
      {/* Tail */}
      <rect x="0" y="11" width="3" height="2" fill="#8B7355" />
      {/* Spot */}
      <rect x="5" y="11" width="2" height="2" fill="#6B5344" />
    </svg>
    {/* Zzz animation */}
    <motion.div
      className="absolute -top-3 right-0 text-xs font-mono text-primary/60"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      z
    </motion.div>
    <motion.div
      className="absolute -top-5 right-2 text-sm font-mono text-primary/70"
      animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
    >
      Z
    </motion.div>
  </div>
);

type PuppyState = "walking" | "sitting" | "sleeping" | "playing";

export default function SecretPuppy() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [puppyState, setPuppyState] = useState<PuppyState>("walking");
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000; // 30 seconds
  
  // Track mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setLastActivity(Date.now());
    
    // Reset idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    // If puppy was sleeping, wake it up
    if (isActive && puppyState === "sleeping") {
      setPuppyState("walking");
    }
  }, [isActive, puppyState]);

  // Check for idle state
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastActivity >= IDLE_THRESHOLD && !isActive) {
        // Activate puppy after 30 seconds of idle
        setIsActive(true);
        // Start near bottom of screen
        const startX = Math.random() * (window.innerWidth - 100) + 50;
        setPosition({ x: startX, y: window.innerHeight - 60 });
        setTargetPosition({ x: cursorPosition.x, y: cursorPosition.y - 50 });
      }
    };

    const interval = setInterval(checkIdle, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, isActive, cursorPosition]);

  // Add mouse move listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Puppy movement AI
  useEffect(() => {
    if (!isActive) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        // Calculate distance to cursor
        const dx = cursorPosition.x - prev.x;
        const dy = (cursorPosition.y - 50) - prev.y; // Offset to appear near cursor
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update facing direction
        if (Math.abs(dx) > 5) {
          setFacing(dx > 0 ? "right" : "left");
        }

        // Behavior based on distance
        if (distance < 50) {
          // Close to cursor - play around it
          if (puppyState !== "playing" && puppyState !== "sitting") {
            setPuppyState("playing");
            // After playing, sit down
            setTimeout(() => {
              setPuppyState("sitting");
            }, 3000);
          }
          
          // Small random movements around cursor
          const angle = Date.now() * 0.002;
          const radius = 30 + Math.sin(Date.now() * 0.003) * 10;
          return {
            x: cursorPosition.x + Math.cos(angle) * radius,
            y: cursorPosition.y - 50 + Math.sin(angle) * radius * 0.5,
          };
        } else if (distance > 200) {
          // Far from cursor - walk towards it
          setPuppyState("walking");
          const speed = 3;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
          };
        } else {
          // Medium distance - slower approach
          setPuppyState("walking");
          const speed = 1.5;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
          };
        }
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isActive, cursorPosition, puppyState]);

  // Go to sleep if cursor hasn't moved for a while
  useEffect(() => {
    if (!isActive) return;

    idleTimerRef.current = setTimeout(() => {
      setPuppyState("sleeping");
    }, 10000); // 10 seconds after appearing

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [isActive, cursorPosition]);

  // Deactivate puppy when user clicks
  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        // Puppy runs away when clicked
        setIsActive(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", damping: 15 }}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: position.x - 19,
            top: position.y - 19,
          }}
        >
          {puppyState === "sleeping" ? (
            <SleepingPuppy />
          ) : puppyState === "sitting" ? (
            <SittingPuppySVG />
          ) : (
            <WalkingPuppy facing={facing} isWalking={puppyState === "walking"} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
