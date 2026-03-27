"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type PuppyState = "walking" | "sitting" | "sleeping" | "playing";

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
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const tailWag = Math.sin(frame * 0.5) * (isPlaying ? 25 : isWalking ? 15 : 8);
  const legMove = isWalking ? Math.sin(frame * 0.8) * 12 : 0;
  const bodyBob = isWalking ? Math.sin(frame * 0.8) * 2 : 0;
  const earTwitch = Math.sin(frame * 0.2) * 3;

  return (
    <div 
      style={{ 
        transform: `${facing === "left" ? "scaleX(-1)" : ""} ${isPlaying ? `rotate(${Math.sin(frame * 0.3) * 5}deg)` : ""}`,
        transition: "transform 0.1s"
      }}
    >
      <svg 
        width="38" 
        height="38" 
        viewBox="0 0 100 100"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      >
        <defs>
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
          <g>
            <ellipse cx="50" cy="65" rx="30" ry="20" fill="url(#furGradient)" />
            <circle cx="70" cy="55" r="18" fill="url(#furGradient)" />
            <ellipse cx="80" cy="45" rx="8" ry="12" fill="url(#darkFur)" />
            <path d="M 64 52 Q 68 55 72 52" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="85" cy="58" rx="4" ry="3" fill="url(#noseShine)" />
            <path d="M 20 60 Q 15 50 25 45" stroke="url(#furGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <ellipse cx="75" cy="75" rx="6" ry="4" fill="url(#darkFur)" />
            <ellipse cx="45" cy="60" rx="8" ry="6" fill="url(#darkFur)" opacity="0.5" />
          </g>
        ) : isSitting ? (
          <g>
            <ellipse cx="40" cy="70" rx="22" ry="18" fill="url(#furGradient)" />
            <ellipse cx="55" cy="60" rx="18" ry="22" fill="url(#furGradient)" />
            <circle cx="60" cy="35" r="20" fill="url(#furGradient)" />
            <ellipse cx="45" cy="20" rx="8" ry="14" fill="url(#darkFur)" style={{ transform: `rotate(${earTwitch}deg)`, transformOrigin: "45px 30px" }} />
            <ellipse cx="75" cy="20" rx="8" ry="14" fill="url(#darkFur)" style={{ transform: `rotate(${-earTwitch}deg)`, transformOrigin: "75px 30px" }} />
            <ellipse cx="75" cy="40" rx="12" ry="8" fill="#D4C4B0" />
            <ellipse cx="82" cy="38" rx="5" ry="4" fill="url(#noseShine)" />
            <circle cx="55" cy="32" r="4" fill="url(#eyeShine)" style={{ transform: frame % 120 < 5 ? "scaleY(0.1)" : "scaleY(1)", transformOrigin: "55px 32px" }} />
            <circle cx="70" cy="32" r="4" fill="url(#eyeShine)" style={{ transform: frame % 120 < 5 ? "scaleY(0.1)" : "scaleY(1)", transformOrigin: "70px 32px" }} />
            <circle cx="54" cy="31" r="1.5" fill="white" />
            <circle cx="69" cy="31" r="1.5" fill="white" />
            <path d="M 78 44 Q 82 48 78 48" stroke="#6B5344" strokeWidth="1.5" fill="none" />
            <ellipse cx="45" cy="85" rx="8" ry="5" fill="url(#darkFur)" />
            <ellipse cx="60" cy="85" rx="8" ry="5" fill="url(#darkFur)" />
            <path d={`M 18 65 Q 10 ${55 + tailWag * 0.3} 15 ${45 + tailWag * 0.5}`} stroke="url(#furGradient)" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="35" cy="68" rx="6" ry="5" fill="url(#darkFur)" opacity="0.5" />
          </g>
        ) : (
          <g style={{ transform: `translateY(${bodyBob}px)` }}>
            <ellipse cx="45" cy="55" rx="28" ry="20" fill="url(#furGradient)" />
            <circle cx="75" cy="35" r="20" fill="url(#furGradient)" />
            <ellipse cx="62" cy="18" rx="7" ry="12" fill="url(#darkFur)" style={{ transform: `rotate(${isWalking ? earTwitch * 2 : earTwitch}deg)`, transformOrigin: "62px 28px" }} />
            <ellipse cx="88" cy="18" rx="7" ry="12" fill="url(#darkFur)" style={{ transform: `rotate(${isWalking ? -earTwitch * 2 : -earTwitch}deg)`, transformOrigin: "88px 28px" }} />
            <ellipse cx="90" cy="40" rx="12" ry="8" fill="#D4C4B0" />
            <ellipse cx="98" cy="38" rx="5" ry="4" fill="url(#noseShine)" />
            <circle cx="70" cy="32" r="4" fill="url(#eyeShine)" style={{ transform: `scaleY(${frame % 120 < 5 ? 0.1 : 1}) translateY(${isPlaying ? Math.sin(frame * 0.3) * 2 : 0}px)`, transformOrigin: "70px 32px" }} />
            <circle cx="85" cy="32" r="4" fill="url(#eyeShine)" style={{ transform: `scaleY(${frame % 120 < 5 ? 0.1 : 1}) translateY(${isPlaying ? Math.sin(frame * 0.3) * 2 : 0}px)`, transformOrigin: "85px 32px" }} />
            <circle cx="69" cy="31" r="1.5" fill="white" />
            <circle cx="84" cy="31" r="1.5" fill="white" />
            {isPlaying ? (
              <path d="M 92 45 Q 96 52 92 52 Q 88 52 92 45" fill="#E87A7A" stroke="#6B5344" strokeWidth="1" />
            ) : (
              <path d="M 94 44 Q 98 48 94 48" stroke="#6B5344" strokeWidth="1.5" fill="none" />
            )}
            <ellipse cx="28" cy="78" rx="7" ry="10" fill="url(#darkFur)" style={{ transform: `rotate(${legMove}deg)`, transformOrigin: "28px 68px" }} />
            <ellipse cx="42" cy="78" rx="7" ry="10" fill="url(#darkFur)" style={{ transform: `rotate(${-legMove}deg)`, transformOrigin: "42px 68px" }} />
            <ellipse cx="55" cy="78" rx="7" ry="10" fill="url(#darkFur)" style={{ transform: `rotate(${legMove}deg)`, transformOrigin: "55px 68px" }} />
            <ellipse cx="65" cy="78" rx="7" ry="10" fill="url(#darkFur)" style={{ transform: `rotate(${-legMove}deg)`, transformOrigin: "65px 68px" }} />
            <path d={`M 15 50 Q 5 ${40 + tailWag * 0.3} 10 ${30 + tailWag * 0.5}`} stroke="url(#furGradient)" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="35" cy="52" rx="8" ry="6" fill="url(#darkFur)" opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

const SleepingZzz = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -top-2 -right-1 text-[hsl(var(--primary))]">
      <span 
        className="absolute text-[8px] font-bold"
        style={{ 
          right: 0, 
          top: 8,
          opacity: 0.3 + Math.sin(frame * 0.1) * 0.2,
          transform: `translateY(${Math.sin(frame * 0.1) * 2}px)`
        }}
      >
        z
      </span>
      <span 
        className="absolute text-[10px] font-bold"
        style={{ 
          right: 4, 
          top: 2,
          opacity: 0.4 + Math.sin(frame * 0.1 + 0.5) * 0.2,
          transform: `translateY(${Math.sin(frame * 0.1 + 0.5) * 2}px)`
        }}
      >
        Z
      </span>
      <span 
        className="absolute text-[12px] font-bold"
        style={{ 
          right: 10, 
          top: -4,
          opacity: 0.5 + Math.sin(frame * 0.1 + 1) * 0.2,
          transform: `translateY(${Math.sin(frame * 0.1 + 1) * 3}px)`
        }}
      >
        Z
      </span>
    </div>
  );
};

