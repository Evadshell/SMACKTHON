import React from 'react';
import { useSession } from "next-auth/react";

import PatientQRCode from './PatientQrCode';
import { useState, useEffect } from 'react';
import axios from 'axios';
function PatientQrArea() {
    const { data: session, status } = useSession();
    const patientId = session?.user?.email;
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`/api/user-details?email=${patientId}`);
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient data', error);
            }
        };

        fetchPatientData();
    }, [patientId]);
    if (!patient) return <div>Loading...</div>;

    const patientData = {
        id: "12345",
        name: "John Doe",
        birthDate: "1990-01-01",
        allergies: ["Peanuts", "Penicillin"],
        prescriptions: [
            { name: "Medicine A", dosage: "2x daily" },
            { name: "Medicine B", dosage: "1x daily" }
        ]
    };
    return (
        <div>
          <PatientQRCode patientData={patient} />
        </div>
    );
}

export default PatientQrArea;