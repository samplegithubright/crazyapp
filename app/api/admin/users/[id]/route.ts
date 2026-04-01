import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role"); // 👈 admin or customer

    const dbName = role === "admin" ? "myproject" : "project";
    const db = client.db(dbName);

    await db.collection("users").deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}