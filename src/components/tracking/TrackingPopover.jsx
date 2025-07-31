import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const TrackingPopover = ({ person, type, isVisible, onTrackClick }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute z-50 bg-white shadow-xl rounded-2xl p-4 w-72 sm:w-80 border border-gray-100 top-full left-0 mt-2 max-w-screen-sm">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={person.avatar}
          alt={person.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 text-sm truncate">
            {person.name}
          </h4>
          {person.id && (
            <p className="text-xs text-gray-500">ID: {person.id}</p>
          )}
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
            {type}
          </span>
        </div>
      </div>

      {/* Track Button */}
      <button
        onClick={() => {
          if (onTrackClick) {
            onTrackClick();
          } else if (window.trackingPopoverTrackHandler) {
            window.trackingPopoverTrackHandler();
          }
        }}
        className="w-full mb-3 px-4 py-2.5 bg-gradient-primary text-white text-sm font-medium rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Track Order
      </button>

      <div className="space-y-2 text-xs text-gray-600">
        {person.email && (
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3" />
            <span>{person.email}</span>
          </div>
        )}

        {person.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3" />
            <span>{person.phone}</span>
          </div>
        )}

        {person.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 h-3" />
            <span>{person.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPopover;
