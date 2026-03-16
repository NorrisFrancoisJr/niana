"use client";

import { useEffect, useRef, useState } from "react";

export default function GlobalNiana() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLHeadingElement>(null);
  
  // Chromatic Ghost Refs
  const cyanRef = useRef<HTMLDivElement>(null);
  const magentaRef = useRef<HTMLDivElement>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    
    // Main text
    let currentX = 0;
    let currentY = 0;
    
    // Ghost layers (lagging)
    let cyanX = 0;
    let cyanY = 0;
    let magX = 0;
    let magY = 0;

    let timeout: NodeJS.Timeout;
    const onMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      
      setIsMouseActive(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMouseActive(false), 800);
    };

    window.addEventListener('mousemove', onMouseMove);

    const animationFrame = setInterval(() => {
      // 1. Move main text (fast response)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      // 2. Move ghosts (slower response for elegant lag / bloom)
      cyanX += (targetX - cyanX) * 0.04;
      cyanY += (targetY - cyanY) * 0.04;
      
      magX += (targetX - magX) * 0.02;
      magY += (targetY - magY) * 0.02;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${currentX * -15}px, ${currentY * -15}px, 0)`;
      }
      
      if (cyanRef.current) {
        cyanRef.current.style.transform = `translate3d(${cyanX * 35}px, ${cyanY * 35}px, 0)`;
      }
      if (magentaRef.current) {
        magentaRef.current.style.transform = `translate3d(${magX * -45}px, ${magY * -45}px, 0)`;
      }
      
    }, 1000 / 60);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(animationFrame);
      clearTimeout(timeout);
    };
  }, []);

  // Standard interactive scale logic based on isMouseActive is applied via classes
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[50] flex items-center justify-center"
    >
      <div 
        ref={parallaxRef}
        className="relative transition-transform will-change-transform"
      >
        {/* Chromatic Ghost Layer 1: Cyan (Lagging Positive) */}
        <div 
          ref={cyanRef} 
          className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-0 [.in-ai-world_&]:opacity-40 blur-[3px] ${isMouseActive ? '[.in-ai-world_&]:opacity-[0.8] blur-[5px] drop-shadow-[0_0_20px_rgba(106,169,255,0.6)] scale-105' : ''}`}
        >
          <h1 className="niana-container editorial-heading text-[18vw] md:text-[20vw] leading-none flex items-center justify-center tracking-tighter select-none text-[#6AA9FF]">
            <span className="niana-letter n1 inline-block">N</span>
            <span className="niana-letter i inline-block">I</span>
            <span className="niana-letter a1 inline-block">A</span>
            <span className="niana-letter n2 inline-block">N</span>
            <span className="niana-letter a2 inline-block">A</span>
          </h1>
        </div>

        {/* Chromatic Ghost Layer 2: Magenta (Lagging Negative) */}
        <div 
          ref={magentaRef} 
          className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-0 [.in-ai-world_&]:opacity-30 blur-[4px] ${isMouseActive ? '[.in-ai-world_&]:opacity-[0.6] blur-[8px] drop-shadow-[0_0_20px_rgba(201,75,255,0.4)] scale-105' : ''}`}
        >
          <h1 className="niana-container editorial-heading text-[18vw] md:text-[20vw] leading-none flex items-center justify-center tracking-tighter select-none text-[#C94BFF]">
            <span className="niana-letter n1 inline-block">N</span>
            <span className="niana-letter i inline-block">I</span>
            <span className="niana-letter a1 inline-block">A</span>
            <span className="niana-letter n2 inline-block">N</span>
            <span className="niana-letter a2 inline-block">A</span>
          </h1>
        </div>

        {/* Main Text Anchor */}
        <h1 
          ref={typographyRef}
          className="relative z-10 niana-container editorial-heading text-[18vw] md:text-[20vw] leading-none flex items-center justify-center tracking-tighter select-none transition-colors duration-1000 text-deep-charcoal [.in-vortex_&]:text-[#FFFFFF] [.in-ai-world_&]:text-[#F4F8FF]"
        >
          <span id="niana-l1" className="niana-letter n1 inline-block relative">
            N
            {/* Fake anchor point visual (only visible in AI world) */}
            <div className="absolute top-[20%] left-1/2 w-1.5 h-1.5 rounded-full bg-[#6AA9FF] opacity-0 [.in-ai-world_&]:opacity-80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#6AA9FF]" />
          </span>
          <span id="niana-l2" className="niana-letter i inline-block relative">
            I
            <div className="absolute top-[80%] left-1/2 w-1.5 h-1.5 rounded-full bg-[#C9E0FF] opacity-0 [.in-ai-world_&]:opacity-80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#C9E0FF]" />
          </span>
          <span id="niana-l3" className="niana-letter a1 inline-block relative">
            A
            <div className="absolute top-[10%] left-1/2 w-1.5 h-1.5 rounded-full bg-[#6AA9FF] opacity-0 [.in-ai-world_&]:opacity-80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#6AA9FF]" />
          </span>
          <span id="niana-l4" className="niana-letter n2 inline-block relative">
            N
            <div className="absolute top-[60%] left-1/2 w-1.5 h-1.5 rounded-full bg-[#C9E0FF] opacity-0 [.in-ai-world_&]:opacity-80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#C9E0FF]" />
          </span>
          <span id="niana-l5" className="niana-letter a2 inline-block relative">
            A
            <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 rounded-full bg-[#6AA9FF] opacity-0 [.in-ai-world_&]:opacity-80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#6AA9FF]" />
          </span>
        </h1>
      </div>
    </div>
  );
}
