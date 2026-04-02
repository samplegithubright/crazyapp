"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 199,
    label: "₹199",
  },
  {
    name: "Pro",
    price: 499,
    label: "₹499",
  },
  {
    name: "Premium",
    price: 999,
    label: "₹999",
  },
];

export default function PricingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams.get("redirect") || "/";
  const category = searchParams.get("category");

  const handlePayment = async (amount: number) => {
    // 1️⃣ Create order
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    // 2️⃣ Open Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Your Website",
      description: "Subscription",
      order_id: order.id,

      handler: async function (response: any) {
        // 3️⃣ Verify payment
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          body: JSON.stringify(response),
        });

        const data = await verifyRes.json();

        if (data.success) {
          alert("Payment successful 🎉");
          router.push(redirect); // ✅ go back
        } else {
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] px-4 py-16">

    {/* HEADER */}
    <div className="text-center mb-14">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
        {category || "Graphics"} Plans
      </h1>
      <p className="text-gray-500 text-sm sm:text-base">
        Choose the perfect plan for your needs
      </p>
    </div>

    {/* CARDS */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      {plans.map((plan, i) => (
        <div
          key={i}
          className={`
            relative group rounded-2xl p-px
            bg-linear-to-br from-purple-500/30 to-indigo-500/30
            hover:from-purple-500 hover:to-indigo-500
            transition duration-500
          `}
        >
          {/* INNER CARD */}
          <div className="
            rounded-2xl backdrop-blur-xl bg-white/70
            border border-white/40 shadow-xl
            p-6 flex flex-col justify-between
            h-full transition
            group-hover:bg-white/90
          ">

            {/* TOP */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {plan.name}
              </h2>

              <p className="text-4xl font-bold text-gray-900 mb-4">
                {plan.label}
                <span className="text-sm font-normal text-gray-500">
                  {" "} /month
                </span>
              </p>

              {/* FEATURES */}
              <ul className="space-y-3 mb-6">
                {[
                  "Unlimited access",
                  "High-quality downloads",
                  "Premium support",
                ].map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check size={16} className="text-purple-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => handlePayment(plan.price)}
              className="
                w-full py-2.5 rounded-xl font-medium text-sm
                bg-linear-to-r from-purple-600 to-indigo-600
                text-white shadow-md
                hover:scale-[1.03] hover:shadow-lg
                active:scale-[0.98]
                transition
              "
            >
              Subscribe
            </button>

            {/* POPULAR TAG */}
            {plan.name === "Pro" && (
              <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-purple-600 text-white shadow">
                Popular
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* FOOTER */}
    <p className="text-center text-gray-400 mt-14 text-sm">
      Secure payments • Cancel anytime • Instant access
    </p>
  </div>
  );
}