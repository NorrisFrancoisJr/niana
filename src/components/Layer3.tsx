"use client";
import { useEffect, useRef, useState, useMemo } from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SceneNiana from "./SceneNiana";

gsap.registerPlugin(ScrollTrigger);

export default function Layer3({ progress = 0 }: { progress?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The pin logic was moved to a manual slide-up based on global progress
      // to create a cinematic panel wipe over the previous scene.

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("in-ai-world");
    };
  }, []);

  // Slide up between 0.55 and 0.65 progress
  const isActive = progress > 0.55 && progress <= 1.0;
  const slideProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.10)); 
  const yOffset = (1 - slideProgress) * 100; // 100vh to 0vh

  const overlayOpacity = progress > 0.95 ? Math.max(0, 1 - (progress - 0.95) / 0.05) : 1;

  // As the systems scan and build, tracking subtly expands to mimic structural analysis
  const trackingProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.35));
  // Replace letter spacing with a wireframe render sequence
  // renderedRatio goes from 0 to 1 rapidly as you scroll through the digital world
  const isWireframe = trackingProgress > 0 && trackingProgress < 0.99;
  const renderedRatio = trackingProgress;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("in-ai-world", isActive);
    }
  }, [isActive]);

  return (
    <section 
      ref={containerRef}
      className={`absolute inset-0 z-[80] overflow-hidden bg-[#0A0C10] text-[#C9E0FF] font-mono select-none transition-opacity duration-500`}
      style={{
        opacity: isActive ? 1 : 0,
        transform: `translate3d(0, ${yOffset}%, 0)`,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
    >
      
      {/* 1. Deep Background Core */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* NIANA TEXT that inverses the panel translation */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <SceneNiana 
            textColor={!isWireframe ? "#F4F8FF" : undefined}
            isWireframe={isWireframe}
            renderedRatio={renderedRatio}
            inverseTransform={`translate3d(0, ${-yOffset}%, 0)`}
          />
        </div>
        
        {/* Subtle atmospheric radial haze for depth */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ background: 'radial-gradient(circle at 50% 50%, rgba(106,169,255,0.08) 0%, #0A0C10 70%)' }} 
        />
        
        {/* Abstract Particle Dust (Background Depth) */}
        <div className="absolute inset-0 opacity-20" style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        {/* 2. WebGL 3D Deep Neural Field */}
        {/* An infinite, floating 3D particle volume that breathes natively */}
        {isActive && <DeepNeuralField />}

      </div>

      {isMounted && isActive && <AIOverlay opacity={overlayOpacity} trackingProgress={trackingProgress} />}
    </section>
  );
}

// -------------------------------------------------------------
// NEW: 3D DEEP NEURAL FIELD (WebGL)
// Replaces the 2D SVG network with a massive, floating volumetric intelligence
// -------------------------------------------------------------
function NeuralMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 200;
  const maxConnectionDistance = 2.5;

  // Initialize random particle positions in a 3D volume
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Spread across X(-15 to 15), Y(-10 to 10), Z(-5 to 5)
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Random slow drift speeds
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions, velocities };
  }, []);

  // Pre-allocate buffer arrays for lines (Max possible lines is (N * (N-1))/2)
  // We allocate less assuming sparse connections for performance
  const maxLines = particleCount * 10; 
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  
  // Base colors for interpolation
  const color1 = new THREE.Color("#6AA9FF"); // Deep Intelligence Blue
  const color2 = new THREE.Color("#C9E0FF"); // Hot Core White/Blue

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    // 1. Organic Volumetric Rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;

    // Optional: Lines container must match points container rotation exactly
    linesRef.current.rotation.copy(pointsRef.current.rotation);

    // 2. Animate Individual Particles
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const currentPositions = posAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      currentPositions[i * 3] += velocities[i * 3];
      currentPositions[i * 3 + 1] += velocities[i * 3 + 1];
      currentPositions[i * 3 + 2] += velocities[i * 3 + 2];

      // Soft bounding box bounce to keep them in frame
      if (Math.abs(currentPositions[i * 3]) > 15) velocities[i * 3] *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    posAttribute.needsUpdate = true;

    // 3. Calculate Dynamic Connections (O(N^2) but fine for 200 particles)
    let vertexCount = 0;
    let colorCount = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        // Calculate Euclidean distance between active points
        const dx = currentPositions[i * 3] - currentPositions[j * 3];
        const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
        const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxConnectionDistance * maxConnectionDistance && vertexCount < maxLines * 6) {
          // If close enough, draw a line segment
          linePositions[vertexCount++] = currentPositions[i * 3];
          linePositions[vertexCount++] = currentPositions[i * 3 + 1];
          linePositions[vertexCount++] = currentPositions[i * 3 + 2];

          linePositions[vertexCount++] = currentPositions[j * 3];
          linePositions[vertexCount++] = currentPositions[j * 3 + 1];
          linePositions[vertexCount++] = currentPositions[j * 3 + 2];

          // Calculate opacity/color based on distance (closer = brighter)
          const alpha = 1.0 - Math.sqrt(distSq) / maxConnectionDistance;
          
          // Interpolate between the two blue colors based on proximity density
          const mergedColor = color1.clone().lerp(color2, alpha);

          lineColors[colorCount++] = mergedColor.r;
          lineColors[colorCount++] = mergedColor.g;
          lineColors[colorCount++] = mergedColor.b;

          lineColors[colorCount++] = mergedColor.r;
          lineColors[colorCount++] = mergedColor.g;
          lineColors[colorCount++] = mergedColor.b;
        }
      }
    }

    // Update Line Geometry Buffers
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.subarray(0, vertexCount), 3));
    linesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(lineColors.subarray(0, colorCount), 3));
    linesRef.current.geometry.computeBoundingSphere();
  });

  return (
    <group>
      {/* The Particle Field */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C9E0FF"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      {/* The Dynamic Line Connections */}
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors={true}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function DeepNeuralField() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <NeuralMesh />
      </Canvas>
    </div>
  );
}

