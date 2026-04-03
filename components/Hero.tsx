"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },

    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <div className="relative bg-[#05070e] text-white overflow-hidden min-h-[90vh] flex items-center justify-center w-full">

      {/* 🌊 DYNAMIC WAVE MOTION BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#05070e]">

        {/* Subtle SVG Grid + Ambient Glow */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        {/* SVG Defs for Gradients */}
        <svg className="hidden">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#d946ef" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Multi-layered Wave Animation */}
        <div className="absolute inset-x-0 bottom-0 top-auto w-full h-[60vh] lg:h-[70vh] pointer-events-none mix-blend-screen opacity-70 flex items-end">

          {/* Wave 1 - Back, slower */}
          <motion.svg
            className="absolute bottom-0 left-0 w-[200%] h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <path fill="url(#waveGrad1)" d="M0,160 C320,320 400,0 720,160 C1040,320 1120,0 1440,160 C1760,320 1840,0 2160,160 C2480,320 2560,0 2880,160 L2880,320 L0,320 Z"></path>
          </motion.svg>

          {/* Wave 2 - Middle, inverted motion */}
          <motion.svg
            className="absolute bottom-[-10%] -left-full w-[200%] h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
            animate={{ x: ["0%", "50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <path fill="url(#waveGrad2)" d="M0,160 C300,-40 420,360 720,160 C1020,-40 1140,360 1440,160 C1740,-40 1860,360 2160,160 C2460,-40 2580,360 2880,160 L2880,320 L0,320 Z"></path>
          </motion.svg>

          {/* Wave 3 - Front, faster */}
          <motion.svg
            className="absolute bottom-[-5%] left-0 w-[200%] h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <path fill="url(#waveGrad3)" d="M0,160 C400,320 320,-80 720,160 C1120,320 1040,-80 1440,160 C1840,320 1760,-80 2160,160 C2560,320 2480,-80 2880,160 L2880,320 L0,320 Z"></path>
          </motion.svg>
        </div>

        {/* Radial Dark Vignette to keep text readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0)_20%,_#05070e_90%)]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-[#05070e]/80 via-transparent to-transparent"></div>
      </div>

      {/* ✨ FOREGROUND CONTENT with complex Staggered Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative max-w-5xl mx-auto px-4 text-center z-20 w-full pt-16"
      >

        {/* Floating Subtitle Badge */}
        <motion.div variants={itemVariants}>
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-200 tracking-wide">The Ultimate Creative Engine</span>
          </motion.div>
        </motion.div>

        {/* Staggered Floating Headline */}
        <motion.div variants={itemVariants}>
          <motion.h1
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-8 leading-[1.1] text-white"
          >
            Generate assets with <br className="hidden md:block" />{" "}
            <span className="relative inline-block">
              {/* Animated Text Gradient */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]">
                unprecedented speed
              </span>
              {/* Text glow behind */}
              <span className="absolute inset-0 blur-2xl bg-linear-to-r from-purple-500 to-pink-500 opacity-30 -z-10"></span>
            </span>
          </motion.h1>
        </motion.div>

        {/* Body Text */}
        <motion.div variants={itemVariants}>
          <motion.p
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Produce high-fidelity images, cinematic layouts, and UI designs. The industry-leading foundation model for digital creators.
          </motion.p>
        </motion.div>

        {/* Call To Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto sm:max-w-none pt-2 relative"
        >
          {/* Primary Gradient Button WITH SWEEPING GLOW & PULSE */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 0px 20px rgba(168, 85, 247, 0.4)",
                "0px 0px 50px rgba(168, 85, 247, 0.8)",
                "0px 0px 20px rgba(168, 85, 247, 0.4)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full sm:w-auto rounded-full relative overflow-hidden group"
          >
            {/* Shimmer Sweep Animation */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 animate-[shimmer_2s_infinite]" />

            <Link
              href="/register"
              className="w-full sm:w-auto bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-lg relative z-20"
            >
              Start Creating for Free
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Secondary Glass Outline Button */}
          <Link
            href="/graphics/education"
            className="w-full sm:w-auto bg-black/40 border border-white/20 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-full font-semibold transition-all backdrop-blur-xl flex items-center justify-center gap-2 text-lg"
          >
            Explore Models
          </Link>
        </motion.div>

      </motion.div>

      {/* BOTTOM FADE COMPONENT FOR SEAMLESS TRANSITION */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#0b0f19] to-transparent pointer-events-none z-30"></div>

      {/* Tailwind Keyframes Extractor / Inline Styles for Animations */}
      <style>{`
        @keyframes shimmer {
          100% {
            left: 200%;
          }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: textGradient 3s linear infinite;
        }
        @keyframes textGradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
