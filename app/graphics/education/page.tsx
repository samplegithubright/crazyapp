"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const categories = [
  "background",
  "nature",
  "b-roll",
  "business",
  "technology",
];

const filters = [
  "background",
  "nature",
  "b-roll",
  "business",
  "technology",
];

const items = [
  { id: 1, title: "Valentine Background", img: "/ai.jpeg", category: "background" },
  { id: 2, title: "Nature Tree", img: "/images/bg2.jpg", category: "nature" },
  { id: 3, title: "Stock Market", img: "/images/bg3.jpg", category: "business" },
  { id: 4, title: "Fire Particles", img: "/images/bg4.jpg", category: "background" },
  { id: 5, title: "Confetti", img: "/images/bg5.jpg", category: "b-roll" },
  { id: 6, title: "Light Streaks", img: "/images/bg6.jpg", category: "technology" },
];

export default function VideoTemplates() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch =
      activeCategory === "all" || item.category === activeCategory;

    const filterMatch =
      selectedFilters.length === 0 ||
      selectedFilters.includes(item.category);

    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && filterMatch && searchMatch;
  });

  return (
    <div className="bg-[#f5f3ef] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-20">

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search motion graphics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 outline-none text-sm"
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Graphic <span className="text-purple-600">Education</span>
        </h1>
      </div>

      {/* CATEGORY */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-1 rounded-full text-sm ${
            activeCategory === "all" ? "bg-black text-white" : "bg-white"
          }`}
        >
          All
        </button>

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm ${
              activeCategory === cat ? "bg-black text-white" : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="hidden lg:block bg-white rounded-xl p-5 h-fit shadow">
          <h3 className="font-semibold mb-4">Filters</h3>

          <div className="space-y-3">
            {filters.map((item, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(item)}
                  onChange={() => handleFilterChange(item)}
                  className="accent-black"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition relative">

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className={`w-full h-48 object-cover transition duration-500 ${
                      !isLoggedIn ? "blur-sm group-hover:blur-none" : ""
                    }`}
                  />

                  {/* LOCK (Logged Out) */}
                  {!isLoggedIn && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                      🔒
                      <p className="text-sm mt-2">Login to download</p>
                    </div>
                  )}

                  {/* DOWNLOAD BUTTON (Logged In) */}
                  {isLoggedIn && (
                    <a
                      href={item.img}
                      download
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                    >
                      <span className="bg-white text-black text-sm px-4 py-2 rounded-full font-medium">
                        Download
                      </span>
                    </a>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.category}
                  </p>
                </div>

                {/* CLICK ACTION */}
                {!isLoggedIn && (
                  <Link href="/login" className="absolute inset-0" />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No items found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}