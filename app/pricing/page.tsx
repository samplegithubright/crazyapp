"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";

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
    <div className="bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-32 relative overflow-hidden flex flex-col justify-center">

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="text-center mb-16 relative z-10 w-full max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm self-center justify-center mx-auto">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-gray-300">Unlock Unlimited Access</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {category || "Generate"} Without Limits
        </h1>
        <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
          Choose a plan to elevate your creative pipeline. Unparalleled speed, unrestricted assets, and absolute creative freedom.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">

        {plans.map((plan, i) => (
          <div
            key={i}
            className={`
            relative group rounded-3xl p-[1px]
            bg-white/5
            hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500
            transition-all duration-500 h-full
            ${plan.name === 'Pro' ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : ''}
          `}
          >
            {/* INNER CARD */}
            <div className="
            rounded-[23px] backdrop-blur-xl bg-[#131927]
            h-full flex flex-col p-8 md:p-10 transition-all duration-500
          ">

              {/* TOP */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                  {plan.name}
                </h2>

                <p className="text-5xl font-bold text-white mb-6">
                  {plan.label}
                  <span className="text-base font-normal text-gray-500">
                    {" "} /mo
                  </span>
                </p>

                <div className="h-[1px] w-full bg-white/10 mb-8"></div>

                {/* FEATURES */}
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited generations",
                    "High-resolution exports up to 4K",
                    "Commercial usage rights",
                    "Priority server rendering",
                  ].map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <Check size={18} className="text-purple-400 mt-0.5" />
                      <span className="font-light leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handlePayment(plan.price)}
                className={`
                w-full py-4 rounded-xl font-bold text-sm text-center transition-all duration-300
                ${plan.name === 'Pro'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:from-purple-500 hover:to-indigo-500'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }
              `}
              >
                Get {plan.name}
              </button>

              {/* POPULAR TAG */}
              {plan.name === "Pro" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  MOST POPULAR
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER TEXT */}
      <div className="text-center mt-16 relative z-10 w-full flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-light text-gray-500">
        <span className="flex items-center gap-2"> Secure payments via Razorpay</span>
        <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-gray-500"></span>
        <span>Cancel anytime</span>
        <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-gray-500"></span>
        <span>Instant account activation</span>
      </div>
    </div>
  );
}