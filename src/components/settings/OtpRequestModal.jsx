import React, { useState } from 'react';
import Button from '../ui/Button';
import SuccessModal from '../modals/SuccessModal';

const OtpRequestModal = ({ isOpen, onClose, onOtpSuccess }) => {
  const [otp, setOtp] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const handleVerifyOtp = () => {
    // Dummy OTP verification logic
    if (otp.length === 6) {
      onOtpSuccess();
      onClose();
      setShowSuccessModal(true);
      setOtp('');
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl px-6 pt-8 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Modal content */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Enter OTP</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">Enter the OTP sent to your registered contact</p>
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
          />
          <Button 
            onClick={handleVerifyOtp} 
            variant="gradient" 
            className="w-full py-3 px-6 rounded-full text-sm font-semibold"
          >
            Verify OTP
          </Button>
        </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="settings"
        title="OTP Verified Successfully!"
        message="Your account verification has been completed."
        showSecondaryAction={false}
      />
    </>
  );
};

export default OtpRequestModal;

