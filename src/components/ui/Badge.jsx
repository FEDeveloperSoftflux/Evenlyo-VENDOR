import React from 'react';
import { getBadgeStyle } from '../../assets/styleguide/badges';

const Badge = ({ status, children, className = '' }) => {
  const badgeClasses = getBadgeStyle(status);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${badgeClasses} ${className}`}>
      {children || status}
    </span>
  );
};

export default Badge;
