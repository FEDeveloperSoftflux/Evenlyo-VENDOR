import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Drawer = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'w-full xs:w-[90vw] sm:w-[420px] md:w-[480px]',
  className = '' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Focus trap and ESC key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer panel */}
      <div className={`absolute inset-y-0 right-0 ${width} bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${className}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-sans pr-4">
                {title}
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
