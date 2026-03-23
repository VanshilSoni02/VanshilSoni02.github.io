"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Realistic cartoon puppy with smooth animations (~38px = ~1cm at 96dpi)
const RealisticPuppy = ({ 
  facing, 
  isWalking, 
  isSitting,
  isSleeping,
  isPlaying 
}: { 
  facing: "left" | "right";
  isWalking: boolean;
  isSitting: boolean;
  isSleeping: boolean;
  isPlaying: boolean;
}) => {
  return (
    <motion.div
      style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
      animate={isPlaying ? { rotate: [0, -5, 5, -5, 0] } : {}}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      <svg 
        width="38" 
        height="38" 
        viewBox="0 0 100 100"
        className="drop-shadow-md"
      >
        <defs>
          {/* Fur gradient */}
          <linearGradient id="furGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4A574" />
            <stop offset="50%" stopColor="#A8896A" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
          <linearGradient id="darkFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="100%" stopColor="#6B5344" />
          </linearGradient>
          <radialGradient id="noseShine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          <radialGradient id="eyeShine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
        
        {isSleeping ? (
          // Sleeping pose - curled up
          <g>
            {/* Curled body */}
            <ellipse cx="50" cy="65" rx="30" ry="20" fill="url(#furGradient)" />
            {/* Head resting */}
            <circle cx="70" cy="55" r="18" fill="url(#furGradient)" />
            {/* Ear flopped */}
            <ellipse cx="80" cy="45" rx="8" ry="12" fill="url(#darkFur)" />
            {/* Closed eyes */}
            <motion.path 
              d="M 64 52 Q 68 55 72 52" 
              stroke="#2D2D2D" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Nose */}
            <ellipse cx="85" cy="58" rx="4" ry="3" fill="url(#noseShine)" />
            {/* Tail curled */}
            <motion.path 
              d="M 20 60 Q 15 50 25 45" 
              stroke="url(#furGradient)" 
              strokeWidth="8" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Paw visible */}
            <ellipse cx="75" cy="75" rx="6" ry="4" fill="url(#darkFur)" />
            {/* Spot */}
            <ellipse cx="45" cy="60" rx="8" ry="6" fill="url(#darkFur)" opacity="0.5" />
          </g>
        ) : isSitting ? (
          // Sitting pose
          <g>
            {/* Back body */}
            <ellipse cx="40" cy="70" rx="22" ry="18" fill="url(#furGradient)" />
            {/* Front body/chest */}
            <ellipse cx="55" cy="60" rx="18" ry="22" fill="url(#furGradient)" />
            {/* Head */}
            <circle cx="60" cy="35" r="20" fill="url(#furGradient)" />
            {/* Ears */}
            <motion.ellipse 
              cx="45" cy="20" rx="8" ry="14" fill="url(#darkFur)"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.ellipse 
              cx="75" cy="20" rx="8" ry="14" fill="url(#darkFur)"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            />
            {/* Snout */}
            <ellipse cx="75" cy="40" rx="12" ry="8" fill="#D4C4B0" />
            {/* Nose */}
            <ellipse cx="82" cy="38" rx="5" ry="4" fill="url(#noseShine)" />
            {/* Eyes */}
            <motion.g
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
            >
              <circle cx="55" cy="32" r="4" fill="url(#eyeShine)" />
              <circle cx="70" cy="32" r="4" fill="url(#eyeShine)" />
              {/* Eye highlights */}
              <circle cx="54" cy="31" r="1.5" fill="white" />
              <circle cx="69" cy="31" r="1.5" fill="white" />
            </motion.g>
            {/* Mouth */}
            <path d="M 78 44 Q 82 48 78 48" stroke="#6B5344" strokeWidth="1.5" fill="none" />
            {/* Front paws */}
            <ellipse cx="45" cy="85" rx="8" ry="5" fill="url(#darkFur)" />
            <ellipse cx="60" cy="85" rx="8" ry="5" fill="url(#darkFur)" />
            {/* Tail wagging */}
            <motion.path 
              d="M 18 65 Q 10 55 15 45" 
              stroke="url(#furGradient)" 
              strokeWidth="10" 
              fill="none"
              strokeLinecap="round"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              style={{ transformOrigin: "18px 65px" }}
            />
            {/* Spot */}
            <ellipse cx="35" cy="68" rx="6" ry="5" fill="url(#darkFur)" opacity="0.5" />
          </g>
        ) : (
          // Walking/Standing pose
          <g>
            {/* Body */}
            <ellipse cx="45" cy="55" rx="28" ry="20" fill="url(#furGradient)" />
            {/* Head */}
            <circle cx="75" cy="35" r="20" fill="url(#furGradient)" />
            {/* Ears */}
            <motion.ellipse 
              cx="62" cy="18" rx="7" ry="12" fill="url(#darkFur)"
              animate={isWalking ? { rotate: [-3, 3, -3] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            <motion.ellipse 
              cx="88" cy="18" rx="7" ry="12" fill="url(#darkFur)"
              animate={isWalking ? { rotate: [3, -3, 3] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            {/* Snout */}
            <ellipse cx="90" cy="40" rx="12" ry="8" fill="#D4C4B0" />
            {/* Nose */}
            <ellipse cx="98" cy="38" rx="5" ry="4" fill="url(#noseShine)" />
            {/* Eyes */}
            <motion.g
              animate={isPlaying ? { y: [0, -2, 0] } : { scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: isPlaying ? 0.5 : 4, repeatDelay: isPlaying ? 0 : 2 }}
            >
              <circle cx="70" cy="32" r="4" fill="url(#eyeShine)" />
              <circle cx="85" cy="32" r="4" fill="url(#eyeShine)" />
              {/* Eye highlights */}
              <circle cx="69" cy="31" r="1.5" fill="white" />
              <circle cx="84" cy="31" r="1.5" fill="white" />
            </motion.g>
            {/* Mouth - happy when playing */}
            {isPlaying ? (
              <path d="M 92 45 Q 96 52 92 52 Q 88 52 92 45" fill="#E87A7A" stroke="#6B5344" strokeWidth="1" />
            ) : (
              <path d="M 94 44 Q 98 48 94 48" stroke="#6B5344" strokeWidth="1.5" fill="none" />
            )}
            {/* Legs with walking animation */}
            <motion.ellipse 
              cx="28" cy="78" rx="7" ry="10" fill="url(#darkFur)"
              animate={isWalking ? { y: [0, -5, 0], rotate: [-15, 15, -15] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
              style={{ transformOrigin: "28px 68px" }}
            />
            <motion.ellipse 
              cx="42" cy="78" rx="7" ry="10" fill="url(#darkFur)"
              animate={isWalking ? { y: [0, -5, 0], rotate: [15, -15, 15] } : {}}
              transition={{ repeat: Infinity, duration: 0.3, delay: 0.15 }}
              style={{ transformOrigin: "42px 68px" }}
            />
            <motion.ellipse 
              cx="55" cy="78" rx="7" ry="10" fill="url(#darkFur)"
              animate={isWalking ? { y: [0, -5, 0], rotate: [-15, 15, -15] } : {}}
              transition={{ repeat: Infinity, duration: 0.3, delay: 0.15 }}
              style={{ transformOrigin: "55px 68px" }}
            />
            <motion.ellipse 
              cx="65" cy="78" rx="7" ry="10" fill="url(#darkFur)"
              animate={isWalking ? { y: [0, -5, 0], rotate: [15, -15, 15] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
              style={{ transformOrigin: "65px 68px" }}
            />
            {/* Tail wagging */}
            <motion.path 
              d="M 15 50 Q 5 40 10 30" 
              stroke="url(#furGradient)" 
              strokeWidth="10" 
              fill="none"
              strokeLinecap="round"
              animate={{ rotate: isWalking || isPlaying ? [-20, 20, -20] : [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: isPlaying ? 0.2 : 0.4 }}
              style={{ transformOrigin: "15px 50px" }}
            />
            {/* Body spot */}
            <ellipse cx="35" cy="52" rx="8" ry="6" fill="url(#darkFur)" opacity="0.5" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

// Sleeping Zzz animation
const SleepingZzz = () => (
  <div className="absolute -top-2 -right-1">
    <motion.span
      className="absolute text-[8px] font-bold text-primary/50"
      style={{ right: 0, top: 8 }}
      animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      z
    </motion.span>
    <motion.span
      className="absolute text-[10px] font-bold text-primary/60"
      style={{ right: 4, top: 2 }}
      animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
    >
      Z
    </motion.span>
    <motion.span
      className="absolute text-[12px] font-bold text-primary/70"
      style={{ right: 10, top: -4 }}
      animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
    >
      Z
    </motion.span>
  </div>
);

type PuppyState = "walking" | "sitting" | "sleeping" | "playing";

export default function SecretPuppy() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [puppyState, setPuppyState] = useState<PuppyState>("walking");
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000; // 30 seconds

  // Track mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setLastActivity(Date.now());
    
    // If puppy was sleeping, wake it up
    if (isActive && puppyState === "sleeping") {
      setPuppyState("walking");
      if (sleepTimerRef.current) {
        clearTimeout(sleepTimerRef.current);
      }
    }
  }, [isActive, puppyState]);

  // Check for idle state to activate puppy
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastActivity >= IDLE_THRESHOLD && !isActive) {
        setIsActive(true);
        const startX = Math.random() * (window.innerWidth - 100) + 50;
        setPosition({ x: startX, y: window.innerHeight - 60 });
        setPuppyState("walking");
      }
    };

    const interval = setInterval(checkIdle, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, isActive]);

  // Add mouse move listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Puppy movement and behavior AI
  useEffect(() => {
    if (!isActive) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const targetX = cursorPosition.x;
        const targetY = cursorPosition.y - 40;
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update facing direction
        if (Math.abs(dx) > 3) {
          setFacing(dx > 0 ? "right" : "left");
        }

        // Behavior based on distance to cursor
        if (distance < 40) {
          // Very close - sit and play
          if (puppyState === "walking") {
            setPuppyState("playing");
            setTimeout(() => {
              if (puppyState !== "sleeping") {
                setPuppyState("sitting");
              }
            }, 2000);
          }
          // Gentle orbit around cursor
          const angle = Date.now() * 0.001;
          const radius = 25 + Math.sin(Date.now() * 0.002) * 5;
          return {
            x: targetX + Math.cos(angle) * radius,
            y: targetY + Math.sin(angle) * radius * 0.3,
          };
        } else if (distance > 150) {
          // Far - walk quickly towards cursor
          if (puppyState !== "walking") {
            setPuppyState("walking");
          }
          const speed = 4;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
          };
        } else {
          // Medium distance - walk slowly
          if (puppyState === "sleeping") {
            return prev;
          }
          if (puppyState !== "walking") {
            setPuppyState("walking");
          }
          const speed = 2;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
          };
        }
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isActive, cursorPosition, puppyState]);

  // Sleep timer - puppy sleeps if cursor stays still
  useEffect(() => {
    if (!isActive || puppyState === "sleeping") return;

    sleepTimerRef.current = setTimeout(() => {
      setPuppyState("sleeping");
    }, 15000);

    return () => {
      if (sleepTimerRef.current) {
        clearTimeout(sleepTimerRef.current);
      }
    };
  }, [isActive, cursorPosition, puppyState]);

  // Deactivate puppy when user clicks
  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        setIsActive(false);
        setLastActivity(Date.now());
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            y: 30,
            transition: { duration: 0.3 }
          }}
          transition={{ type: "spring", damping: 12, stiffness: 150 }}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: position.x - 19,
            top: position.y - 19,
          }}
        >
          <div className="relative">
            <RealisticPuppy 
              facing={facing} 
              isWalking={puppyState === "walking"}
              isSitting={puppyState === "sitting"}
              isSleeping={puppyState === "sleeping"}
              isPlaying={puppyState === "playing"}
            />
            {puppyState === "sleeping" && <SleepingZzz />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
