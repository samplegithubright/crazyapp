"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const items = [
  {
    title: "Graphics",
    desc: "Explore stunning HD designs",
    link: "/graphics/education",
    image: "/new.jpg",
    category: "graphics",
  },
  {
    title: "Videos",
    desc: "High fidelity generated footage",
    link: "/video-templates/education-video",
    image: "/ai.jpeg",
    category: "videos",
  },
  {
    title: "Motion Graphics",
    desc: "Fluid animated sequences",
    link: "/motion-graphic/motion-education",
    image: "/web.jpg",
    category: "motion-graphics",
  },
  {
    title: "Stock Video",
    desc: "Premium reality captures",
    link: "/stockvideo",
    image: "/mobile.jpg",
    category: "stock-videos",
  },
];

// Duplicate items to form an 8-sided 3D cylinder cylinder
const carouselItems = [...items, ...items];

export default function Collections() {
  const [stats, setStats] = useState<any>({});
  const [radius, setRadius] = useState(450);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Responsive 3D cylinder radius
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(320); // Mobile radius
      else if (window.innerWidth < 1024) setRadius(450); // Tablet radius
      else setRadius(550); // Desktop radius
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-leonardo-dark px-4 sm:px-6 lg:px-12 py-24 sm:py-32 relative overflow-hidden flex flex-col items-center min-h-[90vh]">
      
      {/* INJECTED CSS FOR 3D ENGINE */}
      <style>{`
        @keyframes rotateCarousel {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        .perspective-container {
          perspective: 1400px;
          transform-style: preserve-3d;
        }
        .carousel-track {
          transform-style: preserve-3d;
          animation: rotateCarousel 40s infinite linear;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 right-[20%] w-125 h-125 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-[10%] w-150 h-150 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* HEADING SECTION */}
      <div className="text-center mb-16 sm:mb-24 relative z-10 w-full max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm self-center justify-center mx-auto shadow-lg">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">Community Feed</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Explore the <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Universe</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
          Scroll through incredible graphics, cinematic sequences, and digital assets engineered by top-tier creators on the platform.
        </p>
      </div>

      {/* 3D CURVED CAROUSEL ENGINE */}
      <div className="relative w-full max-w-7xl mx-auto h-[400px] sm:h-[450px] flex items-center justify-center perspective-container z-10 text-left">
        
        {/* ROTATING TRACK */}
        <div className="relative w-[220px] h-[300px] sm:w-[280px] sm:h-[360px] carousel-track">
          
          {carouselItems.map((item, index) => {
            const angle = index * (360 / carouselItems.length);
            
            return (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* --- BACK FACE (Visible when orbiting behind) --- */}
                <div 
                  className="absolute inset-0 bg-[#070a12] rounded-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-purple-900/10 to-indigo-900/10 rounded-3xl" />
                </div>

                {/* --- FRONT FACE (The actual Content Card) --- */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl bg-[#131927]/60 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col group cursor-pointer"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Link href={item.link} className="flex-1 flex flex-col w-full h-full pointer-events-auto">
                    
                    {/* Image Section */}
                    <div className="relative h-[140px] sm:h-[180px] w-full overflow-hidden bg-black flex-shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      {/* Deep bottom fade for smooth transition to text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131927] via-transparent to-transparent opacity-100" />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-between p-4 flex-1 bg-[#131927] z-10">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 sm:mt-3 border-t border-white/5 pt-3">
                        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded-md text-gray-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 group-hover:text-purple-300 transition-all">
                          {stats[item.category] ?? 0} ITEMS
                        </span>

                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent transition-all transform group-hover:translate-x-1 shadow-lg">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Shimmer Light Sweep on Hover */}
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg] group-hover:animate-[shimmer_1.5s_ease-out] pointer-events-none" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* BOTTOM FADE FOR SMOOTH TRANSITION TO NEXT SECTION */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#0B0F19] to-transparent pointer-events-none z-20"></div>

    </div>
  );
}
