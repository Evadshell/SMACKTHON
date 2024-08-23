import clientPromise from "../../lib/db";
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
export async function POST(req) {
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('medistat');
        const collection = db.collection("users");

        // Parse the incoming JSON request
        const body = await req.json();
        const { email,name, dob, role,experience, shop} = body;
        console.log(body);

        // Check for required fields
        if (!name || !dob || !role) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        // Create a user object
        const user = { email,name, dob, role,experience, shop};

      

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
