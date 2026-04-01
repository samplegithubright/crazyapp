"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Graphics",
    desc: "Explore our Website",
    link: "/graphics/education",
    image: "/new.jpg",
    category: "graphics",
  },
  {
    title: "Videos",
    desc: "Our Videos",
    link: "/video-templates/education-video",
    image: "/ai.jpeg",
    category: "videos",
  },
  {
    title: "Motion Graphics",
    desc: "Animated content",
    link: "/motion-graphic/motion-education",
    image: "/web.jpg",
    category: "motion-graphics",
  },
  {
    title: "Stock Videos",
    desc: "High quality stock",
    link: "/stockvideo",
    image: "/mobile.jpg",
    category: "stock-videos",
  },
];

export default function Home() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 sm:px-6 lg:px-12 py-16 ">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3">
          Explore Categories
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover graphics, videos, and creative assets
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.link}>
              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div
                  className="h-64 bg-cover bg-center transform group-hover:scale-110 transition duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h2 className="text-2xl font-semibold text-white mb-1">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-200 mb-2">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur">
                      {stats[item.category] ?? 0} items
                    </span>

                    <span className="text-xs text-gray-300 group-hover:text-white transition">
                      Explore →
                    </span>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
