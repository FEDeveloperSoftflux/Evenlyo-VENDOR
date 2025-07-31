import React from 'react';
import { Clock, User, Calendar, Edit, Trash2 } from 'lucide-react';

const EventPopover = ({ event, position }) => {
  if (!event) return null;

const getStatusColor = (status) => {
    const colors = {
      'New Order': 'bg-pink-100 text-pink-600 border border-pink-200',
      'Complete': 'bg-green-100 text-green-600 border border-green-200',
      'In Progress': 'bg-yellow-100 text-yellow-600 border border-yellow-200',
      'Reject': 'bg-red-100 text-red-600 border border-red-200',
      'new': 'bg-pink-100 text-pink-600 border border-pink-200',
      'complete': 'bg-green-100 text-green-600 border border-green-200',
      'in-progress': 'bg-yellow-100 text-yellow-600 border border-yellow-200',
      'rejected': 'bg-red-100 text-red-600 border border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  const getInitials = (name) => {
    if (!name) return 'PH';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Use actual event data for popover
  const eventData = {
    id: event.bookingId || event.id || '#TRK001',
    title: event.service || event.title || 'Photography Session',
    type: event.service || 'Photography',
    time: event.time || '9:30 AM',
    location: event.location || 'Studio Location',
    customer: event.customer || 'Customer Name',
    status: event.title || event.status || 'Complete',
    description: event.description || 'Photography session'
  };

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x - 150,
        top: position.y - 10,
        transform: 'translateY(-100%)',
      }}
    >
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 w-80 relative">
        {/* Triangle pointer */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        </div>

        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{getInitials(eventData.customer)}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{eventData.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(eventData.status)}`}>
                  {eventData.status}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{eventData.time}</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="truncate">{eventData.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Customer: {eventData.customer}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Booking ID: {eventData.id}</span>
            </div>
            
            {eventData.description && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">{eventData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopover;
