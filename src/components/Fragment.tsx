"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * Digital Portrait Depth System:
 * Layer A: Background Atmosphere (0.2x speed)
 * Layer B: Drifting Fragments (0.5x speed)
 * Layer C: Large Typography (1.0x speed)
 * Layer D: Interactive Objects (1.1x speed)
 */
type DepthLayer = "A" | "B" | "C" | "D";

interface FragmentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  driftSpeed?: number;
  layer?: DepthLayer;
  label?: string;
  metadata?: string;
}

export default function Fragment({
  children,
  className,
  delay = 0,
  driftSpeed = 1,
  layer = "B",
  label,
  metadata,
}: FragmentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const layerConfig = {
    A: { z: 1, speed: 0.2, blur: "4px", opacity: 0.3, scale: 0.8 },
    B: { z: 10, speed: 0.5, blur: "0px", opacity: 0.6, scale: 0.9 },
    C: { z: 20, speed: 1.0, blur: "0px", opacity: 1.0, scale: 1.0 },
    D: { z: 50, speed: 1.1, blur: "0px", opacity: 1.0, scale: 1.05 },
  };

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      // Reveal: Soft blur-to-sharp fade
      gsap.fromTo(contentRef.current, 
        { filter: "blur(20px)", opacity: 0, y: 30 },
        { 
          filter: "blur(0px)", 
          opacity: 1, 
          y: 0, 
          duration: 2, 
          ease: "expo.out",
          delay: delay 
        }
      );

      // Organic Drift (constant microscopic movement)
      gsap.to(contentRef.current, {
        y: `+=${10 * driftSpeed}`,
        x: `+=${5 * driftSpeed}`,
        rotation: (Math.random() - 0.5) * 2 * driftSpeed,
        duration: 8 + Math.random() * 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Synchronized Parallax Speed
      const config = layerConfig[layer];
      if (config.speed !== 1) {
        gsap.to(ref.current, {
          yPercent: (config.speed - 1) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [delay, driftSpeed, layer]);

  const config = layerConfig[layer];

  return (
    <div 
      ref={ref} 
      className={cn("absolute flex flex-col items-start gap-1.5", className)}
      style={{ 
        zIndex: config.z,
        transform: `scale(${config.scale})`,
        opacity: config.opacity
      }}
    >
      {label && <span className="mono-label ml-1">{label}</span>}
      
      <div ref={contentRef} style={{ filter: config.blur }} className="will-change-transform">
        {children}
      </div>

      {metadata && (
        <span className="text-[8px] font-mono uppercase tracking-widest text-deep-charcoal/20 mt-1 ml-1">{metadata}</span>
      )}
    </div>
  );
}
