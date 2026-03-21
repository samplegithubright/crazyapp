"use client";

import Link from "next/link";

const items = [
  {
    title: "Graphic",
    desc: "Explore our Website",
    link: "/graphics/education",
    image: "/new.jpg",
  },
  {
    title: "Graphic",
    desc: "Our Graphic",
    link: "/graphic-templates/ui-kits",
    image: "/ai.jpeg",
  },
  {
    title: "Contact",
    desc: "Get in touch",
    link: "/contact",
    image: "/new.jpg",
  },
  {
    title: "Blog",
    desc: "Read latest articles",
    link: "/blog",
    image: "/mobile.jpg",
  },
  {
    title: "Portfolio",
    desc: "View our work",
    link: "/portfolio",
    image: "/web.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-16">
      
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-800">
        Explore Pages
      </h1>

      {/* Grid */}
      <div className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      ">
        {items.map((item, index) => (
          <Link key={index} href={item.link}>
            
            <div className="
              group relative cursor-pointer
              rounded-2xl overflow-hidden
              shadow-md hover:shadow-xl
              transition-all duration-300
            ">
              
              {/* Background Image */}
              <div
                className="h-60 bg-cover bg-center transform group-hover:scale-110 transition duration-500"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Overlay */}
              
<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-200">
                  {item.desc}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}