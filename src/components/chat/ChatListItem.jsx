import React from "react";
import Avatar from "../ui/Avatar";
import InboxChatIcon from "../../assets/icons/inbox-chat.svg"; // Adjust path if needed

const ChatListItem = ({ chat, isActive = false, onClick, className = "" }) => {
  const { id, name, lastMessage, timestamp, avatar, unread } = chat;

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = Math.floor((now - messageTime) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
      return diffInMinutes < 1 ? "now" : `${diffInMinutes} mins ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div
      className={`
        flex items-start gap-2 sm:gap-3 p-2 sm:p-3 cursor-pointer transition-all duration-200
        hover:bg-gray-50 border-b border-gray-100 last:border-b-0
        ${isActive ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
        ${className}
      `}
      onClick={() => onClick?.(chat)}
      role="button"
      tabIndex={0}
      aria-label={`Chat with ${name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(chat);
        }
      }}
    >
      <Avatar src={avatar} name={name} size="md" showBorder={isActive} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
              {name}
            </h4>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-1 sm:ml-2 flex items-center gap-1">
            {formatTime(timestamp)}
            <img
              src={InboxChatIcon}
              alt="Inbox Chat"
              className="w-4 h-4 ml-1"
            />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1">
            <p
              className="text-xs sm:text-sm text-gray-500 line-clamp-1 pr-6"
              style={{ paddingRight: 22 }} // extra space for avatar
            >
              {lastMessage}
            </p>
            {/* Show small circle avatar at bottom right if message is read */}
            {unread === 0 && (
              <span className="absolute bottom-0 right-0">
                <Avatar
                  src={avatar}
                  name={name}
                  size="xs"
                  className="border border-white shadow"
                  style={{ width: 14, height: 14 }}
                />
              </span>
            )}
          </div>
          {unread > 0 && (
            <span className="ml-2 bg-gradient-primary text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center flex-shrink-0">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
