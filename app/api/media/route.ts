import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ Define Type
interface MediaItem {
  _id: ObjectId;
  title: string;
  description: string; // ✅ NEW
  url: string;
  editableUrl: string; // ✅ NEW
  type: "image" | "video";
  category: string;
  subCategory: string;
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const all = searchParams.get("all");

  const client = await clientPromise;
  const db = client.db("myupload");

  // 🔥 DASHBOARD → Fetch ALL collections
  if (all === "true") {
    // ✅ Type ALL collections (IMPORTANT)
    const videos = await db.collection<MediaItem>("videos").find({}).toArray();
    const graphics = await db.collection<MediaItem>("graphics").find({}).toArray();
    const motion = await db.collection<MediaItem>("motiongraphics").find({}).toArray();
    const stock = await db.collection<MediaItem>("stockvideos").find({}).toArray();

    // ✅ Merge with category
    const merged: MediaItem[] = [
      ...videos.map((item) => ({ ...item, category: "video" })),
      ...graphics.map((item) => ({ ...item, category: "graphics" })),
      ...motion.map((item) => ({ ...item, category: "motion-graphic" })),
      ...stock.map((item) => ({ ...item, category: "stock-video" })),
    ];

    // ✅ Safe sort (no crash)
    merged.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(merged);
  }

  // 🔥 NORMAL CATEGORY FETCH
  let collectionName = "";

  if (category === "stock-video") collectionName = "stockvideos";
  else if (category === "graphics") collectionName = "graphics";
  else if (category === "motion-graphic") collectionName = "motiongraphics";
  else collectionName = "videos";

  // ✅ Typed fetch
  const data = await db
    .collection<MediaItem>(collectionName)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // ✅ Ensure category exists (important for frontend delete)
  const formatted = data.map((item) => ({
    ...item,
    category,
  }));

  return NextResponse.json(formatted);
}