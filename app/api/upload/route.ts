import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const editableFile = formData.get("editableFile") as File; // ✅ NEW
    const title = formData.get("title") as string;
    const description = formData.get("description") as string; // ✅ NEW
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const type = formData.get("type") as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 📦 Convert main file
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // ☁️ Upload main file
    const uploadMain: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(fileBuffer);
    });

    // ☁️ Upload editable file (optional)
    let editableUrl = "";

    if (editableFile) {
      const editBuffer = Buffer.from(await editableFile.arrayBuffer());

      const uploadEdit: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "raw" }, // 🔥 IMPORTANT for PSD/AI
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          )
          .end(editBuffer);
      });

      editableUrl = uploadEdit.secure_url;
    }

    const client = await clientPromise;
    const db = client.db("myupload");

    let collectionName = "";

    if (category === "stock-video") collectionName = "stockvideos";
    else if (category === "graphics") collectionName = "graphics";
    else if (category === "motion-graphic") collectionName = "motiongraphics";
    else collectionName = "videos";

    await db.collection(collectionName).insertOne({
      title,
      description, // ✅ save
      url: uploadMain.secure_url,
      editableUrl, // ✅ save
      type,
      subCategory,
      category,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}