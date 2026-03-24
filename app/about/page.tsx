"use client";

export default function AboutPage() {
  return (
    <div className="bg-[#f6f8fc] text-gray-800 pt-16">

      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-12 py-20 text-center bg-linear-to-r from-[#0a1f44] via-[#1e3a8a] to-[#6d28d9] text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Empowering Creators Worldwide
        </h1>
        <p className="max-w-2xl mx-auto text-gray-200 text-base sm:text-lg">
          Discover premium assets, templates, and tools designed to help you create faster, smarter, and better.
        </p>
      </section>

      {/* MISSION */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#0a1f44]">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            We simplify creativity by providing high-quality digital assets in one place.
          </p>
          <p className="text-gray-600">
            From UI kits to music and templates — everything you need to build stunning projects.
          </p>
        </div>

        <div className="relative">
          <img
            src="/new.jpg"
            alt="About"
            className="rounded-2xl shadow-xl w-full"
          />
          <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-gradient-to-r from-[#d7ac38] to-[#facc15] rounded-full blur-2xl opacity-40"></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#0a1f44]">
            What We Offer
          </h2>
          <p className="text-gray-600">
            Everything you need for creative success
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          
          {[
            { title: "Unlimited Downloads", color: "from-pink-500 to-red-500" },
            { title: "Premium Templates", color: "from-blue-500 to-indigo-500" },
            { title: "High Quality Assets", color: "from-green-500 to-emerald-500" },
            { title: "Easy Customization", color: "from-purple-500 to-violet-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl text-white shadow-lg hover:scale-105 transition transform"
              style={{
                background: `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
            >
              <div className={`bg-gradient-to-r ${item.color} p-6 rounded-xl`}>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">
                  Designed for creators who demand quality and speed.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          
          {[
            { value: "1M+", label: "Assets" },
            { value: "500K+", label: "Users" },
            { value: "100+", label: "Categories" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#6d28d9]">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
     

    </div>
  );
}