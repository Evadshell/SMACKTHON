import mongoose from 'mongoose';

const scanRequestSchema = new mongoose.Schema({
    doctorId: String,
    patientId: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ScanRequest = mongoose.models.ScanRequest || mongoose.model('ScanRequest', scanRequestSchema);

export default ScanRequest;
