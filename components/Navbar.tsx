"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
const { data: session } = useSession();
  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menuItems = [
  {
    name: "Stock Video",
    submenus: [
      { name: "Motion Graphics", link: "/stockvideo/motiongraphics" },
      { name: "Stock Footage", link: "/stockvideo/stockfootage" },
    ],
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
   <header className="w-full bg-white/80 backdrop-blur-md text-gray-800 fixed top-0 left-0 z-50 shadow-sm border-b border-gray-200">
      
  {/* TOP BAR */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    
    {/* LOGO */}
<h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#d7ac38] tracking-wide">
  <Link href="/" className="hover:opacity-80 transition">
    MyBrand
  </Link>
</h1>

    {/* DESKTOP MENU */}
    <nav className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
      {menuItems.map((item, index) => (
        <div key={index} className="relative">
          
          <button
            onClick={() => toggleMenu(item.name)}
            className="flex items-center gap-1 text-xs lg:text-sm font-medium text-gray-700 hover:text-[#d7ac38] transition"
          >
            {item.name}
            <ChevronDown size={14} className="opacity-70" />
          </button>

        </div>
      ))}
    </nav>

    {/* RIGHT SIDE */}
    <div className="hidden md:flex items-center gap-3">
  {!session ? (
    <>
      <Link
        href="/login"
        className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:border-[#d7ac38] hover:text-[#d7ac38] transition text-sm"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="px-4 py-1.5 bg-[#d7ac38] text-white rounded-lg hover:opacity-90 shadow-sm text-sm"
      >
        Sign Up
      </Link>
    </>
  ) : (
    <Link
      href="/dashboard"
      className="px-4 py-1.5 bg-[#0a1f44] text-white rounded-lg hover:opacity-90 shadow-sm text-sm"
    >
      Dashboard
    </Link>
  )}
</div>

    {/* MOBILE BUTTON */}
    <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
      {mobileOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  </div>

      {/* DESKTOP MEGA MENU */}
    {activeMenu && (
  <div className="hidden md:block absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-200">
    
    <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

      {menuItems
        .find((item) => item.name === activeMenu)
        ?.submenus.map((sub, i) => (
          <Link
            key={i}
            href={sub.link}
            className="group relative p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 hover:border-[#d7ac38] shadow-sm hover:shadow-lg transition-all duration-300"
          >
            
            {/* GOLD ACCENT LINE */}
            <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#d7ac38] group-hover:w-full transition-all duration-300 rounded-t-2xl"></div>

            {/* CONTENT */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[#0a1f44]">
                {sub.name}
              </span>

              <span className="text-xs text-gray-500">
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
  className={`md:hidden transition-all duration-300 overflow-hidden ${
    mobileOpen ? "max-h-200 py-4" : "max-h-0"
  } bg-white border-t border-gray-200 px-4`}
>
  {menuItems.map((item, index) => (
    <div key={index} className="border-b border-gray-200">
      
      <button
        onClick={() => toggleMenu(item.name)}
        className="w-full flex justify-between items-center py-3 text-sm text-gray-700"
      >
        {item.name}
        <ChevronDown
          size={16}
          className={`transition-transform ${
            activeMenu === item.name ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          activeMenu === item.name ? "max-h-40 pb-2" : "max-h-0"
        }`}
      >
        {item.submenus.map((sub, i) => (
          <Link
            key={i}
            href={sub.link}
            className="block pl-4 py-2 text-sm text-gray-500 hover:text-[#d7ac38]"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </div>
  ))}

  {/* AUTH */}
 <div className="mt-4 flex flex-col gap-3">
  {!session ? (
    <>
      <Link href="/login" className="text-center px-4 py-2 border border-gray-300 rounded-md">
        Login
      </Link>
      <Link href="/signup" className="text-center px-4 py-2 bg-[#d7ac38] text-white rounded-md">
        Sign Up
      </Link>
    </>
  ) : (
    <Link href="/dashboard" className="text-center px-4 py-2 bg-[#0a1f44] text-white rounded-md">
      Dashboard
    </Link>
  )}
</div>
</div>
</header>
  );
}