// -------------------------------------------------------------
// LIVE ANNOTATION PORTAL LAYER
// Runs in `z-[60]` directly appended to body so it floats effortlessly 
// OVER the Global Niana typography tracking it in real time.
// -------------------------------------------------------------
function AIOverlay({ opacity, trackingProgress }: { opacity: number, trackingProgress: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Array of data for our active callouts
  const callouts = [
    { id: 0, title: "AI / SYSTEMS", desc: "builds structure from ambiguity", align: 'left',  initPos: { x: 10, y: 15 }, targetLetter: 'l1', activeColor: '#6AA9FF' },
    { id: 1, title: "PATTERN RECOGNITION", desc: "connects patterns across domains", align: 'right', initPos: { x: 80, y: 18 }, targetLetter: 'l3', activeColor: '#C9E0FF' },
    { id: 2, title: "CREATIVE LOGIC", desc: "intelligence, taste, intuition", align: 'right', initPos: { x: 85, y: 60 }, targetLetter: 'l5', activeColor: '#6AA9FF' },
    { id: 3, title: "TRAVEL DATASET", desc: "movement as data and memory", align: 'left',  initPos: { x: 5, y: 70 }, targetLetter: 'l2', activeColor: '#C9E0FF' },
    { id: 4, title: "ASTROLOGY MODEL", desc: "reads alignment and timing", align: 'left',  initPos: { x: 25, y: 88 }, targetLetter: 'l4', activeColor: '#6AA9FF' },
  ] as const;

  const boxesRef = useRef<(HTMLDivElement | null)[]>(new Array(callouts.length).fill(null));

  useEffect(() => {
    // Bring the lively floating behavior to the boxes
    const ctx = gsap.context(() => {
      boxesRef.current.forEach((box: HTMLDivElement | null, i: number) => {
        if (!box) return;
        
        // Constant rapid signal pulse in box UI
        gsap.to(box.querySelector('.signal-bar'), {
          scaleX: "random(0.1, 1)",
          duration: 0.05,
          repeat: -1,
          repeatRefresh: true, // Forces new random values every repeat
          repeatDelay: 0.1, // Rapid fire
          ease: "none"
        });
      });
      
      // Animate line pulses across SVG very aggressively
      const pulses = document.querySelectorAll(".line-pulse");
      gsap.to(pulses, {
        strokeDashoffset: 0,
        strokeDasharray: "50, 500", 
        duration: 0.3,
        ease: "none",
        repeat: -1,
        repeatRefresh: true,
        repeatDelay: Math.random() * 0.2,
        stagger: 0.1
      });

    }, containerRef);

    // High performance RAF to perfectly link DOM boxes to NIANA letters via SVG
    let rafId: number;
    const updateLines = () => {
      const svg = svgRef.current;
      if (!svg) return;
      
      callouts.forEach((data, i) => {
         // Map original l1-l5 to our class names in SceneNiana
         const classMap: Record<string, string> = { l1: 'n1', l2: 'i', l3: 'a1', l4: 'n2', l5: 'a2' };
         // Query the specific Niana component inside Layer3
         const letterElInDOM = containerRef.current?.querySelector(`.niana-letter.${classMap[data.targetLetter]}`) as HTMLElement;
         
         const boxEl = boxesRef.current[i];
         const mainLine = document.getElementById(`main-line-${i}`);
         const pulseLine = document.getElementById(`pulse-line-${i}`);
         const endNode = document.getElementById(`end-node-${i}`);
         
         if (letterElInDOM && boxEl && mainLine) {
           const lRect = letterElInDOM.getBoundingClientRect();
           const bRect = boxEl.getBoundingClientRect();
           
           // Box attach point: if aligned left, line attaches to box's left edge. Else right edge.
           // Let's refine this to be slightly inset so it touches the header border.
           const boxX = data.align === 'right' ? bRect.left : bRect.right;
           const boxY = bRect.top + 16; 
           
           // Letter center
           const lX = lRect.left + lRect.width / 2;
           const lY = lRect.top + lRect.height / 2;
           
           mainLine.setAttribute('x1', lX.toString());
           mainLine.setAttribute('y1', lY.toString());
           mainLine.setAttribute('x2', boxX.toString());
           mainLine.setAttribute('y2', boxY.toString());

           if (pulseLine) {
             pulseLine.setAttribute('x1', lX.toString());
             pulseLine.setAttribute('y1', lY.toString());
             pulseLine.setAttribute('x2', boxX.toString());
             pulseLine.setAttribute('y2', boxY.toString());
           }
           
           if (endNode) {
             endNode.setAttribute('cx', boxX.toString());
             endNode.setAttribute('cy', boxY.toString());
           }
         }
      });
      rafId = requestAnimationFrame(updateLines);
    };
    
    rafId = requestAnimationFrame(updateLines);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div ref={containerRef} className="absolute inset-0 z-[60] pointer-events-none overflow-hidden font-mono transition-opacity duration-300" style={{ opacity }}>
      
      {/* Dynamic SVG Overlay */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="mainLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6AA9FF" stopOpacity="0.1" />
            <stop offset="80%" stopColor="#6AA9FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9E0FF" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {callouts.map((c, i) => {
          // Calculate an individual 0-1 progress for each card, staggered by index
          const cardProgress = Math.max(0, Math.min(1, (trackingProgress - (i * 0.1)) / 0.2));
          
          return (
          <g key={c.id} style={{ opacity: cardProgress }}>
            {/* Base stable line */}
            <line id={`main-line-${i}`} stroke="url(#mainLineGrad)" strokeWidth="1" />
            
            {/* Animated signal pulse riding the line */}
            <line id={`pulse-line-${i}`} className="line-pulse" stroke="#FFFFFF" strokeWidth="2" filter="url(#glow)" 
                  style={{ strokeDasharray: "20, 1000", strokeDashoffset: -1000 }} />
                  
            {/* Box Anchor Node */}
            <circle id={`end-node-${i}`} r="2" fill={c.activeColor} filter="url(#glow)" />
          </g>
          );
        })}
      </svg>

      {/* Floating UI Callouts */}
      {callouts.map((c, i) => {
        const cardProgress = Math.max(0, Math.min(1, (trackingProgress - (i * 0.1)) / 0.2));
        const yFloat = (1 - cardProgress) * 40; // Starts 40px down and floats up to 0
        
        return (
        <div 
          key={c.id}
          ref={el => {boxesRef.current[i] = el;}}
          className={`absolute pointer-events-auto transition-colors duration-500 cursor-crosshair group ${c.align === 'right' ? '-translate-x-full' : ''}`}
          style={{ 
            top: `${c.initPos.y}%`, 
            left: `${c.initPos.x}%`,
            opacity: cardProgress,
            transform: `translateY(${yFloat}px)`
          }}
        >
          {/* Internal Wrapper for Hover/Glow */}
          {/* Refined style: Soft rounded data clusters instead of rigid hacker squares */}
          <div className="relative w-56 rounded-xl bg-[#0A0C10]/20 backdrop-blur-sm p-4 hover:bg-[#151B25]/80 hover:shadow-[0_0_20px_rgba(106,169,255,0.15)] transition-all duration-300">
            {/* Micro details */}
            <div className={`absolute top-4 w-1 h-[2px] bg-[${c.activeColor}]/70 group-hover:bg-[#FFFFFF] transition-colors`} style={{ [c.align === 'right' ? 'right' : 'left']: 0 }} />
            
            <div className="flex justify-between items-center mb-2 pl-2 border-l border-[#6AA9FF]/30 group-hover:border-[#6AA9FF] transition-colors">
              <h3 className="text-[10px] tracking-widest text-[#6AA9FF]/90 group-hover:text-[#F4F8FF] transition-colors uppercase leading-none m-0">
                {c.title}
              </h3>
            </div>
            
            <p className="text-[11px] text-[#C9E0FF]/60 group-hover:text-[#C9E0FF] leading-relaxed pl-2">
              {c.desc}
            </p>
            
            {/* Density details: coord readout */}
            <div className="mt-3 flex gap-2 font-mono text-[8px] text-[#6AA9FF]/50 group-hover:text-[#6AA9FF]/90">
               <span>SYS.REC // 0{i + 1}</span>
               <span>•</span>
               <span className="animate-pulse">ACTIVE</span>
            </div>
          </div>
          
          {/* Subtle under-glow on hover */}
          <div className="absolute inset-0 bg-[#6AA9FF]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>
        );
      })}
    </div>
  );
}
