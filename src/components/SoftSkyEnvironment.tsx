"use client";

import { useEffect, useRef, useState } from "react";
import SceneNiana from "./SceneNiana";

export default function SoftSkyEnvironment({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Parallax refs
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudFarRef = useRef<HTMLDivElement>(null);
  const cloudMidRef = useRef<HTMLDivElement>(null);
  const cloudNearRef = useRef<HTMLDivElement>(null);

  // Foreground Refs
  const fg1Ref = useRef<HTMLImageElement>(null);
  const fg2Ref = useRef<HTMLImageElement>(null);
  const fg3Ref = useRef<HTMLImageElement>(null);
  const fg4Ref = useRef<HTMLImageElement>(null);
  const fg5Ref = useRef<HTMLImageElement>(null);
  const fg6Ref = useRef<HTMLImageElement>(null);
  const fg7Ref = useRef<HTMLImageElement>(null);
  const fg8Ref = useRef<HTMLImageElement>(null);
  const fg9Ref = useRef<HTMLImageElement>(null);
  const fg10Ref = useRef<HTMLImageElement>(null);
  const fg11Ref = useRef<HTMLImageElement>(null);
  const fg12Ref = useRef<HTMLImageElement>(null);
  const fg14Ref = useRef<HTMLImageElement>(null);
  const fg15Ref = useRef<HTMLImageElement>(null);
  const fg16Ref = useRef<HTMLImageElement>(null);
  const fg17Ref = useRef<HTMLImageElement>(null);
  const fg18Ref = useRef<HTMLImageElement>(null);
  const fg19Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

      const scrollY = window.scrollY;

      // BACKGROUND CLOUDS (Slower, negative multipliers)
      if (skyRef.current) skyRef.current.style.transform = `translate3d(${currentX * -3}px, ${currentY * -3 - scrollY * 0.05}px, 0)`;
      if (cloudFarRef.current) cloudFarRef.current.style.transform = `translate3d(${currentX * -10}px, ${currentY * -6 - scrollY * 0.15}px, 0)`;
      if (cloudMidRef.current) cloudMidRef.current.style.transform = `translate3d(${currentX * -25}px, ${currentY * -15 - scrollY * 0.3}px, 0)`;
      if (cloudNearRef.current) cloudNearRef.current.style.transform = `translate3d(${currentX * -50}px, ${currentY * -25 - scrollY * 0.6}px, 0)`;

      // FOREGROUND TREES - Subtle Outward Expansion on Scroll (10-20% of previous distance)
      // They open up gently, remaining on the edges of the frame.
      
      // TOP TREES: Move UP gently
      if (fg2Ref.current) fg2Ref.current.style.transform = `translate3d(${-scrollY * 0.06}px, ${-scrollY * 0.144}px, 0)`; // Little Tree Top Left
      if (fg8Ref.current) fg8Ref.current.style.transform = `translate3d(0px, ${-scrollY * 0.18}px, 0)`; // TOP right
      if (fg9Ref.current) fg9Ref.current.style.transform = `translate3d(0px, ${-scrollY * 0.216}px, 0)`; // TOP left
      if (fg5Ref.current) fg5Ref.current.style.transform = `translate3d(${scrollY * 0.06}px, ${-scrollY * 0.252}px, 0)`; // Piece 3

      // BOTTOM TREES: Move DOWN gently
      if (fg1Ref.current) fg1Ref.current.style.transform = `translate3d(${scrollY * 0.048}px, ${scrollY * 0.144}px, 0)`; // Big Tree Bottom Right
      if (fg10Ref.current) fg10Ref.current.style.transform = `translate3d(${-scrollY * 0.036}px, ${scrollY * 0.204}px, 0)`; // VIS Bottom Left
      if (fg11Ref.current) fg11Ref.current.style.transform = `translate3d(0px, ${scrollY * 0.132}px, 0)`; // VIS Bottom Middle
      if (fg14Ref.current) fg14Ref.current.style.transform = `translate3d(0px, ${scrollY * 0.192}px, 0)`; // VIS Right Fill
      if (fg4Ref.current) fg4Ref.current.style.transform = `translate3d(${-scrollY * 0.06}px, ${scrollY * 0.216}px, 0)`; // Piece 2
      
      // New Red Piece 2 instances moving DOWN
      if (fg16Ref.current) fg16Ref.current.style.transform = `translate3d(${-scrollY * 0.048}px, ${scrollY * 0.168}px, 0)`;
      if (fg17Ref.current) fg17Ref.current.style.transform = `translate3d(${scrollY * 0.072}px, ${scrollY * 0.228}px, 0)`;
      if (fg18Ref.current) fg18Ref.current.style.transform = `translate3d(${-scrollY * 0.024}px, ${scrollY * 0.156}px, 0)`;
      if (fg19Ref.current) fg19Ref.current.style.transform = `translate3d(${scrollY * 0.036}px, ${scrollY * 0.18}px, 0)`;

      // SIDE/MIDDLE SCRAP TREES: Move OUTWARD Horizontally gently
      if (fg6Ref.current) fg6Ref.current.style.transform = `translate3d(${-scrollY * 0.288}px, 0px, 0)`; // Leaves Left
      if (fg7Ref.current) fg7Ref.current.style.transform = `translate3d(${scrollY * 0.324}px, 0px, 0)`; // Shutterstock Right
      if (fg3Ref.current) fg3Ref.current.style.transform = `translate3d(${-scrollY * 0.18}px, ${-scrollY * 0.06}px, 0)`; // Piece 1
    }, 1000 / 60);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(animationFrame);
    };
  }, []);

  const isActive = progress < 0.25;
  const fadeOutOpacity = progress < 0.20 ? 1 : Math.max(0, 1 - ((progress - 0.20) / 0.05));
  const textScale = 1 + (progress * 0.35); // Scales up consistently until 0.25

  if (!isActive) return null;

  return (
    <>
      <div 
        ref={containerRef}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden bg-white"
        style={{ opacity: fadeOutOpacity }}
      >
        {/* 1. Sky Gradient Background */}
        <div 
          ref={skyRef}
          className="absolute -inset-[10%] transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(to bottom, #76AEEA 0%, #A5C9F1 50%, #D4E6F8 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-60 mix-blend-screen"
               style={{ background: 'radial-gradient(circle at 50% 10%, #E8F2FF 0%, transparent 70%)' }} />
        </div>

        {/* 2. Far Clouds (Slow drift, softly blurred) */}
        <div ref={cloudFarRef} className="absolute -inset-[20vw] z-20 opacity-[0.6]">
          <div className="w-full h-full animate-[driftCloud_40s_linear_infinite]">
             <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
             <div className="absolute top-[30%] left-[50%] w-[60vw] h-[60vw] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
             <div className="absolute top-[60%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[70px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
          </div>
        </div>

        {/* 3. Mid Clouds (Medium drift, brighter and denser) */}
        <div ref={cloudMidRef} className="absolute -inset-[15vw] z-30 opacity-[0.8]">
          <div className="w-full h-full animate-[driftCloud_25s_linear_infinite_reverse]">
             <div className="absolute top-[50%] left-[-10%] w-[50vw] h-[40vw] rounded-full blur-[90px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
             <div className="absolute top-[-10%] left-[40%] w-[45vw] h-[35vw] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
             <div className="absolute top-[60%] left-[70%] w-[50vw] h-[40vw] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
          </div>
        </div>

        {/* 4. Near Foreground Clouds (Fastest drift, framing the scene) */}
        <div ref={cloudNearRef} className="absolute -inset-[10vw] z-40 opacity-95 mix-blend-screen">
          <div className="w-full h-full animate-[driftCloud_15s_linear_infinite]">
             <div className="absolute top-[-20%] left-[65%] w-[80vw] h-[60vw] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
             <div className="absolute top-[60%] left-[-15%] w-[70vw] h-[60vw] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)' }} />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes driftCloud {
            0% { transform: translateX(-6%); }
            50% { transform: translateX(6%); }
            100% { transform: translateX(-6%); }
          }
        `}} />

        {/* NEW SCENE NIANA COMPONENT FOR SCENE 1 */}
        {/* We place it under the foreground trees (z-[60]) but above clouds (z-40) */}
        <div className="absolute inset-0 z-[50]">
          <SceneNiana textColor="#1a1a1a" scale={textScale} />
        </div>

      </div>

      {/* 5. FRONT LAYER (Trees over text) */}
      {/* Reduced z-index to 60, but without Portal, it respects Layer1 stacking. We'll set Vortex to z-70 so it covers this completely. */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden" style={{ opacity: fadeOutOpacity }}>
          
          {/* 
            Gradients to dynamically mask edges, softened per user request.
            Opacity drastically reduced.
          */}
          <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-[#8ab77d] to-transparent z-[70] pointer-events-none mix-blend-multiply opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-[#fb4b20] to-transparent z-[70] pointer-events-none mix-blend-multiply opacity-40" />

          {/* 
            TOP TREES (Hanging down)
            Massive TOP.webp overlaps to create a solid hanging canopy with zero sky gaps
          */}
          {/* Top Canopy Middle - REMOVED PER USER REQUEST to open up center view */}
          {/* Top Canopy Right Overlap */}
          <img 
            ref={fg8Ref}
            src="/tree/TOP.webp" 
            alt="" 
            className="absolute top-[-10%] right-[-15%] w-[80vw] max-w-[1500px] 2xl:max-w-none object-cover blur-[2px] brightness-105"
            loading="eager"
            fetchPriority="high"
          />
          {/* Top Canopy Left Overlap (Flipped) */}
          <img 
            ref={fg9Ref}
            src="/tree/TOP.webp" 
            alt="" 
            className="absolute top-[-15%] left-[-20%] w-[90vw] max-w-[1600px] 2xl:max-w-none object-cover blur-[5px] brightness-95 scale-x-[-1]"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Floating pieces around top edges */}
          <img 
            ref={fg2Ref}
            src="/tree/littleree.webp" 
            alt="" 
            className="absolute top-[5%] left-[-25%] w-[60vw] max-w-[900px] 2xl:max-w-none object-contain blur-[12px] brightness-105 drop-shadow-lg"
            style={{ transform: 'rotate(25deg)' }}
            loading="eager"
            fetchPriority="high"
          />


          {/* 
            BOTTOM TREES (Rising up)
            Filling the floor entirely with solid graphics, hiding all hard edges
          */}
          {/* Big Tree Center Blur Fill - REMOVED PER USER REQUEST to keep view open */}
          {/* Main big tree focal point - anchored bottom right perfectly */}
          <img 
            ref={fg1Ref}
            src="/tree/big tree.webp" 
            alt="" 
            className="absolute bottom-[-10%] right-[-10%] w-[75vw] md:w-[60vw] max-w-[1200px] 2xl:max-w-none object-contain blur-[1px] brightness-110 drop-shadow-2xl"
            loading="eager"
            fetchPriority="high"
          />

          {/* VIS Photo Bottom Right Backfill to fix gaps - Hard edge pushed way off screen */}
          <img 
            ref={fg14Ref}
            src="/tree/VIS%20Photo%203%20Flamboyant%20article%20August%2014%202020%20copy.webp" 
            alt="" 
            className="absolute bottom-[-20%] right-[-20%] w-[80vw] max-w-[1400px] 2xl:max-w-none object-cover blur-[8px] brightness-95 scale-x-[-1]"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* MORE RED: Extra 'piece 2' instances along the bottom edge */}
          {/* Extra Red 1 - Bottom Center Left */}
          <img 
            ref={fg16Ref}
            src="/tree/oiece%202.webp" 
            alt="" 
            className="absolute bottom-[-15%] left-[5%] w-[55vw] max-w-[900px] 2xl:max-w-none object-contain blur-[12px] brightness-105 drop-shadow-xl"
            style={{ transform: 'rotate(15deg)' }}
            loading="eager"
            fetchPriority="high"
          />
          {/* Extra Red 2 - Bottom Center Right */}
          <img 
            ref={fg17Ref}
            src="/tree/oiece%202.webp" 
            alt="" 
            className="absolute bottom-[-25%] right-[5%] w-[60vw] max-w-[1000px] 2xl:max-w-none object-contain blur-[14px] brightness-110 drop-shadow-lg"
            style={{ transform: 'rotate(-25deg)' }}
            loading="eager"
            fetchPriority="high"
          />
          {/* Extra Red 3 - Bottom Far Left (tucked behind) */}
          <img 
            ref={fg18Ref}
            src="/tree/oiece%202.webp" 
            alt="" 
            className="absolute bottom-[-30%] left-[-25%] w-[70vw] max-w-[1200px] 2xl:max-w-none object-contain blur-[18px] brightness-100"
            style={{ transform: 'rotate(45deg)' }}
            loading="eager"
            fetchPriority="high"
          />
          {/* Extra Red 4 - Bottom Mid Right Background */}
          <img 
            ref={fg19Ref}
            src="/tree/oiece%202.webp" 
            alt="" 
            className="absolute bottom-[-30%] right-[15%] w-[35vw] max-w-[700px] 2xl:max-w-none object-contain blur-[8px] brightness-105"
            style={{ transform: 'rotate(-10deg) scale-x-[-1]' }}
            loading="eager"
            fetchPriority="high"
          />

          {/* 
            SIDE/FLOATING PIECES (Extreme Depth)
          */}
          {/* Highly blurred foreground element moving past camera left */}
          <img 
            ref={fg6Ref}
            src="/tree/Flamboyant_leaves_1_(4385126884)%20copy.webp" 
            alt="" 
            className="absolute top-[20%] left-[-20%] w-[70vw] max-w-[1100px] 2xl:max-w-none object-contain blur-[24px] brightness-110"
            loading="eager"
            fetchPriority="high"
          />
          {/* Out of focus foreground piece originally crossing middle, lowered out of the way */}
          <img 
            ref={fg7Ref}
            src="/tree/shutterstock_2461766211_1280x%20copy.webp" 
            alt="" 
            className="absolute bottom-[-10%] right-[-15%] w-[50vw] max-w-[900px] 2xl:max-w-none object-contain blur-[28px] brightness-115 scale-[-1]"
            loading="eager"
            fetchPriority="high"
          />
          {/* Piece 1 - out of focus mid left */}
          <img 
            ref={fg3Ref}
            src="/tree/piece1.webp" 
            alt="" 
            className="absolute top-[45%] left-[-15%] w-[40vw] max-w-[700px] 2xl:max-w-none object-contain blur-[16px] brightness-110"
            loading="eager"
            fetchPriority="high"
          />
          {/* Piece 2 - middle right crossing */}
          <img 
            ref={fg4Ref}
            src="/tree/oiece%202.webp" 
            alt="" 
            className="absolute top-[45%] right-[-25%] w-[35vw] max-w-[600px] 2xl:max-w-none object-contain blur-[18px] brightness-100"
            loading="eager"
            fetchPriority="high"
          />
          {/* Piece 3 - top far right edge */}
          <img 
            ref={fg5Ref}
            src="/tree/piece%203.webp" 
            alt="" 
            className="absolute top-[5%] right-[-15%] w-[40vw] max-w-[700px] 2xl:max-w-none object-contain blur-[10px] brightness-105"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      )}
    </>
  );
}
