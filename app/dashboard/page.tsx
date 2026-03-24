"use client";

import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
const allItems = [
  { title: "Logo Animation", category: "Video", link: "/" },
  { title: "UI Kit", category: "Templates", link: "/" },
  { title: "Background Music", category: "Music", link: "/assets/music" },
  { title: "Instagram Post", category: "Graphics", link: "/assets/instagram-post" },
  { title: "Font Pack", category: "Fonts", link: "/assets/fonts" },
  { title: "Promo Video", category: "Video", link: "/assets/promo-video" },
];


export default function Dashboard() {


 const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
  // 🔍 Filter logic
  
const handleLogout = async () => {
  await signOut({
    callbackUrl: "/login", // redirect after logout
  });
};
const filteredItems = allItems.filter((item) => {
  const matchesSearch = item.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || item.category === category;

  return matchesSearch && matchesCategory;
});
  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}
     <header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

    <h1 className="text-xl font-bold text-[#0a1f44]">MyMarket</h1>

    {/* SEARCH */}
    <div className="flex-1 flex items-center bg-gray-100 px-4 py-2 rounded-full">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent outline-none px-2 w-full"
        placeholder="Search assets..."
      />
    </div>

    {/* ACTIONS */}
    <div className="flex items-center gap-4">
      <Bell />

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm"
      >
        <User size={16} />
        Logout
      </button>
    </div>

  </div>
</header>

      {/* CATEGORY FILTER */}
      <div className="bg-white border-b px-4 py-2 overflow-x-auto">
  <div className="flex gap-6 text-sm font-medium whitespace-nowrap">
    {["All", "Video", "Graphics", "Templates", "Music", "Fonts"].map(
      (cat) => (
        <span
          key={cat}
          onClick={() => setCategory(cat)}
          className={`cursor-pointer hover:text-blue-600 ${
            category === cat ? "text-blue-600 font-semibold" : ""
          }`}
        >
          {cat}
        </span>
      )
    )}
  </div>
</div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HERO */}
        <div className="bg-linear-to-r from-[#0a1f44] to-[#1e3a8a] text-white p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Unlimited Downloads</h2>
          <p>Explore millions of creative assets</p>
        </div>

        {/* GRID */}
        <div className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        ">
          {filteredItems.length > 0 ? (
         filteredItems.map((item, i) => (
  <Link key={i} href={item.link}>
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <div className="h-32 bg-gray-200" />
      <div className="p-3">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-xs text-gray-500">{item.category}</p>
      </div>
    </div>
  </Link>
))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No results found
            </p>
          )}
        </div>

      </main>
    </div>
  );
}