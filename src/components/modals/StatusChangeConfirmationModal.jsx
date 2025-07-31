import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const StatusChangeConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentStatus, 
  newStatus, 
  orderInfo 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Confirm Status Change</h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to change the status for order <span className="font-semibold text-gray-900">#{orderInfo?.id}</span>?
            </p>
            
            <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                <Badge status={currentStatus?.toLowerCase()}>
                  {currentStatus?.charAt(0).toUpperCase() + currentStatus?.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">New Status</p>
                <Badge status={newStatus?.toLowerCase()}>
                  {newStatus?.charAt(0).toUpperCase() + newStatus?.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Important Notice</p>
                <p className="text-sm text-yellow-700 mt-1">
                  This action will update the order status and may trigger notifications to the customer.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              className="flex-1"
            >
              Confirm Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeConfirmationModal;
