import React, { useState } from "react";
import { FaQrcode, FaHistory, FaUser } from "react-icons/fa";
import PatientQrArea from "./PatientQrArea";
import QRCodeScanner from "./DoctorQrScanner";

const PatientHomePage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const handleScanSuccess = (decodedText) => {
    console.log(`Decoded text: ${decodedText}`);
    // Here, you can send the decoded text to your backend or handle it as needed
  };
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="flex-grow p-4">
        {activeTab === 1 && (
          <div className="text-center">
            {" "}
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Doctor Scanner</h1>
              <QRCodeScanner onScanSuccess={handleScanSuccess} />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="text-center">Content for History</div>
        )}
        {activeTab === 3 && (
          <div className="text-center">Content for Account</div>
        )}
      </div>

      <div className="navbar bg-blue-500 text-white flex justify-around p-4 fixed bottom-0 w-full">
        <button
          onClick={() => handleTabClick(1)}
          className={`flex flex-col items-center ${
            activeTab === 1 ? "text-yellow-300" : "text-white"
          }`}
        >
          <FaQrcode className="text-2xl" />
          <span>QR</span>
        </button>

        <button
          onClick={() => handleTabClick(2)}
          className={`flex flex-col items-center ${
            activeTab === 2 ? "text-yellow-300" : "text-white"
          }`}
        >
          <FaHistory className="text-2xl" />
          <span>History</span>
        </button>

        <button
          onClick={() => handleTabClick(3)}
          className={`flex flex-col items-center ${
            activeTab === 3 ? "text-yellow-300" : "text-white"
          }`}
        >
          <FaUser className="text-2xl" />
          <span>Account</span>
        </button>
      </div>
    </div>
  );
};

export default PatientHomePage;
