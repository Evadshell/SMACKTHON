import dbConnect from '../../utils/dbConnect';
import ScanRequest from '../../models/ScanRequest';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { requestId, approved } = req.body;

        try {
            const scanRequest = await ScanRequest.findById(requestId);
            if (!scanRequest) {
                return res.status(404).json({ message: 'Request not found' });
            }

            scanRequest.status = approved ? 'approved' : 'denied';
            await scanRequest.save();

            res.status(200).json({ message: `Request ${approved ? 'approved' : 'denied'}` });
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
