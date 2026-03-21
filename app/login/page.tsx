"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 1200));
      console.log({ email, password });
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full pt-17">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-sm lg:w-96 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* LOGO */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 justify-center"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center relative shadow-sm">
                <div className="w-4 h-4 bg-[#81b441] rounded-full"></div>
              </div>
              Royalfinity 
              <span className="text-gray-500 font-normal">Technology</span>
            </Link>

            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm text-gray-500 text-center">
              Not a member?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Start a free trial
              </Link>
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 text-center">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-md bg-[#0084ff] hover:bg-[#006bce] px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative bg-gray-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-gray-900 to-black"></div>

        <div className="relative z-10 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Millions of creative assets <br /> Unlimited downloads
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
            Graphic templates, photos, fonts, courses, and much more. Bring
            your creative projects to life.
          </p>

          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              🎨
            </div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 -translate-y-4">
              📸
            </div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              💻
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
