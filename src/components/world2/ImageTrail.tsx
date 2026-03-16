import { useMemo } from 'react';
import * as THREE from 'three';
import { VortexConfig } from './VortexConfig';
import ImagePlane from './ImagePlane';

interface ImageTrailProps {
  index: number; // 0 through (NUM_TRAILS - 1)
  angle: number; // The radian angle for this specific trail arm
}

export default function ImageTrail({ index, angle }: ImageTrailProps) {

  // Generate the 3D curve for this specific trail once
  const curve = useMemo(() => {
    // We create a swooping arc by defining 4 control points that curl inwards
    const outerRadius = VortexConfig.RADIUS_START;
    const innerRadius = VortexConfig.RADIUS_END;
    const depth = VortexConfig.CURVE_HEIGHT;

    // Start point (Far out, deep backward in Z)
    const p0 = new THREE.Vector3(
      Math.cos(angle) * outerRadius,
      Math.sin(angle) * outerRadius,
      -depth
    );

    // Mid point 1 (Starts to sweep inward and twist slightly)
    // We stay extremely wide here (0.9 multiplier) so the trail hugs the perimeter for the first half
    const midAngle1 = angle + (Math.PI / 4) * 0.3; 
    const midRadius1 = outerRadius * 0.9;
    const p1 = new THREE.Vector3(
      Math.cos(midAngle1) * midRadius1,
      Math.sin(midAngle1) * midRadius1,
      -depth * 0.4
    );

    // Mid point 2 (Tighter spiral entering the well)
    // Now it dives in (0.4 multiplier)
    const midAngle2 = angle + (Math.PI / 4) * 0.7; // More twist
    const midRadius2 = outerRadius * 0.4;
    const p2 = new THREE.Vector3(
      Math.cos(midAngle2) * midRadius2,
      Math.sin(midAngle2) * midRadius2,
      depth * 0.1 // Pulls slightly forward towards the camera before the drop
    );

    // End point (The Void core, deep drop off)
    // All trails converge on (0,0)
    const p3 = new THREE.Vector3(
      0, 
      0, 
      -depth * 1.5 // Sucked very deep back
    );

    return new THREE.CatmullRomCurve3([p0, p1, p2, p3], false, 'catmullrom', VortexConfig.CURVE_TENSION);
  }, [angle]);

  // Generate the staggered initial progress values for the planes on this trail
  const initialProgressValues = useMemo(() => {
    const values = [];
    for (let i = 0; i < VortexConfig.PLANES_PER_TRAIL; i++) {
      // Bias the initial spawn heavily toward the outer edge (progress near 0).
      // We do NOT want a uniform spread, as that clutters the center on the very first frame.
      // Math.pow pushes the random distribution heavily toward 0. We cap it at 0.5 so nothing 
      // is ever loaded already inside the middle of the screen.
      let progress = Math.pow(Math.random(), 2.5) * 0.5; 
      values.push(progress);
    }
    return values;
  }, []);

  return (
    <group name={`Trail-${index}`}>
      {/* Optional: Render the curve line itself for debugging by uncommenting */}
      {/* 
      <line>
        <bufferGeometry attach="geometry" setFromPoints={[curve.getPoints(50)]} />
        <lineBasicMaterial attach="material" color="red" opacity={0.2} transparent />
      </line> 
      */}

      {initialProgressValues.map((progress, i) => (
        <ImagePlane
          key={`plane-${index}-${i}`}
          curve={curve}
          initialProgress={progress}
          radialOffsetIndex={index}
        />
      ))}
    </group>
  );
}
