import React, { useState } from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';
import Button from '../ui/Button';

const NotificationTab = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    subscriptionPlanNotices: false,
    userSignupNotices: true
  });

  const handleToggleChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving notification settings:', notifications);
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Setting</h2>
      <p className="text-gray-500 text-sm mb-8">Choose what notifications you'd like to receive</p>

      <div className="space-y-6">
        {/* Email Alerts */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-medium text-gray-900">Email Alerts</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Receive important notifications via email</p>
          </div>
          <ToggleSwitch
            checked={notifications.emailAlerts}
            onChange={(value) => handleToggleChange('emailAlerts', value)}
          />
        </div>

        {/* Subscription Plan Notices */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-medium text-gray-900">Subscription Plan Notices</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Get notified when a customer upgrades or downgrades their subscription</p>
          </div>
          <ToggleSwitch
            checked={notifications.subscriptionPlanNotices}
            onChange={(value) => handleToggleChange('subscriptionPlanNotices', value)}
          />
        </div>

        {/* User Signup Notices */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-medium text-gray-900">User Signup Notices</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Receive notifications when new users sign up</p>
          </div>
          <ToggleSwitch
            checked={notifications.userSignupNotices}
            onChange={(value) => handleToggleChange('userSignupNotices', value)}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSaveSettings}
          variant="gradient"
          className="px-8 py-3 rounded-full text-sm font-medium"
        >
          Save Notification Setting
        </Button>
      </div>
    </div>
  );
};

export default NotificationTab;
