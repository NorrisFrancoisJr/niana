"use client";

import { useEffect, useRef, useMemo } from "react";

export default function FlamboyantMorning({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax refs
  const trunkRef = useRef<HTMLDivElement>(null);
  const canopyRef = useRef<HTMLDivElement>(null);
  const bokehRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dappledLightRef = useRef<HTMLDivElement>(null);

  // Interaction: Parallax Engine
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animationFrame = setInterval(() => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Apply different parallax depth multipliers
      if (trunkRef.current) trunkRef.current.style.transform = `translate3d(${currentX * -5}px, ${currentY * -3}px, 0)`;
      if (canopyRef.current) canopyRef.current.style.transform = `translate3d(${currentX * -10}px, ${currentY * -5}px, 0)`;
      if (bokehRef.current) bokehRef.current.style.transform = `translate3d(${currentX * 25}px, ${currentY * 15}px, 0)`;
      if (grassRef.current) grassRef.current.style.transform = `translate3d(${currentX * -30}px, ${currentY * -10}px, 0)`;
      if (particlesRef.current) particlesRef.current.style.transform = `translate3d(${currentX * 10}px, ${currentY * 20}px, 0)`;
      if (dappledLightRef.current) dappledLightRef.current.style.transform = `translate3d(${currentX * -2}px, ${currentY * -2}px, 0)`;

    }, 1000 / 60);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(animationFrame);
    };
  }, []);

  // Air Particles Data
  const airParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
  }, []);

  // Bokeh Layer Data
  const bokehNodes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60, // Keep bokeh mostly top/middle
      size: Math.random() * 150 + 50,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 30 + 20,
      color: Math.random() > 0.5 ? '#FEF6E4' : '#FFE8C2', 
    }));
  }, []);

  // Render logic based on progress
  // Layer 1 operates from 0 to 800vh. Flamboyant scene is active for progress < 0.15
  // We fade it out when progressing into the void (0.12 - 0.15)
  const isActive = progress < 0.15;
  const fadeOutOpacity = progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / 0.03);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
      style={{ opacity: fadeOutOpacity }}
    >
      {/* 1. Background Light Field */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(135deg, #FDFBF7 0%, #F4ECE1 50%, #E8DCCB 100%)',
        }}
      >
        {/* Soft pale sky tones breaking through cream */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
             style={{
               background: 'radial-gradient(circle at 70% 30%, #D8E4E8 0%, transparent 60%), radial-gradient(circle at 30% 80%, #FFFDF8 0%, transparent 50%)'
             }} 
        />
      </div>

      {/* 2. Bokeh Layer */}
      <div ref={bokehRef} className="absolute inset-0 transition-transform will-change-transform">
        {bokehNodes.map(b => (
          <div 
            key={b.id}
            className="absolute rounded-full mix-blend-screen blur-[15px]"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundColor: b.color,
              opacity: b.opacity,
              animation: `drift ${b.duration}s infinite alternate ease-in-out`,
              animationDelay: `${b.duration}s` // Using duration as an arbitrary delay offset
            }}
          />
        ))}
      </div>

      {/* Dappled Light / Shade Pattern (Very low opacity) */}
      <div ref={dappledLightRef} className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-multiply transition-transform will-change-transform">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full filter blur-[24px]">
            {/* Generating an abstract dappled leaf shadow pattern */}
            <path d="M 0,0 C 100,50 200,-50 300,0 C 400,50 500,100 600,0 C 700,-100 800,50 1000,0 L 1000,1000 L 0,1000 Z" fill="#000" />
            <path d="M 150,0 Q 250,300 100,600 T 50,1000 L 0,1000 L 0,0 Z" fill="#000" />
            <path d="M 850,0 Q 750,300 900,600 T 950,1000 L 1000,1000 L 1000,0 Z" fill="#000" />
            <circle cx="200" cy="200" r="150" fill="#000" />
            <circle cx="800" cy="300" r="200" fill="#000" />
            <circle cx="500" cy="800" r="250" fill="#000" />
        </svg>
      </div>

      {/* 3. Tree Trunk Edge */}
      <div ref={trunkRef} className="absolute -left-[5%] top-0 bottom-0 w-[25vw] max-w-[400px] z-20 opacity-90 blur-[4px] transition-transform will-change-transform flex items-center">
        {/* Placeholder SVG for Trunk. Replace this with an actual `<img src="/tree-trunk.webp" />` if the user adds one. */}
        <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-[120vh] fill-[#3A2E2A]">
          <path d="M 0,0 L 80,0 C 70,200 90,400 60,600 C 50,700 85,850 70,1000 L 0,1000 Z" />
        </svg>
      </div>

      {/* 4. Hanging Canopy & Flamboyant Flowers */}
      <div ref={canopyRef} className="absolute -top-[10%] left-0 right-0 h-[45vh] z-30 transition-transform will-change-transform flex justify-between origin-top"
           style={{
             animation: 'canopySway 12s infinite alternate ease-in-out'
           }}>
        {/* We use SVG shapes to mimic lush canopy & red flamboyant blooms. In a production build, user will drop in a WebP image here */}
        
        {/* Left Canopy cluster */}
        <svg viewBox="0 0 500 400" className="absolute left-[-5%] top-[-5%] w-[45vw] h-auto opacity-95 blur-[2px]">
          {/* Leaves */}
          <path d="M 0,0 L 500,0 C 450,150 300,250 200,350 C 100,400 50,300 0,200 Z" fill="#42513B" />
          <path d="M 0,0 L 300,0 C 250,50 100,150 0,300 Z" fill="#2E3C27" />
          {/* Flamboyant Red/Orange Flowers */}
          <circle cx="150" cy="200" r="40" fill="#E84A27" className="blur-[1px]" />
          <circle cx="220" cy="150" r="50" fill="#D33516" className="blur-[2px]" />
          <circle cx="80" cy="250" r="30" fill="#FF6B3E" />
          <circle cx="300" cy="220" r="25" fill="#E84A27" className="blur-[1px]" />
        </svg>
        
        {/* Right Canopy cluster */}
        <svg viewBox="0 0 500 400" className="absolute right-[-5%] top-[-10%] w-[55vw] h-auto opacity-90 blur-[3px]">
          <path d="M 500,0 L 0,0 C 50,100 200,200 300,300 C 400,350 450,250 500,100 Z" fill="#3B4B32" />
          <circle cx="350" cy="180" r="45" fill="#D33516" className="blur-[2px]" />
          <circle cx="280" cy="120" r="35" fill="#FF6B3E" className="blur-[1px]" />
          <circle cx="420" cy="240" r="30" fill="#E84A27" />
          <circle cx="200" cy="220" r="20" fill="#D33516" className="blur-[1px]"/>
        </svg>
      </div>

      {/* 5. Grass Foreground */}
      <div ref={grassRef} className="absolute -bottom-[5%] left-[-10%] right-[-10%] h-[25vh] z-40 opacity-80 blur-[8px] transition-transform will-change-transform flex items-end">
        {/* Using a subtle dark green gradient wave to represent close-up out of focus grass */}
        <div className="w-full h-full" 
             style={{
               background: 'radial-gradient(ellipse at bottom, #4A5640 0%, transparent 70%)'
             }} />
      </div>

      {/* 6. Air Particles (Pollen/Dust) */}
      <div ref={particlesRef} className="absolute inset-0 z-30 transition-transform will-change-transform">
        {airParticles.map(p => (
          <div 
            key={p.id}
            className="absolute rounded-full mix-blend-screen bg-[#FFECCC] blur-[1px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: Math.random() * 0.4 + 0.2,
              animation: `pollenFloat ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes canopySway {
          0% { transform: rotate(0deg) translate(0, 0); }
          100% { transform: rotate(1.5deg) translate(5px, 2px); }
        }
        @keyframes pollenFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-300px) translateX(100px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
