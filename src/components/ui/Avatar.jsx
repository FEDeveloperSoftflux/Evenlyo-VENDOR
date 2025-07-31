import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  name, 
  size = 'md', 
  className = '',
  showBorder = false 
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const borderClass = showBorder ? 'ring-2 ring-white shadow-md' : '';

  return (
    <div 
      className={`${sizes[size]} ${borderClass} ${className} rounded-full overflow-hidden flex items-center justify-center bg-gradient-primary text-white font-medium flex-shrink-0`}
      aria-label={alt || name}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <span 
        className={`${src ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
        style={{ display: src ? 'none' : 'flex' }}
      >
        {getInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;
