"use client";

import { Search, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const allItems = [
  { title: "Education Graphics", category: "Graphics", link: "/graphics/education" },
   { title: "Jewellery Graphics", category: "Graphics", link: "/graphics/jewellery" },
    { title: "BeautySinery Graphics", category: "Graphics", link: "/graphics/beutysinery" },
     { title: "RealState Graphics", category: "Graphics", link: "/graphics/real-state" },
      { title: "Restaurants Graphics", category: "Graphics", link: "/graphics/restaurants" },
  { title: "Education Video", category: "Video", link: "/video-templates/education-video" },
  { title: "Jewellery Video", category: "Video", link: "/video-templates/jewellery-video" },
   { title: "Real State Video", category: "Video", link: "/video-templates/real-state-video" },
    { title: "Restaurants Video", category: "Video", link: "/video-templates/restaurants-video" },
     { title: "BeautySinery Video", category: "Video", link: "/video-templates/beautysinery-video" },
  { title: "Motion Graphic Education", category: "Motion Graphic", link: "/motion-graphic/motion-education" },
  { title: "Motion Graphic Jewellery", category: "Motion Graphic", link: "/motion-graphic/motion-jewellery" },
  { title: "Motion Graphic Real State", category: "Motion Graphic", link: "/motion-graphic/motion-real-state" },
  { title: "Motion Graphic Restaurants", category: "Motion Graphic", link: "/motion-graphic/motion-restaurants" },
  { title: "Motion Graphic BeautySinery", category: "Motion Graphic", link: "/motion-graphic/motion-beautysinery" },
  { title: "Stock Video", category: "Stock Video", link: "/stockvideo" },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 🔒 PROTECT ROUTE
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login"); // redirect if not logged in
    }
  }, [session, status, router]);

  // 🔄 Show loading
  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ⛔ Stop rendering if not logged in
  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
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
          {["All", "Video", "Graphics", "Motion Graphic", "Stock Video"].map(
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
        <div className="bg-linear-to-r from-[#0a1f44] to-[#1e3a8a] text-white p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Unlimited Downloads</h2>
          <p>Explore millions of creative assets</p>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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