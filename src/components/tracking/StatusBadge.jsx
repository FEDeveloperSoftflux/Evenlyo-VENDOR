import React from 'react';
import Badge from '../ui/Badge';

const StatusBadge = ({ status, onClick, children, className = '' }) => {
  const isClickable = status === 'pickedup';
  
  if (isClickable) {
    return (
      <button 
        onClick={onClick}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      >
        <Badge status={status}>
          {children || status}
        </Badge>
      </button>
    );
  }

  return (
    <Badge status={status} className={className}>
      {children || status}
    </Badge>
  );
};

export default StatusBadge;
