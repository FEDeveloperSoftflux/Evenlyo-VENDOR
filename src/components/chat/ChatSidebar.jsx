import React, { useState, useMemo } from 'react';
import SearchInput from '../ui/SearchInput';
import ChatListItem from './ChatListItem';

const ChatSidebar = ({ 
  chats = [], 
  activeChat, 
  onChatSelect,
  className = '',
  isMobile = false,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    
    return chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white ${isMobile ? '' : '/95 backdrop-blur-sm shadow-card border border-white/20 rounded-2xl overflow-hidden'} ${className}`}>
      {/* Mobile Header with Close Button */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            Messages
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close chat sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
      
      {/* Header */}
      <div className={`p-3 sm:p-4 ${isMobile ? 'border-b border-gray-200' : 'border-b border-gray-200'}`}>
        {!isMobile && (
          <>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              All Chat with client
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Can talk with client
            </p>
          </>
        )}
        
        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="w-full"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={activeChat?.id === chat.id}
                onClick={onChatSelect}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-gray-400 mb-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              {searchQuery ? 'No chats found' : 'No chats available'}
            </p>
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-1">
                Try searching with different keywords
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
