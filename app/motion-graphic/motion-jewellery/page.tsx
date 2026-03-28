"use client";

import { useState, useEffect } from "react";
import { Search, Lock, Download } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const categories = [
  "All",
  "Education",
  "Real State",
  "Restaurants",
  "Jewellery",
  "Beautysinery",
];

const filters = [
  "Education",
  "Real State",
  "Restaurants",
  "Jewellery",
  "Beautysinery",
];

export default function VideoTemplates() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch Data
  useEffect(() => {
    fetch("/api/media?category=motion-graphic") // 👉 change if needed
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Download
  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title || "file"}.jpg`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed!");
    }
  };

  // ✅ Filter checkbox
  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // ✅ FILTER LOGIC (FIXED 🔥)
  const filteredItems = data.filter((item) => {
    const itemSub = item.subCategory?.toLowerCase().trim() || "";
    const itemTitle = item.title?.toLowerCase().trim() || "";

    const active = activeCategory.toLowerCase().trim();
    const filtersLower = selectedFilters.map((f) =>
      f.toLowerCase().trim()
    );
    const search = searchQuery.toLowerCase().trim();

    const categoryMatch =
      active === "all" || itemSub === active;

    const filterMatch =
      filtersLower.length === 0 ||
      filtersLower.includes(itemSub);

    const searchMatch = itemTitle.includes(search);

    return categoryMatch && filterMatch && searchMatch;
  });

  return (
    <div className="bg-[#f5f3ef] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-20">

      {/* 🔍 SEARCH */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search graphics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 outline-none text-sm"
          />
        </div>
      </div>

      {/* 🏷️ TITLE */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Graphic <span className="text-purple-600">Collection</span>
        </h1>
      </div>

      {/* 📂 CATEGORY BUTTONS */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm ${activeCategory === cat
              ? "bg-black text-white"
              : "bg-white shadow"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📦 LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* 📊 SIDEBAR */}
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

        {/* 🖼️ GRID */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {/* ⏳ LOADING */}
          {loading ? (
            <p className="text-gray-500 col-span-full text-center">
              Loading...
            </p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* 🔥 SUBCATEGORY BADGE */}
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-xs px-2 py-1 rounded shadow">
                    {item.subCategory}
                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  {/* 🔒 / ⬇️ BUTTON */}
                  <div className="absolute top-3 right-3 z-10">
                    {!isLoggedIn ? (
                      <Link href="/login" className="relative group/icon">
                        <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition">
                          <Lock size={16} className="text-white" />
                        </div>
                        <span className="absolute right-0 mt-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition">
                          Login to download
                        </span>
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          handleDownload(item.url, item.title)
                        }
                        className="relative group/icon"
                      >
                        <div className="p-2 rounded-full bg-white/80 backdrop-blur-md border shadow-lg hover:scale-110 transition">
                          <Download size={16} className="text-black" />
                        </div>
                        <span className="absolute right-0 mt-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition">
                          Download
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.subCategory}
                  </p>
                </div>
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