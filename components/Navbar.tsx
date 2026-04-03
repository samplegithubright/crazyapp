"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: session } = useSession();

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // ✅ MENU
  const menuItems = [
    {
      name: "Stock Video",
      link: "/stockvideo",
    },
    {
      name: "Video Templates",
      submenus: [
        { name: "Education Video", link: "/video-templates/education-video" },
        { name: "Jewellery-Video", link: "/video-templates/jewellery-video" },
        { name: "Real-State-Video", link: "/video-templates/real-state-video" },
        { name: "Restaurants-Video", link: "/video-templates/restaurants-video" },
        { name: "Beautysinery-Video", link: "/video-templates/beautysinery-video" },
      ],
    },
    {
      name: "Motion Graphic",
      submenus: [
        { name: "Motion Education", link: "/motion-graphic/motion-education" },
        { name: "Motion Restaurants", link: "/motion-graphic/motion-restaurants" },
        { name: "Motion RealState", link: "/motion-graphic/motion-real-state" },
        { name: "Motion Jewellery", link: "/motion-graphic/motion-jewellery" },
        { name: "Motion Beautysinery", link: "/motion-graphic/motion-beautysinery" },
      ],
    },
    {
      name: "Graphics",
      submenus: [
        { name: "Education", link: "/graphics/education" },
        { name: "Jewellery", link: "/graphics/jewellery" },
        { name: "Real-State", link: "/graphics/real-state" },
        { name: "Beautysinery", link: "/graphics/beutysinery" },
        { name: "Restaurants", link: "/graphics/restaurants" },
      ],
    },
  ];

  return (
    <header className="w-full bg-[#0b0f19]/80 backdrop-blur-md text-white fixed top-0 left-0 z-50 border-b border-white/10">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">
          <Link href="/" className="hover:opacity-80 transition">
            MyBrand
          </Link>
        </h1>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">

              {item.link ? (
                <Link
                  href={item.link}
                  className="text-xs lg:text-sm font-medium text-gray-300 hover:text-purple-400 transition"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center gap-1 text-xs lg:text-sm font-medium text-gray-300 hover:text-purple-400 transition"
                >
                  {item.name}
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              )}

            </div>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-lg border border-white/20 text-gray-300 hover:border-purple-400 hover:text-white transition text-sm bg-white/5"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition text-sm"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-gray-300 hover:text-white transition" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* DESKTOP MEGA MENU */}
      {activeMenu && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-[#0b0f19]/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {menuItems
              .find((item) => item.name === activeMenu)
              ?.submenus?.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.link}
                  className="group relative p-4 rounded-xl bg-[#131927] hover:bg-[#1C2333] border border-white/5 hover:border-purple-500/50 shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300 rounded-t-xl"></div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      Explore {sub.name}
                    </span>
                  </div>
                </Link>
              ))}

          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px] py-4" : "max-h-0"
          } bg-[#0b0f19] border-t border-white/10 px-4`}
      >
        {menuItems.map((item, index) => (
          <div key={index} className="border-b border-white/5">

            {item.link ? (
              <Link
                href={item.link}
                className="block py-3 text-sm text-gray-300 hover:text-purple-400 transition"
              >
                {item.name}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="w-full flex justify-between items-center py-3 text-sm text-gray-300 hover:text-purple-400 transition"
                >
                  {item.name}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${activeMenu === item.name ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${activeMenu === item.name ? "max-h-40 pb-2" : "max-h-0"
                    }`}
                >
                  {item.submenus?.map((sub, i) => (
                    <Link
                      key={i}
                      href={sub.link}
                      className="block pl-4 py-2 text-sm text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </>
            )}

          </div>
        ))}

        {/* AUTH MOBILE */}
        <div className="mt-4 flex flex-col gap-3">
          {!session ? (
            <>
              <Link href="/login" className="text-center px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:border-purple-400 hover:text-white transition rounded-md font-medium">
                Login
              </Link>
              <Link href="/register" className="text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md font-medium hover:from-purple-500 hover:to-indigo-500 transition shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-center px-4 py-2 bg-red-500/20 text-red-400 rounded-md border border-red-500/30"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}