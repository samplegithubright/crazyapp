"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
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
  { id: 1, title: "Valentine Background", img: "/ai.jpeg", category: "background",link: "/login" },
  { id: 2, title: "Nature Tree", img: "/images/bg2.jpg", category: "nature",link: "/login" },
  { id: 3, title: "Stock Market", img: "/images/bg3.jpg", category: "business",link: "/login" },
  { id: 4, title: "Fire Particles", img: "/images/bg4.jpg", category: "background",link: "/login" },
  { id: 5, title: "Confetti", img: "/images/bg5.jpg", category: "b-roll",link: "/login" },
  { id: 6, title: "Light Streaks", img: "/images/bg6.jpg", category: "technology",link: "/login" },
];

export default function VideoTemplates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
const [searchQuery, setSearchQuery] = useState("");
  // HANDLE CHECKBOX
  const handleFilterChange = (filter:any) => {
    setSelectedFilters((prev:any) =>
      prev.includes(filter)
        ? prev.filter((f:any) => f !== filter)
        : [...prev, filter]
    );
  };

  // FILTER LOGIC
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
           Graphic <span className="text-purple-600">Jewellery</span>
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
       {/* GRID */}
<div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
  {filteredItems.length > 0 ? (
    filteredItems.map((item) => (
      <Link href={item.link || "#"} key={item.id}>
        <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
          
          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* HOVER OVERLAY */}
            
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {item.category}
            </p>
          </div>

        </div>
      </Link>
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