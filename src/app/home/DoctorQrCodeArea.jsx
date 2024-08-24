import React, { useState } from 'react';
import axios from 'axios';
import QRCodeScanner from './DoctorQrScanner';
const DoctorArCodeArea = () => {
    const [patientData, setPatientData] = useState(null);

    const handleScanSuccess = async (decodedText) => {
        console.log(`Decoded text: ${decodedText}`);

        // Send scan request to patient
        const { patientId } = JSON.parse(decodedText);
        try {
            const response = await axios.post('/api/scan-request', { doctorId: 'doc123', patientId });
            const { requestId } = response.data;

            // Wait for patient approval (polling or WebSocket connection could be used)
            await pollForApproval(requestId, patientId);
        } catch (error) {
            console.error('Error sending scan request', error);
        }
    };

    const pollForApproval = async (requestId, patientId) => {
        // Simple polling (could be optimized with WebSockets)
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`/api/scan-request-status?id=${requestId}`);
                const { status } = response.data;

                if (status === 'approved') {
                    clearInterval(interval);
                    await fetchPatientData(patientId);
                } else if (status === 'denied') {
                    clearInterval(interval);
                    alert('Access denied by patient');
                }
            } catch (error) {
                clearInterval(interval);
                console.error('Error polling for approval', error);
            }
        }, 3000);
    };

    const fetchPatientData = async (patientId) => {
        try {
            const response = await axios.get(`/api/patient-data?patientId=${patientId}`);
            setPatientData(response.data);
        } catch (error) {
            console.error('Error fetching patient data', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doctor Scanner</h1>
            {!patientData ? (
                <QRCodeScanner onScanSuccess={handleScanSuccess} />
            ) : (
                <div>
                    <h2>Patient Medical History</h2>
                    {/* Render patient data */}
                    <p>Name: {patientData.name}</p>
                    <p>Birth Date: {new Date(patientData.birthDate).toLocaleDateString()}</p>
                    <p>Allergies: {patientData.allergies.join(', ')}</p>
                    {/* More patient data here */}
                </div>
            )}
        </div>
    );
};

export default DoctorArCodeArea;
