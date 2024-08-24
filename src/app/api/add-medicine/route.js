import clientPromise from "../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { medicineName, frequency } = await req.json();
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("medicines");

        await collection.insertOne({ medicineName, frequency, createdAt: new Date() });
        return NextResponse.json({ message: "Medicine added successfully!" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add medicine." }, { status: 500 });
    }
}
