"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CartographicEnd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  type SceneImage = { src: string; className: string; side: string; delay: number };
  
  // The structured narrative and layout logic
  const nodes: { id: string; top: string; isFinale?: boolean; text: string; align: string; hasBody: boolean; bodyCopy: React.ReactNode; images: SceneImage[]; imagesSet2?: SceneImage[]; captions: { label: string; text: string; className: string }[] }[] = [
    {
      id: "node-1",
      top: "8%",
      text: "ATTEMPTING TO FULLY **PORTRAY YOU** IS HARD.",
      align: "center", // HERO - Center Weight
      hasBody: true,
      bodyCopy: (
        <>
          <p>But I love to try.</p>
        </>
      ),
      images: [
        // Drop your images here: public/cartographic/frame-1/image-1.webp
        // { src: "/cartographic/frame-1/image-1.webp", className: "w-[25vw] max-w-[300px] right-[10%] top-[40%] rotate-3", side: "right", delay: 0 }
      ],
      captions: [
        { label: "FIELD NOTE", text: "an attempt", className: "top-[10%] right-[15%]" }
      ]
    },
    {
      id: "node-2",
      top: "18%",
      text: "SEEING YOU FROM THE OUTSIDE DREW ME IN.",
      align: "left", // Left-weighted text
      hasBody: true,
      bodyCopy: (
        <>
          {/* Rhythmic Setup */}
          <p className="max-w-[500px] 2xl:max-w-[800px] mb-2 text-2xl 2xl:text-4xl">But once I got to know you</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] mb-8 font-sans font-medium text-[#344128] text-3xl 2xl:text-5xl">and how you think...</p>
          
          <p className="max-w-[500px] 2xl:max-w-[800px] text-lg 2xl:text-2xl mt-6">I was so happy to learn how we aligned.</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] text-lg 2xl:text-2xl font-serif italic">"She sees the world how I see it."</p>
        </>
      ),
      images: [
        { src: "/cartographic/frame-2/36044c77-baa1-4dfb-a6f7-64e9406d16a8.webp", className: "w-[20vw] max-w-[240px] 2xl:max-w-none right-[5%] top-[15%] rotate-6", side: "right", delay: 0 },
        { src: "/cartographic/frame-2/71069727-f8ed-4999-b560-a8a4aea331af.webp", className: "w-[15vw] max-w-[180px] 2xl:max-w-none right-[28%] top-[45%] -rotate-3", side: "right", delay: 0.2 },
        { src: "/cartographic/frame-2/IMG_2483.webp", className: "w-[18vw] max-w-[210px] 2xl:max-w-none right-[10%] top-[70%] rotate-3", side: "right", delay: 0.4 }
      ],
      captions: [
        { label: "FIELD NOTE", text: "politics before romance", className: "top-[60%] right-[35%]" },
        { label: "FIELD NOTE", text: "hours of real conversation", className: "top-[20%] right-[5%]" }
      ]
    },
    {
      id: "node-3",
      top: "38%",
      text: "YOU ARE SO MANY THINGS ALL AT ONCE.",
      align: "right", // Right-weighted text
      hasBody: true,
      bodyCopy: (
        <div className="flex flex-col items-end gap-1 mt-12 mb-16">
          {/* Rhythmic Stacking */}
          <span className="text-secondary-display text-[#344128] 2xl:text-6xl text-right">A technologist.</span>
          <span className="font-serif italic text-4xl 2xl:text-6xl text-[#344128] mb-8 text-right">An artist.</span>
          
          <p className="max-w-[500px] 2xl:max-w-[800px] 2xl:text-2xl mt-6">You love beautiful things and beautiful places.</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] 2xl:text-2xl">You appreciate the finer things in life<br/>and you strive for more,</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] 2xl:text-2xl">but you're still grounded enough<br/>to appreciate the simple things.</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] 2xl:text-2xl mt-4">You're logical, rational, and analytical,</p>
          <p className="max-w-[500px] 2xl:max-w-[800px] 2xl:text-2xl">but you're also one of the most emotional<br/>and deeply feeling people I know.</p>
        </div>
      ),
      images: [
        { src: "/cartographic/frame-3/6bdb65cd-5089-42ad-8eeb-fdc240f6a1f5.webp", className: "w-[18vw] max-w-[220px] 2xl:max-w-none left-[5%] top-[10%] -rotate-3", side: "left", delay: 0 },
        { src: "/cartographic/frame-3/893b2f3f-1fce-46af-8623-139090801ad5.webp", className: "w-[14vw] max-w-[170px] 2xl:max-w-none left-[28%] top-[30%] rotate-2", side: "left", delay: 0.2 },
        { src: "/cartographic/frame-3/IMG_2147.webp", className: "w-[16vw] max-w-[190px] 2xl:max-w-none left-[8%] top-[55%] rotate-4", side: "left", delay: 0.4 },
        { src: "/cartographic/frame-3/b8bf1162-8a2b-4ae5-a8b9-ce0d8188c4a7.webp", className: "w-[15vw] max-w-[180px] 2xl:max-w-none left-[25%] top-[75%] -rotate-6", side: "left", delay: 0.6 }
      ],
      captions: [
        { label: "FIELD NOTE", text: "learning how your mind works", className: "bottom-[-10%] right-[15%]" },
        { label: "MEDIA", text: "youtube video essays", className: "top-[0%] left-[8%]" }
      ]
    },
    {
      id: "node-4",
      top: "60%",
      text: "BEFORE YOU, MY WORLD WAS SMALLER.",
      align: "left",
      hasBody: true,
      bodyCopy: (
        <div className="flex flex-col items-start gap-1 mt-8 mb-16">
          <p className="mb-8 2xl:text-2xl">You pulled me into parts of life<br/>that I'd avoided.</p>
          
          {/* Rhythmic Vertical Beats */}
          <span className="text-secondary-display text-[#344128] 2xl:text-6xl">Dancing.</span>
          <span className="text-secondary-display text-[#344128] ml-8 2xl:text-6xl">Partying.</span>
          <span className="text-secondary-display text-[#344128] ml-16 2xl:text-6xl">Loving.</span>
          <span className="font-serif italic text-5xl 2xl:text-7xl text-[#344128] mt-2 mb-8 ml-24">Passion.</span>

          <p className="mt-4 2xl:text-2xl">New cities.<br/>New hobbies.</p>

          <p className="mt-6 2xl:text-2xl">And my world got bigger.</p>
        </div>
      ),
      images: [
        // Set 1: Dispersing images
        { src: "/cartographic/frame-4/set-1/IMG_1802.webp", className: "w-[16vw] max-w-[200px] 2xl:max-w-none right-[15%] top-[15%] -rotate-6", side: "right", delay: 0 },
        { src: "/cartographic/frame-4/set-1/IMG_20200127_104040.webp", className: "w-[20vw] max-w-[240px] 2xl:max-w-none right-[5%] top-[40%] rotate-2", side: "right", delay: 0.1 },
        { src: "/cartographic/frame-4/set-1/IMG_20200823_165801.webp", className: "w-[14vw] max-w-[170px] 2xl:max-w-none right-[28%] top-[30%] rotate-6", side: "right", delay: 0.2 },
        { src: "/cartographic/frame-4/set-1/IMG_9610.webp", className: "w-[15vw] max-w-[180px] 2xl:max-w-none right-[10%] top-[65%] -rotate-3", side: "right", delay: 0.3 }
      ],
      imagesSet2: [
        // Set 2: Revealing images
        { src: "/cartographic/frame-4/set-2/IMG_2488.webp", className: "w-[18vw] max-w-[220px] 2xl:max-w-none left-[15%] top-[20%] rotate-4", side: "left", delay: 0 },
        { src: "/cartographic/frame-4/set-2/IMG_2843.webp", className: "w-[15vw] max-w-[180px] 2xl:max-w-none right-[10%] top-[35%] -rotate-5", side: "right", delay: 0 },
        { src: "/cartographic/frame-4/set-2/IMG_6614.webp", className: "w-[20vw] max-w-[240px] 2xl:max-w-none right-[15%] top-[60%] rotate-2", side: "right", delay: 0 },
        { src: "/cartographic/frame-4/set-2/d13f80d4-7498-4a22-946e-418fc43f1b6f.webp", className: "w-[16vw] max-w-[200px] 2xl:max-w-none left-[12%] top-[65%] -rotate-6", side: "left", delay: 0 }
      ],
      captions: [
        { label: "FIELD NOTE", text: "first time seeing paris together", className: "top-[-5%] left-[10%]" },
        { label: "PARIS", text: "48.8566° N", className: "top-[40%] right-[32%]" },
        { label: "LISBON", text: "38.7223° N", className: "top-[60%] right-[5%]" },
        { label: "BALI", text: "8.3405° S", className: "top-[75%] right-[28%]" },
        { label: "BANGKOK", text: "13.7563° N", className: "top-[85%] right-[10%]" }
      ]
    },
    {
      id: "node-5",
      top: "88%",
      isFinale: true,
      text: "**HAPPY BIRTHDAY, NIANA.**",
      align: "center", // Vast open space
      hasBody: true,
      bodyCopy: (
        <div className="flex flex-col items-center gap-2 mt-12">
          <p className="2xl:text-2xl">You're strong.</p>
          <p className="mb-6 2xl:text-2xl">Independent.</p>
          
          <p className="mt-4 2xl:text-2xl">And I want to keep learning you.</p>
          <p className="mt-4 text-[#344128] italic font-serif text-2xl 2xl:text-5xl">Layer by layer.</p>
          <p className="text-[#344128] italic font-serif text-2xl 2xl:text-5xl">Day by day.</p>
        </div>
      ),
      images: [],
      captions: [
        { label: "FIELD NOTE", text: "still learning", className: "bottom-[-25%] left-[50%] -translate-x-1/2" }
      ]
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Fallback pathLength calculation to guarantee line scrubs on layout
    const path = pathRef.current;
    let pathLength = 6000;
    try {
      pathLength = path.getTotalLength() || 6000;
    } catch(e) { /* Handle hidden/SSR svg errors safely */ }
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      
      // 1. Draw the SVG line down the page (Pacing slowed)
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2, // smooth it out over a wider scroll delta
        }
      });
      
      // 2. Reveal Text Words
      const textNodes = gsap.utils.toArray<HTMLElement>(".character-reveal");
      textNodes.forEach((node) => {
        // 2a. Reveal Text Words
        const words = node.querySelectorAll(".character-reveal__char");
        
        if (words.length) {
          const isFinale = node.closest('#node-layer-node-5');
          
          if (isFinale) {
            // Specialized "Rack Focus" Effect for Birthday
            gsap.fromTo(words, {
              color: "transparent",
              filter: "blur(30px)",
              scale: 1.5,
              letterSpacing: "0.2em"
            }, {
              color: "#344128",
              filter: "blur(0px)", 
              scale: 1,
              letterSpacing: "0em",
              stagger: 0.1,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 95%",
                end: "top 50%",
                scrub: true,
              }
            });
          } else {
            // Standard Reveal
            gsap.to(words, {
              color: "#344128",
              stagger: 0.08,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 85%", 
                end: "top 35%",
                scrub: 1.2,
              }
            });
          }
        }

        const paragraphs = node.querySelectorAll(".body-copy p");
        if (paragraphs.length) {
          gsap.fromTo(paragraphs, 
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 0.8,
              y: 0,
              stagger: 0.2, // slow, deliberate cascade down the paragraphs
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 55%",
                end: "top 25%",
                scrub: 1,
              }
            }
          );
        }
      });
      
      // 3. Float Cards with Directional Support
      const cards = gsap.utils.toArray<HTMLElement>(".artifact-card", containerRef.current);
      cards.forEach((card) => {
        const side = card.dataset.side || "right";
        const delay = parseFloat(card.dataset.delay || "0");
        
        const xOffset = side === "left" ? -80 : 80;
        const rotateOffset = side === "left" ? -15 : 15;
        
        const isRotateNeg = card.className.includes("-rotate");
        const finalRotate = isRotateNeg ? -4 : 4;
        
        gsap.fromTo(card, 
          {
            opacity: 0,
            xPercent: xOffset,
            rotation: rotateOffset,
            scale: 0.95,
          },
          {
            opacity: 1,
            xPercent: 0,
            rotation: finalRotate,
            scale: 1,
            duration: 2.5,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 45%",
              scrub: 1.5,
            }
          }
        );
      });

      // 4. Frame 4 Pinned Transition Sequence
      const node4 = container.querySelector('#node-layer-node-4');
      if (node4) {
        const set1 = node4.querySelectorAll('.artifact-card');
        const set2 = node4.querySelectorAll('.artifact-card-set-2');

        if (set1.length || set2.length) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: node4,
              start: "top top", 
              end: "+=150%",     
              pin: true,
              scrub: 1,
              pinSpacing: false 
            }
          });

          tl.to(set1, {
            opacity: 0,
            yPercent: -50,
            scale: 1.05,
            stagger: 0.05,
            duration: 1
          }, 0);

          tl.to(set2, {
            opacity: 1,
            yPercent: -10, 
            scale: 1,
            rotation: (i, el: HTMLElement) => el.className.includes('-rotate') ? -4 : 4,
            stagger: 0.05,
            duration: 1
          }, 0.5); 

          // 4c. FINAL PURGE: Fade everything from Frame 4 out before Pin release
          tl.to([set1, set2, node4.querySelectorAll('.character-reveal')], {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          }, 1.3);
        }
      }

      // 5. Global Clean Up: Fade out all images globally before Frame 5 arrives
      // This explicitly guarantees Frame 5 feels perfectly empty and text-focused
      const node5 = container.querySelector('#node-layer-node-5');
      if (node5) {
        // Targeted sweep to hide all PREVIOUS section layers decisively
        // We exclude node-5 elements specifically to ensure the finale shows up
        const previousElements = '.node-layer:not(#node-layer-node-5) .image-container, .node-layer:not(#node-layer-node-5) .character-reveal, .node-layer:not(#node-layer-node-5) .body-copy-wrapper, .node-layer:not(#node-layer-node-5) .micro-caption-wrapper';
        
        // Toggle hard visibility with ScrollTrigger events
        ScrollTrigger.create({
          trigger: node5,
          start: "top 100%",
          onEnter: () => gsap.set(previousElements, { display: 'none' }),
          onLeaveBack: () => gsap.set(previousElements, { display: 'block' }),
        });

        // Smooth fade out leading up to it
        gsap.to(previousElements, {
          opacity: 0,
          scrollTrigger: {
            trigger: node5,
            start: "top 100%", 
            end: "top 90%",   
            scrub: true,
          }
        });
      }

      // 4. Fade In Micro-Captions slightly after the cards
      const captions = gsap.utils.toArray<HTMLElement>(".micro-caption-wrapper");
      captions.forEach((caption) => {
        gsap.to(caption, {
          opacity: 1,
          duration: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: caption,
            start: "top 60%", // Triggers naturally slightly lower/later than typical text
            toggleActions: "play none none reverse",
          }
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Creates truly fluid inline spans separated by actual DOM spaces so the 
  // browser applies natural multi-line wrapping safely regardless of screen size.
  // Supports **markdown-style** bold emphasis mapped to the sans-serif font system,
  // including multi-word phrases and trailing punctuation.
  const splitTextToSpans = (text: string) => {
    const arr = text.split(" ");
    let inEmphasis = false;
    
    return arr.map((word, i) => {
      let isEmphasizedWord = inEmphasis;
      let cleanWord = word;
      
      // If the word starts an emphasis block
      if (word.startsWith("**")) {
        inEmphasis = true;
        isEmphasizedWord = true;
        cleanWord = cleanWord.substring(2); // Strip the leading **
      }
      
      // If the word ends an emphasis block (or it's a single word like **WORD**)
      if (cleanWord.includes("**")) {
        inEmphasis = false;
        isEmphasizedWord = true; // It was part of the emphasis block
        cleanWord = cleanWord.replace(/\*\*/g, ""); // Strip trailing **
      }
      
      return (
        <span key={i}>
          <span className={`character-reveal__char text-[#344128]/30 transition-colors duration-200 ${isEmphasizedWord ? 'emphasis text-secondary-display' : ''}`}>
            {cleanWord}
          </span>
          {i < arr.length - 1 && " "}
        </span>
      );
    });
  };

  // Observational, exploratory surveyed path utilizing wide horizontal space
  const surveyPathData = `M 500,0 C 490,100 650,200 650,400 C 650,550 820,800 820,1100 C 820,1400 500,1600 300,1800 C 100,2000 180,2300 150,2500 C 120,2700 400,2900 700,3100 C 900,3300 880,3400 850,3700 C 820,4000 500,4200 400,4800 C 350,5200 600,5500 500,5800`;

  return (
    <section ref={containerRef} className="cartographic-world h-[800vh] relative pb-[20vh] overflow-hidden">
      
      {/* SVG Path with non-scaling-stroke to prevent ugly horizontal-stretch distortion */}
      <svg className="svg-path" viewBox="0 0 1000 5800" preserveAspectRatio="none">
        <path d={surveyPathData} fill="none" stroke="#344128" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="path-drawing" viewBox="0 0 1000 5800" preserveAspectRatio="none">
        <path ref={pathRef} d={surveyPathData} fill="none" stroke="#344128" strokeWidth="4" vectorEffect="non-scaling-stroke" />
      </svg>
      
      {nodes.map((node, i) => (
        <div 
          key={node.id} 
          id={`node-layer-${node.id}`} 
          className="node-layer absolute top-0 left-0 w-full min-h-screen" 
          style={{ 
            top: node.top, 
            perspective: '1000px', 
            transformStyle: 'preserve-3d',
            pointerEvents: 'none' // Allow pass-through by default
          }}
        >
          {/* Text Layer: Second in DOM = Topmost Layer */}
          {/* 1. Artifact Cards layer: First in DOM = Lowest Z-INDEX */}
          <div className="image-container absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Set 1 Images */}
            {node.images.map((img, imgIdx) => (
              <img 
                key={imgIdx} 
                src={img.src} 
                alt="Narrative artifact" 
                className={`artifact-card absolute filter drop-shadow-xl ${img.className}`}
                data-side={img.side}
                data-delay={img.delay}
                loading="eager"
                fetchPriority="high"
              />
            ))}
            
            {/* Set 2 Images */}
            {/* @ts-ignore */}
            {node.imagesSet2?.map((img, imgIdx) => (
              <img 
                key={`set2-${imgIdx}`} 
                src={img.src} 
                alt="Narrative artifact dispersed" 
                className={`artifact-card-set-2 absolute filter drop-shadow-xl opacity-0 scale-90 ${img.className}`}
                data-side={img.side}
                data-delay={img.delay}
                loading="eager"
                fetchPriority="high"
              />
            ))}
            
            {/* Micro-Captions */}
            {node.captions?.map((caption, capIdx) => (
              <div 
                key={`cap-${capIdx}`} 
                className={`micro-caption-wrapper ${caption.className}`}
              >
                <div className="micro-caption">
                  {caption.label}<br/>
                  {caption.text}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Text Layer: Second in DOM = Topmost Layer */}
          <div className="character-reveal absolute top-0 left-0 w-full pointer-events-auto" style={{ zIndex: 10 }}>
            <div className={`relative w-[90vw] md:w-[85vw] mx-auto ${node.align === 'left' ? 'text-left' : node.align === 'right' ? 'text-right' : 'text-center'}`}>
              <div className={`character-reveal__text inline-block break-words ${node.id === 'node-5' ? 'text-[6rem] md:text-[14rem] leading-[0.8] tracking-tighter' : ''}`}>
                {splitTextToSpans(node.text)}
              </div>
            </div>
            
            {node.hasBody && node.bodyCopy && (
              <div className={`body-copy-wrapper flex w-[90vw] md:w-[85vw] mx-auto relative z-[100] ${node.align === 'left' ? 'justify-start' : node.align === 'right' ? 'justify-end' : 'justify-center' }`}>
                <div className={`body-copy max-w-lg mt-8 text-[1.1rem] ${node.align === 'left' ? 'text-left' : node.align === 'right' ? 'text-left' : 'text-center'}`}>
                  {node.bodyCopy}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      
    </section>
  );
}
