import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = ({ onNavigate }) => {
  // Sample notification data - matching the design context
  const [notifications, setNotifications] = useState([
    {
      id: 'BK001',
      title: 'Booking Confirmed',
      description: 'Your booking for Ocean View Suite has been confirmed for Dec 25, 2024.',
      status: 'Unread',
      clientName: 'John Smith',
      clientEmail: 'john.smith@email.com',
      clientPhone: '+1 (555) 123-4567',
      service: 'Ocean View Suite',
      dateTime: 'December 25, 2024 at 3:00 PM',
      location: 'NeoLux Resort, Miami Beach',
      price: '$350.00',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      notes: 'The sun had barely begun its ascent, casting a pale, ethereal glow over the sprawling cityscape of NeoLux.'
    },
    {
      id: 'BK002',
      title: 'Booking Confirmed',
      description: 'Your booking for Ocean View Suite has been confirmed for Dec 25, 2024.',
      status: 'Unread',
      clientName: 'Emily Johnson',
      clientEmail: 'emily.johnson@email.com',
      clientPhone: '+1 (555) 987-6543',
      service: 'Ocean View Suite',
      dateTime: 'December 25, 2024 at 6:00 PM',
      location: 'Grand Ballroom, Downtown',
      price: '$2,500.00',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      notes: 'X_AE_B-22 had spent the night in a state of deep computational analysis, sifting through the myriad data streams.'
    },
    {
      id: 'BK003',
      title: 'Booking Confirmed',
      description: 'Your booking for Ocean View Suite has been confirmed for Dec 25, 2024.',
      status: 'Unread',
      clientName: 'Michael Davis',
      clientEmail: 'michael.davis@email.com',
      service: 'Ocean View Suite',
      dateTime: 'December 25, 2024 at 10:00 AM',
      location: 'Wellness Center, Uptown',
      price: '$180.00',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      notes: 'The quiet hum of its processors was the only sound in the dimly lit control room.'
    },
    {
      id: 'BK004',
      title: 'Booking Confirmed',
      description: 'Your booking for Ocean View Suite has been confirmed for Dec 25, 2024.',
      status: 'Unread',
      clientName: 'Sarah Wilson',
      clientEmail: 'sarah.wilson@company.com',
      clientPhone: '+1 (555) 456-7890',
      service: 'Ocean View Suite',
      dateTime: 'December 25, 2024 at 9:00 AM',
      location: 'Conference Center, Business District',
      price: '$850.00',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      notes: 'Suddenly, an encrypted transmission broke through the digital silence, bearing the hallmark of a high-priority message.'
    },
    {
      id: 'BK005',
      title: 'Booking Confirmed',
      description: 'Your booking for Ocean View Suite has been confirmed for Dec 25, 2024.',
      status: 'Unread',
      clientName: 'David Brown',
      clientEmail: 'david.brown@email.com',
      service: 'Ocean View Suite',
      dateTime: 'December 25, 2024 at 2:00 PM',
      location: 'Sunset Park, Westside',
      price: '$120.00',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      notes: 'The message contained coordinates, leading X_AE_B-22 to an obscure sector of NeoLux rarely ventured into.'
    }
  ]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'Read' }
          : notification
      )
    );
  };

  const handleNotificationUpdate = (notificationId, updates) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, ...updates }
          : notification
      )
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Notifications" onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="Jaydeep"
          userRole="Vendor"
          currentModule="Notifications"
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onNotificationUpdate={handleNotificationUpdate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
