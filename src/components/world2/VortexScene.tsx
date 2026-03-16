import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VortexConfig } from './VortexConfig';
import ImageTrail from './ImageTrail';
import AtmosphericParticles from './AtmosphericParticles';
import SceneNiana from '../SceneNiana';

interface VortexSceneProps {
  progress: number; // General scroll progress governing this scene's intensity (0 to 1)
}

function VortexCameraAndLighting({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // We decouple the raw scroll wheel from the actual visual progress 
  // to give the scene "weight" and prevent fast-forwarding
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);

  // Sync the incoming prop to our target
  targetProgressRef.current = progress;

  // Subtle mouse interactivity and scroll damping
  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Lerp the scroll progress (Damping)
    // This makes the entire vortex feel heavy and cinematic
    currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.05;
    const smoothProgress = currentProgressRef.current;

    // 2. Very subtle mouse tilt based on normalized coordinates (-1 to 1)
    const targetX = state.mouse.x * VortexConfig.MOUSE_INFLUENCE;
    const targetY = state.mouse.y * VortexConfig.MOUSE_INFLUENCE;

    // Lerp the mouse rotation for smoothness
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;

    // 3. Slowly rotate the entire vortex counter-clockwise based on the *smoothed* progress
    groupRef.current.rotation.z = smoothProgress * Math.PI * 0.5;
  });

  // Calculate the 6 angles for the trails (e.g. 60 degrees apart)
  const angles = Array.from({ length: VortexConfig.NUM_TRAILS }, (_, i) => 
    (i / VortexConfig.NUM_TRAILS) * Math.PI * 2
  );

  return (
    <group ref={groupRef}>
      {/* 
        Optional very faint ambient light. 
        Because we use MeshBasicMaterial for the planes, they don't respond to lighting,
        which is perfect for a dark, stylized look where photos just glow softly.
      */}
      <ambientLight intensity={0.5} />
      
      {/* The drifting memory dust layer */}
      <AtmosphericParticles />

      {/* Instantiate the 6 trails */}
      {angles.map((angle, i) => (
        <ImageTrail key={`trail-${i}`} index={i} angle={angle} />
      ))}
    </group>
  );
}

export default function VortexScene({ progress }: VortexSceneProps) {
  // Mount slightly earlier (0.05) to allow slide-up animation effect
  const isActive = progress > 0.05 && progress <= 1.0; 
  
  // Calculate slide-up animation (0.18 to 0.25 progress = scene sliding up from bottom)
  // Shifted later to allow Flow World to rest and scale up longer
  const slideProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.07)); 
  const yOffset = (1 - slideProgress) * 100; // 100vh to 0vh

  // As the user scrolls deeper into the vortex (after it has slid up), physically pull the text backward
  const vortexDepth = Math.max(0, Math.min(1, (progress - 0.25) / 0.30));
  const textScale = 1 - (vortexDepth * 0.15); // Slowly shrinks from 1.0 down to 0.85

  return (
    <div 
      className={`absolute inset-0 z-[70] pointer-events-none transition-opacity duration-500 overflow-hidden`}
      style={{ 
        opacity: isActive ? 1 : 0, 
        backgroundColor: '#0E1117',
        transform: `translate3d(0, ${yOffset}%, 0)`
      }} 
    >
      
      {/* Custom Memory World Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url(/vortex-bg.jpg)' }}
      />
      
      {/* We keep this container for potential future depth masking over the NIANA text, but leave it transparent for now */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <SceneNiana 
          textColor="#F4F8FF"
          scale={textScale}
          inverseTransform={`translate3d(0, ${-yOffset}%, 0)`}
        />
      </div>

      {/* The 3D Canvas Factory - ALWAYS MOUNTED to prevent WebGL compile stutter on scroll-in */}
      <Canvas 
        camera={{ position: [0, 0, 50], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} 
      >
        <VortexCameraAndLighting progress={progress} />
      </Canvas>

    </div>
  );
}
