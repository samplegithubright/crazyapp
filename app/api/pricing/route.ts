import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("money");

  const plans = await db.collection("pricing").find({}).toArray();

  return NextResponse.json(plans);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("money");

  const body = await req.json();

  const newPlan = {
    name: body.name,
    price: body.price,
    duration: body.duration || "monthly",
    features: body.features || [],
    createdAt: new Date(),
  };

  const result = await db.collection("pricing").insertOne(newPlan);

  return NextResponse.json({ ...newPlan, _id: result.insertedId });
}