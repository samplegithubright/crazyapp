"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    // optional: auto login after register
    window.location.href = "/login";

  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex w-full pt-16">
      {/* LEFT */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4  sm:px-6 lg:px-20 xl:px-24 bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-sm lg:w-96 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* LOGO */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-gray-900 justify-center"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-[#81b441] rounded-full"></div>
              </div>
              Royalfinity <span className="text-gray-500 font-normal">Technology</span>
            </Link>

            <h2 className="mt-8 text-2xl font-bold text-center text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border text-center">
                  {error}
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Full Name</label>
                <div className="mt-2 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md py-2.5 pl-10 pr-3 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Email</label>
                <div className="mt-2 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md py-2.5 pl-10 pr-3 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Password</label>
                <div className="mt-2 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md py-2.5 pl-10 pr-3 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center rounded-md bg-[#0084ff] hover:bg-[#006bce] text-white py-2.5 font-semibold transition disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex flex-1 bg-gray-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-gray-900 to-black"></div>

        <div className="relative z-10 text-center p-12">
          <h2 className="text-4xl text-white font-bold mb-6">
            Join millions of creators
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
            Start your journey with unlimited access to premium assets and tools.
          </p>

          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">🚀</div>
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center -translate-y-4">🔥</div>
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">✨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
