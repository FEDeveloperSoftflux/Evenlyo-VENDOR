import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import ConditionRatingItem from './ConditionRatingItem';
import ClaimDrawer from './ClaimDrawer';
import SuccessModal from '../modals/SuccessModal';

const PickedUpModal = ({ isOpen, onClose, items, onStatusUpdate }) => {
  const [itemConditions, setItemConditions] = useState(
    items.reduce((acc, item) => {
      acc[item.name] = { condition: 'good', securityFee: '' };
      return acc;
    }, {})
  );

  const [isClaimDrawerOpen, setClaimDrawerOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConditionChange = (itemName, newCondition) => {
    setItemConditions((prevState) => ({
      ...prevState,
      [itemName]: {
        ...prevState[itemName],
        condition: newCondition,
      },
    }));
  };

  const handleFeeChange = (itemName, newFee) => {
    setItemConditions((prevState) => ({
      ...prevState,
      [itemName]: {
        ...prevState[itemName],
        securityFee: newFee,
      },
    }));
  };

  const openClaimDrawer = () => {
    setClaimDrawerOpen(true);
  };

  const closeClaimDrawer = () => {
    setClaimDrawerOpen(false);
  };

  const handleClaimSubmit = (claimedFees) => {
    // Update item conditions with claimed fees
    const updatedConditions = { ...itemConditions };
    Object.keys(claimedFees).forEach(itemName => {
      if (updatedConditions[itemName]) {
        updatedConditions[itemName].securityFee = claimedFees[itemName];
      }
    });
    setItemConditions(updatedConditions);
    
    // Update status to pickedup
    if (onStatusUpdate) {
      onStatusUpdate('pickedup');
    }
    
    // Close drawer and modal, show success
    setClaimDrawerOpen(false);
    onClose();
    setShowSuccessModal(true);
  };

  const handleDirectUpdate = () => {
    // For when all items are Good - direct update
    if (onStatusUpdate) {
      onStatusUpdate('pickedup');
    }
    
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // This would typically trigger status update in parent
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Rate the Condition of Booked Items"
        size="2xl"
        className="mx-4 sm:mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-1">
          {items.map((item) => (
            <ConditionRatingItem
              key={item.id}
              itemName={item.name}
              condition={itemConditions[item.name].condition}
              securityFee={itemConditions[item.name].securityFee}
              onConditionChange={(condition) =>
                handleConditionChange(item.name, condition)
              }
              onFeeChange={(fee) => handleFeeChange(item.name, fee)}
            />
          ))}
        </div>

        <div className="mt-4 sm:mt-6 flex justify-end px-1">
          {(() => {
            const hasClaimItems = Object.values(itemConditions).some(condition => condition.condition === 'claim');
            const allItemsRated = Object.values(itemConditions).every(condition => condition.condition !== '');
            
            if (hasClaimItems) {
              return (
                <Button 
                  variant="gradient" 
                  size="md" 
                  onClick={openClaimDrawer}
                  disabled={!allItemsRated}
                  className="bg-gradient-primary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-2xl font-semibold font-sans text-sm sm:text-base shadow-card hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <span className="hidden xs:inline">Claim</span>
                  <span className="xs:hidden">Claim</span>
                </Button>
              );
            }
            
            return (
              <Button 
                variant="gradient" 
                size="md" 
                onClick={handleDirectUpdate}
                disabled={!allItemsRated}
                className="bg-gradient-primary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-2xl font-semibold font-sans text-sm sm:text-base shadow-card hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <span className="hidden sm:inline">Update Status to PickedUp</span>
                <span className="sm:hidden">Update to PickedUp</span>
              </Button>
            );
          })()
          }
        </div>
      </Modal>

      <ClaimDrawer
        isOpen={isClaimDrawerOpen}
        onClose={closeClaimDrawer}
        items={items.filter(item => itemConditions[item.name]?.condition === 'claim')}
        itemConditions={itemConditions}
        onSubmit={handleClaimSubmit}
      />
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        type="pickup"
        data={{
          id: "TRK007",
          client: "Event Organizer",
          itemCount: items.length
        }}
      />
    </>
  );
};

export default PickedUpModal;

