"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1014] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Super Admin Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Create the first super administrator account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1A1C23] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <div className="mt-1">
                <input
                  required
                  type="text"
                  className="block w-full appearance-none rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="mt-1">
                <input
                  required
                  type="email"
                  className="block w-full appearance-none rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1">
                <input
                  required
                  type="password"
                  minLength={6}
                  className="block w-full appearance-none rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-brand-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Super Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
