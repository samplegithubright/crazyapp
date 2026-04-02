import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    const client = await clientPromise;
    const db = client.db("payment");

    await db.collection("users").updateOne(
        { _id: new ObjectId(resolvedParams.id) },
        {
            $set: {
                isSubscribed: false,
                subscriptionExpiry: null,
            },
        }
    );

    return Response.json({ success: true });
}