import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myproject");

    const adminCount = await db.collection("users").countDocuments({ role: "admin" });
    
    return NextResponse.json({ hasAdmin: adminCount > 0 });
  } catch (error) {
    console.error("Failed to check admin status:", error);
    return NextResponse.json({ error: "Failed to check admin status" }, { status: 500 });
  }
}
