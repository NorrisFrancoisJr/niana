import * as THREE from 'three';

// Export a singleton TextureLoader to be reused across all components
export const textureLoader = new THREE.TextureLoader();

// Export the array of memory filenames (same as before)
export const memoryFiles = [
  "10.webp", "2.webp", "20240315_144753_Original.webp", "20240315_181312.webp", "20240315_182809.webp", "20240317_175853.webp", 
  "20240318_144016.webp", "20240318_153656.webp", "20240318_205319.webp", "20240319_102332.webp", "20240320_092803_Original.webp", 
  "20240320_095346.webp", "20240625_120547.webp", "20240628_092036.webp", "20240831_230100.webp", "20240901_170902.webp", "20240902_173205.webp", 
  "20240903_022434.webp", "20240903_035022.webp", "20240904_121244(0).webp", "20240904_122533(0).webp", "20240904_131637.webp", "20240904_141605.webp", 
  "20240904_155322.webp", "20240904_155400.webp", "20240904_155834.webp", "20240904_163739.webp", "20240904_212208.webp", "20240904_215242.webp", 
  "20240904_215650.webp", "20240904_220322.webp", "20240905_114622.webp", "20240905_120100.webp", "20240905_150933(1).webp", 
  "20240905_153045_exported_5378.webp", "20250423_091530-Edit.webp", "20250423_091547(0).webp", "20250423_091559.webp", "20250423_115544.webp", 
  "20250423_152830.webp", "20250423_165444.webp", "20250423_170625.webp", "20250424_064128.webp", "20250424_074049.webp", "20250424_081130(0).webp", 
  "20250424_081532.webp", "20250424_104246.webp", "20250424_123025.webp", "20250425_100855.webp", "20250427_113027 copy.webp", "20250427_130054 copy.webp", 
  "20250427_190422.webp", "20250429_163156 copy.webp", "20250429_164821 copy.webp", "253a3753-090b-436f-b6e9-d5c5768dde92.webp", 
  "2944223F-7EC8-46B6-9711-30AED11EB695.webp", "3.webp", "31 Niana.webp", "55a6e8af-4cb9-47ce-982a-4bb50a3ee7a1.webp", 
  "81f50494-5fe5-4e4a-86e2-57e4a107f8a1.webp", "88bddeaa-0d55-48b4-8076-8c6529ca0630.webp", "9e827982-c278-4512-a8be-5912b2217c3e.webp", 
  "A007_12020658_C445.00_05_29_18.Still016.webp", "A007_12040417_C465.00_00_06_21.Still008.webp", "A016ED69-1EC0-4D73-9DB2-3E017FED07DD.webp", 
  "Harlem-9.webp", "IMG_1575_Original.webp", "IMG_3266.webp", "IMG_3427.webp", "IMG_5197.webp", "IMG_6902.webp", "IMG_7724.webp", "IMG_8870.webp", 
  "Slide 3.webp", "Slide 9.webp", "Still 2025-05-04 190849_1.17.1.webp", "Still 2025-05-04 190849_1.185.1.webp", "Still 2025-05-04 190849_1.220.2.webp", 
  "Still 2025-05-04 190849_1.324.1.webp", "Still 2025-05-04 190849_1.48.2.webp", "WhatsApp Image 2026-01-07 at 13.28.59.webp", 
  "WhatsApp Image 2026-01-07 at 13.43.25.webp", "WhatsApp Image 2026-01-07 at 13.43.41.webp", "WhatsApp Image 2026-01-17 at 14.15.01.webp", 
  "besfren-7.webp", "d13f80d4-7498-4a22-946e-418fc43f1b6f.webp", "dji_fly_20250425_174218_0862_1745577949874_photo.webp", "ff74e1f4-f2e1-4948-b6f7-7c584076c4ae.webp"
];

// Helper to get a random requested texture path
export const getRandomTexturePath = () => {
  const index = Math.floor(Math.random() * memoryFiles.length);
  return `/memories/${memoryFiles[index]}`;
};

// Global pool of loaded textures to prevent rebinding costs
export const textureCache: Record<string, THREE.Texture> = {};

export const fetchTexture = (path: string): Promise<THREE.Texture> => {
  return new Promise((resolve) => {
    if (textureCache[path]) {
      resolve(textureCache[path]);
      return;
    }
    textureLoader.load(path, (tex) => {
      // Set some texture defaults for quality
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      textureCache[path] = tex;
      resolve(tex);
    });
  });
};
