import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature")!;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  // ✅ PAYMENT SUCCESS EVENT
  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const email = payment.email; // pass this from frontend

    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const expiry = new Date();
    expiry.setDate(now.getDate() + 30);

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          isSubscribed: true,
          subscriptionStart: now,
          subscriptionExpiry: expiry,
        },
      }
    );
  }

  return new Response("OK", { status: 200 });
}