import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import InvoiceTable from '../components/billing/InvoiceTable';

const Billings = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FBFBFF] flex">
      <Sidebar activeItem="Billing" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col">
        <Header currentModule="Billing" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <InvoiceTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billings;
