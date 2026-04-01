import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const adminDb = client.db("myproject");
    const userDb = client.db("project");

    // 👤 get admins
    const admins = await adminDb.collection("users").find().toArray();

    // 👤 get customers
    const customers = await userDb.collection("users").find().toArray();

    // 🔄 merge both
    const users = [
      ...admins.map((u) => ({
        ...u,
        role: "admin",
      })),
      ...customers.map((u) => ({
        ...u,
        role: "customer",
      })),
    ];

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}