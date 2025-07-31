import React from 'react';
import RadioGroup from '../ui/RadioGroup';
import Input from '../ui/Input';

const ConditionRatingItem = ({ 
  itemName, 
  condition, 
  securityFee, 
  onConditionChange, 
  onFeeChange 
}) => {
  const conditionOptions = [
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'claim', label: 'Claim' }
  ];

  const showFeeInput = condition === 'fair';

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl shadow-card">
      <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base font-sans">
        {itemName}
      </h4>
      
      {/* Condition Rating */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 font-sans">
          Physical Condition
        </label>
        <RadioGroup
          value={condition}
          onChange={onConditionChange}
          options={conditionOptions}
          name={`condition-${itemName.replace(/\s+/g, '-').toLowerCase()}`}
          className="space-y-1.5 sm:space-y-2"
        />
      </div>

      {/* Security Fee Input (only shown for Fair) */}
      {showFeeInput && (
        <div className="mt-3">
          <Input
            label="Add security fee ($)"
            type="number"
            placeholder="Enter amount"
            value={securityFee || ''}
            onChange={(e) => onFeeChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ConditionRatingItem;
