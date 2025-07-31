import React from 'react';

const ToggleSwitch = ({ 
  checked = false, 
  onChange, 
  disabled = false, 
  className = '',
  label,
  ...props 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <span className="text-sm md:text-base font-medium text-gray-700 mr-3">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
          ${checked ? 'bg-pink-600' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        {...props}
      >
        <span
          className={`
            inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0.5'}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
