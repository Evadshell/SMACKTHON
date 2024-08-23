import clientPromise from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const client = await clientPromise;  // Ensure the client is initialized here
        const db = client.db();
        const collection = db.collection("users");

        const body = await req.json();
        const { data } = body;
        console.log(data);

        if (!data) {
            return NextResponse.json({ error: 'data is required' }, { status: 400 });
        }

        const { name, dob, role, diseases } = data;

        await collection.insertOne({ name, dob, role, diseases });
        return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to register user." }, { status: 500 });
    }
}
