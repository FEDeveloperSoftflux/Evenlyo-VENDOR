import React, { useState } from 'react';
import TabNav from '../ui/TabNav';
import SecurityTab from './SecurityTab';
import NotificationTab from './NotificationTab';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: 'Security Details'
    },
    {
      id: 1,
      label: 'Notification Details'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <SecurityTab />;
      case 1:
        return <NotificationTab />;
      default:
        return <SecurityTab />;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsTabs;
