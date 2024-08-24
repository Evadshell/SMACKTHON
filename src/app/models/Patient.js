import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    birthDate: Date,
    allergies: [String],
    prescriptions: [{
        name: String,
        dosage: String
    }],
    // Add more fields as necessary
});

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;
