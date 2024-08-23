import React from 'react';
import PatientQRCode from './PatientQrCode';

function PatientQrArea() {
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
          <PatientQRCode patientData={patientData} />
        </div>
    );
}

export default PatientQrArea;