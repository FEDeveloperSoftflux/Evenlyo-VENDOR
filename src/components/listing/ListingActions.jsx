import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ListingActions = ({ listing, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        className="p-1.5 text-gray-400 hover:text-primary-mid transition-colors rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-mid focus:ring-offset-1"
        onClick={() => onEdit(listing)}
        aria-label={`Edit listing: ${listing.title}`}
        title="Edit listing"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button 
        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        onClick={() => onDelete(listing)}
        aria-label={`Delete listing: ${listing.title}`}
        title="Delete listing"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ListingActions;
