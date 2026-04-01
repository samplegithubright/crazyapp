import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("myupload");

  // ✅ Count from each collection
  const graphics = await db.collection("graphics").countDocuments();
  const videos = await db.collection("videos").countDocuments();
  const motionGraphics = await db.collection("motiongraphics").countDocuments();
  const stockVideos = await db.collection("stockvideos").countDocuments();

  return NextResponse.json({
    graphics,
    videos,
    "motion-graphics": motionGraphics,
    "stock-videos": stockVideos,
  });
}