import React from "react";
import { X, Clock, Calendar as CalendarIcon, MapPin, User } from "lucide-react";
import { getBadgeStyle } from "../../assets/styleguide/badges";

const BookingDetailDrawer = ({ isOpen, onClose, booking, onAccept, onReject }) => {
  if (!isOpen || !booking) return null;

  // Helper function to get customer initials
  const getInitials = (name) => {
    if (!name) return 'C';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '2024-06-27';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Booking ID and Status */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {booking.bookingId || `Booking #${booking.id}`}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {booking.service || 'Photography Session'}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeStyle(
                  booking.status
                )}`}>
                {booking.title || booking.status}
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(booking.date)}
                </p>
                <p className="text-sm text-gray-500">{booking.time || '10:00'}</p>
              </div>
            </div>

            {/* Location */}
            {booking.location && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Location
                  </p>
                  <p className="text-sm text-gray-500">{booking.location}</p>
                </div>
              </div>
            )}

            {/* Tracking ID */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Booking ID
                </p>
                <p className="text-sm text-gray-500">{booking.bookingId || `TRK${booking.id?.toString().padStart(3, '0')}`}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 overflow-y-auto">
            {/* Customer Details */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Customer Details
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{getInitials(booking.customer)}</span>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">{booking.customer || 'Customer Name'}</h5>
                  <p className="text-sm text-gray-500">Customer ID: {booking.bookingId || `USR${booking.id?.toString().padStart(3, '0')}`}</p>
                </div>
              </div>
            </div>

            {/* Booking Description */}
            {booking.description && (
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Description
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{booking.description}</p>
                </div>
              </div>
            )}

            {/* Seller Details */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Seller Details
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">
                    Tech Solutions Ltd
                  </h5>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 p-6 pt-4 space-y-3">
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 px-4 border border-pink-500 text-pink-500 rounded-2xl font-medium hover:bg-pink-50 transition-colors"
                onClick={onAccept}
              >
                Accept
              </button>
              <button
                className="flex-1 py-3 px-4 bg-gradient-primary text-white rounded-2xl font-medium hover:opacity-90 transition-opacity"
                onClick={onReject}
              >
                Reject
              </button>
            </div>
            <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors">
              Track Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailDrawer;
