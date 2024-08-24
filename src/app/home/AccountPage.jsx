"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaSignOutAlt, FaPills } from "react-icons/fa";
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

const AccountPage = () => {
    const { data: session } = useSession();
    const [medicineName, setMedicineName] = useState("");
    const [frequency, setFrequency] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSignOut = () => {
        signOut();
    };

    const handleAddMedicine = async () => {
        if (medicineName && frequency) {
            try {
                const response = await fetch("/api/add-medicine", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ medicineName, frequency }),
                });
                
                if (response.ok) {
                    // Optionally, add some notification to show success
                    setMedicineName("");
                    setFrequency("");
                    onClose();
                } else {
                    console.error("Failed to add medicine");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <p>Name: {session?.user?.name}</p>
            <p>Email: {session?.user?.email}</p>

            <Button 
                onClick={handleSignOut}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded flex items-center"
            >
                <FaSignOutAlt className="mr-2" />
                Sign Out
            </Button>

            <Button 
                onClick={onOpen}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex items-center"
            >
                <FaPills className="mr-2" />
                Add Medicines
            </Button>

            {/* Modal for adding medicine */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Medicine</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex flex-col space-y-4">
                            <Input 
                                placeholder="Medicine Name"
                                value={medicineName}
                                onChange={(e) => setMedicineName(e.target.value)}
                            />
                            <Input 
                                placeholder="Frequency (e.g., every 4 hours)"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <Button 
                                onClick={handleAddMedicine}
                                className="bg-green-500 text-white py-2 rounded"
                            >
                                Save Medicine
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AccountPage;