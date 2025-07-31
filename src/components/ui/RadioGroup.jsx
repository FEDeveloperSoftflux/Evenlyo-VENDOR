import React from 'react';

const RadioGroup = ({ value, onChange, options, name, className = '' }) => {
  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 border-gray-300 focus:ring-pink-500 focus:ring-2 focus:ring-offset-0"
          />
          <span className="text-xs sm:text-sm font-medium text-gray-700 font-sans select-none">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
