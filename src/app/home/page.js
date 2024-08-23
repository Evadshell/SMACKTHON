"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import RegisterModal from "./RegisterModal";
import axios from "axios";
import { Button } from "../../../@/components/ui/button";

const Home = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false); // Will be fetched from server
  const [userData, setUserData] = useState(null); // Store user details here
const [email,setEmail] = useState("");
  // Fetch the user's registration details from the backend on page load
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session?.user?.email) {
        console.log(session)
        setEmail(session.user.email);    
        try {
          // Fetch registration status based on user role
          const response = await axios.get(`/api/user-details?email=${session?.user?.email}`);
          console.log(response.data);


          if (response.status === 200 && response.data.isRegistered) {
            setUserRegistered(true);
            setUserData(response.data.userData); // Store the user data
          } else {
            setUserRegistered(false);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserDetails(); // Fetch details once session is authenticated
    }
  }, [session, status]);

  const handleRegistration = async (formData) => {
    if (!email) return; // Make sure email is set

    // Add email to formData
    const registrationData = { ...formData, email };

    try {
      const response = await axios.post(
        formData.role === "patient"
          ? "/api/patient-register"
          : "/api/doctor-register",
        registrationData
      );

      if (response.status === 200) {
        setUserRegistered(true);
        setUserData(registrationData); // Store the registered data
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  return (
    <div>
      {status === "authenticated" ? (
        userData ? (
          <div className="user-details">
            {/* Render user details in card format */}
            <h1>Welcome, {userData?.name}!</h1>
            <p>Date of Birth: {userData?.dob}</p>
            <p>Role: {userData?.role}</p>
            {userData?.role === "patient" ? (
              <p>Diseases: {userData?.diseases}</p>
            ) : (
              <>
                <p>Experience: {userData?.experience}</p>
                <p>Shop: {userData?.shop}</p>
              </>
            )}
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        ) : (
          <>
            <Button onClick={() => setIsOpen(true)}>Update Details</Button>
            <Button onClick={() => signOut()}>Sign Out</Button>
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
