import React from 'react';
import { X } from 'lucide-react';
import Badge from '../ui/Badge';

const CategoryBadgeList = ({ categories = [], onRemoveCategory }) => {
  if (categories.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No categories selected yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-pink-100 text-pink-600 rounded-full text-xs px-3 py-2 inline-flex items-center justify-between"
        >
          <span className="truncate mr-2">{category}</span>
          <button
            onClick={() => onRemoveCategory(index)}
            className="flex-shrink-0 ml-1 text-pink-400 hover:text-pink-600 transition-colors"
            aria-label={`Remove ${category} category`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryBadgeList;
