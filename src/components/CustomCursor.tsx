"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // The tiny core dot
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      
      // The large glass refraction lens
      gsap.to(lensRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // We scale the lens up when hovering over typography or interactive elements
      setIsInteractive(
        target.closest(".interactive") !== null || 
        target.tagName === "BUTTON" || 
        target.tagName === "A" ||
        target.closest(".n-letter") !== null ||
        target.closest(".i-letter") !== null ||
        target.closest(".a-letter") !== null
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Core Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[3px] h-[3px] bg-deep-charcoal rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Glass Refraction Lens */}
      <div 
        ref={lensRef} 
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out overflow-hidden flex items-center justify-center ${
          isInteractive 
            ? 'w-48 h-48 backdrop-blur-[8px] bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.2)] border border-white/20' 
            : 'w-24 h-24 backdrop-blur-[4px] bg-white/5 border border-white/10'
        }`}
        style={{
          // Use CSS backdrop-filter for the optical distortion
          backdropFilter: isInteractive ? 'blur(12px) brightness(1.1) contrast(1.05)' : 'blur(4px) brightness(1.02)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-muted-gold/5 via-transparent to-soft-sand/5 mix-blend-overlay animate-pulse-slow opacity-50" />
      </div>
    </>
  );
}
