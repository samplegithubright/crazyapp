import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // ✅ FIX
) {
    const { id } = await context.params; // ✅ unwrap params

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("myupload");

    let collectionName = "";

    if (category === "stock-video") collectionName = "stockvideos";
    else if (category === "graphics") collectionName = "graphics";
    else if (category === "motion-graphic") collectionName = "motiongraphics";
    else collectionName = "videos";

    await db.collection(collectionName).deleteOne({
        _id: new ObjectId(id), // ✅ use id here
    });

    return NextResponse.json({ success: true });
}