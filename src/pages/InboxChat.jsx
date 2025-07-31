import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatConversation from '../components/chat/ChatConversation';
import ChatEmptyState from '../components/chat/ChatEmptyState';
import jaydeepImage from '../assets/images/jaydeep.png';

// Mock data for demonstration
const mockChats = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Thanks for the quick response! I wanted to follow up on our previous discussion about the project timeline.',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
    avatar: jaydeepImage,
    unread: 2
  },
  {
    id: '2',
    name: 'Michael Chen',
    lastMessage: 'That sounds great! When can we schedule the next meeting?',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    avatar: jaydeepImage,
    unread: 0
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    lastMessage: 'Hello! Of course, I\'ve been working on the revised timeline. Let me share the updated schedule with you.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    avatar: jaydeepImage,
    unread: 1
  },
  {
    id: '4',
    name: 'David Park',
    lastMessage: 'Perfect! I\'ll send over the documents by end of day.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    avatar: jaydeepImage,
    unread: 0
  },
  {
    id: '5',
    name: 'Lisa Wang',
    lastMessage: 'The proposal looks fantastic. Looking forward to moving forward with this.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    avatar: jaydeepImage,
    unread: 0
  }
];

const mockMessages = {
  '1': [
    {
      id: 'm1',
      text: 'Hi! I wanted to follow up on our previous discussion about the project timeline.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      sender: { id: '1', name: 'Sarah Johnson', avatar: jaydeepImage }
    },
    {
      id: 'm2',
      text: 'Hello! Of course, I\'ve been working on the revised timeline. Let me share the updated schedule with you.',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      sender: { id: 'current-user', name: 'You' }
    },
    {
      id: 'm3',
      text: 'That sounds great! When can we schedule the next meeting?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      sender: { id: '1', name: 'Sarah Johnson', avatar: jaydeepImage }
    }
  ],
  '2': [
    {
      id: 'm4',
      text: 'Thanks for your patience. I\'ll have the report ready by tomorrow.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      sender: { id: 'current-user', name: 'You' }
    },
    {
      id: 'm5',
      text: 'That sounds great! When can we schedule the next meeting?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      sender: { id: '2', name: 'Michael Chen', avatar: jaydeepImage }
    }
  ]
};

const InboxChat = ({ onNavigate }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [chats, setChats] = useState(mockChats);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const currentUserId = 'current-user';

  // Check if mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load mock messages
  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    
    // Mark chat as read
    setChats(prevChats => 
      prevChats.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );

    // On mobile, hide sidebar when chat is selected
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleSendMessage = (message) => {
    if (!activeChat) return;

    const chatId = activeChat.id;
    
    // Add message to messages
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), message]
    }));

    // Update last message in chat list
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: message.text,
              timestamp: message.timestamp
            }
          : chat
      )
    );
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
    if (isMobile) {
      setActiveChat(null);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* App Sidebar */}
      <Sidebar activeItem="Inbox / Chat" onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="John Doe"
          userRole="Vendor"
          currentModule="Inbox / Chat"
        />

        {/* Chat Content */}
        <main className={`flex-1 overflow-hidden bg-background ${!isMobile ? 'p-4' : ''}`}>
          <div className={`h-full flex ${!isMobile ? 'gap-4' : ''}`}>
            {/* Mobile Header with Menu */}
            {isMobile && !showSidebar && (
              <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-3 sm:p-4 z-30">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBackToSidebar}
                    className="flex items-center gap-2 text-blue-600 font-medium text-sm sm:text-base"
                    aria-label="Open chat list"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {activeChat ? activeChat.name : 'Messages'}
                  </button>
                </div>
              </div>
            )}

            {/* Chat Sidebar */}
            <div className={`
              ${isMobile 
                ? `fixed inset-0 z-50 w-full bg-white transform transition-transform duration-300 ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                  } shadow-xl`
                : 'w-80 flex-shrink-0'
              }
            `}>
              <ChatSidebar
                chats={chats}
                activeChat={activeChat}
                onChatSelect={handleChatSelect}
                isMobile={isMobile}
                onClose={() => setShowSidebar(false)}
                className={`h-full ${!isMobile ? 'rounded-2xl overflow-hidden' : ''}`}
              />
            </div>

            {/* Main Chat Area */}
            <div className={`
              flex-1 flex flex-col overflow-hidden
              ${!isMobile ? 'rounded-2xl bg-white/95 backdrop-blur-sm shadow-card border border-white/20' : ''}
              ${isMobile && showSidebar ? 'hidden' : 'flex'}
            `}>
              {activeChat ? (
                <ChatConversation
                  chat={activeChat}
                  messages={messages[activeChat.id] || []}
                  onSendMessage={handleSendMessage}
                  currentUserId={currentUserId}
                  className={isMobile && !showSidebar ? 'pt-16' : ''}
                />
              ) : (
                <ChatEmptyState />
              )}
            </div>

            {/* Mobile Chat List FAB */}
            {isMobile && !showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                aria-label="Open chat list"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* Mobile Overlay */}
            {isMobile && showSidebar && (
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={() => setShowSidebar(false)}
                aria-hidden="true"
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InboxChat;
