"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

export default function AdminSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if an admin already exists
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin/check");
        if (res.ok) {
          const data = await res.json();
          if (data.hasAdmin) {
            router.push("/admin/login");
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to check admin", err);
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/login?setup=success");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to setup admin");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md bg-[#131927]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-10">
        
        <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">System Initialization</h2>
        <p className="text-center text-gray-400 font-light mb-8">Create the primary super administrator.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              required
              type="text"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Admin Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input
              required
              type="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secure Password</label>
            <input
              required
              type="password"
              minLength={6}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-white font-bold hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 mt-4"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Initializing...
              </>
            ) : (
              "Create Super Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
