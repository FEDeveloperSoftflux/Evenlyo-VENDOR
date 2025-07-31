import React from 'react';
import { Calendar, Clock, User, Eye } from 'lucide-react';
import Button from '../ui/Button';

const NotificationCard = ({ notification, onViewBooking }) => {
  const getTimeElapsed = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return notificationTime.toLocaleDateString();
  };

  const isUnread = notification.status.toLowerCase() === 'unread';

  return (
    <div className={`p-6 hover:bg-gray-50/80 transition-all duration-200 border-l-4 ${
      isUnread ? 'border-l-pink-500 bg-pink-50/20' : 'border-l-transparent'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                  {notification.title}
                </h3>
                {isUnread && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-600">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {notification.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span className="font-medium">
                  {getTimeElapsed(notification.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Action */}
        <div className="flex-shrink-0">
          <Button
            variant="gradient"
            size="sm"
            onClick={() => onViewBooking(notification)}
            className="bg-gradient-to-r from-[#FF295D] via-[#E31B95] to-[#C817AE] text-white hover:shadow-lg hover:scale-105 px-6 py-2.5 text-sm font-semibold transition-all duration-200 shadow-md rounded-xl"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
