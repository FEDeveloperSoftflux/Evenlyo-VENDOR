import React, { useState } from 'react';
import { X } from 'lucide-react';
import SuccessModal from './SuccessModal';

const RejectModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const predefinedReasons = [
    'I am busy',
    'Your location is too far',
    'My team is busy at that time, sorry',
    'Can you reschedule for another day?',
    'Custom reason'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = selectedReason === 'Custom reason' ? rejectReason : selectedReason;
    onConfirm(finalReason);
    
    // Close main modal and show success modal
    setRejectReason('');
    setSelectedReason('');
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleClose = () => {
    setRejectReason('');
    setSelectedReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleClose}
          ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-3xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-primary text-white hover:opacity-90 transition-opacity"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Reject Booking
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please select a reason for rejecting this booking:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Reason selection */}
              <div className="space-y-3 text-left">
                {predefinedReasons.map((reason) => (
                  <label key={reason} className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="rejectReason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedReason === reason 
                          ? 'bg-gradient-primary border-transparent' 
                          : 'border-gray-300 group-hover:border-primary-from'
                      }`}>
                        {selectedReason === reason && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{reason}</span>
                  </label>
                ))}
              </div>

              {/* Custom reason input */}
              {selectedReason === 'Custom reason' && (
                <div className="mt-4">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-from focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Enter your custom reason..."
                    required
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 py-3 px-6 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedReason || (selectedReason === 'Custom reason' && !rejectReason.trim())}
                  className="flex-1 bg-gradient-primary py-3 px-6 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="booking"
        data={{
          id: booking?.id || 'Unknown',
          client: booking?.client || 'Unknown Client',
          action: 'rejected'
        }}
        showSecondaryAction={true}
        secondaryActionText="View Bookings"
        onSecondaryAction={() => {
          handleSuccessModalClose();
          console.log('Navigate to bookings page');
        }}
      />
    </>
  );
};

export default RejectModal;
