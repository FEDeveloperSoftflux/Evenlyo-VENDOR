import React from 'react';
import FlowbiteCalendar from './FlowbiteCalendar';

const BookingCalendarStyled = ({ viewBy, onBookingClick, statusFilter, deliveryFilter }) => {
  const handleBookingClick = (booking) => {
    if (onBookingClick) {
      onBookingClick(booking);
    } else {
      console.log('Booking clicked:', booking);
    }
  };

  return (
    <FlowbiteCalendar
      onBookingClick={handleBookingClick}
      statusFilter={statusFilter || "All Status"}
      deliveryFilter={deliveryFilter || "All Delivery Status"}
      viewBy={viewBy || "Month"}
    />
  );
};

export default BookingCalendarStyled;
