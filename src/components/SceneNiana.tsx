import { ReactNode } from "react";

interface SceneNianaProps {
  colorClass?: string;
  textColor?: string;
  scale?: number;
  letterSpacing?: string;
  inverseTransform?: string;
  dotColor?: string;
  showDots?: boolean;
  isWireframe?: boolean;
  renderedRatio?: number; // 0 to 1, indicates how many letters are solid
}

export default function SceneNiana({ 
  colorClass = "", 
  textColor, 
  scale = 1,
  letterSpacing = "normal",
  inverseTransform = "translate3d(0,0,0)", 
  dotColor = "#6AA9FF", 
  showDots = false,
  isWireframe = false,
  renderedRatio = 1
}: SceneNianaProps) {
  
  // Calculate how many of the 5 letters should be rendered solid based on ratio
  const renderedCount = Math.floor(renderedRatio * 5);
  
  const getLetterClass = (index: number) => {
    if (!isWireframe) return "";
    return `wireframe-text ${index < renderedCount ? 'rendered' : ''}`;
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-[50]"
      style={{ transform: inverseTransform }}
    >
      <h1 
        className={`niana-container editorial-heading text-[18vw] md:text-[20vw] leading-none flex items-center justify-center tracking-tighter select-none ${colorClass}`}
        style={{ 
          ...(textColor ? { color: textColor } : {}),
          transform: `scale(${scale})`,
          letterSpacing: letterSpacing
        }}
      >
        <span className={`niana-letter n1 inline-block relative ${getLetterClass(0)}`}>
          N
          <Dot show={showDots} color={dotColor} top="20%" left="50%" />
        </span>
        <span className={`niana-letter i inline-block relative ${getLetterClass(1)}`}>
          I
          <Dot show={showDots} color={dotColor} top="80%" left="50%" />
        </span>
        <span className={`niana-letter a1 inline-block relative ${getLetterClass(2)}`}>
          A
          <Dot show={showDots} color={dotColor} top="10%" left="50%" />
        </span>
        <span className={`niana-letter n2 inline-block relative ${getLetterClass(3)}`}>
          N
          <Dot show={showDots} color={dotColor} top="60%" left="50%" />
        </span>
        <span className={`niana-letter a2 inline-block relative ${getLetterClass(4)}`}>
          A
          <Dot show={showDots} color={dotColor} top="40%" left="80%" />
        </span>
      </h1>
    </div>
  );
}

function Dot({ show, color, top, left }: { show: boolean, color: string, top: string, left: string }) {
  if (!show) return null;
  return (
    <div 
      className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-80"
      style={{ top, left, backgroundColor: color, boxShadow: `0 0 10px ${color}` }} 
    />
  );
}
