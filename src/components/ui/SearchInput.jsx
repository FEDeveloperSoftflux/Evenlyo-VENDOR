import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ 
  value = '', 
  onChange, 
  placeholder = 'Search...', 
  className = '',
  ...props 
}) => {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors"
        aria-label={placeholder}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
