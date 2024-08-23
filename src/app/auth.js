// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./lib/db";

// Define the NextAuth options
// const options = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     async session({ session, user }) {
//       session.userId = user.id;
//       return session;
//     },
//     async signIn({ user }) {
//       if (!user.username) {
//         user.username = user?.email?.split("@")[0];
//       }
//       return true;
//     },
//   },
//   debug: true,
// };

// // This will handle API requests for NextAuth
// export default function authHandler(req, res) {
//   return NextAuth(req, res, options);
// }

// // Export the functions for sign-in, sign-out, and session handling
// import { getSession, signIn, signOut } from "next-auth/react";
// export { getSession, signIn, signOut };

import {NextAuthOptions ,User,getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
    providers: [
            GoogleProvider({
              clientId: process.env.AUTH_GOOGLE_ID,
              clientSecret: process.env.AUTH_GOOGLE_SECRET,
            }),
          ],
}