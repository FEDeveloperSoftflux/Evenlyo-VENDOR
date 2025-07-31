import React, { useState } from 'react';
import { Search, Download, FileText, Calendar, Filter } from 'lucide-react';
import InvoiceRow from './InvoiceRow';
import InvoiceModal from './InvoiceModal';
import PaymentModal from './PaymentModal';
import Button from '../ui/Button';

const InvoiceTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  // Sample invoice data
  const invoices = [
    {
      id: 'INV-001',
      date: '6/15/2024',
      subscriptionPlan: 'Basic',
      amount: 0,
      status: 'paid',
      paymentDetails: {
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-001-2024',
        datePaid: '6/15/2024'
      }
    },
    {
      id: 'INV-001',
      date: '6/15/2024',
      subscriptionPlan: 'Basic',
      amount: 20,
      status: 'left',
      daysLeft: 5,
      paymentDetails: {
        paymentMethod: 'Pending',
        transactionId: null,
        datePaid: null
      }
    }
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.subscriptionPlan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportClick = () => {
    setSelectedInvoice(null);
    setShowInvoiceModal(true);
  };

  const handleDownloadClick = (invoice) => {
    try {
      console.log('Download clicked for invoice:', invoice);
      if (!invoice) {
        console.error('Invoice data is missing');
        return;
      }
      setSelectedInvoice(invoice);
      setShowInvoiceModal(true);
    } catch (error) {
      console.error('Error handling download click:', error);
    }
  };

  const handleStatusClick = (invoice) => {
    try {
      if (!invoice) {
        console.error('Invoice data is missing for status click');
        return;
      }
      setSelectedInvoice(invoice);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error handling status click:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">
            Billing Management
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            You can view and download your billing invoice
          </p>
        </div>
        
        <Button
          variant="gradient"
          size="sm"
          onClick={handleExportClick}
          className="self-start sm:self-auto px-5 py-2 rounded-full"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80 lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm md:text-base text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter by date</span>
          </button>
        </div>
      </div>

      {/* Date Filter Dropdown */}
      {showDateFilter && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-card border border-white/20 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setDateFilter({ from: '', to: '' });
                setShowDateFilter(false);
              }}
            >
              Clear
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setShowDateFilter(false)}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-card border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-pink-50 border-b border-gray-100">
              <tr>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing ID
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription plan
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredInvoices.map((invoice, index) => (
                <InvoiceRow
                  key={`${invoice.id}-${index}`}
                  invoice={invoice}
                  onDownloadClick={handleDownloadClick}
                  onStatusClick={handleStatusClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showInvoiceModal && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => {
            setShowInvoiceModal(false);
            setSelectedInvoice(null);
          }}
        />
      )}

      {showPaymentModal && selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
