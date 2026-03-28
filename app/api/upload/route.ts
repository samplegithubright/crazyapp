import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const type = formData.get("type") as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 📦 Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ☁️ Upload to Cloudinary
    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    const client = await clientPromise;
    const db = client.db("myupload");

    // 🔥 SELECT COLLECTION DYNAMICALLY
    let collectionName = "";

    if (category === "stock-video") collectionName = "stockvideos";
    else if (category === "graphics") collectionName = "graphics";
    else if (category === "motion-graphic") collectionName = "motiongraphics";
    else collectionName = "videos";

    await db.collection(collectionName).insertOne({
      title,
      
      url: uploadRes.secure_url,
      type,
      subCategory,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}