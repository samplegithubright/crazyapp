"use client";

import { useState, useEffect } from "react";
import { Search, Lock, Download, FilePen } from "lucide-react";
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

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ FETCH DATA (FIXED)
  useEffect(() => {
    fetch("/api/media?category=stock-video")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ DOWNLOAD FUNCTION
  const handleDownload = async (url: string, title: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `${title || "file"}`;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Download failed");
    }
  };

  // ✅ FILTER HANDLER
  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // ✅ FILTER LOGIC
  const filteredItems = data.filter((item) => {
    const sub = item.subCategory?.toLowerCase().trim() || "";
    const title = item.title?.toLowerCase().trim() || "";

    const active = activeCategory.toLowerCase();
    const filtersLower = selectedFilters.map((f) =>
      f.toLowerCase()
    );
    const search = searchQuery.toLowerCase();

    const categoryMatch = active === "all" || sub === active;
    const filterMatch =
      filtersLower.length === 0 || filtersLower.includes(sub);
    const searchMatch = title.includes(search);

    return categoryMatch && filterMatch && searchMatch;
  });

  return (
    <div className="bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="relative z-10 w-full h-full">

      {/* 🔍 SEARCH */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center bg-[#131927] border border-white/10 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.1)] focus-within:border-purple-500/50 px-4 py-2 transition-all">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-3 outline-none text-sm bg-transparent text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* 🏷️ TITLE */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white relative z-10">
          Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Collection</span>
        </h1>
      </div>

      {/* 📂 CATEGORY */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-transparent"
                : "bg-[#131927] border border-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 transition shadow-none"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📦 LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* 📊 SIDEBAR */}
        <div className="hidden lg:block bg-[#131927]/60 backdrop-blur rounded-2xl p-6 h-fit border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white relative z-10">
          <h3 className="font-semibold mb-6 text-gray-200 tracking-wide uppercase text-sm border-b border-white/10 pb-3">Filters</h3>

          <div className="space-y-3">
            {filters.map((item, i) => (
              <label key={i} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
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

        {/* 🎬 GRID */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {loading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="group bg-[#131927] rounded-3xl overflow-hidden border border-white/5 shadow-sm hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border-purple-500/30 transition-all duration-500 relative z-10"
              >
                {/* VIDEO */}
                <div className="relative">
                  <video
                    src={item.url}
                    className="w-full h-48 object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />

                  {/* 🔝 BUTTONS */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10">

                    {!isLoggedIn ? (
                      <Link href="/login">
                        <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow">
                          <Lock size={14} className="text-white" />
                        </div>
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          handleDownload(item.url, item.title)
                        }
                        className="p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:from-purple-500 hover:to-indigo-500 border-none"
                      >
                        <Download size={14} />
                      </button>
                    )}

                    {!isLoggedIn ? (
                      <Link href="/login">
                        <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow">
                          <Lock size={14} className="text-white" />
                        </div>
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          handleDownload(
                            item.editableUrl,
                            item.title + "-editable"
                          )
                        }
                        className="p-2.5 rounded-full bg-pink-600/90 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:bg-pink-500 transition border-none text-white"
                      >
                        <FilePen size={14} className="text-white" />
                      </button>
                    )}
                  </div>

                  {/* CATEGORY TAG */}
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white border border-white/10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow">
                    {item.subCategory}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1 tracking-wide">
                    {item.title}
                  </h3>

                 

                  {/* ✅ DESCRIPTION */}
                  <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2 mt-2">
                    {item.description || "No description available"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No items found
            </p>
          )}
        </div>
      </div>
    </div>
</div>
  );
}