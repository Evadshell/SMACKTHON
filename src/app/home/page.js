// src/app/home.jsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import RegisterModal from "@/components/RegisterModal";
import axios from "axios";
const Home = () => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userRegistered, setUserRegistered] = useState(false); // Replace with actual registration check

  const handleRegistration = async (formData) => {
    // Send formData to your backend to store in the database
    const response = await axios.post("/api/register", {
      data: formData,
    });

    if (response.status === 200) {
      setUserRegistered(true); // Update registration status
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
        userRegistered ? (
          <h1>Welcome, {session.user.name}!</h1>
        ) : (
          <Button onClick={onOpen}>Register your info</Button>
        )
      ) : (
        <h1>Please log in</h1>
      )}
      <RegisterModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRegistration}
      />
    </div>
  );
};

export default Home;
