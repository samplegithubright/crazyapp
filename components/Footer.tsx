"use client";

import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1f44] text-white ">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {/* BRAND */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-[#d7ac38]">
            Royalfinity Technology
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Build modern websites with high-quality assets, templates,
            and UI components. Inspired by Envato Elements design system.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="p-2 bg-white/10 rounded-full hover:bg-[#d7ac38] transition"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#d7ac38]">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#d7ac38]">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Templates</li>
            <li className="hover:text-white cursor-pointer">UI Kits</li>
            <li className="hover:text-white cursor-pointer">Fonts</li>
            <li className="hover:text-white cursor-pointer">Icons</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#d7ac38]">
            Subscribe
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Get latest updates and offers.
          </p>

          <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-3 py-2 w-full text-sm outline-none"
            />
            <button className="bg-[#d7ac38] p-2 hover:bg-yellow-500 transition">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10"></div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>© 2026 Royal Style. All rights reserved.</p>

        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
}