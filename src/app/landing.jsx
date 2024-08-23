"use client";

import React, { useState, useEffect } from "react";
import { GoogleSignInButton } from "../../@/components/ui/authButtons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "react-spring";
import { Card, CardHeader, CardTitle, CardContent } from "../../@/components/ui/card";
import { Button } from "../../@/components/ui/button"; // Assuming you're using Shadcn's button component
// import { signIn } from "next-auth/react";
// import { signOut, signIn, auth } from "./auth";

const InfoCard = ({ title, content, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(`card-${index}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(50px)",
    config: { tension: 280, friction: 20 },
  });

  return (
    <animated.div
      id={`card-${index}`}
      style={springProps}
      className="mb-8 mx-auto w-full max-w-md lg:max-w-lg"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </animated.div>
  );
};

const Landing = () => {
  const cardData = [
    {
      title: "Instant QR Code",
      content: "Register and get a QR code with your complete medical history.",
    },
    {
      title: "Doctors Assistant",
      content: "Doctors can scan your QR code to access your medical history instantly.",
    },
    {
      title: "Smart Reminders",
      content: "Upload prescriptions and receive daily reminders.",
    },
    {
      title: "Health Insights",
      content: "Get insights into your health data over time.",
    },
    {
      title: "Secure Storage",
      content: "Your data is encrypted and stored securely.",
    },
  ];
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }
  return (
    <div>
         <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-600">MediStat</h2>
            <GoogleSignInButton />

          </div>
        </nav>
      {/* Header */}
      <header className="text-center text-white py-10 px-4">
        <h1 className="text-4xl lg:text-6xl font-bold">MediStat</h1>
        <p className="text-lg lg:text-xl mt-4">Your Health, Simplified!</p>
      </header>

      {/* Info Cards */}
      <section className="mt-10 lg:mt-20 space-y-8 px-4 lg:px-20">
        {cardData.map((card, index) => (
          <InfoCard key={index} title={card.title} content={card.content} index={index} />
        ))}
      </section>
    </div>
      </div>
  );
};

export default Landing;
