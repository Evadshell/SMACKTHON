import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScanSuccess }) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader", 
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(onScanSuccess, onScanError);

        function onScanSuccess(decodedText, decodedResult) {
            console.log(`QR Code scanned: ${decodedText}`);
            onScanSuccess(decodedText);
            scanner.clear(); // Stop scanning after a successful scan
        }

        function onScanError(errorMessage) {
            // Handle scan error
            console.error(`QR Code scan error: ${errorMessage}`);
        }

        return () => {
            scanner.clear();
        };
    }, [onScanSuccess]);

    return (
        <div id="reader" style={{ width: "100%" }}></div>
    );
};

export default QRCodeScanner;
