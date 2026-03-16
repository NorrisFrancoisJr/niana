import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VortexConfig } from './VortexConfig';
import { getRandomTexturePath, fetchTexture } from './TexturePool';

interface ImagePlaneProps {
  curve: THREE.CatmullRomCurve3;
  initialProgress: number;   // 0 to 1
  radialOffsetIndex: number; // 0 to 5 (which arm does this belong to)
}

export default function ImagePlane({ curve, initialProgress, radialOffsetIndex }: ImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Per-instance random variance to avoid uniformity
  const [variance] = useState(() => ({
    speed: VortexConfig.BASE_SPEED + (Math.random() * VortexConfig.SPEED_VARIANCE * 2 - VortexConfig.SPEED_VARIANCE),
    scale: VortexConfig.BASE_SCALE + (Math.random() * VortexConfig.SCALE_VARIANCE),
    // A slight drift in rotation along Z
    rotationDrift: (Math.random() * 0.5) - 0.25,
    // Add some random depth variation so trails aren't perfectly flat
    depthOffset: (Math.random() * 8) - 4,
    // Slightly randomize the start angle to widen the trail stream
    angleOffset: (Math.random() * 0.2) - 0.1,
  }));

  const progressRef = useRef(initialProgress);

  // Texture Management State
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [aspect, setAspect] = useState(1); // Width / Height
  const [isReady, setIsReady] = useState(false); // Prevents rendering frame 1 ghost planes

  // Hover Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const currentSpeedRef = useRef(variance.speed);
  const hoverScaleRef = useRef(1.0);

  // Helper to load a new random texture 
  const loadNewImage = async () => {
    const path = getRandomTexturePath();
    const tex = await fetchTexture(path);
    if (tex && tex.image) {
      const img = tex.image as HTMLImageElement;
      setAspect(img.width / img.height);
      setTexture(tex);
      if (materialRef.current) {
        materialRef.current.needsUpdate = true;
      }
    }
  };

  // Load the first image on mount
  useEffect(() => {
    loadNewImage();
  }, []);

  // The Animation Loop
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Smoothly apply hover states
    const targetSpeed = isHovered ? 0.005 : variance.speed; // Almost pause if hovered
    const targetHoverScale = isHovered ? 1.15 : 1.0; // Bump size slightly

    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.1;
    hoverScaleRef.current += (targetHoverScale - hoverScaleRef.current) * 0.1;

    // 1. Advance Progress
    progressRef.current += currentSpeedRef.current * delta;

    // Loop logic: if we reach the center, reset to the outer edge and grab a new photo
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      setIsReady(false); // Hide immediately while fetching a new one
      setTexture(null); // Clear active texture to force opacity 0
      loadNewImage();
    }

    const p = progressRef.current;

    // 2. Calculate Position along the CatmullRomCurve
    const point = curve.getPoint(p);
    
    // Apply our minor positional offsets so it's a "stream", not a perfect single line
    // We calculate a vector away from the center to widen the start, clamping towards 0 at the end
    const radialScale = 1.0 - Math.pow(p, 3); // Wide at 0, pulls tight to 1 at center
    
    meshRef.current.position.set(
      point.x + (point.x * variance.angleOffset * radialScale),
      point.y + (point.y * variance.angleOffset * radialScale),
      point.z + variance.depthOffset
    );

    // 3. Calculate Scale
    // Nearly full early, shrinking hard near the end
    let currentScale = variance.scale;
    if (p > VortexConfig.SHRINK_START) {
      // Normalize from 0 to 1 over the remaining section
      const shrinkPhase = (p - VortexConfig.SHRINK_START) / (1 - VortexConfig.SHRINK_START);
      currentScale = variance.scale * (1 - Math.pow(shrinkPhase, 2)); 
    }
    
    // Apply hover bump modifier
    currentScale *= hoverScaleRef.current;

    // We multiply width by aspect ratio to maintain the photo's native look
    meshRef.current.scale.set(currentScale * aspect, currentScale, 1);

    // 4. Calculate Opacity
    // Quick fade in, long hold, soft fade out into the void
    // CRITICAL: Force opacity mathematically to 0 if the texture hasn't loaded yet
    let opacity = 0;
    if (texture) {
      if (!isReady) setIsReady(true);
      
      opacity = VortexConfig.OPACITY_MAX;
      if (p < VortexConfig.FADE_IN_END) {
        opacity = (p / VortexConfig.FADE_IN_END) * VortexConfig.OPACITY_MAX;
      } else if (p > VortexConfig.FADE_OUT_START) {
        const fadePhase = (p - VortexConfig.FADE_OUT_START) / (1 - VortexConfig.FADE_OUT_START);
        opacity = VortexConfig.OPACITY_MAX * (1 - fadePhase);
      }
    }
    
    materialRef.current.opacity = Math.max(0, opacity);

    // 5. Calculate Rotation
    // Tangent calculation to vaguely face along the curve, plus drift
    const tangent = curve.getTangent(p);
    // Align Z rotation smoothly as it tracks inwards
    const baseRotation = Math.atan2(tangent.y, tangent.x);
    meshRef.current.rotation.z = baseRotation + (variance.rotationDrift * p * Math.PI);

  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        ref={materialRef}
        map={texture} 
        transparent={true} 
        opacity={0} 
        depthWrite={false} // Crucial for transparent overlapping planes
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
