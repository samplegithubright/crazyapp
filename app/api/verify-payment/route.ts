import crypto from "crypto";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  // ✅ Verify signature
  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign !== razorpay_signature) {
    return Response.json({ success: false, message: "Invalid signature" });
  }

  // ✅ Get session
  const session = await getServerSession();

  if (!session?.user?.email) {
    return Response.json({ success: false, message: "Unauthorized" });
  }

  // ✅ DB connection
  const client = await clientPromise;
  const db = client.db("payment");

  // ✅ Subscription dates
  const now = new Date();
  const expiry = new Date();
  expiry.setDate(now.getDate() + 30);

  // ✅ Update user subscription
  await db.collection("users").updateOne(
    { email: session.user.email },
    {
      $set: {
        isSubscribed: true,
        plan: "paid",
        subscriptionStart: now,
        subscriptionExpiry: expiry,
        razorpay_order_id,
        razorpay_payment_id,
      },
    }
  );

  return Response.json({ success: true });
}