"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2, Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // IMPORTANT
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      // success → redirect
      router.push("/");

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0b0f19] text-white">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative overflow-hidden border-r border-white/5">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto w-full max-w-sm lg:w-96 bg-[#131927]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative z-10">
          
          <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          {/* LOGO */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white justify-center"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Royalfinity</span>
            </Link>

            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white text-center">
              Welcome back
            </h2>

            <p className="mt-3 text-sm text-gray-400 text-center font-light">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Start for free
              </Link>
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-xl border border-red-500/20 text-center font-medium">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl py-3 pl-12 pr-4 bg-white/5 border border-white/10 text-white shadow-sm placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl py-3 pl-12 pr-4 bg-white/5 border border-white/10 text-white shadow-sm placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-end mt-3">
                  <a
                    href="#"
                    className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all disabled:opacity-70 mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign in to Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative bg-[#0b0f19] items-center justify-center p-12 overflow-hidden">
        
        {/* Abstract Background for right side */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#131927] to-[#0b0f19] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.15)_0%,_transparent_60%)] z-0"></div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="text-xs font-medium text-gray-300 tracking-wider uppercase">Enterprise Grade Infrastructure</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
            Infinite content generation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">Zero limits.</span>
          </h2>

          <p className="text-lg text-gray-400 font-light mb-12">
            Accelerate your creative workflow with our industry-leading models, exclusive templates, and robust asset library.
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#131927]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center gap-3 hover:border-purple-500/30 transition-colors">
              <span className="text-3xl">🎨</span>
              <span className="text-xs font-medium text-gray-300">Graphics</span>
            </div>
            <div className="bg-[#131927]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center gap-3 hover:border-purple-500/30 transition-colors -translate-y-4">
              <span className="text-3xl">🎥</span>
              <span className="text-xs font-medium text-gray-300">Video</span>
            </div>
            <div className="bg-[#131927]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center gap-3 hover:border-purple-500/30 transition-colors">
              <span className="text-3xl">✨</span>
              <span className="text-xs font-medium text-gray-300">Motion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
