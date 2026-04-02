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
  const isSubscribed = session?.user?.isSubscribed; // ✅ NEW

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/media?category=graphics")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ MAIN FLOW HANDLER
  const handleProtectedClick = (e: any) => {
    e.preventDefault();

    const currentPage = window.location.pathname;

    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/pricing?redirect=${currentPage}`;
    } else if (!isSubscribed) {
      window.location.href = `/pricing?redirect=${currentPage}`;
    }
  };

  // ✅ DOWNLOAD PROTECTION
  const handleDownload = async (
    e: any,
    url: string,
    title: string
  ) => {
    e.preventDefault();

    if (!isSubscribed) {
      handleProtectedClick(e);
      return;
    }

    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `${title || "file"}`;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed");
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredItems = data.filter((item) => {
    const sub = item.subCategory?.toLowerCase().trim() || "";
    const title = item.title?.toLowerCase().trim() || "";

    const active = activeCategory.toLowerCase();
    const filtersLower = selectedFilters.map((f) => f.toLowerCase());
    const search = searchQuery.toLowerCase();

    const categoryMatch = active === "all" || sub === active;
    const filterMatch =
      filtersLower.length === 0 || filtersLower.includes(sub);
    const searchMatch = title.includes(search);

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
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 outline-none text-sm"
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Video <span className="text-purple-600">Collection</span>
        </h1>
      </div>

      {/* CATEGORY */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-white shadow"
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

          {loading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >
                {/* IMAGE */}
                <Link href="#">
                  <div
                    onClick={handleProtectedClick}
                    className="relative cursor-pointer"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover transition group-hover:scale-105"
                    />

                    {/* BUTTONS */}
                    <div className="absolute top-3 right-3 flex gap-2 z-10">

                      {/* DOWNLOAD */}
                      {!isSubscribed ? (
                        <button onClick={handleProtectedClick}>
                          <div className="p-2 rounded-full bg-black/60 border shadow">
                            <Lock size={14} className="text-white" />
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDownload(e, item.url, item.title)
                          }
                          className="p-2 rounded-full bg-white/80 border shadow"
                        >
                          <Download size={14} />
                        </button>
                      )}

                      {/* EDITABLE */}
                      {!isSubscribed ? (
                        <button onClick={handleProtectedClick}>
                          <div className="p-2 rounded-full bg-black/60 border shadow">
                            <Lock size={14} className="text-white" />
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDownload(
                              e,
                              item.editableUrl,
                              item.title + "-editable"
                            )
                          }
                          className="p-2 rounded-full bg-purple-600/80 border shadow"
                        >
                          <FilePen size={14} className="text-white" />
                        </button>
                      )}
                    </div>

                    {/* CATEGORY */}
                    <div className="absolute bottom-3 left-3 bg-white/80 text-xs px-2 py-1 rounded shadow">
                      {item.subCategory}
                    </div>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3">
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
  );
}