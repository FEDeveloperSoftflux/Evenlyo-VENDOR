import React, { useEffect, useState } from 'react';
import { X, Calendar, Download } from 'lucide-react';
import Button from '../ui/Button';
import SuccessModal from '../modals/SuccessModal';

const ReportModal = ({ onClose }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const reportData = {
    reportDate: '6/14/2025',
    todayEarning: '$2,450',
    lastWeekEarning: '$18,500',
    totalEarning: '$125,000'
  };

  const bookingData = [
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' }
  ];

  const handlePDF = () => {
    // Simulate PDF 
    console.log('ing PDF...');
    // Here you would integrate with a PDF generation library
    
    // Close main modal and show success modal
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Analytics & Report</h2>
                  <p className="text-sm text-gray-600"> your earnings report</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Report Summary */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Report Date:</p>
                      <p className="text-sm font-bold text-gray-900">{reportData.reportDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Today Earning:</p>
                      <p className="text-sm font-bold text-gray-900">{reportData.todayEarning}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Last Week Earning:</p>
                      <p className="text-sm font-bold text-gray-900">{reportData.lastWeekEarning}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Total Earning:</p>
                      <p className="text-sm font-bold text-gray-900">{reportData.totalEarning}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Booking Details</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Booking Id
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Booking Item
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total Cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Earning
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {bookingData.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {booking.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {booking.item}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                            {booking.totalCost}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-600">
                            {booking.earning}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handlePDF}
                  className="px-6 py-2 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                   PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="export"
        data={{
          reportDate: reportData.reportDate,
          totalEarning: reportData.totalEarning
        }}
        showSecondaryAction={true}
        secondaryActionText="View Reports"
        onSecondaryAction={() => {
          handleSuccessModalClose();
          console.log('Navigate to reports page');
        }}
      />
    </>
  );
};

export default ReportModal;
