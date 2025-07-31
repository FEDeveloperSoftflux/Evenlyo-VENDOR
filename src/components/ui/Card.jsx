import React from 'react';

const Card = ({ children, className = '', gradient = false, ...props }) => {
  const baseClasses = 'rounded-3xl shadow-card transition-all duration-200';
  const backgroundClasses = gradient 
    ? 'bg-gradient-primary text-white' 
    : 'bg-white';
  
  return (
    <div 
      className={`${baseClasses} ${backgroundClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
