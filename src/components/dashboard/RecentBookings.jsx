import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const RecentBookings = () => {
  const bookings = [
    {
      id: 1,
      name: 'Sarah Johnson',
      initials: 'SJ',
      equipment: 'Camera Equipment',
      location: 'Downtown',
      status: 'new',
      time: '2 hours ago',
      action: 'Track'
    },
    {
      id: 2,
      name: 'Mike Chen',
      initials: 'MC',
      equipment: 'Sound System',
      location: 'Uptown',
      status: 'confirmed',
      time: '4 hours ago',
      action: 'Track'
    },
    {
      id: 3,
      name: 'Emma Davis',
      initials: 'ED',
      equipment: 'Lighting Kit',
      location: 'Midtown',
      status: 'in-progress',
      time: '6 hours ago',
      action: 'Track'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border-b border-gray-100 last:border-b-0 gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-900 font-medium text-sm">{booking.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h4 className="font-medium text-gray-900 truncate">{booking.name}</h4>
                  <Badge status={booking.status} />
                </div>
                <p className="text-sm text-gray-600 truncate">{booking.equipment}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-500">{booking.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start space-x-4 sm:space-x-0 sm:space-y-2">
              <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 transition-colors whitespace-nowrap">
                {booking.action}
              </button>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-xs whitespace-nowrap">{booking.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentBookings;
