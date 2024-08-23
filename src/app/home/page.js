"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import RegisterModal from "./RegisterModal";
import axios from "axios";
import { Button } from "../../../@/components/ui/button";
const Home = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false); // Replace with actual registration check

  const handleRegistration = async (formData) => {
    const response = await axios.post("/api/patient-register", formData);

    if (response.status === 200) {
      setUserRegistered(true);
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
        userRegistered ? (
          <h1>Welcome, {session.user.name}!</h1>
        ) : (<>
        
        <Button onClick={() => setIsOpen(true)}>Update Details</Button>
        <Button onClick={() => signOut()}>signout </Button>


        
        </>
        )
      ) : (
        <h1>Please log in</h1>
      )}
      <RegisterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleRegistration}
      />
    </div>
  );
};

export default Home;
