import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import SuccessModal from './SuccessModal';

const AcceptedModal = ({ isOpen, onClose, booking }) => {
  return (
    <SuccessModal
      isOpen={isOpen}
      onClose={onClose}
      type="booking"
      data={{
        id: booking?.id || 'Unknown',
        client: booking?.client || 'Unknown Client',
        action: 'accepted'
      }}
      showSecondaryAction={true}
      secondaryActionText="View Bookings"
      onSecondaryAction={() => {
        onClose();
        console.log('Navigate to bookings page');
      }}
    />
  );
};

export default AcceptedModal;
