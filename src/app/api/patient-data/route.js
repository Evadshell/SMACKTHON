import dbConnect from '../../utils/dbConnect';
import Patient from '../../models/Patient';
export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return new Response(JSON.stringify({ message: 'Patient not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(patient), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error', error }), { status: 500 });
    }
}

export async function POST() {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}