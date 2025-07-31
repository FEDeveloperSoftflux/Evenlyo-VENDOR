import React, { useEffect } from "react";
import {
  X,
  Calendar,
  User,
  Clock,
  MapPin,
  DollarSign,
  Info,
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const BookingDetailsModal = ({ isOpen, onClose, booking, onMarkAsRead }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMarkAsRead = () => {
    onMarkAsRead(booking.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with Primary Background */}
        <div className="bg-gradient-primary px-6 py-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content */}
          <div className="pr-12">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-white mb-1"
            >
              Booking Details
            </h2>
            <p className="text-white/80 text-sm">
              Booking ID:{" "}
              <span className="font-medium text-white">#{booking.id}</span>
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Status Badge */}
          <div className="mb-6 flex justify-end">
            <Badge status={booking.status.toLowerCase().replace(" ", "-")}>
              {booking.status}
            </Badge>
          </div>

          {/* Booking Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-600" />
                Client Information
              </h3>
              <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Client Name</p>
                  <p className="font-medium text-gray-900">
                    {booking.clientName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">
                    {booking.clientEmail}
                  </p>
                </div>
                {booking.clientPhone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {booking.clientPhone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-600" />
                Booking Details
              </h3>
              <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium text-gray-900">{booking.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {booking.dateTime}
                  </p>
                </div>
                {booking.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {booking.location}
                    </p>
                  </div>
                )}
                {booking.price && (
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      {booking.price}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {booking.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-pink-600" />
                Additional Notes
              </h3>
              <div className="bg-gray-50/80 rounded-2xl p-4">
                <p className="text-gray-700 leading-relaxed">{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
            {booking.status.toLowerCase() === "unread" && (
              <Button
                variant="gradient"
                onClick={handleMarkAsRead}
                className="flex-1 sm:flex-none bg-gradient-primary text-white hover:shadow-lg transition-all duration-200"
              >
                Mark as Read
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none border-gray-800 text-gray-700 hover:bg-gray-50 bg-gray-200 transition-colors duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