export default function SecretPuppy() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [puppyState, setPuppyState] = useState<PuppyState>("walking");
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isVisible, setIsVisible] = useState(false);
  
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setLastActivity(Date.now());
    
    if (isActive && puppyState === "sleeping") {
      setPuppyState("walking");
      if (sleepTimerRef.current) {
        clearTimeout(sleepTimerRef.current);
      }
    }
  }, [isActive, puppyState]);

  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastActivity >= IDLE_THRESHOLD && !isActive) {
        setIsActive(true);
        setIsVisible(true);
        const startX = Math.random() * (window.innerWidth - 100) + 50;
        setPosition({ x: startX, y: window.innerHeight - 60 });
        setPuppyState("walking");
      }
    };

    const interval = setInterval(checkIdle, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, isActive]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!isActive) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const targetX = cursorPosition.x;
        const targetY = cursorPosition.y - 40;
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (Math.abs(dx) > 3) {
          setFacing(dx > 0 ? "right" : "left");
        }

        if (distance < 40) {
          if (puppyState === "walking") {
            setPuppyState("playing");
            setTimeout(() => {
              if (puppyState !== "sleeping") {
                setPuppyState("sitting");
              }
            }, 2000);
          }
          const angle = Date.now() * 0.001;
          const radius = 25 + Math.sin(Date.now() * 0.002) * 5;
          return {
            x: targetX + Math.cos(angle) * radius,
            y: targetY + Math.sin(angle) * radius * 0.3,
          };
        } else if (distance > 150) {
          if (puppyState !== "walking") {
            setPuppyState("walking");
          }
          const speed = 4;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
          };
        } else {
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

  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        setIsVisible(false);
        setTimeout(() => {
          setIsActive(false);
        }, 300);
        setLastActivity(Date.now());
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
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
    </div>
  );
}
