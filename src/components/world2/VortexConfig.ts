// Configuration parameters for the 3D Vortex Scene
export const VortexConfig = {
  // --- Architecture ---
  NUM_TRAILS: 6, // Number of radial spline arms
  PLANES_PER_TRAIL: 12, // How many images exist simultaneously per trail

  // --- Timing & Flow ---
  BASE_SPEED: 0.05, // Base progress increment per second (e.g. 0.05 = ~20s total duration)
  SPEED_VARIANCE: 0.015, // How much speed varies per individual image
  SPAWN_STAGGER: 0.08, // Initial stagger offset between planes so they don't form a clump
  
  // --- Path Geometry ---
  RADIUS_START: 45, // Massively increased to push emitters to the edges
  RADIUS_END: 0.5, // How close it gets to the mathematical center
  CURVE_HEIGHT: 15, // How "deep" the start of the curve is in Z space
  CURVE_TENSION: 0.8, // CatmullRom tension
  
  // --- Visuals ---
  BASE_SCALE: 4.5, // Standard starting size for image planes
  SCALE_VARIANCE: 1.5, // Random variance added to scale
  OPACITY_MAX: 0.95, // Peak opacity
  
  // --- Easing Thresholds (Progress 0 to 1) ---
  FADE_IN_END: 0.05, // Quick fade in on the absolute outer edge
  FADE_OUT_START: 0.80, // Begins fading out very late
  SHRINK_START: 0.85, // Size stays large until right over the hole
  
  // --- Interaction ---
  MOUSE_INFLUENCE: 0.05, // How much the entire vortex tilts based on mouse position
};
