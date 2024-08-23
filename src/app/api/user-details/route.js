import clientPromise from "../../lib/db"; // Ensure this points to the correct database connection
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return new Response(JSON.stringify({ error: "Missing email" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
console.log(email)
const client = await clientPromise;
const db = client.db('medistat');
const collection = db.collection("users");
        // Check if the database model exists and is being queried correctly
        const user = await collection.findOne({ email: email });
        if (user) {
            return new Response(JSON.stringify({
                isRegistered: true,
                userData: user,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } 
        else {
            return new Response(JSON.stringify({
                isRegistered: false,
                userData: user,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
