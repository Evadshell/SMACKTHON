import dbConnect from '../../utils/dbConnect';
import ScanRequest from '../../models/ScanRequest';
export async function POST(req) {
    await dbConnect();

    const { doctorId, patientId } = await req.json();

    try {
        // Create a new scan request
        const newScanRequest = new ScanRequest({ doctorId, patientId, status: 'pending' });
        await newScanRequest.save();

        // Here you would send a notification to the patient (e.g., using WebSockets or a push notification service)
        return new Response(JSON.stringify({ message: 'Scan request sent to patient.', requestId: newScanRequest._id }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error', error }), { status: 500 });
    }
}

export async function GET() {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}