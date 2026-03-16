"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ConstellationField({ opacity = 0.2 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#1A1A1A"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

function PetalDrift({ count = 30, color = "#C5A059", opacity = 0.15 }) {
  const petalsRef = useRef<THREE.Group>(null);
  
  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      speed: new THREE.Vector3((Math.random() - 0.5) * 0.01, -Math.random() * 0.01 - 0.005, (Math.random() - 0.5) * 0.01),
      rotSpeed: new THREE.Vector3(Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02),
    }));
  }, [count]);

  useFrame(() => {
    if (petalsRef.current) {
      petalsRef.current.children.forEach((child, i) => {
        const data = petalData[i];
        child.position.add(data.speed);
        child.rotation.x += data.rotSpeed.x;
        child.rotation.y += data.rotSpeed.y;
        if (child.position.y < -8) child.position.y = 8;
      });
    }
  });

  return (
    <group ref={petalsRef}>
      {petalData.map((data, i) => (
        <mesh key={i} position={data.position} rotation={data.rotation} scale={0.04}>
          <planeGeometry args={[1, 1.5]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function BackgroundSystem({ progress = 0 }: { progress: number }) {
  // Calculate relative world presence
  // 0.0 - 0.2: Essence
  // 0.2 - 0.4: Travel
  // 0.4 - 0.6: Tech
  // 0.6 - 0.8: Cosmos
  // 0.8 - 1.0: Roots

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-warm-paper overflow-hidden transition-colors duration-1000"
         style={{
           backgroundColor: 
            progress < 0.12 ? '#F9F7F2' : // Essence
            progress < 0.35 ? '#020202' : // Gravitational Memory (Void)
            progress < 0.55 ? '#0a0a0a' : // Tech
            progress < 0.75 ? '#0A0B1E' : // Cosmos
            '#F2E5D5' // Roots
         }}>
      
      {/* Dynamic Gradient Layer */}
      <div className="absolute inset-0 opacity-30 blur-[120px] transition-all duration-1000"
           style={{
             background: progress < 0.12 ? 
              'radial-gradient(circle_at 20% 30%, #C5A059 0%, transparent 50%), radial-gradient(circle_at 80% 70%, #E2D1C3 0%, transparent 50%)' :
              progress < 0.35 ?
              'radial-gradient(circle_at 50% 50%, #000 0%, #000 100%)' : // Void is pure black
              progress < 0.55 ? 
              'radial-gradient(circle_at 50% 50%, #1A1A1A 0%, #000 100%)' :
              progress < 0.75 ?
              'radial-gradient(circle_at 40% 40%, #1A1A1A 0%, transparent 60%), radial-gradient(circle_at 60% 60%, #C5A059 0%, transparent 50%)' :
              'radial-gradient(circle_at 50% 50%, #C5A059 0%, transparent 70%), radial-gradient(circle_at 10% 10%, #E2D1C3 0%, transparent 50%)'
           }} />

      {/* THREE JS LAYER */}
      <div className="absolute inset-0 z-10 transition-opacity duration-1000"
           style={{ opacity: progress > 0.1 && progress < 0.9 ? 1 : 0.4 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          {/* Tech World (World 3) Grid removed as per user request to clean up scene 2 */}
          
          {/* Constellation is mostly for Essence / Cosmos */}
          {(progress < 0.35 || (progress > 0.55 && progress < 0.75)) && <ConstellationField opacity={progress > 0.55 ? 0.4 : 0.2} />}
          
          {/* Petals are for Roots (World 5) */}
          {progress > 0.75 && <PetalDrift color="#C5A059" opacity={0.3} count={50} />}
          
          {/* Travel World (World 2) subtle floating noise/clouds */}
          {progress > 0.15 && progress < 0.35 && <PetalDrift color="#FFFFFF" opacity={0.1} count={20} />}
        </Canvas>
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[100] opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
