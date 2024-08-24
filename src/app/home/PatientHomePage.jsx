import React, { useState } from 'react';
import { FaQrcode, FaHistory, FaUser, FaBell } from 'react-icons/fa';
import PatientQrArea from './PatientQrArea';
import PatientRequestPage from './PatientRequestPage';
import AccountPage from './AccountPage'; // You'll need to create this component
import NotificationPage from './NotificationPage'; // Placeholder for notifications

const PatientHomePage = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Main Content Area */}
            <div className="flex-grow p-4 overflow-y-auto">
                {activeTab === 1 && (
                    <div className="text-center">
                        <PatientQrArea />
                    </div>
                )}
                {activeTab === 2 && (
                    <div className="text-center">
                        <PatientRequestPage />
                    </div>
                )}
                {activeTab === 3 && (
                    <div className="text-center">
                        <NotificationPage /> {/* You can create this component */}
                    </div>
                )}
                {activeTab === 4 && (
                    <div className="text-center">
                        <AccountPage />
                    </div>
                )}
            </div>

            {/* Bottom Navbar */}
            <div className="navbar bg-blue-500 text-white flex justify-around p-4 fixed bottom-0 w-full">
                <button
                    onClick={() => handleTabClick(1)}
                    className={`flex flex-col items-center ${activeTab === 1 ? 'text-yellow-300' : 'text-white'}`}
                >
                    <FaQrcode className="text-2xl" />
                    <span>QR</span>
                </button>

                <button
                    onClick={() => handleTabClick(2)}
                    className={`flex flex-col items-center ${activeTab === 2 ? 'text-yellow-300' : 'text-white'}`}
                >
                    <FaHistory className="text-2xl" />
                    <span>History</span>
                </button>

                <button
                    onClick={() => handleTabClick(3)}
                    className={`flex flex-col items-center ${activeTab === 3 ? 'text-yellow-300' : 'text-white'}`}
                >
                    <FaBell className="text-2xl" />
                    <span>Notifications</span>
                </button>

                <button
                    onClick={() => handleTabClick(4)}
                    className={`flex flex-col items-center ${activeTab === 4 ? 'text-yellow-300' : 'text-white'}`}
                >
                    <FaUser className="text-2xl" />
                    <span>Account</span>
                </button>
            </div>
        </div>
    );
};

export default PatientHomePage;