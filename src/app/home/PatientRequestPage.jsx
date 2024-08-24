import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientRequestPage = () => {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        // Fetch pending requests from the server (polling or WebSocket)
        const interval = setInterval(async () => {
            try {
                const response = await axios.get('/api/pending-requests?patientId=patient123');
                setPendingRequests(response.data.requests);
            } catch (error) {
                console.error('Error fetching pending requests', error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleApproval = async (requestId, approved) => {
        try {
            await axios.post('/api/approve-request', { requestId, approved });
            setPendingRequests(pendingRequests.filter(req => req._id !== requestId));
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pending Scan Requests</h1>
            {pendingRequests.length === 0 ? (
                <p>No pending requests</p>
            ) : (
                pendingRequests.map(request => (
                    <div key={request._id} className="mb-4">
                        <p>Doctor {request.doctorId} is requesting access to your data</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 mr-2"
                            onClick={() => handleApproval(request._id, true)}
                        >
                            Approve
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2"
                            onClick={() => handleApproval(request._id, false)}
                        >
                            Deny
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PatientRequestPage;
