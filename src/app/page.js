// import { signOut, signIn, getSession } from "./auth";

import Landing from "./landing";
import { Button } from "../../@/components/ui/button";
import SignInButton from "./signInButton";

// import { GoogleSignInButton } from "@/components/ui/authButtons";
export default async function Home() {
  return (
    <main>
      {/* <GoogleSignInButton /> */}
      
      <Landing />
    </main>
  );
}