import React from 'react';
import Avatar from '../ui/Avatar';

const ChatMessage = ({ 
  message, 
  isOwn = false, 
  showAvatar = true,
  className = '' 
}) => {
  const { id, text, timestamp, sender } = message;

  const formatTime = (timestamp) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hrs ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className={`flex gap-2 sm:gap-3 mb-3 sm:mb-4 ${isOwn ? 'justify-end' : 'justify-start'} ${className}`}>
      {/* Avatar for incoming messages */}
      {!isOwn && showAvatar && (
        <Avatar 
          src={sender?.avatar} 
          name={sender?.name} 
          size="sm" 
          className="mt-1 flex-shrink-0"
        />
      )}

      <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender name for incoming messages */}
        {!isOwn && sender?.name && (
          <span className="text-xs text-gray-500 mb-1 px-1">
            {sender.name}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={`
            px-3 sm:px-4 py-2 rounded-xl max-w-full break-words
            ${isOwn 
              ? 'bg-gradient-to-b from-[#FF295D] via-[#E31B95] to-[#C817AE] text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-900 rounded-tl-none'
            }
          `}
        >
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-400 mt-1 px-1">
          {formatTime(timestamp)}
        </span>
      </div>

      {/* Spacer for outgoing messages to align with incoming */}
      {isOwn && showAvatar && (
        <div className="w-8 flex-shrink-0" />
      )}
    </div>
  );
};

export default ChatMessage;
