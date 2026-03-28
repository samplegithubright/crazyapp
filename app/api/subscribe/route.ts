import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
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


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsletter");

    const subscribers = await db
      .collection("subscribers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}