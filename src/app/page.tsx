import Layer1 from "@/components/Layer1";
import Layer6 from "@/components/Layer6";

export default function Home() {
  return (
    <main className="relative bg-warm-paper">
      
      <div id="experience-container" className="relative z-10">
        <Layer1 />
        
        {/* Final Birthday Scene */}
        <Layer6 />
      </div>
    </main>
  );
}
