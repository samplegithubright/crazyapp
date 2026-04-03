"use client";

import { useState, useEffect } from "react";
import { LogOut, Menu, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", key: "dashboard" },
  { name: "Users", key: "users" },
  { name: "Video", key: "video" },
  { name: "Graphics", key: "graphics" },
  { name: "Motion Graphic", key: "motion-graphic" },
  { name: "Stock Video", key: "stock-video" },

  { name: "Subscriptions", key: "subscriptions" },
  { name: "Newsletter", key: "newsletter" },
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

  const fetchMedia = async (category: string) => {
    let url = "/api/media";
    url += category === "dashboard" ? "?all=true" : `?category=${category}`;

    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };

  const fetchNewsletter = async () => {
    const res = await fetch("/api/newsletter");
    const data = await res.json();
    setSubscribers(data);
  };

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

  const deleteMedia = async (id: string, category?: string) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`/api/media/${id}?category=${category || activeMenu}`, {
      method: "DELETE",
    });

    if (!res.ok) return alert("Delete failed");

    setMedia((prev) => prev.filter((item) => item._id !== id));
  };

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

    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative">
      
      {/* GLOW AMBIENCE */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#131927]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-300 hover:text-white transition" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>

            <div className="flex items-center justify-center w-9 h-9 bg-white/5 border border-white/10 rounded-full">
              <Sparkles size={16} className="text-purple-400" />
            </div>
            <h1 className="font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Admin Portal
            </h1>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl hover:bg-red-500/20 transition-all text-sm font-medium shadow-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex pt-[60px] min-h-screen">

        {/* SIDEBAR */}
        <div
          className={`fixed top-[60px] left-0 h-[calc(100%-60px)] w-64 z-40 
          bg-[#131927]/60 backdrop-blur-xl border-r border-white/10 p-4 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto`}
        >
          <div className="flex flex-col gap-1">
            <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2 pl-2">Core System</div>
            {menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => {
                  setActiveMenu(item.key);
                  setSidebarOpen(false); // auto close on mobile
                }}
                className={`p-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200
                  ${activeMenu === item.key 
                    ? "bg-purple-500/10 text-purple-400 border-l-2 border-purple-500" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-6 lg:p-10 relative z-10 w-full overflow-x-hidden">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold capitalize text-white tracking-tight">{activeMenu}</h1>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
              System Active
            </div>
          </div>

          {/* UPLOAD PANEL */}
          {activeMenu !== "dashboard" &&
            activeMenu !== "newsletter" &&
            activeMenu !== "users" &&
            activeMenu !== "subscriptions" && (
              <div className="bg-[#131927] border border-white/10 p-6 sm:p-8 rounded-3xl mb-10 shadow-2xl space-y-6 relative overflow-hidden group">
                
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* TITLE */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Content Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Cyberpunk City Layout"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                    <textarea
                      placeholder="Detailed description of the asset..."
                      value={description}
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Sub Category</label>
                    <div className="relative">
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#131927]">Select Category</option>
                        <option value="Education" className="bg-[#131927]">Education</option>
                        <option value="Real Estate" className="bg-[#131927]">Real Estate</option>
                        <option value="Restaurants" className="bg-[#131927]">Restaurants</option>
                        <option value="Jewellery" className="bg-[#131927]">Jewellery</option>
                        <option value="Beautysinery" className="bg-[#131927]">Beautysinery</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* 📁 MAIN FILE */}
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Upload Asset File</label>
                    <p className="text-xs text-gray-500 mb-3 font-light">
                      {activeMenu === "graphics"
                        ? "JPG, PNG, WEBP (1000x1000 recommended)"
                        : "MP4, MOV, WEBM (10MB recommended)"}
                    </p>

                    <div className="border border-white/10 border-dashed rounded-xl p-4 bg-white/5 transition-colors hover:bg-white/10 text-center relative overflow-hidden">
                      <input
                        type="file"
                        accept={activeMenu === "graphics" ? "image/*" : "video/*"}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-sm text-purple-400 font-medium">
                        {file ? file.name : "Click to select a file"}
                      </div>
                    </div>
                    {file && <p className="text-xs text-green-400 mt-2 font-medium">✓ File ready</p>}
                  </div>

                  {/* ✏️ EDITABLE FILE */}
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Upload Editable Source</label>
                    <p className="text-xs text-gray-500 mb-3 font-light">
                      PSD, AI, ZIP, RAR
                    </p>

                    <div className="border border-white/10 border-dashed rounded-xl p-4 bg-white/5 transition-colors hover:bg-white/10 text-center relative overflow-hidden">
                      <input
                        type="file"
                        accept=".psd,.ai,.zip,.rar"
                        onChange={(e) => setEditableFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-sm text-pink-400 font-medium">
                        {editableFile ? editableFile.name : "Click to select source file"}
                      </div>
                    </div>
                    {editableFile && <p className="text-xs text-green-400 mt-2 font-medium">✓ Source ready</p>}
                  </div>

                  {/* BUTTON */}
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <button
                      onClick={uploadFile}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transform active:scale-[0.99] flex justify-center items-center gap-2"
                    >
                      Publish Asset
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* ✅ NEWSLETTER WITH DELETE */}
          {activeMenu === "newsletter" && (
            <div className="bg-[#131927] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                Newsletter Audience <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-sm">{subscribers.length}</span>
              </h2>

              {subscribers.length === 0 ? (
                <div className="text-center py-10 border border-white/5 border-dashed rounded-2xl text-gray-500">No subscribers yet</div>
              ) : (
                <div className="space-y-3">
                  {subscribers.map((sub) => (
                    <div
                      key={sub._id}
                      className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{sub.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined: {new Date(sub.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteSubscriber(sub._id)}
                        className="px-4 py-2 text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ USERS */}
          {activeMenu === "users" && (
            <div className="bg-[#131927] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                Platform Accounts <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-sm">{users.length}</span>
              </h2>

              {users.length === 0 ? (
                <div className="text-center py-10 border border-white/5 border-dashed rounded-2xl text-gray-500">No active accounts</div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="flex flex-col bg-white/5 border border-white/5 p-5 rounded-2xl relative group"
                    >
                      <div className="absolute top-0 right-0 p-4">
                        <button
                          onClick={() => deleteUser(user._id, user.role)}
                          className="px-3 py-1 text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Revoke
                        </button>
                      </div>
                      <p className="font-medium text-sm text-white truncate pr-16">{user.email}</p>
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs w-max">
                        <span className="text-gray-400">Role:</span> <span className={`font-semibold ${user.role === 'admin' ? 'text-purple-400' : 'text-gray-300'}`}>{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ SUBSCRIPTIONS */}
          {activeMenu === "subscriptions" && (
            <div className="bg-[#131927] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
              
              <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Active Funnels & Subscriptions</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center items-center shadow-inner">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total</p>
                  <p className="font-bold text-3xl text-white">{subscribers.length}</p>
                </div>
                <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl flex flex-col justify-center items-center">
                  <p className="text-green-500 text-xs uppercase tracking-wider mb-1">Premium Active</p>
                  <p className="font-bold text-3xl text-green-400">
                    {subscribers.filter((u) => u.isSubscribed).length}
                  </p>
                </div>
                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-col justify-center items-center">
                  <p className="text-red-500 text-xs uppercase tracking-wider mb-1">Lapsed</p>
                  <p className="font-bold text-3xl text-red-400">
                    {subscribers.filter((u) => u.isExpired).length}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {subscribers.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center bg-white/5 border border-white/5 p-4 rounded-2xl gap-4 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium text-gray-400">Expiry:</span>{" "}
                          {user.subscriptionExpiry
                            ? new Date(user.subscriptionExpiry).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <div className="h-1 w-1 bg-white/20 rounded-full"></div>
                        <p className="text-xs">
                          {user.isSubscribed ? (
                            <span className="text-green-400 font-medium">● Lifetime Access</span>
                          ) : user.isExpired ? (
                            <span className="text-red-400 font-medium">● Expired</span>
                          ) : (
                            <span className="text-gray-500">Free Tier</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {user.isSubscribed && (
                        <button
                          onClick={async () => {
                            await fetch(`/api/admin/subscribers/${user._id}`, {
                              method: "DELETE",
                            });
                            fetchSubscribers();
                          }}
                          className="px-4 py-2 text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors"
                        >
                          Revoke Access
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteSubscriber(user._id)}
                        className="px-4 py-2 text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors"
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
            <div>
              {media.length === 0 ? (
                <div className="text-center py-20 border border-white/10 border-dashed rounded-3xl text-gray-500 bg-[#131927]/50">
                  No assets populated for this category yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {media.map((item) => (
                    <div key={item._id} className="bg-[#131927] border border-white/10 p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-purple-500/30 transition-all flex flex-col h-full relative overflow-hidden">
                      
                      {/* Top Action Bar */}
                      <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteMedia(item._id, item.category)}
                          className="px-3 py-1.5 text-xs font-bold text-red-400 bg-black/50 backdrop-blur-md border border-red-500/30 rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Image/Video Preview */}
                      <div className="w-full relative h-[180px] rounded-2xl overflow-hidden mb-4 bg-black">
                        {item.type === "image" ? (
                          <img src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <video src={item.url} controls={false} muted autoPlay loop className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        )}
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-md text-[10px] text-gray-300 font-medium tracking-wider uppercase">
                          {item.subCategory}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-base font-semibold text-white line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed flex-1">
                          {item.description || "No specific description available for this asset."}
                        </p>

                        {item.editableUrl && (
                          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-pink-400 uppercase bg-pink-500/10 px-2.5 py-1.5 rounded-lg w-max border border-pink-500/20">
                            ✨ Source File Included
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}