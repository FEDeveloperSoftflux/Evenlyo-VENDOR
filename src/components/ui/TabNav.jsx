import React from 'react';

const TabNav = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`flex w-full mb-6 ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id || index}
          onClick={() => onTabChange(tab.id || index)}
          className={`flex-1 px-6 py-3 rounded-2xl font-medium text-sm transition-colors ${
            index === 0 ? 'mr-2' : 'ml-2'
          } ${
            activeTab === (tab.id || index)
              ? 'bg-gradient-to-b from-[#FF295D] via-[#E31B95] to-[#C817AE] text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
