import React from 'react';

const StockTabPanel = ({ tabId, activeTab, children, className = '' }) => {
  if (activeTab !== tabId) return null;

  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      className={`mt-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default StockTabPanel;
