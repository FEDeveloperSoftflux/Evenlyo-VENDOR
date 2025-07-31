import React from 'react';

const IconButton = ({ 
  children, 
  size = 'md', 
  variant = 'ghost',
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    primary: 'bg-gradient-to-b from-[#FF295D] to-[#C817AE] text-white hover:opacity-90 focus:ring-pink-500 shadow-md',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
  };
  
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
