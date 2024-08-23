import React from 'react';
import QRCode from 'qrcode.react';

const PatientQRCode = ({ patientData }) => {
    const patientInfo = JSON.stringify(patientData); // Convert patient data to a JSON string

    return (
        <div>
            <QRCode value={patientInfo} size={256} />
        </div>
    );
};

export default PatientQRCode;