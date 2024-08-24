import dbConnect from '../../utils/dbConnect';
import ScanRequest from '../../models/ScanRequest';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { doctorId, patientId } = req.body;

        try {
            // Create a new scan request
            const newScanRequest = new ScanRequest({ doctorId, patientId, status: 'pending' });
            await newScanRequest.save();

            // Here you would send a notification to the patient (e.g., using WebSockets or a push notification service)
            res.status(200).json({ message: 'Scan request sent to patient.', requestId: newScanRequest._id });
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
