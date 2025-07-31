import React from 'react';

const StockTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex w-full mb-6 flex-wrap">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 min-w-0 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl font-medium text-xs sm:text-sm transition-colors ${
            index === 0 ? 'mr-1 sm:mr-2' : index === tabs.length - 1 ? 'ml-1 sm:ml-2' : 'mx-0.5 sm:mx-1'
          } ${
            activeTab === tab.id
              ? 'bg-gradient-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
        >
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default StockTabs;
