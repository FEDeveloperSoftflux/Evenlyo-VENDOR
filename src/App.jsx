import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ListManagement from './pages/ListManagement';
import BookingAnalytics from './pages/BookingAnalytics';
import Tracking from './pages/Tracking';
import RoleManagement from './pages/RoleManagement';
import StockManagement from './pages/StockManagement';
import AnalyticsReport from './pages/AnalyticsReport';
import InboxChat from './pages/InboxChat';
import Billings from './pages/Billings';
import Notifications from './pages/Notifications';
import ProfileManagement from './pages/ProfileManagement';
import Settings from './pages/Settings';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const handleNavigation = (pageName) => {
    setCurrentPage(pageName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'Listing Management':
        return <ListManagement onNavigate={handleNavigation} />;
      case 'Booking Analytics':
        return <BookingAnalytics onNavigate={handleNavigation} />;
      case 'Tracking':
        return <Tracking onNavigate={handleNavigation} />;
      case 'Role Management':
        return <RoleManagement onNavigate={handleNavigation} />;
      case 'Stock Management':
        return <StockManagement onNavigate={handleNavigation} />;
      case 'Analytics & Report':
        return <AnalyticsReport onNavigate={handleNavigation} />;
      case 'Inbox / Chat':
        return <InboxChat onNavigate={handleNavigation} />;
      case 'Billing':
        return <Billings onNavigate={handleNavigation} />;
      case 'Notifications':
        return <Notifications onNavigate={handleNavigation} />;
      case 'Profile Management':
        return <ProfileManagement onNavigate={handleNavigation} />;
      case 'Setting':
        return <Settings onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <SidebarProvider>
      {renderPage()}
    </SidebarProvider>
  );
}

export default App;
