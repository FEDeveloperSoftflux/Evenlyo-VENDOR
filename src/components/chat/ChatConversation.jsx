import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Share2, Trash2, UserX, Flag } from 'lucide-react';
import Avatar from '../ui/Avatar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Button from '../ui/Button';

const ChatConversation = ({ 
  chat, 
  messages = [], 
  onSendMessage,
  currentUserId,
  className = '' 
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptionsMenu && !event.target.closest('.options-menu')) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showOptionsMenu]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toISOString(),
      sender: {
        id: currentUserId,
        name: 'You'
      },
      isOwn: true
    };

    onSendMessage?.(newMessage);
  };

  if (!chat) {
    return null;
  }

  const { name, avatar, lastMessage } = chat;

  const optionsMenuItems = [
    { 
      label: 'Share Chat', 
      action: () => console.log('Share Chat'),
      icon: Share2,
      color: 'text-gray-700'
    },
    { 
      label: 'Delete Chat', 
      action: () => console.log('Delete Chat'),
      icon: Trash2,
      color: 'text-primary-mid'
    },
    { 
      label: 'Block Client', 
      action: () => console.log('Block Client'),
      icon: UserX,
      color: 'text-gray-700'
    },
    { 
      label: 'Report Client', 
      action: () => console.log('Report Client'),
      icon: Flag,
      color: 'text-primary-mid'
    },
  ];

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar 
            src={avatar} 
            name={name} 
            size="md"
            showBorder={false}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {lastMessage}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Options Menu */}
          <div className="relative options-menu">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="!p-2"
              aria-label="Chat options"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>

            {showOptionsMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 py-2 z-20">
                {optionsMenuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setShowOptionsMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <IconComponent className={`w-4 h-4 ${item.color}`} />
                      <span className={item.color}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
      >
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1];
              const showAvatar = !prevMessage || prevMessage.sender?.id !== message.sender?.id;
              
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwn={message.sender?.id === currentUserId}
                  showAvatar={showAvatar}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Avatar 
                src={avatar} 
                name={name} 
                size="lg"
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Start chatting with {name}
            </h4>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm px-4">
              Send a message to begin your conversation.
            </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
        <ChatInput
          onSendMessage={handleSendMessage}
          recipientName={name}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default ChatConversation;
