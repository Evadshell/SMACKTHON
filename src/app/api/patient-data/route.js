import dbConnect from '@/app/utils/dbConnect';
import Patient from '../../models/Patient';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const { patientId } = req.query;

        try {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }

            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
