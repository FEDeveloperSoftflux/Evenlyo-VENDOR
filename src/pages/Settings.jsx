import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import SettingsTabs from '../components/settings/SettingsTabs';

const Settings = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Setting" isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="Jaydeep" userRole="Vendor" currentModule="Setting" onMenuToggle={toggleSidebar} />
        
        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Setting</h1>
              <p className="text-gray-600">You can view your Setting</p>
            </div>
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

