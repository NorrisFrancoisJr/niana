"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RefractionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow, organic movement for atmospheric layers
      gsap.to(".bloom-layer-1", {
        x: "10vw",
        y: "5vh",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".bloom-layer-2", {
        x: "-8vw",
        y: "-12vh",
        duration: 32,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".bloom-layer-3", {
        x: "5vw",
        y: "15vh",
        duration: 28,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Subtle pulse for the "core" light
      gsap.to(".atmospheric-core", {
        opacity: 0.6,
        scale: 1.1,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, overlayRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Base Haze */}
      <div className="absolute inset-0 bg-gradient-to-tr from-warm-ivory/30 via-transparent to-pale-stone/20 mix-blend-soft-light" />
      
      {/* Living Atmospheric Layers */}
      <div className="bloom-layer-1 atmospheric-core absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-soft-gold/15 blur-[160px] opacity-40 mix-blend-screen" />
      <div className="bloom-layer-2 absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-blush-sand/20 blur-[200px] opacity-30 mix-blend-multiply" />
      <div className="bloom-layer-3 absolute top-[30%] left-[40%] w-[60vw] h-[60vw] rounded-full bg-silver-mist/10 blur-[140px] opacity-25 mix-blend-overlay" />

      {/* Glass / Refraction Simulation Layer */}
      <div className="absolute inset-0 backdrop-blur-[2px] opacity-50" />
      
      {/* Global Vignette for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(30,30,30,0.03)_100%)]" />

      {/* Fine Noise (Redundant with globals.css but kept for layered intensity if needed) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="atmosphericNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#atmosphericNoise)" />
      </svg>
    </div>
  );
}
