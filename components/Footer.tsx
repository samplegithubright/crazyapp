"use client";
import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return alert("Enter email");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Subscribed!");
      setEmail("");
    } else {
      alert(data.error);
    }
  };
  
  return (
    <footer className="bg-[#0b0f19] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 relative z-10">

        {/* BRAND */}
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">
            Royalfinity Technology
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
            Build modern websites with high-quality AI-generated assets, templates,
            and UI components. Elevate your creative pipeline with unparalleled speed.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                href="#"
                key={i}
                className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-purple-600 hover:border-purple-500 transition-all text-gray-400 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            <li>
              <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-purple-400 transition-colors">Careers</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            <li className="hover:text-purple-400 transition-colors cursor-pointer">Templates</li>
            <li className="hover:text-purple-400 transition-colors cursor-pointer">API Documentation</li>
            <li className="hover:text-purple-400 transition-colors cursor-pointer">Community Flow</li>
            <li className="hover:text-purple-400 transition-colors cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 font-light mb-4">
            Join our newsletter for the latest AI model updates and creative tools.
          </p>

          <div className="flex items-center bg-[#131927] border border-white/10 rounded-xl overflow-hidden focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-4 py-3 w-full text-sm outline-none text-white placeholder-gray-500"
            />

            <button
              onClick={handleSubscribe}
              className="bg-purple-600 hover:bg-purple-500 px-4 py-3 transition-colors text-white flex items-center justify-center border-l border-white/10"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
          <p>© 2026 Royal Style. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookie settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}