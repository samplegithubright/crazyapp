import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("payment");

  const users = await db
    .collection("users")
    .find({})
    .toArray();

  const now = new Date();

  const formatted = users.map((u) => {
    const isExpired =
      u.subscriptionExpiry &&
      new Date(u.subscriptionExpiry) < now;

    return {
      ...u,
      isExpired,
      isSubscribed: u.isSubscribed && !isExpired,
    };
  });

  return Response.json(formatted);
}