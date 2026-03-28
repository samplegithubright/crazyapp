"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-200 via-white to-purple-200 opacity-70" />
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Login</h2>
        <p className="text-center text-gray-500 mb-6">Access your admin dashboard</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              required
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              required
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
