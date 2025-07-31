import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const OtpSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white/30 backdrop-blur-md rounded-2xl px-6 pt-8 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            OTP Verified Successfully
          </h2>

          <div className="pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="gradient"
              className="w-full py-3 px-6 rounded-full text-sm font-semibold"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpSuccessModal;
