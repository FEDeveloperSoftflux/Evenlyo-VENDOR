import React from 'react';
import startConvoIcon from '../../assets/icons/start-convo-icon.svg';

const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8">
      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 flex items-center justify-center bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl border border-purple-100/50">
        <img 
          src={startConvoIcon} 
          alt="Start conversation" 
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        Select a conversation
      </h3>
      <p className="text-gray-500 text-center max-w-md leading-relaxed text-base sm:text-lg px-4">
        Choose a chat from the sidebar to start messaging
      </p>
    </div>
  );
};

export default ChatEmptyState;
