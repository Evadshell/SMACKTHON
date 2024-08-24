import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { BrowserQRCodeReader } from '@zxing/browser';

const QRCodeScanner = ({ onScanSuccess }) => {
    const [scannerMode, setScannerMode] = useState('html5'); // Can switch between 'html5' and 'zxing'
    const videoRef = useRef(null);

    useEffect(() => {
        if (scannerMode === 'html5') {
            const scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: 250 },
                false
            );

            function handleScanSuccess(decodedText) {
                console.log(`QR Code scanned: ${decodedText}`);
                onScanSuccess(decodedText);
                scanner.clear(); // Stop scanning after a successful scan
            }

            function handleScanError(errorMessage) {
                console.error(`QR Code scan error: ${errorMessage}`);
            }

            scanner.render(handleScanSuccess, handleScanError);

            return () => {
                scanner.clear();
            };
        } else if (scannerMode === 'zxing') {
            const codeReader = new BrowserQRCodeReader();
            codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
                if (result) {
                    console.log(`QR Code scanned: ${result.text}`);
                    onScanSuccess(result.text);
                }
                if (error) {
                    console.error(error);
                }
            });

            return () => {
                codeReader.reset();
            };
        }
    }, [scannerMode, onScanSuccess]);

    return (
        <div>
            {scannerMode === 'html5' ? (
                <div id="reader" style={{ width: '100%' }}></div>
            ) : (
                <video ref={videoRef} style={{ width: '100%' }} />
            )}
            <div>
                <button onClick={() => setScannerMode('html5')}>Use Html5QrcodeScanner</button>
                <button onClick={() => setScannerMode('zxing')}>Use ZXing</button>
            </div>
        </div>
    );
};

export default QRCodeScanner;
