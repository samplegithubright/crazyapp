"use client";

import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "₹199",
    features: [
      "Access to limited content",
      "Standard downloads",
      "No editable files",
    ],
  },
  {
    name: "Pro",
    price: "₹499",
    features: [
      "Full access",
      "HD downloads",
      "Editable files",
    ],
  },
  {
    name: "Premium",
    price: "₹999",
    features: [
      "Unlimited downloads",
      "4K quality",
      "All editable resources",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {category || "Graphics"} Plans
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Simple & flexible pricing
        </p>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="
              rounded-xl p-5 border bg-white border-gray-200
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:scale-[1.03]
              hover:bg-purple-600 hover:text-white
              flex flex-col justify-between
            "
          >
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">
                {plan.name}
              </h2>

              <p className="text-2xl sm:text-3xl font-bold mb-4">
                {plan.price}
                <span className="text-xs sm:text-sm font-normal">
                  {" "} /month
                </span>
              </p>

              <ul className="space-y-2 mb-5">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm"
                  >
                    <Check size={14} className="mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="
                w-full py-2 rounded-lg text-sm font-medium
                bg-black text-white
                hover:bg-white hover:text-purple-600
                transition
              "
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <p className="text-center text-gray-400 mt-10 text-xs sm:text-sm">
        Secure payments • Cancel anytime
      </p>
    </div>
  );
}