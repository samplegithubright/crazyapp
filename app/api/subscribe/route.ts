import clientPromise from "@/lib/mongodb";

export async function POST(req: { json: () => PromiseLike<{ email: any; }> | { email: any; }; }) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("newsletter");

    await db.collection("subscribers").insertOne({
      email,
      createdAt: new Date(),
    });

    return Response.json({ message: "Subscribed successfully" });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}