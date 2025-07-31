import React from 'react';

const StatusToggle = ({ 
  isActive = false, 
  onToggle, 
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-4',
    md: 'w-10 h-5',
    lg: 'w-12 h-6'
  };

  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  const translateValues = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-6'
  };

  const thumbPositions = {
    sm: '14px',
    md: '18px', 
    lg: '22px'
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      disabled={disabled}
      onClick={onToggle}
      className={`
        relative inline-flex items-center ${sizes[size]} rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 p-0.5
        ${isActive 
          ? 'bg-gradient-to-r from-pink-500 to-pink-600' 
          : 'bg-gray-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      <span className="sr-only">{isActive ? 'Active' : 'Inactive'}</span>
      <span
        className={`
          ${thumbSizes[size]} bg-white rounded-full shadow-lg transform transition-transform duration-200 ease-in-out
        `}
        style={{
          transform: isActive ? `translateX(${thumbPositions[size]})` : 'translateX(0px)'
        }}
      />
    </button>
  );
};

export default StatusToggle;
