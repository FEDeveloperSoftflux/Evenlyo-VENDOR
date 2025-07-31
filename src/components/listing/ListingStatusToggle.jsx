import React from 'react';

const ListingStatusToggle = ({ isLive, onToggle, id }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Status Indicator Dot */}
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        isLive ? 'border-primary-mid bg-primary-mid' : 'border-red-500 bg-red-500'
      }`}>
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={() => onToggle(id)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-mid focus:ring-offset-2 ${
          isLive 
            ? 'bg-gradient-to-r from-primary-from to-primary-to' 
            : 'bg-gray-200'
        }`}
        aria-label={`Toggle status to ${isLive ? 'blocked' : 'live'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
            isLive ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>

      {/* Status Text Badge */}
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isLive 
          ? 'bg-green-100 text-green-600' 
          : 'bg-red-100 text-red-600'
      }`}>
        {isLive ? 'Live' : 'Blocked'}
      </span>
    </div>
  );
};

export default ListingStatusToggle;
