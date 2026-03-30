import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("myproject");

    // Ensure no admin exists
    const adminCount = await db.collection("users").countDocuments({ role: "admin" });
    if (adminCount > 0) {
      return NextResponse.json({ error: "Super admin already exists." }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    return NextResponse.json(
      { message: "Super admin registered successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Setup Admin Error:", error);
    return NextResponse.json({ error: "Failed to setup super admin" }, { status: 500 });
  }
}
