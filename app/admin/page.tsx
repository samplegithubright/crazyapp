"use client";

import { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", key: "dashboard" },
  { name: "Video", key: "video" },
  { name: "Graphics", key: "graphics" },
  { name: "Motion Graphic", key: "motion-graphic" },
  { name: "Stock Video", key: "stock-video" },
  { name: "Newsletter", key: "newsletter" },
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [media, setMedia] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const fetchMedia = async (category: string) => {
    let url = "/api/media";
    url += category === "dashboard" ? "?all=true" : `?category=${category}`;

    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };

  const fetchSubscribers = async () => {
    const res = await fetch("/api/subscribe");
    const data = await res.json();
    setSubscribers(data);
  };

  useEffect(() => {
    if (activeMenu === "newsletter") fetchSubscribers();
    else fetchMedia(activeMenu);
  }, [activeMenu]);

  const uploadFile = async () => {
    if (!file || !title || !subCategory) return alert("Fill all fields");

    if (activeMenu === "graphics" && !file.type.startsWith("image"))
      return alert("Only IMAGE allowed");

    if (activeMenu !== "graphics" && !file.type.startsWith("video"))
      return alert("Only VIDEO allowed");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", activeMenu);
    formData.append("subCategory", subCategory);
    formData.append("type", activeMenu === "graphics" ? "image" : "video");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return alert("Upload failed");

    alert("Uploaded ✅");
    setFile(null);
    setTitle("");
    setSubCategory("");
    fetchMedia(activeMenu);
  };

  const deleteMedia = async (id: string, category?: string) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`/api/media/${id}?category=${category || activeMenu}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");
    setMedia((prev) => prev.filter((item) => item._id !== id));
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Delete subscriber?")) return;

    const res = await fetch(`/api/subscribe/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");
    setSubscribers((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-200 via-purple-100 to-pink-200">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>

            <img src="/web.jpg" className="w-9 h-9 rounded-full border border-white/40" />
            <div>
              <h1 className="text-sm md:text-lg font-semibold text-gray-800">Admin Panel</h1>
              <p className="text-xs text-gray-600 hidden md:block"> Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 bg-red-500/80 backdrop-blur-md text-white px-3 md:px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={16} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex pt-16">

        {/* SIDEBAR */}
        <div className={`fixed md:static top-16 left-0 h-full w-64 bg-white/20 backdrop-blur-2xl border-r border-white/30 shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition duration-300 z-40`}>
          <div className="p-5">
            <h2 className="font-bold text-lg mb-4 text-gray-800">⚡ Menu</h2>

            {menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => {
                  setActiveMenu(item.key);
                  setSidebarOpen(false);
                }}
                className={`p-2 rounded-xl mb-2 cursor-pointer text-sm backdrop-blur-md border border-white/20 ${
                  activeMenu === item.key
                    ? "bg-white/40 text-blue-600 shadow"
                    : "hover:bg-white/20"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-4 md:p-8">

          <h1 className="text-xl md:text-3xl font-bold mb-6 capitalize text-gray-800">
            {activeMenu}
          </h1>

          {activeMenu === "newsletter" ? (
            <div className="bg-white/30 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-lg border border-white/30">
              <h2 className="font-semibold mb-4">Subscribers ({subscribers.length})</h2>

              {subscribers.map((sub) => (
                <div key={sub._id} className="flex flex-col md:flex-row justify-between gap-2 bg-white/40 backdrop-blur-md p-3 rounded-xl mb-2">
                  <div>
                    <p className="text-sm">{sub.email}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(sub.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteSubscriber(sub._id)}
                    className="bg-red-500/80 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeMenu !== "dashboard" && (
                <div className="bg-white/30 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-lg border border-white/30 mb-6">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 border border-white/30 bg-white/40 rounded-lg"
                  />

                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full mb-3 p-2 border border-white/30 bg-white/40 rounded-lg"
                  >
                    <option value="">Select Category</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Beauty">Beauty</option>
                  </select>

                  <input
                    type="file"
                    accept={activeMenu === "graphics" ? "image/*" : "video/*"}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mb-3"
                  />

                  <button
                    onClick={uploadFile}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow"
                  >
                    Upload
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item._id} className="bg-white/30 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/30 hover:scale-[1.02] transition">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <button
                        onClick={() => deleteMedia(item._id, item.category)}
                        className="text-xs text-red-500"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{item.subCategory}</p>

                    {item.type === "image" ? (
                      <img src={item.url} className="h-32 w-full object-cover rounded" />
                    ) : (
                      <video src={item.url} controls className="h-32 w-full object-cover rounded" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}