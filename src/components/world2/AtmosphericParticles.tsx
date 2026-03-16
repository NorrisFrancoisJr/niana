import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VortexConfig } from './VortexConfig';

export default function AtmosphericParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Configuration for the memory dust
  const particleCount = 200; // Low density as requested
  const spread = 60; // Spread wide across the X/Y axes
  const depth = 30; // Deep Z spread

  // Generate initial random positions using useMemo so they don't recreate on render
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const phs = new Float32Array(particleCount); // Storing random phases for independent drift

    for (let i = 0; i < particleCount; i++) {
        // Random placement within the volume
        pos[i * 3] = (Math.random() - 0.5) * spread;     // x
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread; // y
        pos[i * 3 + 2] = (Math.random() - 0.5) * depth;  // z
        
        phs[i] = Math.random() * Math.PI * 2; // Random starting phase 0-2PI
    }
    
    return [pos, phs];
  }, []);

  const positionsAttribute = useMemo(() => {
    return new THREE.Float32BufferAttribute(positions, 3);
  }, [positions]);

  // Animate the particles - slow, dreamy drift
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        
        // Very slow, soft oscillating drift on X and Y based on Sine waves.
        // It's meant to look like floating dust, not shooting stars.
        posArray[i3] += Math.sin(time * 0.2 + phase) * 0.02;     // Subtle X drift
        posArray[i3 + 1] += Math.cos(time * 0.3 + phase) * 0.02; // Subtle Y drift
        
        // Gentle pull towards the Z-camera (depth parallax) or away
        posArray[i3 + 2] += Math.sin(time * 0.1 + phase) * 0.01;
    }

    positionsAttr.needsUpdate = true;
    
    // Slight counter-rotation of the entire particle system against the mouse parallax
    const targetX = state.mouse.x * VortexConfig.MOUSE_INFLUENCE * 0.5;
    const targetY = state.mouse.y * VortexConfig.MOUSE_INFLUENCE * 0.5;

    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive object={positionsAttribute} attach="attributes-position" />
      </bufferGeometry>
      {/* We use pointsMaterial to create large, soft, slightly transparent glowing dots */}
      <pointsMaterial 
        size={0.4} 
        color="#F9F7F2" 
        transparent={true} 
        opacity={0.15} // Very soft and faint
        depthWrite={false}
        sizeAttenuation={true} // Makes them smaller as they get further away
        blending={THREE.AdditiveBlending} // Gives them a subtle glow against dark backgrounds
      />
    </points>
  );
}
