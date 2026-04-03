"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sparkles, Download, CheckCircle2 } from "lucide-react";

export default function TemplatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDownload = () => {
    // 🔹 Not logged in
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // 🔹 Logged in but no subscription
    if (session && !(session.user as any)?.isSubscribed) {
      router.push("/pricing");
      return;
    }

    // 🔹 Subscribed user
    if (session && (session.user as any)?.isSubscribed) {
      router.push("/graphics/education");
    }
  };

  return (
    <div className="bg-[#0b0f19] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-[#131927] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 backdrop-blur-sm group hover:border-purple-500/20 transition-all duration-300">
        
        {/* Glow accent */}
        <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        {/* Image */}
        <div className="relative w-full h-64 sm:h-72 md:h-auto overflow-hidden">
          <Image
            src="/new.jpg"
            alt="Template Preview"
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#131927] hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#131927] via-transparent to-transparent md:hidden"></div>
          
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-white">Premium Generation</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-[#131927]">
          <div className="inline-block text-purple-400 text-sm font-semibold tracking-wider uppercase mb-2">
            Featured Model
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Absolute Reality Template
          </h1>

          <p className="text-gray-400 mb-8 text-sm md:text-base font-light leading-relaxed">
            Get a high-quality, fully responsive template designed for modern
            web applications. Utilize state-of-the-art designs generated for creative professionals.
          </p>

          <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="flex-1">
              <p className="text-gray-400 text-sm mb-1">Standard License</p>
              <p className="text-2xl md:text-3xl font-bold text-white">₹999</p>
            </div>
            <div className="flex-1 border-l border-white/10 pl-4">
              <p className="flex items-center gap-1.5 text-sm text-green-400 mb-1">
                <CheckCircle2 className="w-4 h-4" /> Commercial Use
              </p>
              <p className="text-gray-500 text-xs">
                Earn up to ₹5000+ profit
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] font-semibold text-lg flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            <Download className="w-5 h-5" /> Download Now
          </button>
        </div>
      </div>
    </div>
  );
}