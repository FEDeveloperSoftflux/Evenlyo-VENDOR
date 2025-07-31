import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import SuccessModal from '../modals/SuccessModal';

const StockInModal = ({ item, isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity('');
      // Trap focus in modal
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity && parseInt(quantity) > 0) {
      onConfirm(quantity);
      // Close main modal and show success modal
      onClose();
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setQuantity('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
      <div className="bg-white rounded-2xl shadow-card max-w-lg w-full mx-auto transform transition-all duration-200 scale-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            Stock In Item
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-mid"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Item Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Item Details</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div>
                <span className="text-lg font-semibold text-gray-900">Entertainment & Attractions</span>
              </div>
              <div className="text-primary-mid font-medium">
                ITM001
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Stock:</span>
                <span className="text-2xl font-bold text-gray-900">{item.inStockQuantity}</span>
              </div>
            </div>
          </div>

          {/* Quantity Input Section */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity to Add</h3>
              <div className="relative">
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <Button 
                type="button"
                variant="secondary" 
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="gradient" 
                className="w-full sm:w-auto"
                disabled={!quantity || parseInt(quantity) <= 0}
              >
                Add Stock
              </Button>
            </div>
          </form>
        </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="stock"
        data={{
          itemName: item?.name || "Entertainment & Attractions",
          quantity: quantity,
          totalStock: item?.inStockQuantity ? (parseInt(item.inStockQuantity) + parseInt(quantity || 0)).toString() : quantity
        }}
        showSecondaryAction={true}
        secondaryActionText="View Inventory"
        onSecondaryAction={() => {
          handleSuccessModalClose();
          console.log('Navigate to inventory page');
        }}
      />
    </>
  );
};

export default StockInModal;

