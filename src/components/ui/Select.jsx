import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  className = '', 
  disabled = false,
  required = false,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-3 focus:ring-pink-500/20 focus:border-pink-400 focus:bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-50 disabled:hover:border-gray-200 disabled:hover:shadow-none ${className}`}
          {...props}
        >
          <option value="" disabled className="text-gray-500">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option 
              key={index} 
              value={typeof option === 'object' ? option.value : option}
              className="py-2 text-gray-900 font-medium hover:bg-gray-100"
            >
              {typeof option === 'object' ? option.label : option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default Select;
