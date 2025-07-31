import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownFilter = ({ label, options, selectedValue, onSelectionChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onSelectionChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue) || options[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-3 focus:ring-pink-500/20 focus:border-pink-400 transition-all duration-300 shadow-sm hover:shadow-md group"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-gray-500 text-xs font-medium">{label}:</span>
          <span className="text-gray-900 font-medium">{selectedOption.label}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-300 ${
            isOpen ? 'transform rotate-180 text-pink-500' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop overlay for mobile */}
          <div className="fixed inset-0 z-40 bg-black/5 lg:hidden" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 z-50 w-52 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-5 py-3 text-left text-sm transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 ${
                    index === 0 ? 'rounded-t-2xl' : ''
                  } ${
                    index === options.length - 1 ? 'rounded-b-2xl' : ''
                  } ${
                    selectedValue === option.value
                      ? 'text-pink-600 bg-pink-50 font-semibold hover:bg-pink-100'
                      : 'text-gray-700 font-medium hover:text-gray-900'
                  }`} 
                >
                  <span className="flex items-center justify-between">
                    {option.label}
                    {selectedValue === option.value && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownFilter;
