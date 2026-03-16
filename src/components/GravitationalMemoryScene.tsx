"use client";

import { useRef } from "react";
import VortexScene from "./world2/VortexScene";

export default function GravitationalMemoryScene({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      id="vortex-scene-marker"
      ref={containerRef} 
      className="absolute inset-0 z-[70] pointer-events-none"
    >
      {/* 
        We delegate all the complex rendering and animation to the React Three Fiber Canvas
        We pass down the world progress so it can control camera rotation and scene intensity 
      */}
      <VortexScene progress={progress} />
    </div>
  );
}
