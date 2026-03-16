"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import BackgroundSystem from "./BackgroundSystem";
import SoftSkyEnvironment from "./SoftSkyEnvironment";
import GravitationalMemoryScene from "./GravitationalMemoryScene";
import Layer3 from "./Layer3";

gsap.registerPlugin(ScrollTrigger);

export default function Layer1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldProgress, setWorldProgress] = useState(0);

  // Sync to global body class for GlobalNiana text color transition
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Adjusting threshold downwards so text becomes white BEFORE the vortex consumes the view completely
      // Extending to 1.0 to hold the white color cleanly through the scroll into the AI/Digital World
      const inVortex = worldProgress > 0.15 && worldProgress <= 1.0;
      document.body.classList.toggle("in-vortex", inVortex);
    }
  }, [worldProgress]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Scroll Orchestrator
      // This pins the container and animates a dummy progress value 
      // which we use to transition backgrounds and typography.
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=450%", // Tighter duration since sections were removed to close the gap
          scrub: 1,
          pin: true,
          onUpdate: (self) => setWorldProgress(self.progress),
        }
      });

      // The stretching and font-morphing logic has been entirely removed as requested.
      // NIANA remains a fixed, stable architectural anchor, and the worlds transition behind it.
      // The scroll trigger still updates worldProgress (0 to 1), which drives the reveal of 
      // the different world components behind the typography.

    }, containerRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* Background System reacts to progress */}
      <BackgroundSystem progress={worldProgress} />

      {/* Scene 1: Beautiful Realistic Sky Environment */}
      <SoftSkyEnvironment progress={worldProgress} />
      
      {/* World 2: Gravitational Memory Scene */}
      <GravitationalMemoryScene progress={worldProgress} />

      {/* World 3: Digital / AI Scene */}
      <Layer3 progress={worldProgress} />

    </section>
  );
}


