"use client"; // Ensure this component runs on the client-side

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function SignInButton() {
  return (
    <div>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign In with Google
      </Button>
    </div>
  );
}