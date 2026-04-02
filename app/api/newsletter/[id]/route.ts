import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 params is Promise
) {
  try {
    const { id } = await context.params; // ✅ FIX HERE

    const client = await clientPromise;
    const db = client.db("newsletter");

    const result = await db.collection("subscribers").deleteOne({
      _id: new ObjectId(id),
    });

    console.log("DELETE RESULT:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}