import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  disabled = false,
  required = false,
  showEditIcon = false,
  ...props 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(disabled || showEditIcon);

  const handleEditClick = () => {
    if (showEditIcon) {
      setIsEditing(!isEditing);
      setInputDisabled(!inputDisabled);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={inputDisabled}
          required={required}
          className={`w-full px-4 py-3 ${showEditIcon ? 'pr-12' : ''} bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
          {...props}
        />
        {showEditIcon && (
          <button
            type="button"
            onClick={handleEditClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
            aria-label={isEditing ? 'Stop editing' : 'Edit field'}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
