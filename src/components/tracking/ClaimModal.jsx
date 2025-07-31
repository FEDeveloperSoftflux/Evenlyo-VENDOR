import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SuccessModal from '../modals/SuccessModal';

const ClaimModal = ({ isOpen, onClose, items, itemConditions }) => {
  const [localFees, setLocalFees] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  // Filter items with Fair or Poor condition
  const itemsWithFees = items.filter(
    (item) => itemConditions[item.name].condition === 'fair' || itemConditions[item.name].condition === 'poor'
  );

  const handleFeeChange = (itemName, fee) => {
    setLocalFees((prev) => ({
      ...prev,
      [itemName]: fee,
    }));
  };

  const getFeeValue = (itemName) => {
    return localFees[itemName] !== undefined ? localFees[itemName] : itemConditions[itemName].securityFee;
  };

  const handleSubmitClaim = () => {
    // Close claim modal and show success modal
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // This would typically trigger a status update in the parent component
  };

  return (
    <>
      <div className="fixed inset-0 z-60 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Modal with glassmorphic design */}
          <div className="inline-block align-bottom bg-white/30 backdrop-blur-xl rounded-2xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Review Security Charges
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {itemsWithFees.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No items require security fees.</p>
                <p className="text-sm text-gray-500 mt-2">All items are in good condition.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {itemsWithFees.map((item) => (
                  <div key={item.id} className="bg-white/50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          itemConditions[item.name].condition === 'fair' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {itemConditions[item.name].condition.charAt(0).toUpperCase() + 
                           itemConditions[item.name].condition.slice(1)} Condition
                        </span>
                      </div>
                    </div>

                    <Input
                      label="Security Fee"
                      type="number"
                      placeholder="Enter amount"
                      value={getFeeValue(item.name)}
                      onChange={(e) => handleFeeChange(item.name, e.target.value)}
                      className="bg-white/80 border border-white/30"
                    />
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="gradient"
                    size="md"
                    onClick={handleSubmitClaim}
                    className="flex-1"
                  >
                    Submit Claim
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        type="pickup"
        data={{
          id: "TRK001",
          client: "Event Organizer",
          itemCount: itemsWithFees.length
        }}
      />
    </>
  );
};

export default ClaimModal;
