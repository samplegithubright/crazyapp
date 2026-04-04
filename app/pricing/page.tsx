"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const redirect = searchParams.get("redirect") || "/";
  const category = searchParams.get("category");

  // ✅ FETCH PLANS FROM DB
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/pricing");
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch pricing", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // ✅ PAYMENT HANDLER
  const handlePayment = async (amount: number) => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Your Website",
      description: "Subscription",
      order_id: order.id,

      handler: async function (response: any) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          body: JSON.stringify(response),
        });

        const data = await verifyRes.json();

        if (data.success) {
          alert("Payment successful 🎉");
          router.push(redirect);
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
    <div className="bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-20 relative overflow-hidden flex flex-col justify-center">

      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="text-center mb-16 relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-gray-300">
            Unlock Unlimited Access
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {category || "Generate"} Without Limits
        </h1>

        <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
          Choose a plan to elevate your creative pipeline.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-gray-400">Loading plans...</div>
      ) : plans.length === 0 ? (
        <div className="text-center text-gray-500">No plans available</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">

          {plans.map((plan, i) => (
            <div
              key={plan._id}
              className={`
                relative group rounded-3xl p-px
                bg-white/5
                hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500
                transition-all duration-500
                ${i === 1 ? "shadow-[0_0_30px_rgba(168,85,247,0.2)]" : ""}
              `}
            >
              <div className="rounded-[23px] backdrop-blur-xl bg-[#131927] h-full flex flex-col p-8 md:p-10">

                {/* PLAN */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                    {plan.name}
                  </h2>

                  <p className="text-5xl font-bold text-white mb-6">
                    ₹{plan.price}
                    <span className="text-base text-gray-500">
                      {" "} /{plan.duration || "mo"}
                    </span>
                  </p>

                  <div className="h-px bg-white/10 mb-8"></div>

                  {/* FEATURES */}
                  <ul className="space-y-4 mb-8">
                    {(plan.features || []).map((f: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-300">
                        <Check size={18} className="text-purple-400 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => handlePayment(plan.price)}
                  className={`
                    w-full py-4 rounded-xl font-bold text-sm transition-all
                    ${i === 1
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }
                  `}
                >
                  Get {plan.name}
                </button>

                {/* POPULAR */}
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                    MOST POPULAR
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      )}

      {/* FOOTER */}
      <div className="text-center mt-16 text-sm text-gray-500 flex flex-col sm:flex-row gap-4 justify-center">
        <span>Secure payments via Razorpay</span>
        <span>Cancel anytime</span>
        <span>Instant activation</span>
      </div>
    </div>
  );
}