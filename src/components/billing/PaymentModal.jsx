import React, { useEffect, useState } from 'react';
import { X, CreditCard, Calendar, FileText, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SuccessModal from '../modals/SuccessModal';

const PaymentModal = ({ invoice, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Null check for invoice
  if (!invoice) {
    console.error('PaymentModal: Invoice is required');
    onClose();
    return null;
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modalElement = document.getElementById('payment-modal');
    if (modalElement) {
      modalElement.focus();
    }
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMarkAsPaid = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    // In a real app, this would update the invoice status
    console.log('Invoice marked as paid');
    
    // Close main modal and show success modal
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleDownloadReceipt = () => {
    try {
      // Simulate receipt download
      console.log('Downloading receipt...');
      // In a real app, this would trigger a receipt download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `receipt-${invoice?.id || 'unknown'}.pdf`;
      // Uncomment the line below when you have actual PDF generation
      // link.click();
      console.log('Receipt download initiated');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Error downloading receipt. Please try again.');
    }
  };

  const isPaid = invoice.status === 'paid';
  const isOverdue = invoice.status === 'overdue' || invoice.status === 'left';

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
      <div 
        id="payment-modal"
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isPaid ? 'Payment Details' : 'Complete Payment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Invoice Info */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Invoice</span>
              <span className="text-sm font-bold text-gray-900">{invoice?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Plan</span>
              <Badge status="edit" className="bg-gray-100 text-gray-600">
                {invoice?.subscriptionPlan || 'N/A'}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Amount Due</span>
              <span className="text-lg font-bold text-gray-900">${invoice?.amount || '0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <div className="flex items-center gap-2">
                <Badge status={invoice?.status || 'unknown'}>
                  {invoice?.status === 'paid' ? 'Paid' : 
                   invoice?.status === 'left' ? 'Left' : invoice?.status || 'Unknown'}
                </Badge>
                {invoice?.daysLeft && (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {invoice.daysLeft} days
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Payment Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Payment Method</div>
                  <div className="text-sm text-gray-600">
                    {invoice?.paymentDetails?.paymentMethod || 'N/A'}
                  </div>
                </div>
              </div>

              {invoice?.paymentDetails?.transactionId && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Transaction ID</div>
                    <div className="text-sm text-gray-600 font-mono">
                      {invoice.paymentDetails.transactionId}
                    </div>
                  </div>
                </div>
              )}

              {invoice?.paymentDetails?.datePaid && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Date Paid</div>
                    <div className="text-sm text-gray-600">
                      {invoice.paymentDetails.datePaid}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Form (for unpaid invoices) */}
          {!isPaid && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Payment Method</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter cardholder name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          {isPaid ? (
            <Button
              variant="gradient"
              onClick={handleDownloadReceipt}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={handleMarkAsPaid}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                  <>
                  Pay ${invoice?.amount || '0'}
                  </>
              )}
            </Button>
          )}
        </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="payment"
        data={{
          id: invoice?.id,
          amount: invoice?.amount,
          paymentMethod: "Credit Card"
        }}
        showSecondaryAction={true}
        secondaryActionText="View Invoices"
        onSecondaryAction={() => {
          handleSuccessModalClose();
          console.log('Navigate to invoices page');
        }}
      />
    </>
  );
};

export default PaymentModal;
