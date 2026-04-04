import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX HERE

  const client = await clientPromise;
  const db = client.db("money");

  await db.collection("pricing").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: any) {
  const client = await clientPromise;
  const db = client.db("money");

  const body = await req.json();

  await db.collection("pricing").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        name: body.name,
        price: body.price,
        duration: body.duration,
        features: body.features,
      },
    }
  );

  return NextResponse.json({ success: true });
}