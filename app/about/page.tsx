"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#0b0f19] min-h-screen relative overflow-hidden font-sans">
      <Navbar />

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 pt-24 pb-16">
        
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-12 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm self-center justify-center mx-auto">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">The Future of Creation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">Creators</span> Worldwide
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl font-light">
            Discover premium foundation models, bleeding-edge templates, and tools designed to help you render faster, smarter, and beyond boundaries.
          </p>
        </section>

        {/* MISSION */}
        <section className="px-4 sm:px-6 lg:px-12 py-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white tracking-tight">
              Our Prime Directive
            </h2>
            <div className="bg-[#131927]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.1)] relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-3xl"></div>
              <p className="text-gray-300 mb-6 text-lg font-light leading-relaxed">
                We synthesize the ultimate creative ecosystem by consolidating high-fidelity digital assets and generative AI paradigms in one singular hub.
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                From structural UI blueprints to cinematic motion templates — everything you need to architect stunning digital realities seamlessly.
              </p>
            </div>
          </div>

          <div className="relative group perspective">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <img
              src="/new.jpg"
              alt="About"
              className="rounded-2xl shadow-2xl w-full border border-white/10 relative z-10 transform group-hover:scale-[1.02] transition-transform duration-700 object-cover h-[400px]"
            />
            <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
              <p className="text-xs text-purple-400 font-mono tracking-wider uppercase">01 / Creation Engine</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="px-4 sm:px-6 lg:px-12 py-24">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              The Architecture of Success
            </h2>
            <p className="text-gray-400 font-light text-lg">
              Synthesized precision for your creative pipeline
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {[
              { title: "Infinite Generations", desc: "No caps. Generate, iterate, and evolve endlessly.", color: "from-pink-500 to-purple-600", icon: "♾️" },
              { title: "Parametric Templates", desc: "Adaptable blueprints tuned for extreme customization.", color: "from-blue-500 to-indigo-600", icon: "📐" },
              { title: "Fidelity Rendering", desc: "Outputs strictly maintained at industry-standard high resolution.", color: "from-cyan-400 to-blue-500", icon: "👁️" },
              { title: "Absolute Control", desc: "Every layer, vector, and pixel rests under your command.", color: "from-purple-500 to-indigo-500", icon: "🕹️" },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-[1px] rounded-3xl bg-white/5 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/5 transition-all duration-500"
              >
                <div className="bg-[#131927] p-8 rounded-[23px] h-full flex flex-col items-start hover:bg-[#1C2333] transition-colors border border-transparent">
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg text-xl`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">{item.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="px-4 sm:px-6 lg:px-12 pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1M+", label: "Rendered Assets" },
              { value: "500K+", label: "Active Nodes" },
              { value: "100+", label: "Model Variants" },
              { value: "24/7", label: "System Uptime" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#131927]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-lg group hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition duration-500"
              >
                <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 mb-3 drop-shadow-sm">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        
      </div>
      
      <Footer />
    </div>
  );
}