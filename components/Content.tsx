"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TemplatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDownload = () => {
    // 🔹 Not logged in
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // 🔹 Logged in but no subscription
    if (session && !(session.user as any)?.isSubscribed) {
      router.push("/pricing");
      return;
    }

    // 🔹 Subscribed user
    if (session && (session.user as any)?.isSubscribed) {
      router.push("/graphics/education");
    }
  };

  return (
    <div className="bg-gray-100 py-6 sm:py-8 md:py-10 lg:py-8 xl:py-10 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <div className="relative w-full h-48 sm:h-60 md:h-auto">
          <Image
            src="/new.jpg"
            alt="Template Preview"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Premium Template
          </h1>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Get a high-quality, fully responsive template designed for modern
            web applications.
          </p>

          <div className="mb-6">
            <p className="text-lg md:text-xl font-semibold">Price: ₹999</p>
            <p className="text-green-600 text-sm mt-1">
              Earn up to ₹5000+ profit using this template
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}