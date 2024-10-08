import clientPromise from "../../lib/db";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("users");

        // Parse the incoming JSON request
        const body = await req.json();
        const { name, dob, role, diseases, experience, shop } = body;
        console.log(body);

        // Check for required fields
        if (!name || !dob || !role) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        // Create a user object
        const user = { name, dob, role };

        // Handle additional fields based on the role
        if (role === "patient") {
            // Treat empty diseases as an empty array
            user.diseases = diseases && diseases.length > 0 ? diseases : [];
        } else if (role === "doctor") {
            // Ensure experience and shop are provided
            if (!experience || !shop) {
                return NextResponse.json({ error: 'Experience and shop details are required for doctors' }, { status: 400 });
            }
            user.experience = experience;
            user.shop = shop;
        } else {
            return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
        }

        // Insert the user into the database
        await collection.insertOne(user);

        // Return a success response
        return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
    } catch (error) {
        // Handle errors and return a 500 response
        console.error(error);
        return NextResponse.json({ error: "Failed to register user." }, { status: 500 });
    }
}
