import React, { useState } from 'react';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ClaimDrawer = ({ isOpen, onClose, items, itemConditions, onSubmit }) => {
  // Filter to show only items with 'claim' condition
  const claimItems = items.filter(item => itemConditions[item.name]?.condition === 'claim');
  
  const [claimedFees, setClaimedFees] = useState(
    claimItems.reduce((acc, item) => {
      acc[item.name] = itemConditions[item.name]?.securityFee || '';
      return acc;
    }, {})
  );

  const handleFeeChange = (itemName, fee) => {
    setClaimedFees((prev) => ({
      ...prev,
      [itemName]: fee,
    }));
  };

  const handleSubmit = () => {
    // Pass claimed fees back to parent component
    onSubmit(claimedFees);
  };

  const totalClaimedFees = Object.values(claimedFees).reduce((acc, fee) => acc + parseFloat(fee || 0), 0);

  if (!isOpen) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Claim Security Fees">
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          {claimItems.map((item) => (
            <div key={item.id} className="bg-gray-50 border rounded-2xl shadow-card p-3 sm:p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base font-sans">
                {item.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                Security Fee (Already Paid: $30)
              </p>
              <Input
                label="Current claimed fee"
                type="number"
                placeholder="Enter claim amount"
                value={claimedFees[item.name] || ''}
                onChange={(e) => handleFeeChange(item.name, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-2xl">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0">
            <span className="font-medium text-gray-900 text-sm sm:text-base font-sans">
              Total Claimed Fees:
            </span>
            <span className="text-lg sm:text-xl font-bold text-gray-900 font-sans">
              ${totalClaimedFees.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-4 sm:mt-6">
          <Button
            variant="gradient"
            size="md"
            onClick={handleSubmit}
            className="w-full bg-gradient-primary text-white py-3 px-4 sm:px-6 rounded-2xl font-semibold font-sans text-sm sm:text-base shadow-card hover:opacity-90 transition-opacity"
          >
            <span className="hidden xs:inline">Confirm and Update to PickedUp</span>
            <span className="xs:hidden">Confirm & Update</span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ClaimDrawer;

