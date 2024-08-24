import dbConnect from '../../utils/dbConnect';
import ScanRequest from '../../models/ScanRequest';

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');

    try {
        const pendingRequests = await ScanRequest.find({ patientId, status: 'pending' });

        if (!pendingRequests || pendingRequests.length === 0) {
            return new Response(JSON.stringify({ message: 'No pending requests found' }), { status: 404 });
        }

        return new Response(JSON.stringify(pendingRequests), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error', error }), { status: 500 });
    }
}

export async function POST() {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
