"use client";

import { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", key: "dashboard" },
  { name: "Users", key: "users" },
  { name: "Video", key: "video" },
  { name: "Graphics", key: "graphics" },
  { name: "Motion Graphic", key: "motion-graphic" },
  { name: "Stock Video", key: "stock-video" },

  { name: "Subscriptions", key: "subscriptions" }, // ✅ NEW
  { name: "Newsletter", key: "newsletter" }, // ✅ KEEP
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [editableFile, setEditableFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };
  // FETCH MEDIA
  const fetchMedia = async (category: string) => {
    let url = "/api/media";
    url += category === "dashboard" ? "?all=true" : `?category=${category}`;

    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };



  // 📩 Newsletter (simple emails)
  const fetchNewsletter = async () => {
    const res = await fetch("/api/newsletter");
    const data = await res.json();
    setSubscribers(data); // reuse state OR create new state
  };

  // 💳 Subscriptions (paid users)
  const fetchSubscribers = async () => {
    const res = await fetch("/api/admin/subscribers");
    const data = await res.json();
    setSubscribers(data);
  };
  useEffect(() => {
    if (activeMenu === "newsletter") {
      fetchNewsletter();
    } else if (activeMenu === "subscriptions") {
      fetchSubscribers();
    } else if (activeMenu === "users") {
      fetchUsers();
    } else {
      fetchMedia(activeMenu);
    }
  }, [activeMenu]);
  // UPLOAD
  const uploadFile = async () => {
    if (!file || !title || !subCategory) {
      return alert("Fill all fields");
    }

    const formData = new FormData();
    formData.append("file", file);
    if (editableFile) formData.append("editableFile", editableFile);
    formData.append("title", title);
    formData.append("description", description);
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
    setEditableFile(null);
    setTitle("");
    setDescription("");
    setSubCategory("");

    fetchMedia(activeMenu);
  };

  // DELETE MEDIA
  const deleteMedia = async (id: string, category?: string) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`/api/media/${id}?category=${category || activeMenu}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");

    setMedia((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ DELETE SUBSCRIBER
  const deleteSubscriber = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;

    const res = await fetch(`/api/subscribe/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");

    setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
  };
  const deleteUser = async (id: string, role: string) => {
    if (!confirm("Delete this user?")) return;

    const res = await fetch(`/api/admin/users/${id}?role=${role}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");

    // remove from UI
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-200 via-purple-100 to-pink-200">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-xl border-b shadow">
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-8 py-3">

          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>

            <img src="/web.jpg" className="w-9 h-9 rounded-full" />
            <h1 className="font-semibold">Admin Panel</h1>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-xl"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex pt-16">

        {/* SIDEBAR */}
        {/* SIDEBAR */}
        <div
          className={`fixed top-16 left-0 h-[calc(100%-64px)] w-64 z-40 
  bg-white/30 backdrop-blur-xl p-4 transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:h-auto`}
        >
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                setSidebarOpen(false); // auto close on mobile
              }}
              className={`p-3 rounded-lg cursor-pointer text-sm md:text-base ${activeMenu === item.key ? "bg-white/50 font-semibold" : ""
                }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="flex-1 p-6">

          <h1 className="text-2xl font-bold mb-6 capitalize">{activeMenu}</h1>

          {/* UPLOAD */}
          {activeMenu !== "dashboard" &&
            activeMenu !== "newsletter" &&
            activeMenu !== "users" &&
            activeMenu !== "subscriptions" && (
              <div className="bg-white/30 backdrop-blur-xl p-6 rounded-2xl mb-6 shadow-lg space-y-4">

                {/* TITLE */}
                <div>
                  <label className="text-sm font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-white/40 bg-white/50 outline-none"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    placeholder="Enter description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-white/40 bg-white/50 outline-none"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="text-sm font-semibold">Sub Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-white/40 bg-white/50"
                  >
                    <option value="">Select Category</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>

                {/* 📁 MAIN FILE */}
                <div>
                  <label className="text-sm font-semibold">Upload Main File</label>

                  <p className="text-xs text-gray-600 mb-2">
                    {activeMenu === "graphics"
                      ? "Accepted: JPG, PNG, WEBP images (recommended 1000x1000)"
                      : "Accepted: MP4, MOV, WEBM videos (max 10MB recommended)"}
                  </p>

                  <input
                    type="file"
                    accept={activeMenu === "graphics" ? "image/*" : "video/*"}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     border border-white/40 rounded-lg p-2
                     bg-white/40 backdrop-blur"
                  />

                  {file && (
                    <p className="text-xs text-green-600 mt-2">
                      ✅ Selected: {file.name}
                    </p>
                  )}
                </div>

                {/* ✏️ EDITABLE FILE */}
                <div>
                  <label className="text-sm font-semibold">
                    Upload Editable File
                  </label>

                  <p className="text-xs text-gray-600 mb-2">
                    Accepted: PSD, AI, ZIP, RAR (for editable downloads)
                  </p>

                  <input
                    type="file"
                    accept=".psd,.ai,.zip,.rar"
                    onChange={(e) => setEditableFile(e.target.files?.[0] || null)}
                    className="w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-purple-50 file:text-purple-700
                     hover:file:bg-purple-100
                     border border-white/40 rounded-lg p-2
                     bg-white/40 backdrop-blur"
                  />

                  {editableFile && (
                    <p className="text-xs text-green-600 mt-2">
                      ✅ Selected: {editableFile.name}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={uploadFile}
                  className="w-full bg-linear-to-r from-blue-500 to-purple-500 
                   text-white py-2 rounded-full font-medium
                   hover:scale-105 hover:shadow-lg transition-all"
                >
                  Upload File 🚀
                </button>

              </div>
            )}


          {/* ✅ NEWSLETTER WITH DELETE */}
          {activeMenu === "newsletter" && (
            <div className="bg-white/30 p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">
                Subscribers ({subscribers.length})
              </h2>

              {subscribers.length === 0 ? (
                <p>No subscribers yet</p>
              ) : (
                <div className="space-y-2">
                  {subscribers.map((sub) => (
                    <div
                      key={sub._id}
                      className="flex justify-between items-center bg-white/40 p-2 rounded"
                    >
                      <div>
                        <p className="text-sm font-medium">{sub.email}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* ❌ DELETE BUTTON */}
                      <button
                        onClick={() => deleteSubscriber(sub._id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500
             bg-white/40 backdrop-blur-md border border-red-200 rounded-full
             hover:bg-red-500 hover:text-white hover:scale-105
             transition-all duration-300 shadow"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeMenu === "users" && (
            <div className="bg-white/30 p-4 rounded-xl">

              <h2 className="text-lg font-semibold mb-4">
                All Users ({users.length})
              </h2>

              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                <div className="space-y-3">

                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="flex justify-between items-center bg-white/40 p-3 rounded-lg"
                    >

                      {/* LEFT */}
                      <div>
                        <p className="font-medium text-sm">{user.email}</p>

                        <p className="text-xs text-gray-500">
                          👤 Role: <span className="font-semibold">{user.role}</span>
                        </p>


                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-col items-end gap-2">



                        {/* ❌ DELETE BUTTON */}
                        <button
                          onClick={() => deleteUser(user._id, user.role)}
                          className="px-3 py-1 text-xs font-medium text-red-500
                   bg-white/40 border border-red-200 rounded-full
                   hover:bg-red-500 hover:text-white
                   transition-all"
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>
                  ))}

                </div>
              )}
            </div>
          )}
          {activeMenu === "subscriptions" && (
            <div className="bg-white/30 backdrop-blur-xl p-6 rounded-2xl">

              <h2 className="text-xl font-bold mb-6">
                Subscription Management
              </h2>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div className="p-4 bg-white/40 rounded-xl text-center">
                  <p>Total</p>
                  <p className="font-bold">{subscribers.length}</p>
                </div>

                <div className="p-4 bg-green-100 rounded-xl text-center">
                  <p>Active</p>
                  <p className="font-bold">
                    {subscribers.filter((u) => u.isSubscribed).length}
                  </p>
                </div>

                <div className="p-4 bg-red-100 rounded-xl text-center">
                  <p>Expired</p>
                  <p className="font-bold">
                    {subscribers.filter((u) => u.isExpired).length}
                  </p>
                </div>

              </div>

              {/* LIST */}
              <div className="space-y-3">
                {subscribers.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center bg-white/40 p-4 rounded-xl"
                  >
                    <div>
                      <p className="text-sm font-medium">{user.email}</p>

                      <p className="text-xs text-gray-500">
                        Expiry:{" "}
                        {user.subscriptionExpiry
                          ? new Date(user.subscriptionExpiry).toLocaleDateString()
                          : "N/A"}
                      </p>

                      <p className="text-xs">
                        Status:{" "}
                        {user.isSubscribed ? (
                          <span className="text-green-600">Active</span>
                        ) : user.isExpired ? (
                          <span className="text-red-500">Expired</span>
                        ) : (
                          "Not Subscribed"
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2">

                      {/* Disable */}
                      {user.isSubscribed && (
                        <button
                          onClick={async () => {
                            await fetch(`/api/admin/subscribers/${user._id}`, {
                              method: "DELETE",
                            });
                            fetchSubscribers();
                          }}
                          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-full"
                        >
                          Disable
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => deleteSubscriber(user._id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded-full"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* MEDIA GRID */}
          {activeMenu !== "newsletter" && activeMenu !== "users" && activeMenu !== "subscriptions" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item._id} className="bg-white/30 p-3 rounded-xl">

                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <button
                      onClick={() => deleteMedia(item._id, item.category)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium 
             text-red-500 bg-white/40 backdrop-blur-md 
             border border-red-200 rounded-full shadow
             hover:bg-red-500 hover:text-white 
             hover:scale-105 transition-all duration-300"
                    >
                      🗑 Delete
                    </button>
                  </div>

                  <p className="text-xs">{item.subCategory}</p>

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {item.type === "image" ? (
                    <img src={item.url} className="h-32 w-full object-cover rounded" />
                  ) : (
                    <video src={item.url} controls className="h-32 w-full" />
                  )}

                  {item.editableUrl && (
                    <p className="text-xs text-purple-600 mt-1">
                      Editable File Available
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}