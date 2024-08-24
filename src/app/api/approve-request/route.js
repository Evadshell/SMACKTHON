import dbConnect from '../../utils/dbConnect';
import ScanRequest from '../../models/ScanRequest';
export async function POST(req) {
    await dbConnect();

    const { requestId, approved } = await req.json();

    try {
        const scanRequest = await ScanRequest.findById(requestId);
        if (!scanRequest) {
            return new Response(JSON.stringify({ message: 'Request not found' }), { status: 404 });
        }

        scanRequest.status = approved ? 'approved' : 'denied';
        await scanRequest.save();

        return new Response(JSON.stringify({ message: `Request ${approved ? 'approved' : 'denied'}` }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error', error }), { status: 500 });
    }
}

// Handle other methods if needed
export async function GET() {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}